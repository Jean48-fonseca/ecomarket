// 🔧 SCRIPT PARA ACTUALIZAR IMÁGENES LOCALES
// Copia este código y pégalo en la consola del navegador en tu EcoMarket

// Función para generar rutas locales
function localImg(category, id, extension = 'jpg') {
    return `./images/${category}/${id}.${extension}`;
}

// Mapeo de imágenes locales (actualiza según tus archivos)
const localImageMap = {
    // Verduras (v1-v12)
    'v1': localImg('verduras', 'v1'), // Lechuga Romana
    'v2': localImg('verduras', 'v2'), // Tomate
    'v3': localImg('verduras', 'v3'), // Zanahoria
    'v4': localImg('verduras', 'v4'), // Pepino
    'v5': localImg('verduras', 'v5'), // Pimiento Verde
    'v6': localImg('verduras', 'v6'), // Cebolla Morada
    'v7': localImg('verduras', 'v7'), // Ajo
    'v8': localImg('verduras', 'v8'), // Berenjena
    'v9': localImg('verduras', 'v9'), // Espárragos
    'v10': './images/verduras/v10.jpg', // Brócoli (IMAGEN REAL)
    'v11': localImg('verduras', 'v11'), // Cilantro
    'v12': localImg('verduras', 'v12'), // Papa Blanca
    
    // Frutas (f1-f7)
    'f1': localImg('frutas', 'f1'), // Manzana Roja
    'f2': localImg('frutas', 'f2'), // Plátano
    'f3': localImg('frutas', 'f3'), // Naranja
    'f4': localImg('frutas', 'f4'), // Fresa
    'f5': localImg('frutas', 'f5'), // Mango
    'f6': localImg('frutas', 'f6'), // Piña
    'f7': localImg('frutas', 'f7'), // Kiwis
    
    // Legumbres (l1-l5)
    'l1': localImg('legumbres', 'l1'), // Lentejas
    'l2': localImg('legumbres', 'l2'), // Garbanzos
    'l3': localImg('legumbres', 'l3'), // Frijoles Negros
    'l4': localImg('legumbres', 'l4'), // Soja
    'l5': localImg('legumbres', 'l5'), // Alubias Blancas
    
    // Cereales (c1-c5, o16)
    'c1': localImg('cereales', 'c1'), // Arroz Integral
    'c2': localImg('cereales', 'c2'), // Avena
    'c3': localImg('cereales', 'c3'), // Quinoa
    'c4': localImg('cereales', 'c4'), // Harina de Trigo
    'c5': localImg('cereales', 'c5'), // Semillas de Chía
    'o16': localImg('cereales', 'o16'), // Spaghetti
    
    // Carnes (m1-m6)
    'm1': localImg('carnes', 'm1'), // Pechuga de Pollo
    'm2': localImg('carnes', 'm2'), // Carne de Res
    'm3': localImg('carnes', 'm3'), // Carne de Cerdo
    'm4': localImg('carnes', 'm4'), // Filete de Pescado
    'm5': localImg('carnes', 'm5'), // Atún en Lata
    'm6': localImg('carnes', 'm6'), // Camarones
    
    // Embutidos (e1-e5)
    'e1': localImg('embutidos', 'e1'), // Jamón Cocido
    'e2': localImg('embutidos', 'e2'), // Chorizo
    'e3': localImg('embutidos', 'e3'), // Salchicha de Pavo
    'e4': localImg('embutidos', 'e4'), // Pavo Ahumado
    'e5': localImg('embutidos', 'e5'), // Salami
    
    // Especias (s1-s12)
    's1': localImg('especias', 's1'), // Sal de Mesa
    's2': localImg('especias', 's2'), // Pimienta Negra
    's3': localImg('especias', 's3'), // Comino Molido
    's4': localImg('especias', 's4'), // Orégano Seco
    's5': localImg('especias', 's5'), // Paprika
    's6': localImg('especias', 's6'), // Cúrcuma
    's7': localImg('especias', 's7'), // Hojas de Laurel
    's8': localImg('especias', 's8'), // Canela en Rama
    's9': localImg('especias', 's9'), // Romero Seco
    's10': localImg('especias', 's10'), // Tomillo Seco
    's11': localImg('especias', 's11'), // Curry en Polvo
    's12': localImg('especias', 's12'), // Pasta de Ají Amarillo
    
    // Otros (o1-o19)
    'o1': localImg('otros', 'o1'), // Huevos
    'o2': localImg('otros', 'o2'), // Leche Entera
    'o3': localImg('otros', 'o3'), // Aceite de Oliva
    'o4': localImg('otros', 'o4'), // Yogur Natural
    'o5': localImg('otros', 'o5'), // Miel Natural
    'o6': localImg('otros', 'o6'), // Café Molido
    'o7': localImg('otros', 'o7'), // Té Verde
    'o8': localImg('otros', 'o8'), // Queso Fresco
    'o9': localImg('otros', 'o9'), // Mantequilla
    'o10': localImg('otros', 'o10'), // Salsa de Soya
    'o11': localImg('otros', 'o11'), // Leche Evaporada
    'o12': localImg('otros', 'o12'), // Leche Condensada
    'o13': localImg('otros', 'o13'), // Crema de Leche
    'o14': localImg('otros', 'o14'), // Yogur Griego
    'o15': localImg('otros', 'o15'), // Queso Parmesano
    'o17': localImg('otros', 'o17'), // Azúcar Blanca
    'o18': localImg('otros', 'o18'), // Vinagre Blanco
    'o19': localImg('otros', 'o19')  // Galletas de Soda
};

// Aplicar imágenes locales
console.log('🔄 Actualizando imágenes a rutas locales...');
setImgOverrides(localImageMap);
console.log('✅ ¡Imágenes actualizadas! Recargando página...');
location.reload();