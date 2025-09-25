// Panel de revisión de reclamos para gerentes - EcoMarket
// Solo accesible para usuarios con rol gerente (is_admin=1)

(async function(){
  // --- Acceso solo gerente ---
  if(!window.EcoDB){
    document.getElementById('msg').textContent = 'Error: DB no disponible.';
    return;
  }
  const session = EcoDB.getSession && EcoDB.getSession();
  if(!session || !session.userId){
    document.getElementById('msg').textContent = 'Debes iniciar sesión como gerente.';
    return;
  }
  const worker = await EcoDB.findWorkerByUserId(session.userId);
  if(!worker || worker.is_admin !== 1){
    document.getElementById('msg').textContent = 'Acceso solo para gerencia.';
    return;
  }

  // --- Filtros y render ---
  const $ = id => document.getElementById(id);
  let reclamos = [];
  let sourceMap = new Map(); // ticket -> 'db' | 'local'

  function loadLocalReclamos(){
    try{
      const raw = JSON.parse(localStorage.getItem('lr_registros')||'[]');
      return raw.map(r=>({
        id: r.id || null,
        ticket: r.numero,
        fecha_registro: r.fecha_registro,
        tipo: r.tipo,
        proveedor: r.proveedor,
        consumidor: r.consumidor,
        fecha_hecho: r.fecha_hecho,
        monto: r.monto,
        detalle: r.detalle,
        pedido: r.pedido,
        estado: (r.estado||'pendiente').toString().toLowerCase(),
        respuesta: r.respuesta||''
      }));
    }catch{ return []; }
  }

  async function migrateLocalToDB(){
    const locals = loadLocalReclamos();
    if(!locals.length) return;
    const current = await EcoDB.listarReclamos().catch(()=>[]);
    const existingTickets = new Set((current||[]).map(x=>x.ticket));
    for(const r of locals){
      if(!r.ticket || existingTickets.has(r.ticket)) continue;
      try{
        await EcoDB.guardarReclamo({
          ticket: r.ticket,
          fecha_registro: r.fecha_registro,
          tipo: r.tipo,
          proveedor: r.proveedor,
          consumidor: r.consumidor,
          fecha_hecho: r.fecha_hecho,
          monto: r.monto,
          detalle: r.detalle,
          pedido: r.pedido
        });
        existingTickets.add(r.ticket);
      }catch{ /* puede fallar por duplicado u otros; ignorar */ }
    }
  }

  async function cargarReclamos(filtro={}){
    sourceMap = new Map();
    reclamos = await EcoDB.listarReclamos(filtro).catch(()=>[]);
    for(const r of (reclamos||[])) if(r && r.ticket) sourceMap.set(r.ticket,'db');
    if(!reclamos || reclamos.length===0){
      const locals = loadLocalReclamos();
      // aplicar filtros manualmente al fallback
      let list = locals;
      if(filtro.estado) list = list.filter(r=> r.estado===filtro.estado);
      if(filtro.ticket) list = list.filter(r=> (r.ticket||'')===filtro.ticket);
      if(filtro.dni) list = list.filter(r=> (r.consumidor?.num_doc||'')===filtro.dni);
      reclamos = list;
      for(const r of list) if(r.ticket) sourceMap.set(r.ticket,'local');
    }
    renderTabla();
  }

  function renderTabla(){
    if(!reclamos.length){
      $('tabla').innerHTML = '<div class="msg">No hay reclamos para mostrar.</div>';
      return;
    }
    const rows = reclamos.map(r=>{
      const estadoClass = r.estado === 'respondido' ? 'estado-respondido' : 'estado-pendiente';
      const src = sourceMap.get(r.ticket)||'db';
      const accion = (src==='db')
        ? (r.respuesta ? `<div>${r.respuesta}</div>` : `<textarea class="respuesta-box" data-id="${r.id}" placeholder="Escribe una solución..."></textarea><button class="btn" data-id="${r.id}" data-action="responder">Responder</button>`) 
        : `<em class="muted">Registro local (no DB). Pide al cliente re-enviar con la app servida por http(s).</em>`;
      return `<tr>
        <td>${r.ticket}</td>
        <td>${r.fecha_registro ? r.fecha_registro.slice(0,16).replace('T',' ') : ''}</td>
        <td>${r.consumidor?.nombres||''}</td>
        <td>${r.consumidor?.num_doc||''}</td>
        <td>${r.tipo||''}</td>
        <td class="${estadoClass}">${r.estado||'pendiente'}</td>
        <td>${accion}</td>
      </tr>`;
    }).join('');
    $('tabla').innerHTML = `<table><thead><tr><th>Ticket</th><th>Fecha</th><th>Consumidor</th><th>Documento</th><th>Tipo</th><th>Estado</th><th>Respuesta</th></tr></thead><tbody>${rows}</tbody></table>`;
    // Botones responder
    document.querySelectorAll('button[data-action="responder"]').forEach(btn=>{
      btn.onclick = async ()=>{
        const id = Number(btn.getAttribute('data-id'));
        const ta = document.querySelector(`textarea[data-id="${id}"]`);
        const val = ta.value.trim();
        if(!val){ alert('Debes escribir una solución.'); return; }
        await EcoDB.responderReclamo(id, val);
        await cargarReclamos(getFiltroActual());
        $('msg').textContent = 'Respuesta guardada.';
        try{ localStorage.setItem('ecomarket_reclamos_last_update', String(Date.now())); }catch{}
      };
    });
  }

  function getFiltroActual(){
    const estado = $('fEstado').value;
    const ticket = $('fTicket').value.trim();
    const dni = $('fDni').value.trim();
    const filtro = {};
    if(estado) filtro.estado = estado;
    if(ticket) filtro.ticket = ticket;
    if(dni) filtro.dni = dni;
    return filtro;
  }

  $('btnFiltrar').onclick = ()=> cargarReclamos(getFiltroActual());
  $('btnLimpiar').onclick = ()=>{
    $('fEstado').value = '';
    $('fTicket').value = '';
    $('fDni').value = '';
    cargarReclamos();
  };

  // Inicial: migrar locales a DB y luego cargar
  await migrateLocalToDB();
  cargarReclamos();
})();
