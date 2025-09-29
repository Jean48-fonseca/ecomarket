# 🌱 EcoMarket - Tu Mercado Ecológico Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org/)

EcoMarket es una plataforma de comercio electrónico especializada en productos ecológicos y sostenibles, potenciada por **EcoIA**, un asistente inteligente basado en Hugging Face que ayuda a los usuarios a tomar decisiones de compra más conscientes y ecológicas.

## 🚀 Características Principales

### 🛒 **Frontend (EcoMarket)**
- ✅ Catálogo de productos ecológicos y orgánicos
- ✅ Sistema de búsqueda y filtrado inteligente
- ✅ Carrito de compras funcional
- ✅ Gestión de usuarios y empleados con IndexedDB
- ✅ Diseño responsive para móviles y desktop
- ✅ Sistema de reclamos integrado
- ✅ Interfaz moderna y accesible

### 🤖 **EcoIA (Asistente Inteligente)**
- ✅ Chat inteligente con Hugging Face API
- ✅ Recomendaciones personalizadas de productos
- ✅ Análisis de consultas en lenguaje natural
- ✅ Sistema de fallback para consultas offline
- ✅ Respuestas contextualizadas sobre ecología
- ✅ Interfaz de chat moderna y responsiva

### 🔧 **Backend (Node.js + Express)**
- ✅ API REST para EcoIA
- ✅ Integración con Hugging Face
- ✅ Sistema de CORS configurado
- ✅ Manejo de errores robusto
- ✅ Endpoint de salud del servidor
- ✅ Configuración por variables de entorno

## 📦 Instalación Rápida

### Opción 1: Instalación Automática (Recomendado)
```batch
# Ejecutar el instalador automático
INSTALAR-ECOIA.bat

# Configurar token de Hugging Face en .env
# Luego ejecutar todo el sistema
ECOMARKET-COMPLETO.bat
```

### Opción 2: Instalación Manual

#### Prerrequisitos
- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **Python 3.8+** - [Descargar aquí](https://python.org/)
- **Token de Hugging Face** - [Obtener aquí](https://huggingface.co/settings/tokens)

#### Pasos
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Jean48-fonseca/ecomarket.git
   cd ecomarket
   ```

2. **Instalar dependencias del backend**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env y agregar tu token de Hugging Face
   ```

4. **Iniciar el sistema**
   ```bash
   # Terminal 1: Backend EcoIA
   npm start
   
   # Terminal 2: Servidor web
   python -m http.server 8000
   ```

5. **Abrir en navegador**
   ```
   http://localhost:8000/Untitled-1.html
   ```

## 🎯 Uso del Sistema

### Ejecutar EcoMarket
- **Completo**: `ECOMARKET-COMPLETO.bat`
- **Solo frontend**: `INICIAR-ECOMARKET.bat`
- **Solo EcoIA**: `INICIAR-ECOIA.bat`
- **Sin servidor**: Abrir `SIN-SERVIDOR.html`

### Usar EcoIA
1. Abrir EcoMarket en el navegador
2. Hacer clic en el botón "🤖 EcoIA" (esquina inferior derecha)
3. Escribir preguntas como:
   - "¿Qué frutas son más ecológicas?"
   - "Recomiéndame verduras para ensalada"
   - "¿Cuál es el precio de las legumbres?"
   - "Productos orgánicos baratos"

### API de EcoIA
```javascript
// Consulta directa a la API
fetch('http://localhost:3000/ecoia', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pregunta: '¿Qué productos son más ecológicos?' })
})
.then(res => res.json())
.then(data => console.log(data.respuesta));
```

## 🔧 Configuración Avanzada

### Variables de Entorno (.env)
```env
# Token de Hugging Face (OBLIGATORIO para IA)
HUGGINGFACE_TOKEN=hf_tu_token_aqui

# Puerto del backend (opcional)
PORT=3000

# Entorno de desarrollo
NODE_ENV=development
```

### Modelos de IA Disponibles
El sistema está configurado para usar `microsoft/DialoGPT-medium`, but you can change it in `app.js`:

```javascript
const MODEL_URL = 'https://api-inference.huggingface.co/models/[MODEL_NAME]';
```

Modelos recomendados:
- `microsoft/DialoGPT-medium` (Por defecto)
- `microsoft/DialoGPT-large` (Mejor calidad)
- `facebook/blenderbot-400M-distill` (Más rápido)

## 📁 Estructura del Proyecto

```
ecomarket/
├── 🌐 Frontend
│   ├── Untitled-1.html          # Aplicación principal
│   ├── SIN-SERVIDOR.html        # Versión standalone
│   ├── FUNCIONAL.html           # Versión de prueba
│   ├── login.html               # Sistema de login
│   ├── db.js                    # Base de datos local
│   └── assets/                  # Recursos estáticos
├── 🤖 Backend EcoIA
│   ├── app.js                   # Servidor Express
│   ├── package.json             # Dependencias Node.js
│   ├── .env                     # Variables de entorno
│   └── .env.example             # Plantilla de configuración
├── 🛠️ Scripts de Automatización
│   ├── ECOMARKET-COMPLETO.bat   # Ejecutar todo el sistema
│   ├── INSTALAR-ECOIA.bat       # Instalador automático
│   ├── INICIAR-ECOIA.bat        # Solo backend
│   └── FUNCIONAL.bat            # Versión de prueba
├── 📋 Configuración
│   ├── .vscode/                 # Configuración VS Code
│   ├── .gitignore               # Archivos ignorados por Git
│   └── README.md                # Esta documentación
└── 📊 Utilidades
    ├── diagnostico.html         # Herramientas de debug
    ├── test-productos.html      # Pruebas de productos  
    └── emergency-fix.js         # Parches de emergencia
```

## 🧪 Testing y Desarrollo

### Endpoints de Prueba
- **Salud del servidor**: `GET http://localhost:3000/health`
- **Consulta EcoIA**: `POST http://localhost:3000/ecoia`
- **Lista productos**: `GET http://localhost:3000/productos`

### Logs y Debug
```bash
# Ver logs del backend
npm start

# Ver logs detallados
DEBUG=* npm start
```

### Versiones de Prueba
- `diagnostico.html` - Herramientas de diagnóstico
- `test-productos.html` - Pruebas de renderizado
- `SIN-SERVIDOR.html` - Versión que funciona sin backend

## 🌍 Despliegue en Producción

### Render.com (Recomendado)
1. Conectar repositorio de GitHub
2. Configurar variables de entorno:
   - `HUGGINGFACE_TOKEN=tu_token`
   - `NODE_ENV=production`
3. El frontend se sirve automáticamente desde Express

### Netlify + Backend Separado
1. **Frontend**: Subir carpeta completa a Netlify
2. **Backend**: Desplegar en Render/Heroku
3. **Configurar**: URLs de producción en `Untitled-1.html`

### Variables de Producción
```env
HUGGINGFACE_TOKEN=hf_production_token
PORT=8080
NODE_ENV=production
```

## 📚 Documentación de APIs

### EcoIA API

#### POST /ecoia
Consulta al asistente inteligente EcoIA.

**Request:**
```json
{
  "pregunta": "¿Qué productos son más ecológicos?"
}
```

**Response:**
```json
{
  "respuesta": "🌱 Te recomiendo nuestras verduras orgánicas como lechuga romana y tomates frescos. Son cultivados localmente sin pesticidas y tienen una huella de carbono mínima..."
}
```

#### GET /health
Estado del servidor y configuración.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-09-29T10:30:00.000Z",
  "service": "EcoIA Backend",
  "model": "Hugging Face DialoGPT"
}
```

## 🤝 Contribuir

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

### Áreas de Contribución
- 🤖 Mejoras en EcoIA (prompts, modelos)
- 🎨 Diseño UI/UX
- 📱 Funcionalidades móviles
- 🔧 Optimizaciones de rendimiento
- 📝 Documentación
- 🧪 Tests automatizados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙋‍♂️ Soporte

- **Issues**: [GitHub Issues](https://github.com/Jean48-fonseca/ecomarket/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jean48-fonseca/ecomarket/discussions)
- **Email**: jean48.fonseca@ejemplo.com

## 🏆 Créditos

- **Desarrollador Principal**: Jean Fonseca
- **IA Assistant**: GitHub Copilot
- **Modelo de IA**: Hugging Face DialoGPT
- **Framework**: Express.js + Vanilla JavaScript
- **Diseño**: Sistema propio responsive

---

⭐ **¡Si te gusta EcoMarket, dale una estrella en GitHub!** ⭐