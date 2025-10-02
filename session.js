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

  global.EcoSession = {
    getSession,
    saveSession,
    clearSession,
    renewSession,
    getSessionKeyForCart,
    SESSION_KEY
  };
})(window);
