(function(){
  'use strict';

  const $ = (id)=>document.getElementById(id);

  function getSession(){ try{return JSON.parse(localStorage.getItem('ecomarket_session')||'null');}catch{return null} }
  function ordersKey(){ const s=getSession(); if(!s) return null; return 'orders_'+ encodeURIComponent(s.userId || s.username || 'anon'); }
  function loadOrders(){ const k=ordersKey(); if(!k) return []; try{ return JSON.parse(localStorage.getItem(k)||'[]'); }catch{ return []; } }

  function money(n){ return '$'+(Number(n)||0).toFixed(2); }

  async function isManager(){
    try{
      if(!window.EcoDB) return false;
      const s = getSession(); if(!s) return false;
      const worker = await EcoDB.findWorkerByUserId(s.userId);
      return !!(worker && worker.is_admin===1);
    }catch{ return false; }
  }

  async function renderList(){
    const s = getSession();
    if(!s){
      alert('Debes iniciar sesión.');
      window.location.href = 'login.html?return='+ encodeURIComponent('mis-pedidos.html');
      return;
    }
    const manager = await isManager();
    const list = loadOrders();
    if(!list.length){ $('list').innerHTML = '<div class="help">No tienes pedidos.</div>'; return; }
    const rows = list.map(o=>`<tr>
      <td>${o.id}</td>
      <td>${o.created_at}</td>
      <td>${money(o.total)}</td>
        <td>${o.status}${o.payment&&o.payment.method?` · ${o.payment.method}`:''}</td>
      <td>
        <button class="btn" data-id="${o.id}" data-act="ver">Ver</button>
        <button class="btn" data-id="${o.id}" data-act="pdf">PDF</button>
        ${manager? `<select data-id="${o.id}" data-act="estado">
            <option value="Creada" ${o.status==='Creada'?'selected':''}>Creada</option>
            <option value="Pagado" ${o.status==='Pagado'?'selected':''}>Pagado</option>
            <option value="Enviado" ${o.status==='Enviado'?'selected':''}>Enviado</option>
            <option value="Entregado" ${o.status==='Entregado'?'selected':''}>Entregado</option>
          </select>`:''}
      </td>
    </tr>`).join('');
    $('list').innerHTML = `<table>
      <thead><tr><th>Pedido</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    $('list').querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.getAttribute('data-id');
        if(b.getAttribute('data-act')==='ver') renderDetail(id);
        else buildPDF(id);
      });
    });
    if(manager){
      $('list').querySelectorAll('select[data-act="estado"]').forEach(sel=>{
        sel.addEventListener('change', ()=>{
          const id = sel.getAttribute('data-id');
          updateOrderStatus(id, sel.value);
        });
      });
    }
  }

  function renderDetail(id){
    const all = loadOrders();
    const o = all.find(x=>x.id===id);
    if(!o){ $('detail').innerHTML = '<div class="help">Pedido no encontrado.</div>'; return; }
    const rows = (o.items||[]).map(it=>`<tr>
      <td>${it.name}</td>
      <td>${it.qty||1}</td>
      <td>${money(it.price)}</td>
      <td>${money((Number(it.price)||0)*(it.qty||1))}</td>
    </tr>`).join('');
    $('detail').innerHTML = `<h3>Detalle ${o.id}</h3>
      <table>
        <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top:8px;font-weight:600">Total: ${money(o.total)}</div>`;
  }

  function buildPDF(id){
    const { jsPDF } = window.jspdf || {};
    if(!jsPDF){ alert('jsPDF no disponible'); return; }
    const all = loadOrders();
    const o = all.find(x=>x.id===id);
    if(!o){ alert('Pedido no encontrado'); return; }
    const doc = new jsPDF({unit:'pt', format:'a4'});
    const left=48, lh=16; let y=56;
    doc.setFont('helvetica','bold'); doc.setFontSize(16); doc.text('Comprobante de Pedido', left, y); y+=24;
    doc.setFont('helvetica',''); doc.setFontSize(11);
    doc.text(`Pedido: ${o.id}`, left, y); y+=lh;
    doc.text(`Fecha: ${o.created_at}`, left, y); y+=lh;
    doc.text(`Estado: ${o.status}`, left, y); y+=lh+6;
    if(o.payment && o.payment.method){ doc.text(`Pago: ${o.payment.method}`, left, y); y+=lh; }
    doc.setFont('helvetica','bold'); doc.text('Items', left, y); y+=lh;
    doc.setFont('helvetica','');
    (o.items||[]).forEach(it=>{
      doc.text(`${it.name}  x${it.qty||1}  ${money(it.price)}  = ${money((Number(it.price)||0)*(it.qty||1))}`, left, y); y+=lh;
    });
    y+=6; doc.setFont('helvetica','bold'); doc.text(`Total: ${money(o.total)}`, left, y);
    doc.save(`${o.id}.pdf`);
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    renderList();
  });

  function updateOrderStatus(id, status){
    const k = ordersKey(); if(!k) return;
    let list = [];
    try{ list = JSON.parse(localStorage.getItem(k)||'[]'); }catch{ list = []; }
    const ix = list.findIndex(o=>o.id===id);
    if(ix>=0){ list[ix].status = status; try{ localStorage.setItem(k, JSON.stringify(list)); }catch{} }
  }
})();
