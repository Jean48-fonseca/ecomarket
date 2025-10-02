/* EcoMarket DB - IndexedDB + PBKDF2 + sesión en localStorage
   Esta "base de datos" funciona en el navegador. Centraliza:
   - Apertura/creación de IndexedDB con stores: users y workers
   - Hash seguro de contraseñas (PBKDF2-SHA256)
   - Altas y consultas de usuarios/empleados
   - Manejo de sesión (guardar, leer, limpiar)
*/
(function(global){
  const ADMIN_DB_NAME = 'ecomarket_browser_db';
  const ADMIN_DB_VERSION = 1;
  const SESSION_KEY = 'ecomarket_session';

  function openReqProm(req){
    return new Promise((res, rej)=>{ req.onsuccess = ()=>res(req.result); req.onerror = ()=>rej(req.error); });
  }

  async function dbOpen(){
    const req = indexedDB.open(ADMIN_DB_NAME, ADMIN_DB_VERSION);
    req.onupgradeneeded = (e)=>{
      const db = e.target.result;
      if(!db.objectStoreNames.contains('users')){
        const s = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        s.createIndex('username', 'username', { unique: true });
      }
      if(!db.objectStoreNames.contains('workers')){
        const s2 = db.createObjectStore('workers', { keyPath: 'id', autoIncrement: true });
        s2.createIndex('employeeCode', 'employeeCode', { unique: true });
        s2.createIndex('userId', 'userId', { unique: true });
      }
    };
    return await openReqProm(req);
  }

  // PBKDF2-SHA256
  async function hashPasswordPBKDF2(password, saltHex=null){
    const enc = new TextEncoder();
    let salt;
    if(saltHex){ salt = hexToBytes(saltHex); } else { salt = crypto.getRandomValues(new Uint8Array(16)); }
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), {name:'PBKDF2'}, false, ['deriveBits']);
    const params = {name:'PBKDF2', salt: salt, iterations: 120000, hash: 'SHA-256'};
    const bits = await crypto.subtle.deriveBits(params, keyMaterial, 256);
    const hash = bytesToHex(new Uint8Array(bits));
    const saltHexOut = bytesToHex(salt);
    return {salt: saltHexOut, hash};
  }
  function bytesToHex(bytes){ return Array.from(bytes).map(b=>b.toString(16).padStart(2,'0')).join(''); }
  function hexToBytes(hex){ const a=new Uint8Array(hex.length/2); for(let i=0;i<a.length;i++) a[i]=parseInt(hex.substr(i*2,2),16); return a; }

  // Users
  async function addUser({username, password, firstName, lastName, email}){
    const {salt, hash} = await hashPasswordPBKDF2(password);
    const db = await dbOpen();
    return new Promise((res, rej)=>{
      const tx = db.transaction('users','readwrite');
      const store = tx.objectStore('users');
      const now = new Date().toISOString();
      const payload = {username, password_salt: salt, password_hash: hash, first_name:firstName, last_name:lastName, email, created_at: now};
      const req = store.add(payload);
      req.onsuccess = ()=>res(req.result);
      req.onerror = ()=>rej(req.error);
    });
  }
  async function findUserByUsername(username){
    const db = await dbOpen();
    return new Promise((res,rej)=>{
      const tx = db.transaction('users','readonly');
      const store = tx.objectStore('users');
      const idx = store.index('username');
      const req = idx.get(username);
      req.onsuccess = ()=>res(req.result||null);
      req.onerror = ()=>rej(req.error);
    });
  }
  async function listUsers(){
    const db = await dbOpen();
    return new Promise((res, rej)=>{
      const tx = db.transaction('users','readonly');
      const store = tx.objectStore('users');
      const req = store.getAll();
      req.onsuccess = ()=>res(req.result);
      req.onerror = ()=>rej(req.error);
    });
  }

  // Workers
  async function addWorker({userId, employeeCode, position, isAdmin=0}){
    const db = await dbOpen();
    return new Promise((res, rej)=>{
      const tx = db.transaction('workers','readwrite');
      const store = tx.objectStore('workers');
      const now = new Date().toISOString();
      const payload = {userId, employeeCode, position, is_admin: Number(isAdmin), created_at: now};
      const req = store.add(payload);
      req.onsuccess = ()=>res(req.result);
      req.onerror = ()=>rej(req.error);
    });
  }
  async function listWorkers(){
    const db = await dbOpen();
    return new Promise((res, rej)=>{
      const tx = db.transaction('workers','readonly');
      const store = tx.objectStore('workers');
      const req = store.getAll();
      req.onsuccess = ()=>res(req.result);
      req.onerror = ()=>rej(req.error);
    });
  }
  async function findWorkerByUserId(userId){
    const db = await dbOpen();
    return new Promise((res,rej)=>{
      const tx = db.transaction('workers','readonly');
      const store = tx.objectStore('workers');
      const req = store.getAll();
      req.onsuccess = ()=>{
        const all = req.result || [];
        res(all.find(w=>w.userId === userId) || null);
      };
      req.onerror = ()=>rej(req.error);
    });
  }

  // Seeding de ejemplo
  async function seedSample(){
    const users = await listUsers().catch(()=>[]);
    if((users||[]).length>0) return; // ya hay datos
    const u1 = await addUser({username:'cliente1', password:'passCliente1', firstName:'Carlos', lastName:'Pérez', email:'carlos.perez@example.com'});
    const u2 = await addUser({username:'cliente2', password:'passCliente2', firstName:'María', lastName:'González', email:'maria.gonzalez@example.com'});
    const u3 = await addUser({username:'trabajador1', password:'trabPass1', firstName:'Lucía', lastName:'Ramírez', email:'lucia.ramirez@tienda.com'});
    const u4 = await addUser({username:'trabajador2', password:'trabPass2', firstName:'Eduardo', lastName:'Salgado', email:'eduardo.salgado@tienda.com'});
    await addWorker({userId:u3, employeeCode:'EMP-1001', position:'Cajero', isAdmin:0});
    await addWorker({userId:u4, employeeCode:'EMP-1002', position:'Gerente', isAdmin:1});
  }

  // Sesión
  function saveSession(session){ localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
  function getSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)||'null'); }catch{ return null; } }
  function clearSession(){ localStorage.removeItem(SESSION_KEY); }

  // Export API
  global.EcoDB = {
    dbOpen,
    hashPasswordPBKDF2,
    addUser, findUserByUsername, listUsers,
    addWorker, listWorkers, findWorkerByUserId,
    seedSample,
    saveSession, getSession, clearSession
  };
})(window);
