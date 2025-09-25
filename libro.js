// Libro de Reclamaciones - EcoMarket
// Cumple requisitos del D.S. N° 001-2006-PCM y modificatorias.
// - Validación de campos obligatorios
// - Generación de código único
// - Registro con fecha/hora automática
// - Consulta por ticket o documento
// - Exportación CSV y PDF (jsPDF)

(function(){
  'use strict';

  // Claves en localStorage
  const LS_PROV = 'lr_proveedor';
  const LS_DATA = 'lr_registros';

  // Utilidades
  const $ = (id)=>document.getElementById(id);

  function nowIso(){ return new Date().toISOString(); }

  function genTicket(){
    const ts = Date.now();
    const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
    return `LR-${ts}-${rnd}`;
  }

  function loadProv(){
    try{ return JSON.parse(localStorage.getItem(LS_PROV)||'null'); }catch{ return null; }
  }
  function saveProv(prov){ localStorage.setItem(LS_PROV, JSON.stringify(prov)); }

  function loadAll(){
    try{ return JSON.parse(localStorage.getItem(LS_DATA)||'[]'); }catch{ return []; }
  }
  function saveAll(arr){ localStorage.setItem(LS_DATA, JSON.stringify(arr)); }

  function required(v){ return v!=null && String(v).trim().length>0; }

  function toCSV(rows){
    const escape = (s)=>`"${String(s).replace(/"/g,'""')}"`;
    const headers = [
      'numero','fecha_registro','tipo','estado','proveedor_nombre','proveedor_ruc','proveedor_direccion',
      'consumidor_nombres','consumidor_tipo_doc','consumidor_num_doc','consumidor_direccion','consumidor_telefono','consumidor_email',
      'fecha_hecho','monto','detalle','pedido'
    ];
    const lines = [headers.join(',')];
    for(const r of rows){
      const line = [
        r.numero, r.fecha_registro, r.tipo, r.estado, r.proveedor.nombre, r.proveedor.ruc, r.proveedor.direccion,
        r.consumidor.nombres, r.consumidor.tipo_doc, r.consumidor.num_doc, r.consumidor.direccion, r.consumidor.telefono||'', r.consumidor.email||'',
        r.fecha_hecho, r.monto ?? '', r.detalle, r.pedido
      ].map(escape).join(',');
      lines.push(line);
    }
    return lines.join('\n');
  }

  function download(filename, content, mime='text/plain'){
    const blob = new Blob([content], {type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  // PDF (jsPDF)
  async function buildPDF(record){
    const { jsPDF } = window.jspdf || {};
    if(!jsPDF){ alert('No se pudo cargar jsPDF.'); return; }
    const doc = new jsPDF({unit:'pt', format:'a4'});

    const left = 48, top = 56, lh = 16;
    let y = top;

    doc.setFont('helvetica','bold'); doc.setFontSize(16);
    doc.text('Libro de Reclamaciones - Registro', left, y); y += 26;
    doc.setFont('helvetica',''); doc.setFontSize(11);
    doc.text(`Número: ${record.numero}`, left, y); y += lh;
    doc.text(`Fecha de registro: ${record.fecha_registro}`, left, y); y += lh;
    y += 6;

    doc.setFont('helvetica','bold'); doc.text('Datos del proveedor', left, y); y += lh;
    doc.setFont('helvetica','');
    doc.text(`Nombre/Razón social: ${record.proveedor.nombre}`, left, y); y += lh;
    doc.text(`RUC: ${record.proveedor.ruc}`, left, y); y += lh;
    doc.text(`Dirección: ${record.proveedor.direccion}`, left, y); y += lh;
    y += lh;

    doc.setFont('helvetica','bold'); doc.text('Datos del consumidor', left, y); y += lh;
    doc.setFont('helvetica','');
    doc.text(`Nombres y apellidos: ${record.consumidor.nombres}`, left, y); y += lh;
    doc.text(`Documento: ${record.consumidor.tipo_doc} ${record.consumidor.num_doc}`, left, y); y += lh;
    doc.text(`Dirección: ${record.consumidor.direccion}`, left, y); y += lh;
    if(record.consumidor.telefono) { doc.text(`Teléfono: ${record.consumidor.telefono}`, left, y); y += lh; }
    if(record.consumidor.email) { doc.text(`Email: ${record.consumidor.email}`, left, y); y += lh; }
    y += lh;

    doc.setFont('helvetica','bold'); doc.text('Detalle', left, y); y += lh;
    doc.setFont('helvetica','');
    doc.text(`Tipo: ${record.tipo}` , left, y); y += lh;
    doc.text(`Fecha del hecho: ${record.fecha_hecho}`, left, y); y += lh;
    if(record.monto!=null && record.monto!=='') { doc.text(`Monto reclamado: ${record.monto}`, left, y); y += lh; }
    y += 6;

    const wrapText = (text, maxWidth)=> doc.splitTextToSize(String(text||''), 500);
    doc.setFont('helvetica','bold'); doc.text('Descripción:', left, y); y += lh;
    doc.setFont('helvetica','');
    const detLines = wrapText(record.detalle, 500);
    doc.text(detLines, left, y); y += detLines.length*lh;
    y += 6;
    doc.setFont('helvetica','bold'); doc.text('Pedido del consumidor:', left, y); y += lh;
    doc.setFont('helvetica','');
    const pedLines = wrapText(record.pedido, 500);
    doc.text(pedLines, left, y); y += pedLines.length*lh;

    y += 20;
    doc.setFont('helvetica',''); doc.text(`Estado: ${record.estado}`, left, y); y += lh;
    doc.text('Este documento es una representación digital del registro efectuado por el consumidor.', left, y);

    doc.save(`${record.numero}.pdf`);
  }

  // Inicialización
  window.addEventListener('DOMContentLoaded', ()=>{
    const prov = loadProv();
    if(prov){
      $('provNombre').value = prov.nombre;
      $('provRuc').value = prov.ruc;
      $('provDir').value = prov.direccion;
      $('provMsg').textContent = 'Datos del proveedor cargados.';
    }

    $('btnGuardarProv').addEventListener('click', ()=>{
      const nombre = $('provNombre').value.trim();
      const ruc = $('provRuc').value.trim();
      const direccion = $('provDir').value.trim();
      if(!required(nombre) || !required(ruc) || !required(direccion)){
        $('provMsg').textContent = 'Completa los campos del proveedor.';
        return;
      }
      saveProv({nombre, ruc, direccion});
      $('provMsg').textContent = 'Datos del proveedor guardados.';
    });

    $('btnLimpiar').addEventListener('click', ()=>{
      $('formReclamo').reset();
      $('err').textContent = '';
      $('ok').style.display = 'none';
    });

    $('formReclamo').addEventListener('submit', (e)=>{
      e.preventDefault();
      $('err').textContent = '';
      $('ok').style.display = 'none';

      const prov = loadProv();
      if(!prov){ $('err').textContent = 'Debes guardar primero los datos del proveedor.'; return; }

      const tipo = $('tipoRegistro').value;
      const fecha_hecho = $('fechaHecho').value;
      const montoRaw = $('monto').value;
      const monto = montoRaw!=='' ? Number(montoRaw) : null;

      const nombres = $('nombres').value.trim();
      const tipo_doc = $('tipoDoc').value;
      const num_doc = $('numDoc').value.trim();
      const telefono = $('telefono').value.trim();
      const email = $('email').value.trim();
      const direccion = $('direccion').value.trim();
      const detalle = $('detalle').value.trim();
      const pedido = $('pedido').value.trim();

      // Validaciones
      const errors = [];
      if(!required(nombres)) errors.push('Nombres y apellidos es obligatorio.');
      if(!required(tipo_doc)) errors.push('Tipo de documento es obligatorio.');
      if(!required(num_doc)) errors.push('Número de documento es obligatorio.');
      if(!required(direccion)) errors.push('Dirección es obligatoria.');
      if(!required(detalle)) errors.push('Detalle es obligatorio.');
      if(!required(pedido)) errors.push('Pedido es obligatorio.');
      if(!required(fecha_hecho)) errors.push('Fecha del hecho es obligatoria.');
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Correo inválido.');
      if(montoRaw!=='' && (isNaN(monto) || monto<0)) errors.push('Monto inválido.');

      if(errors.length){ $('err').textContent = errors.join(' '); return; }

      // Construir registro
      const numero = genTicket();
      const fecha_registro = nowIso();
      const record = {
        numero,
        fecha_registro,
        tipo,
        estado: 'Pendiente',
        proveedor: prov,
        consumidor: { nombres, tipo_doc, num_doc, direccion, telefono: telefono||null, email: email||null },
        fecha_hecho,
        monto,
        detalle,
        pedido
      };

      // Guardar en localStorage
      const all = loadAll();
      all.push(record);
      saveAll(all);

      // Guardar en IndexedDB si EcoDB disponible
      if(window.EcoDB && typeof EcoDB.guardarReclamo === 'function'){
        EcoDB.guardarReclamo({
          ticket: numero,
          fecha_registro,
          tipo,
          proveedor: prov,
          consumidor: { nombres, tipo_doc, num_doc, direccion, telefono: telefono||null, email: email||null },
          fecha_hecho,
          monto,
          detalle,
          pedido
        }).then(()=>{
          $('ok').style.display = 'block';
          $('ok').textContent = `Reclamo registrado con ticket ${numero}. (Guardado en base de datos)`;
        }).catch(()=>{
          $('ok').style.display = 'block';
          $('ok').textContent = `Reclamo registrado con ticket ${numero}. (No se pudo guardar en base de datos)`;
        });
      }else{
        $('ok').style.display = 'block';
        $('ok').textContent = `Reclamo registrado con ticket ${numero}.`;
      }

      // Generar PDF
      buildPDF(record);

      e.target.reset();
    });

    $('btnBuscar').addEventListener('click', ()=>{
      const t = $('queryTicket').value.trim();
      const d = $('queryDni').value.trim();
      const all = loadAll();
      let results = all;
      if(t) results = results.filter(r=>r.numero.toLowerCase()===t.toLowerCase());
      if(d) results = results.filter(r=>r.consumidor.num_doc.toLowerCase()===d.toLowerCase());
      renderResults(results);
    });

    $('btnCsvAll').addEventListener('click', ()=>{
      const all = loadAll();
      const csv = toCSV(all);
      download(`reclamos_${new Date().toISOString().slice(0,10)}.csv`, csv, 'text/csv');
    });

    // --- Mis reclamos ---
    const btnMisReclamos = $('btnMisReclamos');
    const modal = $('misReclamosModal');
    const lista = $('misReclamosLista');
    const detalle = $('detalleReclamo');
    const btnCerrar = $('btnCerrarMisReclamos');
    let reclamosUsuario = [];

    if(btnMisReclamos){
      btnMisReclamos.addEventListener('click', async ()=>{
        let dni = prompt('Ingrese su número de documento para ver sus reclamos:');
        if(!dni) return;
        lista.innerHTML = 'Cargando...';
        detalle.innerHTML = '';
        modal.style.display = 'flex';
        // Buscar en IndexedDB si disponible
        if(window.EcoDB && typeof EcoDB.listarReclamos==='function'){
          reclamosUsuario = await EcoDB.listarReclamos({dni});
        }else{
          // Fallback localStorage
          reclamosUsuario = loadAll().filter(r=>r.consumidor.num_doc===dni);
        }
        if(!reclamosUsuario.length){
          lista.innerHTML = '<div class="help">No se encontraron reclamos para este documento.</div>';
          return;
        }
        lista.innerHTML = '<ul style="list-style:none;padding:0;">'+reclamosUsuario.map((r,i)=>
          `<li style="margin-bottom:8px;"><button class="btn" data-idx="${i}">${r.ticket||r.numero} - ${r.fecha_registro? r.fecha_registro.slice(0,10):''} (${r.estado||'pendiente'})</button></li>`
        ).join('')+'</ul>';
        lista.querySelectorAll('button[data-idx]').forEach(btn=>{
          btn.onclick = ()=>{
            const idx = Number(btn.getAttribute('data-idx'));
            mostrarDetalleReclamo(reclamosUsuario[idx]);
          };
        });
      });
    }
    if(btnCerrar){
      btnCerrar.onclick = ()=>{ modal.style.display = 'none'; lista.innerHTML = ''; detalle.innerHTML = ''; };
    }

    function mostrarDetalleReclamo(r){
      let html = `<div><b>Ticket:</b> ${r.ticket||r.numero}</div>`;
      html += `<div><b>Fecha:</b> ${r.fecha_registro? r.fecha_registro.replace('T',' ').slice(0,16):''}</div>`;
      html += `<div><b>Estado:</b> ${r.estado||'pendiente'}</div>`;
      html += `<div><b>Tipo:</b> ${r.tipo||''}</div>`;
      html += `<div><b>Detalle:</b> ${r.detalle||''}</div>`;
      html += `<div><b>Pedido:</b> ${r.pedido||''}</div>`;
      html += `<div><b>Respuesta del gerente:</b><br><span style="color:#0f7b6c">${r.respuesta?r.respuesta:'(Aún sin respuesta)'}</span></div>`;
      detalle.innerHTML = html;
    }
  });

  function renderResults(list){
    const cont = $('resultados');
    if(!list.length){ cont.innerHTML = '<div class="help">Sin resultados.</div>'; return; }
    const rows = list.map(r=>`<tr>
      <td>${r.numero}</td>
      <td>${r.fecha_registro}</td>
      <td>${r.consumidor.nombres}</td>
      <td>${r.consumidor.tipo_doc} ${r.consumidor.num_doc}</td>
      <td>${r.tipo}</td>
      <td>${r.estado}</td>
      <td><button class="btn" data-ticket="${r.numero}" data-action="pdf">PDF</button></td>
    </tr>`).join('');
    cont.innerHTML = `<table>
      <thead><tr><th>Número</th><th>Fecha</th><th>Consumidor</th><th>Documento</th><th>Tipo</th><th>Estado</th><th>Reporte</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    cont.querySelectorAll('button[data-action="pdf"]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const ticket = btn.getAttribute('data-ticket');
        const all = loadAll();
        const r = all.find(x=>x.numero===ticket);
        if(r) buildPDF(r);
      });
    });
  }
})();
