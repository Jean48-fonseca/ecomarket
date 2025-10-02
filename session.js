// session.js - helper centralizado para manejo de sesión en localStorage
(function(global){
  const SESSION_KEY = 'ecomarket_session';

  function parseRaw(raw) {
    if (!raw || raw === 'null') return null;
    if (typeof raw === 'object') return raw;
    try { return JSON.parse(raw); } catch { return { username: String(raw) }; }
  }

  function normalize(session) {
    if (!session) return null;
    session.userId = session.userId || session.id || session.user_id || null;
    session.username = session.username || session.user || (session.userId ? String(session.userId) : null) || null;
    return session;
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      const s = parseRaw(raw);
      const session = normalize(s);
      if (!session) return null;
      if (!session.userId && !session.username) return null;
      if (session.expiresAt) {
        const exp = new Date(session.expiresAt);
        if (!isNaN(exp) && exp < new Date()) return null;
      }
      return session;
    } catch (err) {
      console.error('session.js getSession error', err);
      return null;
    }
  }

  function saveSession(session) {
    try {
      if (!session) return;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (err) { console.error('session.js saveSession error', err); }
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (err) { console.error('session.js clearSession error', err); }
  }

  function renewSession(addMs = 24*60*60*1000) {
    const s = getSession();
    if (!s) return false;
    s.lastActivity = new Date().toISOString();
    s.expiresAt = new Date(Date.now() + addMs).toISOString();
    saveSession(s);
    return true;
  }

  function getSessionKeyForCart() {
    const s = getSession();
    if (!s) return null;
    const uid = s.userId || s.username || 'anon';
    return 'ecomarket_cart_' + encodeURIComponent(uid);
  }

  // Migrar carrito de invitado (anon) al carrito del usuario al iniciar sesión.
  // Combina items sumando cantidades si ya existen.
  function migrateGuestCartToUser(targetUid) {
    try {
      if (!targetUid) return false;
      const userKey = 'ecomarket_cart_' + encodeURIComponent(String(targetUid));
      const anonKey = 'ecomarket_cart_anon';
      // legacy key
      const legacyKey = 'ecomarket_cart';

      let anon = null;
      try { anon = JSON.parse(localStorage.getItem(anonKey) || 'null'); } catch { anon = null; }
      if (!anon || !Array.isArray(anon) || anon.length === 0) {
        // try legacy
        try { anon = JSON.parse(localStorage.getItem(legacyKey) || 'null'); } catch { anon = null; }
      }

      if (!anon || !Array.isArray(anon) || anon.length === 0) return false;

      let userCart = [];
      try { userCart = JSON.parse(localStorage.getItem(userKey) || '[]'); } catch { userCart = []; }

      const map = new Map();
      // add existing user cart
      for (const item of userCart) {
        if (!item || !item.id) continue;
        map.set(item.id, Object.assign({}, item));
      }
      // merge anon
      for (const item of anon) {
        if (!item || !item.id) continue;
        if (map.has(item.id)) {
          const existing = map.get(item.id);
          existing.qty = (Number(existing.qty) || 0) + (Number(item.qty) || 0);
          map.set(item.id, existing);
        } else {
          map.set(item.id, Object.assign({}, item));
        }
      }

      const merged = Array.from(map.values());
      localStorage.setItem(userKey, JSON.stringify(merged));
      // cleanup anon keys
      try { localStorage.removeItem(anonKey); } catch {}
      try { localStorage.removeItem(legacyKey); } catch {}
      return true;
    } catch (err) {
      console.error('migrateGuestCartToUser error', err);
      return false;
    }
  }

  global.EcoSession = {
    getSession,
    saveSession,
    clearSession,
    renewSession,
    getSessionKeyForCart,
    SESSION_KEY
  };
})(window);
