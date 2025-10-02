(function(){
  'use strict';

  const $ = (id)=>document.getElementById(id);

  function getSession(){ try{return JSON.parse(localStorage.getItem('ecomarket_session')||'null');}catch{return null} }

  async function assertManager(){
    if(!window.EcoDB){ alert('DB no disponible'); location.href='Untitled-1.html'; return false; }
    const s = getSession(); if(!s){ alert('Inicia sesión'); location.href='login.html?return='+encodeURIComponent('admin-pedidos.html'); return false; }
    const worker = await EcoDB.findWorkerByUserId(s.userId);
    if(!worker || worker.is_admin!==1){ alert('Acceso restringido a gerencia'); location.href='Untitled-1.html'; return false; }
    return true;
  }

  function collectAllOrders(){
    const keys = Object.keys(localStorage).filter(k=>k.startsWith('orders_'));
    const out = [];
    for(const k of keys){
      try{
        const list = JSON.parse(localStorage.getItem(k)||'[]');
        const owner = decodeURIComponent(k.slice('orders_'.length));
        for(const o of list){ out.push({...o, _owner: owner}); }
      }catch{}
    }
    return out;
  }

  function money(n){ return '$'+(Number(n)||0).toFixed(2); }
  function toCSV(rows){
    const escape = (s)=>`"${String(s).replace(/"/g,'""')}"`;
    const headers = ['pedido','usuario','fecha','estado','total','items'];
    const lines = [headers.join(',')];
    for(const r of rows){
      const items = (r.items||[]).map(i=>`${i.name} x${i.qty||1}`).join(' | ');
      lines.push([r.id, r._owner, r.created_at, r.status, r.total, items].map(escape).join(','));
    }
    return lines.join('\n');
  }
  function download(filename, content, mime='text/plain'){
    const blob = new Blob([content], {type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
  }

  function filterOrders(list){
    const est = $('fEstado').value;
    const d1 = $('fDesde').value ? new Date($('fDesde').value) : null;
    const d2 = $('fHasta').value ? new Date($('fHasta').value+'T23:59:59') : null;
    return list.filter(o=>{
      if(est && o.status!==est) return false;
      const dt = new Date(o.created_at);
      if(d1 && dt < d1) return false;
      if(d2 && dt > d2) return false;
      return true;
    });
  }

  function render(list){
    if(!list.length){ $('list').innerHTML = '<div class="help">Sin pedidos para los filtros aplicados.</div>'; return; }
    const rows = list.map(o=>`<tr>
      <td>${o.id}</td>
      <td>${o._owner}</td>
      <td>${o.created_at}</td>
      <td>${money(o.total)}</td>
      <td>
        <select data-id="${o.id}" data-owner="${o._owner}">
          <option ${o.status==='Creada'?'selected':''}>Creada</option>
          <option ${o.status==='Pagado'?'selected':''}>Pagado</option>
          <option ${o.status==='Enviado'?'selected':''}>Enviado</option>
          <option ${o.status==='Entregado'?'selected':''}>Entregado</option>
        </select>
      </td>
    </tr>`).join('');
    $('list').innerHTML = `<table>
      <thead><tr><th>Pedido</th><th>Usuario</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    $('list').querySelectorAll('select[data-id]').forEach(sel=>{
      sel.addEventListener('change', ()=>{
        const id = sel.getAttribute('data-id');
        const owner = sel.getAttribute('data-owner');
        updateOrder(owner, id, sel.value);
      });
    });
  }

  function updateOrder(owner, id, status){
    const key = 'orders_'+ encodeURIComponent(owner);
    let list = [];
    try{ list = JSON.parse(localStorage.getItem(key)||'[]'); }catch{ list = []; }
    const ix = list.findIndex(o=>o.id===id);
    if(ix>=0){ list[ix].status = status; try{ localStorage.setItem(key, JSON.stringify(list)); }catch{} }
  }

  window.addEventListener('DOMContentLoaded', async ()=>{
    const ok = await assertManager(); if(!ok) return;
    let all = collectAllOrders();
    let filtered = filterOrders(all);
    render(filtered);
    $('btnBuscar').addEventListener('click', ()=>{ all = collectAllOrders(); render(filterOrders(all)); });
    $('btnCsv').addEventListener('click', ()=>{ download(`pedidos_${new Date().toISOString().slice(0,10)}.csv`, toCSV(filterOrders(all)), 'text/csv'); });
  });
})();
