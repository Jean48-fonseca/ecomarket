# 📖 GUÍA COMPLETA: TÉCNICAS Y CÓDIGOS DE ECOMARKET

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Descripción General**
EcoMarket es una tienda online inteligente que funciona completamente en el navegador, sin necesidad de servidor. Incluye:
- 🛒 Sistema de compras con carrito personalizado por usuario
- 🤖 Asistente de IA (EcoIA) que entiende lenguaje natural
- 👤 Sistema de usuarios con roles (cliente/administrador)
- 📱 Diseño responsive para todos los dispositivos
- 🔐 Seguridad con encriptación de contraseñas
- 📋 Sistema de reclamos y atención al cliente

### **Estructura de Archivos**
```
ecomarket/
├── Untitled-1.html      # Página principal (catálogo de productos)
├── login.html           # Sistema de autenticación
├── carrito.html         # Carrito de compras
├── libro-reclamaciones.html # Sistema de quejas/sugerencias
├── admin-reclamos.html  # Panel administrativo de reclamos
├── admin-pedidos.html   # Panel administrativo de pedidos
├── mis-pedidos.html     # Historial de pedidos del usuario
├── db.js               # Base de datos y lógica de seguridad
└── README.md           # Documentación del proyecto
```

---

## 🏷️ **ETIQUETAS HTML UTILIZADAS**

### **Estructura Básica**
```html
<!DOCTYPE html>        <!-- Declara HTML5 moderno -->
<html lang="es">       <!-- Idioma español para SEO -->
<head>                 <!-- Metadatos (no visibles) -->
<meta charset="UTF-8"> <!-- Soporte para ñ, tildes, etc. -->
<meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
<title>EcoMarket</title> <!-- Título en pestaña del navegador -->
</head>
<body>                 <!-- Contenido visible -->
```

**💡 Uso recomendado:**
- Siempre usar `lang="es"` para contenido en español
- `viewport` es obligatorio para responsive design
- `charset="UTF-8"` evita problemas con caracteres especiales

### **Etiquetas Semánticas**
```html
<header class="header">     <!-- Cabecera principal -->
<nav>                       <!-- Menú de navegación -->
<main class="container">    <!-- Contenido principal -->
<section class="ai-box">    <!-- Sección específica (EcoIA) -->
<article class="card">      <!-- Elemento independiente (producto) -->
<aside>                     <!-- Contenido lateral -->
<footer>                    <!-- Pie de página -->
```

**💡 Beneficios:**
- Mejor SEO (motores de búsqueda entienden la estructura)
- Accesibilidad mejorada para lectores de pantalla
- Código más limpio y mantenible

### **Formularios Interactivos**
```html
<form class="search-bar" role="search" action="#" method="get">
  <label class="sr-only" for="q">Buscar productos</label>
  <input id="q" name="q" type="search" placeholder="Buscar..." aria-label="Buscar productos">
  
  <select id="cat" name="categoria" aria-label="Filtrar por categoría">
    <option value="all">Todas las categorías</option>
    <option value="verduras">Verduras</option>
    <option value="frutas">Frutas</option>
  </select>
  
  <button type="submit" aria-label="Buscar">
    <svg viewBox="0 0 24 24" role="img" aria-label="Icono de lupa">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </button>
</form>
```

**💡 Características importantes:**
- `role="search"` indica función de búsqueda
- `aria-label` describe elementos para personas ciegas
- `sr-only` = texto invisible pero audible para lectores de pantalla

---

## 🎨 **CSS AVANZADO Y RESPONSIVE DESIGN**

### **Variables CSS (Custom Properties)**
```css
:root {
  /* Colores principales */
  --primary: #4ec8c2;        /* Verde principal */
  --accent: #fad961;         /* Amarillo de acento */
  --cardBg: #ffffff;         /* Fondo de tarjetas */
  --muted: #6c757d;          /* Texto secundario */
  --heroTextLight: #ffffff;  /* Texto sobre imágenes */
  
  /* Colores de estado */
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
  
  /* Tipografía */
  --font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --font-size-base: 16px;
  --font-size-large: 1.25rem;
  
  /* Espaciado */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

/* Uso de variables */
.header {
  background: var(--primary);
  color: var(--heroTextLight);
  padding: var(--spacing-md);
}

.btn {
  background: var(--primary);
  color: white;
  border: 1px solid var(--primary);
}

.btn:hover {
  background: var(--accent);
  border-color: var(--accent);
}
```

**💡 Ventajas:**
- Cambiar un color actualiza todo el sitio automáticamente
- Fácil crear temas claros/oscuros
- Mantenimiento simplificado

### **Media Queries Responsive**
```css
/* MOBILE FIRST APPROACH */

/* Base: Mobile (320px+) */
.grid {
  display: grid;
  grid-template-columns: 1fr;  /* 1 columna */
  gap: 10px;
  padding: 0 4px;
}

.header {
  flex-direction: column;      /* Elementos apilados */
  padding: 12px;
}

/* Mobile Large (481px+) */
@media (min-width: 481px) and (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columnas */
    gap: 12px;
  }
}

/* Tablet (641px+) */
@media (min-width: 641px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columnas */
    gap: 16px;
  }
  
  .header {
    flex-direction: row;       /* Elementos horizontales */
    padding: 16px 20px;
  }
}

/* Desktop (1025px+) */
@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);  /* 4 columnas */
    gap: 20px;
    padding: 0;
  }
  
  .container {
    max-width: 1200px;         /* Ancho máximo */
    margin: 0 auto;            /* Centrado */
  }
}
```

**💡 Strategy Mobile-First:**
1. Diseña primero para móvil (más restrictivo)
2. Añade complejidad para pantallas más grandes
3. Usa rangos específicos para control preciso

---

## 🧠 **JAVASCRIPT MODERNO**

### **Selección y Manipulación del DOM**
```javascript
// Selección moderna
const gridEl = document.getElementById('grid');           // Más rápido para IDs
const allCards = document.querySelectorAll('.card');     // Todos los elementos
const firstBtn = document.querySelector('.btn');         // Primer elemento

// Manipulación eficiente
gridEl.innerHTML = '';  // Limpiar contenido

// Crear elementos
const card = document.createElement('article');
card.className = 'card';
card.innerHTML = `
  <div class="content">
    <h3>${productName}</h3>
    <p>${productPrice}</p>
  </div>
`;

// Template reutilizable (mejor rendimiento)
const template = document.getElementById('cardTmpl');
const clone = template.content.cloneNode(true);
clone.querySelector('.name').textContent = product.name;
clone.querySelector('.price').textContent = formatPrice(product.price);
gridEl.appendChild(clone);
```

### **Event Listeners Modernos**
```javascript
// Eventos básicos
button.addEventListener('click', handleClick);
input.addEventListener('input', handleInput);

// Eventos con parámetros
button.addEventListener('click', (e) => {
  e.preventDefault();
  addToCart(productId);
});

// Delegación de eventos (eficiente para muchos elementos)
gridEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('addBtn')) {
    const productId = e.target.dataset.productId;
    addToCart(productId);
  }
});

// Eventos de teclado para accesibilidad
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleAction();
  }
});

// Debounced events (para búsquedas)
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener('input', debouncedSearch);
```

### **Funciones Útiles y Reutilizables**
```javascript
// Debounce (evita ejecutar función muy seguido)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Normalización de texto (para búsquedas)
const normalize = (text = '') =>
  text.toLowerCase()
      .normalize('NFD')                    // Descompone caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '')     // Quita tildes y acentos
      .trim();

// Escape HTML (previene XSS)
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Formateo de precios
const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

// Capitalización
const capitalize = (text) => text ? text[0].toUpperCase() + text.slice(1) : text;

// Validación de email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Generar ID único
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
```

---

## 🔐 **SEGURIDAD FRONTEND**

### **Hashing de Contraseñas (PBKDF2)**
```javascript
// Generar hash seguro de contraseña
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  
  // Importar la contraseña como material de clave
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derivar bits usando PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 120000,    // Alto número de iteraciones = más seguro
      hash: 'SHA-256'
    },
    keyMaterial,
    256  // 256 bits de salida
  );
  
  // Convertir a hexadecimal
  return Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generar salt único
function generateSalt() {
  return crypto.getRandomValues(new Uint8Array(16))
    .reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
}

// Verificar contraseña
async function verifyPassword(password, hash, salt) {
  const computedHash = await hashPassword(password, salt);
  return computedHash === hash;
}
```

---

## 🤖 **SISTEMA DE INTELIGENCIA ARTIFICIAL (EcoIA)**

### **Procesamiento de Lenguaje Natural**
```javascript
// Sinónimos para categorías
const categorySynonyms = new Map([
  ['verduras', ['verdura', 'hortaliza', 'hortalizas', 'vegetales', 'vegetal']],
  ['legumbres', ['legumbre', 'frijol', 'frijoles', 'garbanzo', 'lenteja']],
  ['frutas', ['fruta', 'frutal', 'frutales']],
  ['embutidos', ['embutido', 'fiambre', 'jamón', 'chorizo', 'enbutidos']],
  ['carnes', ['carne', 'pollo', 'res', 'pescado', 'atún', 'filete']],
  ['especias', ['especia', 'condimento', 'hierbas', 'sazón']]
]);

// Sinónimos para características
const tagSynonyms = new Map([
  ['oferta', ['oferta', 'promo', 'descuento', 'barato', 'económico']],
  ['orgánico', ['orgánico', 'ecológico', 'eco', 'bio', 'natural']],
  ['sin-gluten', ['sin gluten', 'gluten free', 'celíaco']],
  ['premium', ['premium', 'gourmet', 'de lujo', 'alta calidad']],
  ['light', ['light', 'ligero', 'bajo en grasa', 'dietético']]
]);
```

### **Ejemplos de Funcionamiento de EcoIA**

| Input del Usuario | EcoIA Detecta | Resultado |
|-------------------|---------------|-----------|
| "fruta barata para jugo" | Categoría: frutas<br>Tag: oferta, jugo<br>Precio: ≤ S/3.00 | Naranjas, manzanas, etc. ordenadas por precio |
| "verduras para ensalada" | Categoría: verduras<br>Tag: ensalada | Lechuga, tomate, pepino, etc. |
| "menos de 3 soles" | Precio máximo: S/3.00 | Todos los productos ≤ S/3.00 |
| "ají de gallina" | Receta: Ají de Gallina | Lista de ingredientes + receta |

---

## 📱 **OPTIMIZACIÓN Y RENDIMIENTO**

### **Lazy Loading de Imágenes**
```javascript
// Intersection Observer para lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Cargar imagen real
      const realSrc = img.dataset.src;
      if (realSrc) {
        img.src = realSrc;
        img.removeAttribute('data-src');
      }
      
      // Dejar de observar esta imagen
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px' // Cargar 50px antes de ser visible
});

// HTML para lazy loading
// <img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="Producto">
```

---

## 📚 **CÓMO USAR ESTA GUÍA EN FUTUROS PROYECTOS**

### **Estructura Base de HTML**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto</title>
  
  <!-- Variables CSS -->
  <style>
    :root {
      --primary: #your-primary-color;
      --secondary: #your-secondary-color;
      /* Más variables... */
    }
  </style>
</head>
<body>
  <!-- Estructura semántica -->
  <header><!-- Navegación --></header>
  <main><!-- Contenido principal --></main>
  <footer><!-- Pie de página --></footer>
  
  <!-- Scripts al final -->
  <script src="js/utils.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

### **JavaScript Starter Kit**
```javascript
// Utilidades básicas
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};

const formatPrice = (price) => `$${price.toFixed(2)}`;

// Estado global
const state = {
  user: null,
  items: [],
  filters: {}
};

// Event listeners
document.addEventListener('DOMContentLoaded', init);

function init() {
  setupEventListeners();
  loadInitialData();
}
```

### **Checklist de Desarrollo**

**Antes de empezar:**
- [ ] Definir variables CSS para colores y espaciado
- [ ] Crear estructura HTML semántica
- [ ] Configurar meta tags para SEO y responsive

**Durante el desarrollo:**
- [ ] Usar mobile-first approach
- [ ] Implementar lazy loading para imágenes
- [ ] Añadir aria-labels para accesibilidad
- [ ] Debounce funciones que se ejecutan frecuentemente
- [ ] Validar y sanitizar inputs del usuario

**Antes de publicar:**
- [ ] Probar en diferentes dispositivos y navegadores
- [ ] Verificar accesibilidad con lectores de pantalla
- [ ] Optimizar imágenes y assets
- [ ] Minificar CSS y JavaScript
- [ ] Configurar HTTPS y headers de seguridad

---

## 🎉 **CONCLUSIÓN**

Esta guía contiene todas las técnicas modernas utilizadas en EcoMarket:

✅ **HTML semántico** con accesibilidad completa  
✅ **CSS moderno** con variables, Grid, Flexbox y responsive design  
✅ **JavaScript avanzado** con ES6+, módulos y patrones de diseño  
✅ **Seguridad** con hashing PBKDF2 y sanitización  
✅ **IA/ML** con procesamiento de lenguaje natural  
✅ **Optimización** con lazy loading, debouncing y caching  
✅ **Testing** con funciones de prueba automatizadas  

**¡Con estas técnicas puedes crear aplicaciones web modernas, seguras y escalables!** 🚀

---

*Creado por: EcoMarket Development Team*  
*Fecha: Septiembre 2025*  
*Versión: 1.0*