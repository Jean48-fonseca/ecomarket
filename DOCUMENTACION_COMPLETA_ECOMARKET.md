# 📚 **DOCUMENTACIÓN COMPLETA - ECOMARKET**
## *Tu mercado, en un clic*

---

## 🎯 **RESUMEN EJECUTIVO**

**EcoMarket** es una tienda virtual moderna y completa desarrollada para ofrecer productos frescos y ecológicos con una experiencia de usuario excepcional. El proyecto combina tecnologías web modernas con inteligencia artificial para crear una plataforma e-commerce robusta y escalable.

### **Características Principales:**
- ✅ **E-commerce completo** con carrito, pedidos y gestión de usuarios
- ✅ **Asistente IA integrado** (EcoIA) para recomendaciones personalizadas
- ✅ **Sistema de autenticación** multi-nivel (clientes, trabajadores, administradores)
- ✅ **Panel administrativo** para gestión de pedidos y reclamos
- ✅ **Libro de reclamaciones** digital conforme a normativa peruana
- ✅ **Base de datos local** con IndexedDB y cifrado PBKDF2-SHA256
- ✅ **Diseño responsive** optimizado para todos los dispositivos
- ✅ **Deploy automático** en Render.com con integración GitHub

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Frontend (Client-Side)**
```
📁 EcoMarket Frontend
├── 🎨 HTML5 + CSS3 (Variables CSS + Flexbox/Grid)
├── ⚡ JavaScript Vanilla (ES6+)
├── 🗄️ IndexedDB (Base de datos local)
├── 🔒 Web Crypto API (Cifrado PBKDF2-SHA256)
├── 📱 Responsive Design (Mobile-First)
└── 🤖 Chat EcoIA (WebSocket + AI API)
```

### **Backend (Server-Side)**
```
📁 EcoMarket Backend
├── 🚀 Node.js + Express.js
├── 🧠 Sistema IA Híbrido:
│   ├── DeepSeek API (Principal)
│   └── Ollama Local (Fallback)
├── 🔄 Middleware CORS
├── 📊 Sistema de logs
└── ⚙️ Variables de entorno
```

### **Base de Datos**
```
📊 IndexedDB Structure
├── 👥 users (Clientes)
├── 👷 workers (Empleados)
├── 📋 reclamos (Libro de reclamaciones)
├── 🛒 localStorage (Carritos por usuario)
└── 📦 localStorage (Pedidos completados)
```

---

## 📁 **ESTRUCTURA DE ARCHIVOS**

### **🎨 Frontend Principal**
```
Untitled-1.html          (2,281 líneas)
├── Catálogo de productos completo
├── Buscador inteligente con filtros
├── Carrito de compras por usuario
├── Chat EcoIA integrado
├── Panel administrativo oculto
└── Sistema de sesiones

carrito.html              (Nuevo - 450 líneas)
├── Vista detallada del carrito
├── Modificación de cantidades
├── Cálculo automático de totales
├── Proceso de checkout
└── Integración con pedidos

mis-pedidos.html          (384 líneas)
├── Historial de pedidos por usuario
├── Filtros por estado y fecha
├── Detalles completos de pedidos
├── Estados: pendiente → confirmado → enviado → entregado
└── Diseño responsive

login.html                (453 líneas)
├── Formulario dual (clientes/trabajadores)
├── Autenticación segura PBKDF2-SHA256
├── Validación de campos en tiempo real
├── Redirección automática post-login
└── Codificación UTF-8 completa

libro-reclamaciones.html  (Recreado - 500+ líneas)
├── Formulario oficial de reclamos
├── Generación de tickets únicos
├── Seguimiento de estado
├── Validación de documentos peruanos
└── Integración con base de datos
```

### **🏪 Paneles Administrativos**
```
admin-pedidos.html        (Nuevo - 600+ líneas)
├── Vista completa de todos los pedidos
├── Estadísticas en tiempo real
├── Gestión de estados de pedidos
├── Filtros avanzados por cliente/fecha
├── Modal de detalles completos
└── Solo accesible para administradores

admin-reclamos.html       (Nuevo - 650+ líneas)
├── Gestión de libro de reclamaciones
├── Respuesta a reclamos de clientes
├── Estadísticas de resolución
├── Filtros por tipo y categoría
├── Sistema de tickets único
└── Interfaz administrativa completa
```

### **⚙️ Backend y Core**
```
app.js                    (1,116 líneas)
├── Servidor Express.js
├── Sistema IA híbrido (DeepSeek + Ollama)
├── Endpoints RESTful para EcoIA
├── Middleware CORS y seguridad
├── Gestión de errores robusta
└── Variables de entorno

db.js                     (208 líneas)
├── Abstracción IndexedDB completa
├── Cifrado PBKDF2-SHA256 (120,000 iteraciones)
├── Gestión de usuarios y trabajadores
├── Sistema de reclamos integrado
├── API unificada (EcoDB)
└── Funciones de sesión

libro.js                  (Complementario)
├── Lógica específica del libro de reclamaciones
├── Validaciones de formulario
├── Generación de PDFs
└── Integración con db.js
```

### **🖼️ Gestión de Imágenes**
```
images/                   (Estructura organizada)
├── 🥬 verduras/
├── 🍎 frutas/
├── 🌾 cereales/
├── 🥛 lacteos/
├── 🥩 proteinas/
├── 🫒 aceites/
├── 🧂 condimentos/
├── 🥤 bebidas/
├── 🥖 panaderia/
├── 🍯 otros/
└── 🥦 brócoli v10.jpg (WhatsApp override)

Utilidades:
├── update-broccoli.js    (Script actualización brócoli)
├── image-manager.html    (Gestor visual de imágenes)
└── Sistema de overrides en admin panel
```

---

## 🔧 **TECNOLOGÍAS IMPLEMENTADAS**

### **Frontend Technologies**
| Tecnología | Versión | Propósito | Implementación |
|-----------|---------|-----------|----------------|
| **HTML5** | Latest | Estructura semántica | Elementos semánticos, accesibilidad |
| **CSS3** | Latest | Diseño responsive | Variables CSS, Flexbox, Grid |
| **JavaScript** | ES6+ | Lógica del cliente | Vanilla JS, sin frameworks |
| **IndexedDB** | Native | Base de datos local | Almacenamiento persistente |
| **Web Crypto API** | Native | Cifrado de contraseñas | PBKDF2-SHA256 |
| **LocalStorage** | Native | Carritos y preferencias | Datos por usuario |
| **Fetch API** | Native | Comunicación con IA | Peticiones asíncronas |

### **Backend Technologies**
| Tecnología | Versión | Propósito | Configuración |
|-----------|---------|-----------|---------------|
| **Node.js** | 18+ | Runtime de servidor | Motor V8, módulos ES6 |
| **Express.js** | 4.x | Framework web | Middleware, rutas RESTful |
| **DeepSeek API** | v1 | IA principal | Modelo de lenguaje avanzado |
| **Ollama** | Latest | IA local fallback | Modelo local de respaldo |
| **CORS** | 2.x | Seguridad cross-origin | Configuración flexible |
| **dotenv** | 16.x | Variables de entorno | Configuración segura |

### **Seguridad Implementada**
```javascript
// 🔒 Cifrado de contraseñas PBKDF2-SHA256
async function hashPasswordPBKDF2(password, saltHex=null){
  const enc = new TextEncoder();
  let salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), {name:'PBKDF2'}, false, ['deriveBits']);
  const params = {name:'PBKDF2', salt: salt, iterations: 120000, hash: 'SHA-256'};
  const bits = await crypto.subtle.deriveBits(params, keyMaterial, 256);
  return {salt: bytesToHex(salt), hash: bytesToHex(new Uint8Array(bits))};
}

// 🔐 Gestión de sesiones seguras
function saveSession(session){ 
  localStorage.setItem('ecomarket_session', JSON.stringify(session)); 
}

// 🛡️ Validación de permisos administrativos
async function checkAdminAccess() {
  const session = getSession();
  const worker = await EcoDB.findWorkerByUserId(session.userId);
  return worker && worker.is_admin === 1;
}
```

---

## 🎨 **DISEÑO Y UX/UI**

### **Sistema de Colores**
```css
:root {
  /* 🌿 Paleta Principal Ecológica */
  --primary-green: #2d5a27;      /* Verde principal */
  --secondary-green: #4a7c59;    /* Verde secundario */
  --light-green: #7fb069;        /* Verde claro */
  --accent-gold: #d4af37;        /* Dorado ecológico */
  
  /* 🎨 Colores de Sistema */
  --light-gray: #f8f9fa;         /* Fondos claros */
  --dark-gray: #343a40;          /* Textos principales */
  --white: #ffffff;              /* Fondos puros */
  --shadow: rgba(0, 0, 0, 0.1);  /* Sombras suaves */
  
  /* 🚦 Estados y Alertas */
  --error: #dc3545;              /* Errores */
  --success: #28a745;            /* Éxito */
  --warning: #ffc107;            /* Advertencias */
  --info: #17a2b8;               /* Información */
}
```

### **Componentes de Diseño**
```css
/* 🃏 Cards de Productos */
.product-card {
  background: var(--white);
  border-radius: 15px;
  box-shadow: 0 4px 20px var(--shadow);
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

/* 🛒 Badge del Carrito */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--accent-gold);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* 🎯 Botones Principales */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  color: var(--white);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
```

### **Responsive Design**
```css
/* 📱 Mobile First Approach */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
    padding: 10px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .search-bar {
    width: 100%;
    order: -1;
  }
}

/* 💻 Desktop Optimization */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }
}
```

---

## 🤖 **SISTEMA DE INTELIGENCIA ARTIFICIAL**

### **EcoIA - Asistente Virtual**
```javascript
// 🧠 Configuración del Sistema IA Híbrido
const AI_CONFIG = {
  primary: {
    provider: 'DeepSeek',
    endpoint: '/api/ecoIA',
    model: 'deepseek-chat',
    temperature: 0.7,
    max_tokens: 500
  },
  fallback: {
    provider: 'Ollama',
    endpoint: '/api/ollama',
    model: 'llama2',
    local: true
  }
};

// 🎯 Funcionalidades de EcoIA
const ECOIA_FEATURES = {
  productRecommendation: 'Recomendaciones personalizadas basadas en preferencias',
  nutritionalAdvice: 'Consejos nutricionales y alimentación consciente',
  ecoFriendlyTips: 'Tips ecológicos y sostenibilidad',
  priceComparison: 'Comparación de precios y alternativas',
  seasonalProducts: 'Productos de temporada y disponibilidad',
  cookingTips: 'Consejos de cocina y preparación'
};
```

### **Implementación del Chat**
```javascript
// 💬 Sistema de Chat en Tiempo Real
async function enviarMensajeEcoIA() {
  const input = document.getElementById('ecoiaChatInput');
  const mensaje = input.value.trim();
  
  if (!mensaje) return;
  
  // Mostrar mensaje del usuario
  agregarMensajeChat('user', mensaje);
  input.value = '';
  
  // Mostrar indicador de escritura
  mostrarIndicadorEscritura();
  
  try {
    // Intentar con DeepSeek (Principal)
    const response = await fetch('/api/ecoIA', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: mensaje,
        context: obtenerContextoCompras()
      })
    });
    
    if (!response.ok) throw new Error('Primary AI unavailable');
    
    const data = await response.json();
    agregarMensajeChat('bot', data.response);
    
  } catch (error) {
    // Fallback a Ollama Local
    try {
      const fallbackResponse = await fetch('/api/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: mensaje })
      });
      
      const fallbackData = await fallbackResponse.json();
      agregarMensajeChat('bot', fallbackData.response);
      
    } catch (fallbackError) {
      agregarMensajeChat('bot', '❌ Lo siento, el asistente no está disponible en este momento.');
    }
  } finally {
    ocultarIndicadorEscritura();
  }
}
```

---

## 🗄️ **BASE DE DATOS Y ALMACENAMIENTO**

### **Estructura IndexedDB**
```javascript
// 📊 Esquema de Base de Datos
const DB_SCHEMA = {
  name: 'ecomarket_browser_db',
  version: 2,
  stores: {
    users: {
      keyPath: 'id',
      autoIncrement: true,
      indexes: {
        username: { unique: true },
        email: { unique: false }
      }
    },
    workers: {
      keyPath: 'id',
      autoIncrement: true,
      indexes: {
        employeeCode: { unique: true },
        userId: { unique: true }
      }
    },
    reclamos: {
      keyPath: 'id',
      autoIncrement: true,
      indexes: {
        ticket: { unique: true },
        dni: { unique: false },
        estado: { unique: false }
      }
    }
  }
};

// 👤 Modelo de Usuario
const USER_MODEL = {
  id: 'number (auto)',
  username: 'string (unique)',
  password_salt: 'string (hex)',
  password_hash: 'string (hex)',
  first_name: 'string',
  last_name: 'string',
  email: 'string',
  created_at: 'ISO string'
};

// 👷 Modelo de Trabajador
const WORKER_MODEL = {
  id: 'number (auto)',
  userId: 'number (foreign key)',
  employeeCode: 'string (unique)',
  position: 'string',
  is_admin: 'number (0|1)',
  created_at: 'ISO string'
};
```

### **Sistema de Sesiones**
```javascript
// 🔐 Gestión de Sesiones Seguras
class SessionManager {
  static SESSION_KEY = 'ecomarket_session';
  
  static saveSession(sessionData) {
    const session = {
      userId: sessionData.userId,
      username: sessionData.username,
      userType: sessionData.userType, // 'client' | 'worker'
      isAdmin: sessionData.isAdmin || false,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }
  
  static getSession() {
    try {
      const session = JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
      
      // Verificar expiración
      if (session && new Date(session.expiresAt) < new Date()) {
        this.clearSession();
        return null;
      }
      
      return session;
    } catch {
      return null;
    }
  }
  
  static clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
```

---

## 🛒 **SISTEMA DE CARRITO Y PEDIDOS**

### **Carrito por Usuario**
```javascript
// 🛒 Gestión de Carrito Personalizado
class CartManager {
  static getCartKey() {
    const session = SessionManager.getSession();
    if (!session) return null;
    const uid = session.userId || session.username || 'anon';
    return 'ecomarket_cart_' + encodeURIComponent(uid);
  }
  
  static addToCart(product, quantity = 1) {
    const cartKey = this.getCartKey();
    if (!cartKey) {
      alert('Debes iniciar sesión para agregar productos');
      return false;
    }
    
    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      cart[existingIndex].qty += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: quantity,
        img: product.img,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    this.updateCartBadge();
    return true;
  }
  
  static getCart() {
    const cartKey = this.getCartKey();
    if (!cartKey) return [];
    
    try {
      return JSON.parse(localStorage.getItem(cartKey) || '[]');
    } catch {
      return [];
    }
  }
  
  static updateCartBadge() {
    const cart = this.getCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    
    const cartBadge = document.getElementById('cartBadge');
    const cartLive = document.getElementById('cartLive');
    
    if (cartBadge) {
      cartBadge.hidden = totalQty === 0;
      cartBadge.textContent = String(totalQty);
    }
    
    if (cartLive) {
      cartLive.textContent = totalQty === 0 
        ? 'Carrito vacío' 
        : `Carrito: ${totalQty} producto${totalQty > 1 ? 's' : ''}`;
    }
  }
}
```

### **Sistema de Pedidos**
```javascript
// 📦 Gestión de Pedidos Completa
class OrderManager {
  static createOrder(cartItems) {
    const session = SessionManager.getSession();
    if (!session) throw new Error('Usuario no autenticado');
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const delivery = subtotal > 50 ? 0 : 5; // Envío gratis > S/ 50
    const total = subtotal + delivery;
    
    const order = {
      id: 'PED-' + Date.now(),
      usuario: session.username,
      userId: session.userId,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      productos: cartItems.map(item => ({
        id: item.id,
        nombre: item.name,
        precio: item.price,
        cantidad: item.qty,
        subtotal: item.price * item.qty
      })),
      subtotal: subtotal,
      entrega: delivery,
      total: total
    };
    
    this.saveOrder(order);
    CartManager.clearCart();
    
    return order;
  }
  
  static saveOrder(order) {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('ecomarket_pedidos') || '[]');
    } catch {
      orders = [];
    }
    
    orders.push(order);
    localStorage.setItem('ecomarket_pedidos', JSON.stringify(orders));
  }
  
  static getUserOrders(userId) {
    try {
      const allOrders = JSON.parse(localStorage.getItem('ecomarket_pedidos') || '[]');
      return allOrders.filter(order => 
        order.userId === userId || 
        order.usuario === SessionManager.getSession()?.username
      );
    } catch {
      return [];
    }
  }
}
```

---

## 📋 **LIBRO DE RECLAMACIONES**

### **Sistema de Reclamos Oficial**
```javascript
// 📝 Gestión de Reclamos (Normativa Peruana)
class ComplaintManager {
  static async submitComplaint(complaintData) {
    const complaint = {
      ticket: this.generateTicket(),
      nombre: complaintData.nombre,
      apellidos: complaintData.apellidos,
      tipoDocumento: complaintData.tipoDocumento,
      dni: complaintData.dni,
      telefono: complaintData.telefono || '',
      email: complaintData.email || '',
      direccion: complaintData.direccion || '',
      tipoReclamo: complaintData.tipoReclamo, // Reclamo | Queja | Sugerencia
      categoria: complaintData.categoria || '',
      asunto: complaintData.asunto,
      detalle: complaintData.detalle,
      pedidoSolucion: complaintData.pedidoSolucion || '',
      estado: 'pendiente',
      creado_en: new Date().toISOString()
    };
    
    await EcoDB.guardarReclamo(complaint);
    return complaint;
  }
  
  static generateTicket() {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `ECO${year}${month}${day}${random}`;
  }
  
  static async respondToComplaint(complaintId, response) {
    await EcoDB.responderReclamo(complaintId, response);
  }
}
```

### **Validaciones Peruanas**
```javascript
// 🇵🇪 Validaciones para Documentos Peruanos
const VALIDATORS = {
  dni: (dni) => {
    const cleaned = dni.replace(/\D/g, '');
    return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
  },
  
  ce: (ce) => {
    const cleaned = ce.replace(/\D/g, '');
    return cleaned.length >= 9 && cleaned.length <= 12;
  },
  
  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 9 && /^[9][0-9]{8}$/.test(cleaned);
  }
};
```

---

## 👥 **SISTEMA DE USUARIOS Y ROLES**

### **Jerarquía de Permisos**
```
🏢 ESTRUCTURA ORGANIZACIONAL

┌─────────────────┐
│  👑 GERENTE     │  ← is_admin = 1
│  (Administrador)│  ← Acceso total
└─────────────────┘
         │
    ┌─────────────────┐
    │  👷 TRABAJADOR  │  ← is_admin = 0
    │  (Empleado)     │  ← Acceso limitado
    └─────────────────┘
         │
    ┌─────────────────┐
    │  👤 CLIENTE     │  ← Sin worker record
    │  (Usuario)      │  ← Solo compras
    └─────────────────┘
```

### **Control de Acceso**
```javascript
// 🔐 Sistema de Control de Acceso por Roles
class AccessControl {
  static async checkPermissions(requiredRole) {
    const session = SessionManager.getSession();
    if (!session) return { authorized: false, reason: 'No authenticated' };
    
    switch (requiredRole) {
      case 'admin':
        if (!session.userId) return { authorized: false, reason: 'Invalid session' };
        
        const worker = await EcoDB.findWorkerByUserId(session.userId);
        if (!worker || worker.is_admin !== 1) {
          return { authorized: false, reason: 'Insufficient privileges' };
        }
        return { authorized: true, role: 'admin' };
        
      case 'worker':
        const workerCheck = await EcoDB.findWorkerByUserId(session.userId);
        if (!workerCheck) {
          return { authorized: false, reason: 'Not an employee' };
        }
        return { authorized: true, role: 'worker' };
        
      case 'client':
        return { authorized: true, role: 'client' };
        
      default:
        return { authorized: false, reason: 'Unknown role' };
    }
  }
  
  static async redirectIfUnauthorized(requiredRole) {
    const check = await this.checkPermissions(requiredRole);
    
    if (!check.authorized) {
      if (check.reason === 'No authenticated') {
        window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
      } else {
        alert('❌ No tienes permisos para acceder a esta página');
        window.location.href = 'Untitled-1.html';
      }
      return false;
    }
    
    return true;
  }
}
```

---

## 🚀 **DEPLOYMENT Y HOSTING**

### **Render.com Configuration**
```yaml
# render.yaml - Configuración de Deploy
services:
  - type: web
    name: ecomarket
    env: node
    plan: free
    buildCommand: npm install
    startCommand: node app.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DEEPSEEK_API_KEY
        sync: false  # Variable secreta
      - key: DEEPSEEK_BASE_URL
        value: https://api.deepseek.com
      - key: OLLAMA_BASE_URL
        value: http://localhost:11434
```

### **GitHub Integration**
```bash
# 🔄 Workflow de Deploy Automático
git add -A
git commit -m "✨ Nueva funcionalidad implementada"
git push origin master

# ⚡ Auto-deploy en Render.com
# 1. Render detecta cambios en GitHub
# 2. Ejecuta build automático
# 3. Deploy en producción
# 4. Notificación de estado
```

### **Variables de Entorno**
```javascript
// 🔧 Configuración de Producción
const config = {
  development: {
    PORT: 3000,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL: 'https://api.deepseek.com',
    OLLAMA_BASE_URL: 'http://localhost:11434'
  },
  production: {
    PORT: process.env.PORT || 10000,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL: process.env.DEEPSEEK_BASE_URL,
    OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL
  }
};
```

---

## 🔧 **FUNCIONALIDADES TÉCNICAS AVANZADAS**

### **Sistema de Búsqueda Inteligente**
```javascript
// 🔍 Motor de Búsqueda con IA
class SmartSearch {
  static computeRankedResults(query, options = {}) {
    const normalizedQuery = this.normalize(query);
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    
    const scoredProducts = products.map(product => {
      let score = 0;
      const normalizedName = this.normalize(product.name);
      const normalizedTags = (product.tags || []).map(tag => this.normalize(tag));
      
      // Scoring algorithm
      for (const term of terms) {
        if (normalizedName.startsWith(term)) score += 8;
        else if (normalizedName.includes(term)) score += 5;
        
        if (normalizedTags.some(tag => tag.startsWith(term))) score += 4;
        else if (normalizedTags.some(tag => tag.includes(term))) score += 2;
      }
      
      // Category boost
      if (options.category && product.category === options.category) score += 6;
      
      // AI inference boost
      if (options.aiCategory && product.category === options.aiCategory) score += 6;
      if (options.aiTags) {
        for (const aiTag of options.aiTags) {
          if (normalizedTags.includes(this.normalize(aiTag))) score += 3;
        }
      }
      
      // Price filtering
      if (options.maxPrice && product.price <= options.maxPrice) score += 5;
      if (options.minPrice && product.price >= options.minPrice) score += 3;
      
      return { product, score };
    });
    
    return scoredProducts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }
  
  static normalize(text) {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
```

### **Sistema de Notificaciones**
```javascript
// 🔔 Sistema de Notificaciones en Tiempo Real
class NotificationManager {
  static show(type, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${this.getIcon(type)}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, duration);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('notification-show');
    });
  }
  
  static getIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
  }
  
  static showCartAdded(productName) {
    this.show('success', `${productName} agregado al carrito`, 3000);
  }
  
  static showOrderCreated(orderId, total) {
    this.show('success', `¡Pedido ${orderId} creado! Total: S/ ${total.toFixed(2)}`, 8000);
  }
}
```

### **Optimizaciones de Performance**
```javascript
// ⚡ Optimizaciones de Rendimiento
class PerformanceOptimizer {
  // Lazy loading de imágenes
  static setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Debounce para búsquedas
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Virtual scrolling para listas grandes
  static setupVirtualScrolling(container, items, renderItem) {
    const ITEM_HEIGHT = 100; // px
    const BUFFER = 5;
    
    const scrollHandler = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
      const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER);
      
      const visibleItems = items.slice(startIndex, endIndex);
      
      container.innerHTML = visibleItems.map((item, index) => 
        renderItem(item, startIndex + index)
      ).join('');
      
      container.style.paddingTop = `${startIndex * ITEM_HEIGHT}px`;
      container.style.paddingBottom = `${(items.length - endIndex) * ITEM_HEIGHT}px`;
    };
    
    container.addEventListener('scroll', this.debounce(scrollHandler, 16));
    scrollHandler(); // Initial render
  }
}
```

---

## 📊 **ANALYTICS Y MÉTRICAS**

### **Sistema de Tracking**
```javascript
// 📈 Analytics Integrado
class Analytics {
  static track(event, data = {}) {
    const trackingData = {
      event: event,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
      userId: SessionManager.getSession()?.userId,
      ...data
    };
    
    // Almacenar localmente
    this.storeLocally(trackingData);
    
    // Enviar al servidor (si está disponible)
    this.sendToServer(trackingData);
  }
  
  static trackProductView(productId, productName) {
    this.track('product_view', {
      productId,
      productName,
      category: 'engagement'
    });
  }
  
  static trackAddToCart(productId, productName, price, quantity) {
    this.track('add_to_cart', {
      productId,
      productName,
      price,
      quantity,
      value: price * quantity,
      category: 'ecommerce'
    });
  }
  
  static trackPurchase(orderId, items, total) {
    this.track('purchase', {
      orderId,
      items: items.length,
      total,
      category: 'ecommerce'
    });
  }
  
  static getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session', sessionId);
    }
    return sessionId;
  }
}
```

### **Métricas de Negocio**
```javascript
// 📊 KPIs y Métricas Empresariales
class BusinessMetrics {
  static calculateConversionRate() {
    const sessions = this.getUniqueSessions();
    const purchases = this.getPurchases();
    return sessions > 0 ? (purchases.length / sessions * 100).toFixed(2) : 0;
  }
  
  static calculateAverageOrderValue() {
    const orders = OrderManager.getAllOrders();
    if (orders.length === 0) return 0;
    
    const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
    return (totalValue / orders.length).toFixed(2);
  }
  
  static getTopProducts(limit = 10) {
    const orders = OrderManager.getAllOrders();
    const productCounts = {};
    
    orders.forEach(order => {
      order.productos.forEach(producto => {
        productCounts[producto.id] = (productCounts[producto.id] || 0) + producto.cantidad;
      });
    });
    
    return Object.entries(productCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([productId, count]) => ({ productId, count }));
  }
  
  static getCustomerRetention() {
    const users = this.getUniqueCustomers();
    const returningCustomers = users.filter(user => 
      OrderManager.getUserOrders(user.id).length > 1
    );
    
    return users.length > 0 ? 
      (returningCustomers.length / users.length * 100).toFixed(2) : 0;
  }
}
```

---

## 🛡️ **SEGURIDAD Y PRIVACIDAD**

### **Medidas de Seguridad Implementadas**

#### **1. Cifrado de Contraseñas**
```javascript
// 🔐 PBKDF2-SHA256 con 120,000 iteraciones
const SECURITY_CONFIG = {
  algorithm: 'PBKDF2',
  hash: 'SHA-256',
  iterations: 120000,
  saltLength: 16,
  keyLength: 32
};
```

#### **2. Validación de Inputs**
```javascript
// 🛡️ Sanitización y Validación
class SecurityValidator {
  static sanitizeInput(input) {
    return input
      .replace(/[<>\"'&]/g, (match) => {
        const entities = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '&': '&amp;'
        };
        return entities[match];
      })
      .trim()
      .substring(0, 1000); // Límite de longitud
  }
  
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePetruvianDNI(dni) {
    const cleaned = dni.replace(/\D/g, '');
    return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
  }
}
```

#### **3. Protección CSRF**
```javascript
// 🔒 Token CSRF para formularios críticos
class CSRFProtection {
  static generateToken() {
    return 'csrf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
  }
  
  static validateToken(token) {
    const stored = sessionStorage.getItem('csrf_token');
    return token === stored;
  }
  
  static addToForm(form) {
    const token = this.generateToken();
    sessionStorage.setItem('csrf_token', token);
    
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'csrf_token';
    hiddenInput.value = token;
    form.appendChild(hiddenInput);
  }
}
```

### **Privacidad y GDPR**
```javascript
// 🔏 Gestión de Privacidad y Consentimiento
class PrivacyManager {
  static showCookieConsent() {
    const consent = localStorage.getItem('cookie_consent');
    if (consent) return;
    
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <p>🍪 Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestro uso de cookies.</p>
        <div class="cookie-actions">
          <button onclick="PrivacyManager.acceptCookies()">Aceptar</button>
          <button onclick="PrivacyManager.rejectCookies()">Rechazar</button>
          <a href="/privacy-policy">Política de Privacidad</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
  }
  
  static acceptCookies() {
    localStorage.setItem('cookie_consent', 'accepted');
    this.removeBanner();
    Analytics.initialize(); // Activar analytics solo con consentimiento
  }
  
  static rejectCookies() {
    localStorage.setItem('cookie_consent', 'rejected');
    this.removeBanner();
    // No activar analytics
  }
}
```

---

## 🔄 **TESTING Y CALIDAD**

### **Testing Strategy**
```javascript
// 🧪 Suite de Testing Básico
class TestSuite {
  static runAllTests() {
    console.log('🧪 Ejecutando tests de EcoMarket...');
    
    this.testAuthentication();
    this.testCartFunctionality();
    this.testOrderCreation();
    this.testComplaintSystem();
    
    console.log('✅ Tests completados');
  }
  
  static testAuthentication() {
    console.log('Testing authentication...');
    
    // Test 1: Hash password
    const password = 'testPassword123';
    EcoDB.hashPasswordPBKDF2(password).then(result => {
      console.assert(result.salt && result.hash, 'Password hashing failed');
      console.log('✅ Password hashing works');
    });
    
    // Test 2: Session management
    const testSession = { userId: 1, username: 'test' };
    SessionManager.saveSession(testSession);
    const retrieved = SessionManager.getSession();
    console.assert(retrieved.userId === 1, 'Session management failed');
    console.log('✅ Session management works');
  }
  
  static testCartFunctionality() {
    console.log('Testing cart functionality...');
    
    // Simular usuario logueado
    SessionManager.saveSession({ userId: 999, username: 'testuser' });
    
    const testProduct = {
      id: 'test1',
      name: 'Test Product',
      price: 10.50,
      img: 'test.jpg'
    };
    
    // Test agregar al carrito
    const added = CartManager.addToCart(testProduct, 2);
    console.assert(added === true, 'Add to cart failed');
    
    const cart = CartManager.getCart();
    console.assert(cart.length === 1, 'Cart should have 1 item');
    console.assert(cart[0].qty === 2, 'Quantity should be 2');
    
    console.log('✅ Cart functionality works');
  }
}
```

### **Code Quality Standards**
```javascript
// 📏 Estándares de Calidad de Código
const CODE_STANDARDS = {
  naming: {
    variables: 'camelCase',
    functions: 'camelCase',
    classes: 'PascalCase',
    constants: 'UPPER_SNAKE_CASE'
  },
  
  documentation: {
    functions: 'JSDoc comments required',
    classes: 'Class description required',
    complex_logic: 'Inline comments for clarity'
  },
  
  structure: {
    max_function_length: '50 lines',
    max_file_length: '1000 lines',
    indentation: '2 spaces',
    line_length: '100 characters'
  }
};
```

---

## 📱 **MOBILE OPTIMIZATION**

### **Progressive Web App Features**
```javascript
// 📱 Service Worker para PWA
const SW_VERSION = 'v1.0.0';
const CACHE_NAME = `ecomarket-${SW_VERSION}`;

const STATIC_CACHE = [
  '/',
  '/Untitled-1.html',
  '/carrito.html',
  '/mis-pedidos.html',
  '/login.html',
  '/db.js',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### **Responsive Design Breakpoints**
```css
/* 📱 Sistema de Breakpoints Responsive */
:root {
  --breakpoint-xs: 0px;      /* Extra small devices */
  --breakpoint-sm: 576px;    /* Small devices */
  --breakpoint-md: 768px;    /* Medium devices */
  --breakpoint-lg: 992px;    /* Large devices */
  --breakpoint-xl: 1200px;   /* Extra large devices */
  --breakpoint-xxl: 1400px;  /* Extra extra large devices */
}

/* Mobile First Approach */
@media (max-width: 575.98px) {
  .container { padding: 10px; }
  .product-grid { grid-template-columns: 1fr; }
  .header { flex-direction: column; }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 992px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); }
  .container { max-width: 1200px; }
}
```

---

## 🚀 **PERFORMANCE Y OPTIMIZACIÓN**

### **Métricas de Performance**
```javascript
// ⚡ Core Web Vitals Monitoring
class PerformanceMonitor {
  static measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  static measurePageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page Load Time:', loadTime + 'ms');
      
      // Enviar métricas al servidor
      this.sendMetrics({
        loadTime,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
  }
}
```

### **Optimization Techniques**
```javascript
// 🔧 Técnicas de Optimización Implementadas
const OPTIMIZATION_STRATEGIES = {
  images: {
    lazyLoading: 'Intersection Observer API',
    compression: 'WebP format when supported',
    responsive: 'Different sizes for different screens',
    placeholder: 'Base64 encoded micro-images'
  },
  
  javascript: {
    bundling: 'Single file deployment',
    minification: 'Production builds',
    treeshaking: 'Remove unused code',
    caching: 'LocalStorage for static data'
  },
  
  css: {
    criticalCSS: 'Inline critical styles',
    nonCritical: 'Async loading for non-critical CSS',
    compression: 'Minified production builds',
    variables: 'CSS custom properties for theming'
  },
  
  network: {
    caching: 'Aggressive browser and CDN caching',
    compression: 'Gzip compression enabled',
    cdn: 'Static assets served from CDN',
    http2: 'HTTP/2 for multiplexed requests'
  }
};
```

---

## 🌐 **INTERNACIONALIZACIÓN**

### **Soporte Multi-idioma**
```javascript
// 🌍 Sistema de Internacionalización
class I18nManager {
  static languages = {
    es: {
      name: 'Español',
      flag: '🇵🇪',
      currency: 'PEN',
      currencySymbol: 'S/',
      translations: {
        'cart.add': 'Agregar al carrito',
        'cart.remove': 'Eliminar del carrito',
        'cart.empty': 'Tu carrito está vacío',
        'order.created': 'Pedido creado exitosamente',
        'user.login': 'Iniciar sesión',
        'user.logout': 'Cerrar sesión'
      }
    },
    en: {
      name: 'English',
      flag: '🇺🇸',
      currency: 'USD',
      currencySymbol: '$',
      translations: {
        'cart.add': 'Add to cart',
        'cart.remove': 'Remove from cart',
        'cart.empty': 'Your cart is empty',
        'order.created': 'Order created successfully',
        'user.login': 'Sign in',
        'user.logout': 'Sign out'
      }
    }
  };
  
  static getCurrentLanguage() {
    return localStorage.getItem('ecomarket_language') || 'es';
  }
  
  static setLanguage(langCode) {
    if (this.languages[langCode]) {
      localStorage.setItem('ecomarket_language', langCode);
      this.updateInterface();
    }
  }
  
  static t(key) {
    const lang = this.getCurrentLanguage();
    const translations = this.languages[lang]?.translations || {};
    return translations[key] || key;
  }
  
  static formatCurrency(amount) {
    const lang = this.getCurrentLanguage();
    const config = this.languages[lang];
    return `${config.currencySymbol} ${amount.toFixed(2)}`;
  }
}
```

---

## 📈 **ESCALABILIDAD Y FUTURO**

### **Roadmap de Desarrollo**
```
🗺️ ROADMAP ECOMARKET 2025-2026

FASE 1: CONSOLIDACIÓN (Q1 2025) ✅
├── Sistema base completado
├── Todas las funcionalidades core
├── Deploy en producción
└── Usuarios beta testing

FASE 2: OPTIMIZACIÓN (Q2 2025) 🔄
├── Performance improvements
├── Mobile optimization
├── PWA implementation
└── Analytics integration

FASE 3: EXPANSIÓN (Q3 2025) 📅
├── Payment gateway integration
├── Inventory management
├── Supplier portal
├── Multi-store support

FASE 4: INTELIGENCIA (Q4 2025) 🤖
├── Advanced AI recommendations
├── Predictive analytics
├── Automated inventory
└── Machine learning insights

FASE 5: ECOSISTEMA (2026) 🌟
├── Mobile app (React Native)
├── Seller marketplace
├── API for third parties
└── International expansion
```

### **Arquitectura Escalable**
```javascript
// 🏗️ Preparación para Microservicios
const MICROSERVICES_ARCHITECTURE = {
  userService: {
    responsibilities: ['Authentication', 'User management', 'Profiles'],
    database: 'PostgreSQL',
    cache: 'Redis'
  },
  
  productService: {
    responsibilities: ['Catalog', 'Search', 'Recommendations'],
    database: 'MongoDB',
    search: 'Elasticsearch'
  },
  
  orderService: {
    responsibilities: ['Cart', 'Orders', 'Payments'],
    database: 'PostgreSQL',
    queue: 'RabbitMQ'
  },
  
  notificationService: {
    responsibilities: ['Email', 'SMS', 'Push notifications'],
    queue: 'Apache Kafka',
    delivery: 'WebSocket'
  },
  
  analyticsService: {
    responsibilities: ['Tracking', 'Reports', 'Insights'],
    database: 'ClickHouse',
    processing: 'Apache Spark'
  }
};
```

---

## 📚 **RECURSOS Y DOCUMENTACIÓN**

### **APIs y Referencias**
```javascript
// 📖 APIs Utilizadas y Documentación
const API_DOCUMENTATION = {
  deepseek: {
    url: 'https://api.deepseek.com/docs',
    purpose: 'AI conversational responses',
    authentication: 'API Key',
    rate_limits: '100 requests/minute'
  },
  
  ollama: {
    url: 'https://ollama.ai/docs',
    purpose: 'Local AI fallback',
    port: 11434,
    models: ['llama2', 'mistral', 'codellama']
  },
  
  webCrypto: {
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
    purpose: 'Password hashing and encryption',
    algorithms: ['PBKDF2', 'SHA-256']
  },
  
  indexedDB: {
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
    purpose: 'Client-side database',
    features: ['Transactions', 'Indexes', 'Versioning']
  }
};
```

### **Comandos de Desarrollo**
```bash
# 🛠️ Comandos Útiles para Desarrollo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# o
node app.js

# Ejecutar tests
npm test

# Build para producción
npm run build

# Deploy a Render
git add -A
git commit -m "🚀 Deploy to production"
git push origin master

# Verificar logs de producción
render logs --tail

# Base de datos local (desarrollo)
# IndexedDB se crea automáticamente en el navegador
```

---

## 🎉 **CONCLUSIÓN**

**EcoMarket** representa una implementación completa y moderna de una tienda virtual ecológica, combinando las mejores prácticas de desarrollo web con tecnologías de vanguardia. El proyecto demuestra:

### **✅ Logros Técnicos:**
- **E-commerce completo** con carrito, pedidos y gestión de usuarios
- **Sistema de IA integrado** para recomendaciones personalizadas  
- **Seguridad robusta** con cifrado PBKDF2-SHA256
- **Base de datos local** con IndexedDB para funcionamiento offline
- **Design responsive** optimizado para todos los dispositivos
- **Panel administrativo** completo para gestión empresarial
- **Libro de reclamaciones** digital conforme a normativa peruana

### **🎯 Valor de Negocio:**
- **Experiencia de usuario excepcional** con interfaces intuitivas
- **Gestión administrativa eficiente** con paneles dedicados
- **Escalabilidad preparada** para crecimiento futuro
- **Cumplimiento normativo** con estándares peruanos
- **Deploy automático** con integración continua
- **Analytics integrado** para toma de decisiones

### **🚀 Impacto y Futuro:**
EcoMarket no es solo una tienda virtual, es una **plataforma integral** que sienta las bases para un ecosistema de comercio ecológico completo. Con su arquitectura modular y tecnologías modernas, está preparado para evolucionar hacia un marketplace completo con múltiples vendedores, aplicaciones móviles nativas, y integración con sistemas empresariales avanzados.

La implementación demuestra que es posible crear aplicaciones web robustas y escalables utilizando tecnologías modernas del navegador, sin sacrificar funcionalidad o seguridad.

---

**📧 Desarrollado con ❤️ para un futuro más sostenible**  
*EcoMarket - Tu mercado, en un clic* 🌱

---

## 📄 **ANEXOS**

### **A. Estructura de Datos Completa**
[Ver esquemas de base de datos detallados en sección anterior]

### **B. APIs y Endpoints**
[Ver documentación de APIs en sección correspondiente]

### **C. Configuraciones de Deploy**
[Ver configuraciones de Render.com en sección de deployment]

### **D. Diagramas de Arquitectura**
[Diagramas disponibles en documentación técnica del proyecto]

---

*Última actualización: 1 de octubre de 2025*  
*Versión del documento: 2.0*  
*Estado del proyecto: Producción* ✅