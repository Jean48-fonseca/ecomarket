// 🥦 SCRIPT PARA ACTUALIZAR IMAGEN DE BRÓCOLI
// Copia este código y pégalo en la consola del navegador en tu EcoMarket

console.log('🔄 Actualizando imagen de brócoli...');

// Obtener overrides actuales
const currentOverrides = getImgOverrides();

// Agregar la nueva imagen de brócoli
const newOverrides = {
    ...currentOverrides,
    'v10': './images/verduras/v10.jpg'  // Brócoli fresco
};

// Aplicar los cambios
setImgOverrides(newOverrides);

console.log('✅ ¡Imagen de brócoli actualizada!');
console.log('📸 Nueva imagen: ./images/verduras/v10.jpg');
console.log('🔄 Recargando página para ver los cambios...');

// Recargar página para ver los cambios
setTimeout(() => {
    location.reload();
}, 1000);