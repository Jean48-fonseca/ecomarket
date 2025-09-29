// 🚨 PARCHE DE EMERGENCIA PARA ECOMARKET
// Este script fuerza la inicialización correcta de los productos

console.log('🚨 Aplicando parche de emergencia...');

// Esperar a que el DOM esté completamente listo
function emergencyFix() {
    console.log('🔧 Iniciando reparación de emergencia...');
    
    // Forzar la inicialización de las referencias DOM
    window.gridEl = document.getElementById('grid');
    window.countEl = document.getElementById('resultCount');
    
    if (!window.gridEl) {
        console.error('❌ No se encontró #grid');
        return;
    }
    
    if (!window.countEl) {
        console.error('❌ No se encontró #resultCount');
        return;
    }
    
    // Verificar que los productos existan
    if (typeof window.products === 'undefined' || !window.products.length) {
        console.error('❌ No se encontraron productos');
        return;
    }
    
    console.log('✅ Productos encontrados:', window.products.length);
    
    // Verificar que el template exista
    const template = document.getElementById('cardTmpl');
    if (!template) {
        console.error('❌ No se encontró el template #cardTmpl');
        return;
    }
    
    console.log('✅ Template encontrado');
    
    // Forzar el renderizado manual de productos
    try {
        console.log('🎨 Renderizando productos manualmente...');
        
        // Limpiar el grid
        window.gridEl.innerHTML = '';
        
        // Renderizar cada producto manualmente
        window.products.slice(0, 12).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            productCard.innerHTML = `
                <div class="thumb">
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}'">
                    <div class="pill">${product.category}</div>
                </div>
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">S/ ${product.price}</div>
                    <div class="unit">por ${product.unit}</div>
                    <div class="tags">
                        ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="addBtn" onclick="alert('Producto agregado: ${product.name}')">
                        Agregar
                    </button>
                </div>
            `;
            window.gridEl.appendChild(productCard);
        });
        
        // Actualizar contador
        window.countEl.textContent = `Mostrando ${Math.min(12, window.products.length)} productos de ${window.products.length}`;
        
        console.log('✅ ¡Productos renderizados exitosamente!');
        
    } catch (error) {
        console.error('❌ Error en renderizado manual:', error);
    }
}

// Ejecutar el fix cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', emergencyFix);
} else {
    setTimeout(emergencyFix, 1000);
}