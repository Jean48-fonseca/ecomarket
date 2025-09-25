# EcoMarket - Tienda Ecológica

Una aplicación web completa para una tienda ecológica con funcionalidades de e-commerce, gestión de reclamos y asistente AI.

## 🚀 Características

- **Storefront completo**: Catálogo de productos con búsqueda y filtros
- **Carrito de compras**: Persistente por usuario con gestión de cantidades
- **Sistema de usuarios**: Login, registro y gestión de sesiones
- **Gestión de pedidos**: Panel administrativo para revisar pedidos
- **Libro de Reclamaciones**: Cumple normativa peruana (D.S. N° 001-2006-PCM)
- **EcoIA**: Asistente inteligente para sugerencias de productos y recetas
- **Panel administrativo**: Gestión de reclamos y pedidos
- **Exportación**: PDF y CSV para reportes

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Base de datos**: IndexedDB (navegador)
- **Almacenamiento**: localStorage para sesiones y configuración
- **Seguridad**: PBKDF2-SHA256 para contraseñas
- **PDF**: jsPDF para generación de reportes

## 📦 Instalación y Uso

### Opción 1: Live Server (Recomendado)
1. Instala la extensión "Live Server" en VS Code
2. Abre el proyecto en VS Code
3. Haz clic derecho en `Untitled-1.html` → "Open with Live Server"
4. Navega a `http://localhost:5500/Untitled-1.html`

### Opción 2: Servidor con Node.js
```bash
# Si tienes Node.js instalado
npx serve -l 5500
```

### Opción 3: Servidor Python
```bash
# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500
```

⚠️ **Importante**: La aplicación debe ejecutarse a través de un servidor HTTP (no `file://`) para que IndexedDB funcione correctamente.

## 🎯 Páginas principales

- `Untitled-1.html` - Página principal del storefront
- `login.html` - Login y registro de usuarios
- `carrito.html` - Carrito de compras
- `mis-pedidos.html` - Historial de pedidos del usuario
- `libro-reclamaciones.html` - Formulario de reclamos
- `admin-pedidos.html` - Panel administrativo de pedidos
- `admin-reclamos.html` - Panel administrativo de reclamos

## 👤 Usuarios de prueba

### Usuario regular
- Email: `cliente@test.com`
- Contraseña: `123456`

### Administrador/Gerente
- Email: `gerente@test.com` 
- Contraseña: `admin123`

## 🧪 Funcionalidades principales

### EcoIA - Asistente Inteligente
- Sugerencias de productos basadas en características
- Recetas con ingredientes detectables
- Ideas dinámicas de recetas
- Función "Agregar faltantes" al carrito

### Sistema de Reclamos
- Formulario conforme a normativa peruana
- Generación automática de tickets
- Exportación en PDF y CSV
- Panel de administración para respuestas
- Modal "Mis reclamos" para seguimiento

### Gestión de Productos
- Catálogo extenso (verduras, carnes, lácteos, especias, etc.)
- Sistema de imágenes con fallbacks
- Overrides configurables de imágenes
- Búsqueda y filtrado avanzado

## 🔧 Desarrollo

### Estructura de archivos
```
├── Untitled-1.html          # Página principal
├── login.html               # Autenticación
├── carrito.html            # Carrito de compras
├── mis-pedidos.html        # Pedidos del usuario
├── libro-reclamaciones.html # Formulario de reclamos
├── admin-pedidos.html      # Admin: gestión de pedidos
├── admin-reclamos.html     # Admin: gestión de reclamos
├── db.js                   # Facade de IndexedDB
├── libro.js               # Lógica del libro de reclamaciones
├── admin-pedidos.js       # Lógica admin pedidos
├── admin-reclamos.js      # Lógica admin reclamos
├── pedidos.js            # Lógica de pedidos del usuario
└── .vscode/              # Configuración VS Code
```

### Base de datos
La aplicación usa IndexedDB con las siguientes stores:
- `users`: Usuarios registrados
- `workers`: Empleados/administradores
- `reclamos`: Reclamos y respuestas

## 📱 Responsivo
La aplicación está optimizada para dispositivos móviles y desktop.

## 🤝 Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🌿 EcoMarket
*Comprometidos con un futuro sostenible*