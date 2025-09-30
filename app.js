const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

// ✅ CONFIGURACIÓN EXPRESS
const aplicacion = express();
const puerto = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// ✅ CONFIGURACIÓN DEEPSEEK API
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

// ✅ MIDDLEWARE OPTIMIZADO PARA RENDER
aplicacion.use(express.json({ limit: '10mb' }));

// CORS más específico para producción
const corsOptions = {
  origin: isProduction 
    ? ['https://your-render-app.onrender.com', 'https://ecomarket.onrender.com'] 
    : ['http://localhost:8000', 'http://127.0.0.1:8000'],
  credentials: true,
  optionsSuccessStatus: 200
};
aplicacion.use(cors(corsOptions));

// Servir archivos estáticos
aplicacion.use(express.static(path.join(__dirname), {
  maxAge: isProduction ? '1d' : '0'
}));

// Trust proxy para Render
aplicacion.set('trust proxy', 1);

// ✅ CONTEXTO ECOLÓGICO + CHEF PARA ECOIA
const CONTEXTO_ECOLOGICO = `
Eres EcoIA, chef ecológico experto y asistente inteligente de EcoMarket.

🛒 PRODUCTOS ECOMARKET (con ID para carrito):
🥬 Verduras: lechuga-romana(S/1.60), tomate(S/1.90), zanahoria(S/1.50), pepino(S/1.40), pimiento(S/2.20), cebolla(S/1.30)
🍎 Frutas: manzana(S/2.10), plátano(S/1.80), naranja(S/2.00), fresa(S/2.80), uva(S/2.50)
🫘 Legumbres: lentejas(S/2.40), garbanzos(S/2.60), frijoles-negros(S/2.40), quinoa(S/4.20)
🌾 Cereales: avena(S/2.60), arroz-integral(S/2.80), pasta(S/2.20)
🥛 Lácteos: leche(S/3.20), queso(S/4.50), yogurt(S/2.90)

🍽️ ESPECIALIDADES CULINARIAS:
✅ Recetas Peruanas: ceviche, ají de gallina, lomo saltado, causa, anticuchos, papa rellena, tacu tacu, arroz chaufa
✅ Recetas Internacionales: sushi, pasta italiana, curry indio, pad thai, tacos mexicanos, paella, ramen
✅ Recetas Saludables: ensaladas, smoothies, bowls, sopas nutritivas

🛒 FUNCIÓN AUTO-CARRITO:
- Cuando des una receta, SIEMPRE incluye: [AGREGAR AL CARRITO: producto1, producto2, producto3]
- Usa los ID exactos de productos de EcoMarket
- Calcula el costo total de ingredientes

📋 INSTRUCCIONES:
- Responde en español con emojis 🌱
- Incluye receta paso a paso
- Lista ingredientes con precios de EcoMarket
- Agrega automáticamente productos al carrito
- Menciona tips ecológicos
- Máximo 200 palabras por respuesta
- Sé creativo y amigable
`;

// ✅ RUTA PRINCIPAL
aplicacion.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Untitled-1.html'));
});

// ✅ RUTA DE SALUD DEL SERVIDOR (RENDER HEALTH CHECK)
aplicacion.get('/health', (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'EcoIA Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    },
    ecoia_chef: {
      status: 'ACTIVO',
      base_conocimiento: 'Local + Recetas',
      recetas: 15,
      productos_ecomarket: 12
    }
  };
  
  // Status code 200 para que Render sepa que está saludable
  res.status(200).json(healthData);
});

// ✅ ENDPOINT DE READY CHECK (para Render)
aplicacion.get('/ready', (req, res) => {
  // EcoIA SIEMPRE está listo con nuestra base de conocimiento
  res.status(200).json({ 
    status: 'READY', 
    message: 'EcoIA Chef está listo para atender consultas',
    modo: 'Base de conocimiento local',
    recetas_disponibles: ['sushi', 'ceviche', 'lomo saltado', 'pasta', 'curry', 'tacos', 'ensaladas']
  });
});

// ✅ ENDPOINT PARA AGREGAR PRODUCTOS AL CARRITO (desde EcoIA)
aplicacion.post('/ecoia/agregar-carrito', async (req, res) => {
  try {
    const { productos } = req.body;
    console.log('🛒 EcoIA agregando al carrito:', productos);
    
    // Simular agregado al carrito (aquí conectarías con tu sistema de carrito real)
    const productosAgregados = productos.map(producto => ({
      id: producto,
      agregado: true,
      timestamp: new Date().toISOString()
    }));
    
    res.json({ 
      success: true, 
      mensaje: `${productos.length} productos agregados al carrito`,
      productos: productosAgregados 
    });
    
  } catch (error) {
    console.error('❌ Error agregando al carrito:', error);
    res.status(500).json({ error: 'Error al agregar productos al carrito' });
  }
});

// ✅ ENDPOINT PRINCIPAL DE ECOIA
aplicacion.post('/ecoia', async (req, res) => {
  const { pregunta } = req.body;
  
  console.log('🤖 EcoIA recibió pregunta:', pregunta);
  
  if (!pregunta || pregunta.trim().length === 0) {
    return res.status(400).json({ 
      error: "Por favor, escribe tu pregunta sobre productos ecológicos." 
    });
  }

  try {
    // 🧠 USAR SIEMPRE NUESTRA BASE DE CONOCIMIENTO (MÁS CONFIABLE)
    console.log('🤖 Procesando pregunta con EcoIA Chef...');
    const respuesta = generarRespuestaFallback(pregunta);
    
    // Detectar si la respuesta incluye productos para el carrito
    const productosParaCarrito = extraerProductosCarrito(respuesta);
    
    console.log('✅ EcoIA Chef respondió:', respuesta.substring(0, 100) + '...');
    
    // Respuesta completa con productos para carrito
    const respuestaCompleta = {
      respuesta: respuesta,
      productos_carrito: productosParaCarrito,
      tiene_receta: productosParaCarrito.length > 0,
      fuente: 'ecoia_chef_local',
      timestamp: new Date().toISOString()
    };
    
    res.json(respuestaCompleta);
    
  } catch (error) {
    console.error('❌ Error en EcoIA:', error.message);
    
    // Respuesta básica de emergencia
    const respuestaEmergencia = '🌱 ¡Hola! Soy EcoIA, tu chef ecológico. Pregúntame sobre recetas como sushi, ceviche, pasta, curry, tacos o ensaladas. ¡Te ayudo con productos ecológicos y los agrego a tu carrito!';
    res.json({ 
      respuesta: respuestaEmergencia, 
      productos_carrito: [], 
      tiene_receta: false, 
      fuente: 'emergency',
      error: 'Modo de emergencia activo' 
    });
  }
});

// ✅ FUNCIÓN PARA CONSULTAR DEEPSEEK API
async function consultaDeepSeek(pregunta) {
  // Verificar API key
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY.length === 0) {
    console.error('❌ API Key de DeepSeek no configurado');
    throw new Error('API Key de DeepSeek no configurado');
  }

  console.log('🔍 Consultando DeepSeek API...');
  console.log('🔑 API Key presente:', DEEPSEEK_API_KEY ? 'SÍ (longitud: ' + DEEPSEEK_API_KEY.length + ')' : 'NO');

  try {
    // Timeout controller para evitar cuelgues en Render
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "EcoIA-DeepSeek/1.0"
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: "system",
            content: `${CONTEXTO_ECOLOGICO}

Instrucciones adicionales:
- Responde SIEMPRE en español
- Incluye emojis para hacer más atractiva la respuesta
- Si das una receta, incluye al final: [AGREGAR AL CARRITO: producto1, producto2, producto3]
- Usa nombres exactos de productos de EcoMarket
- Sé creativo y variado en tus respuestas
- Máximo 250 palabras`
          },
          {
            role: "user", 
            content: pregunta
          }
        ],
        temperature: 0.8,
        max_tokens: 400,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error HTTP de DeepSeek:', response.status, errorData);
      
      // Manejo específico de errores comunes
      if (response.status === 401) {
        throw new Error('API Key de DeepSeek inválido');
      } else if (response.status === 429) {
        throw new Error('Límite de solicitudes alcanzado');
      } else if (response.status === 500) {
        throw new Error('Error interno del servidor DeepSeek');
      }
      
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const datos = await response.json();
    console.log('🔄 Respuesta cruda de DeepSeek:', JSON.stringify(datos).substring(0, 200) + '...');

    // Procesar respuesta de DeepSeek
    if (datos.choices && datos.choices[0] && datos.choices[0].message) {
      const respuesta = datos.choices[0].message.content.trim();
      console.log('✅ DeepSeek respondió:', respuesta.substring(0, 100) + '...');
      return respuesta;
    } else {
      throw new Error('Formato de respuesta inesperado de DeepSeek');
    }

  } catch (error) {
    console.error('Error en consultaDeepSeek:', error);
    throw error;
  }
}

// ✅ FUNCIÓN PARA LIMPIAR RESPUESTA DE LA IA
function limpiarRespuestaIA(textoCompleto, preguntaOriginal) {
  let respuesta = textoCompleto;
  
  // Remover el prompt original si está incluido
  const indicadores = ['EcoIA:', 'Usuario:', CONTEXTO_ECOLOGICO];
  for (const indicador of indicadores) {
    if (respuesta.includes(indicador)) {
      const partes = respuesta.split(indicador);
      respuesta = partes[partes.length - 1];
    }
  }
  
  // Limpiar y formatear
  respuesta = respuesta
    .trim()
    .replace(/\n\n+/g, '\n\n') // Normalizar saltos de línea
    .replace(/^\n+/, '') // Remover saltos iniciales
    .substring(0, 300); // Limitar longitud
  
  // Si la respuesta está vacía o muy corta, usar fallback
  if (respuesta.length < 10) {
    return generarRespuestaFallback(preguntaOriginal);
  }
  
  return respuesta;
}

// 🧠 ECOIA CONVERSACIONAL INTELIGENTE - RESPONDE TODO
function generarRespuestaFallback(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  // 🔍 ANÁLISIS INTELIGENTE DE LA PREGUNTA
  const palabrasClaveEcologia = ['ecologico', 'organico', 'sostenible', 'sustentable', 'medio ambiente', 'planeta', 'verde', 'natural', 'bio'];
  const palabrasClaveAlimentacion = ['comer', 'dieta', 'nutricion', 'vitamina', 'proteina', 'fibra', 'caloria', 'peso', 'salud'];
  const palabrasClaveRecetas = ['receta', 'cocinar', 'preparar', 'ingrediente', 'plato'];
  const palabrasClaveCompras = ['precio', 'costo', 'comprar', 'carrito', 'producto', 'tienda'];
  
  // 🍣 RECETAS ESPECÍFICAS (mantener las existentes)
  if (preguntaLower.includes('sushi')) {
    return generarRecetaSushi();
  }
  
  // 🐟 RECETAS ESPECÍFICAS
  if (preguntaLower.includes('ceviche')) {
    return generarRecetaCeviche();
  }
  
  if (preguntaLower.includes('lomo saltado') || preguntaLower.includes('lomo')) {
    return generarRecetaLomoSaltado();
  }
  
  if (preguntaLower.includes('pasta') || preguntaLower.includes('espagueti')) {
    return generarRecetaPasta();
  }
  if (preguntaLower.includes('curry')) {
    return generarRecetaCurry();
  }
  if (preguntaLower.includes('ensalada') || preguntaLower.includes('verdura', 'verde')) {
    return generarRecetaEnsalada();
  }
  if (preguntaLower.includes('smoothie') || preguntaLower.includes('batido') || preguntaLower.includes('fruta')) {
    return generarRecetaSmoothie();
  }
  if (preguntaLower.includes('taco') || preguntaLower.includes('mexicano')) {
    return generarRecetaTacos();
  }
  if (preguntaLower.includes('causa')) {
    return generarRecetaCausa();
  }

  // � RESPUESTAS SOBRE ECOLOGÍA Y SOSTENIBILIDAD
  if (palabrasClaveEcologia.some(palabra => preguntaLower.includes(palabra))) {
    return responderSobreEcologia(pregunta);
  }

  // � RESPUESTAS SOBRE ALIMENTACIÓN Y NUTRICIÓN
  if (palabrasClaveAlimentacion.some(palabra => preguntaLower.includes(palabra))) {
    return responderSobreNutricion(pregunta);
  }

  // 🛒 RESPUESTAS SOBRE PRODUCTOS Y COMPRAS
  if (palabrasClaveCompras.some(palabra => preguntaLower.includes(palabra)) || preguntaLower.includes('ecomarket')) {
    return responderSobreProductos(pregunta);
  }

  // 🤖 CONVERSACIÓN GENERAL
  return responderConversacionGeneral(pregunta);
}

// 🍣 FUNCIONES DE RECETAS ESPECÍFICAS
function generarRecetaSushi() {
  return `🍣 **Sushi Vegetariano Ecológico**

**Ingredientes de EcoMarket:**
• Arroz integral - S/ 2.80/kg 🍚
• Pepinos frescos - S/ 1.40/kg 🥒  
• Zanahorias - S/ 1.50/kg 🥕

**Preparación:**
1. Cocina 1 taza de arroz con vinagre
2. Corta pepinos y zanahorias en bastones
3. Forma rollos con nori
4. ¡Disfruta tu sushi sostenible!

💰 **Costo:** S/ 6.00 aprox
🌱 **Tip:** Usa palillos reutilizables

[AGREGAR AL CARRITO: arroz-integral, pepino, zanahoria]`;
}

function generarRecetaCeviche() {
  return `🐟 **Ceviche de Verduras Peruano**

**Ingredientes de EcoMarket:**
• Tomates maduros - S/ 1.90/kg 🍅
• Cebollas rojas - S/ 1.30/kg 🧅
• Pepinos - S/ 1.40/kg 🥒

**Preparación:**
1. Corta tomates y pepinos en cubos
2. Juliana fina de cebolla  
3. Marina con limón 15 min
4. Sazona con sal y ají
5. ¡Ceviche veggie listo!

💰 **Costo:** S/ 5.00 aprox
🌱 **Plus:** Vitaminas + bajo en calorías

[AGREGAR AL CARRITO: tomate, cebolla, pepino]`;
}

function generarRecetaLomoSaltado() {
  return `🥩 **Lomo Saltado Vegetariano**

**Ingredientes de EcoMarket:**
• Tomates frescos - S/ 1.90/kg 🍅
• Cebollas - S/ 1.30/kg 🧅  
• Arroz integral - S/ 2.80/kg 🍚

**Preparación:**
1. Saltea cebolla y tomate
2. Agrega especias peruanas
3. Sirve con arroz integral
4. ¡Sabor criollo saludable!

💰 **Costo:** S/ 6.00 aprox
🌱 **Benefit:** Versión más sana del clásico

[AGREGAR AL CARRITO: tomate, cebolla, arroz-integral]`;
}

function generarRecetaPasta() {
  return `🍝 **Pasta Primavera Orgánica**

**Ingredientes de EcoMarket:**
• Tomates frescos - S/ 1.90/kg 🍅
• Zanahorias - S/ 1.50/kg 🥕
• Cebollas - S/ 1.30/kg 🧅

**Preparación:**
1. Saltea verduras en aceite de oliva
2. Cocina pasta al dente
3. Mezcla todo con amor
4. ¡Pasta italiana saludable!

💰 **Costo:** S/ 5.70 aprox
🌱 **Rico en:** Fibra + antioxidantes

[AGREGAR AL CARRITO: tomate, zanahoria, cebolla]`;
}

function generarRecetaCurry() {
  return `🍛 **Curry de Verduras Aromático**

**Ingredientes de EcoMarket:**
• Zanahorias - S/ 1.50/kg 🥕
• Garbanzos - S/ 2.60/kg 🫘
• Cebollas - S/ 1.30/kg 🧅
• Arroz integral - S/ 2.80/kg 🍚

**Preparación:**
1. Sofríe cebolla con curry
2. Agrega zanahorias y garbanzos
3. Cocina 20 min a fuego lento
4. Sirve con arroz
5. ¡Curry veggie explosivo!

💰 **Costo:** S/ 8.20 aprox
🌱 **Super proteína** vegetal completa

[AGREGAR AL CARRITO: zanahoria, garbanzos, cebolla, arroz-integral]`;
}

function generarRecetaEnsalada() {
  return `🥗 **Ensalada Rainbow Súper Nutritiva**

**Ingredientes de EcoMarket:**
• Lechuga romana - S/ 1.60/kg 🥬
• Tomates cherry - S/ 1.90/kg 🍅
• Zanahorias - S/ 1.50/kg 🥕
• Pepinos - S/ 1.40/kg 🥒

**Preparación:**
1. Lava y corta todo fresh
2. Mezcla colores en bowl
3. Aliña con limón y aceite
4. ¡Ensalada arcoíris lista!

💰 **Costo:** S/ 5.40 aprox
🌱 **Cargada de:** Vitaminas A, C, K + fibra

[AGREGAR AL CARRITO: lechuga-romana, tomate, zanahoria, pepino]`;
}

function generarRecetaSmoothie() {
  return `🍓 **Smoothie Energético Power**

**Ingredientes de EcoMarket:**
• Plátanos - S/ 1.80/kg 🍌
• Fresas - S/ 2.80/kg 🍓
• Manzanas - S/ 2.10/kg 🍎
• Yogurt natural - S/ 2.90/kg 🥛

**Preparación:**
1. Pela y corta frutas
2. Licúa con yogurt
3. Agrega hielo si quieres
4. ¡Smoothie power listo!

💰 **Costo:** S/ 7.60 aprox
🌱 **Energy boost:** Vitaminas + probióticos

[AGREGAR AL CARRITO: plátano, fresa, manzana, yogurt]`;
}

function generarRecetaTacos() {
  return `🌮 **Tacos Vegetarianos Mexicanos**

**Ingredientes de EcoMarket:**
• Frijoles negros - S/ 2.40/kg 🫘
• Tomates - S/ 1.90/kg 🍅
• Cebollas - S/ 1.30/kg 🧅
• Lechuga - S/ 1.60/kg 🥬

**Preparación:**
1. Cocina frijoles con comino
2. Pica vegetales frescos
3. Arma tacos con amor
4. ¡Fiesta mexicana veggie!

💰 **Costo:** S/ 6.20 aprox
🌱 **Alto en:** Proteína vegetal + fibra

[AGREGAR AL CARRITO: frijoles-negros, tomate, cebolla, lechuga-romana]`;
}

function generarRecetaCausa() {
  return `🍛 **Causa Limeña Vegetariana**

**Ingredientes de EcoMarket:**
• Tomates - S/ 1.90/kg 🍅
• Cebollas - S/ 1.30/kg 🧅
• Pepinos - S/ 1.40/kg 🥒

**Preparación:**
1. Prepara puré de papa amarilla
2. Mezcla verduras picaditas
3. Arma capas coloridas
4. ¡Causa limeña fresh!

💰 **Costo:** S/ 4.60 aprox
🌱 **Tradición** peruana + saludable

[AGREGAR AL CARRITO: tomate, cebolla, pepino]`;
}

// 🌱 FUNCIONES DE RESPUESTAS INTELIGENTES
function responderSobreEcologia(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  if (preguntaLower.includes('medio ambiente') || preguntaLower.includes('planeta')) {
    return `🌍 **Cuidar el planeta con pequeñas acciones diarias**

🌱 **Tips ecológicos:**
• Compra productos orgánicos locales
• Reduce el desperdicio de alimentos
• Usa bolsas reutilizables
• Consume frutas y verduras de temporada
• Evita envases plásticos

💚 **En EcoMarket encontrarás:**
Todos nuestros productos son certificados orgánicos y de comercio justo. ¡Cada compra es un voto por un planeta más verde!

¿Te interesa algún producto ecológico específico? 🌿`;
  }
  
  if (preguntaLower.includes('organico') || preguntaLower.includes('bio')) {
    return `🌿 **¿Por qué elegir productos orgánicos?**

✅ **Beneficios:**
• Sin pesticidas químicos
• Mayor contenido nutricional
• Mejor sabor natural
• Apoyas agricultura sostenible
• Proteges biodiversidad

🛒 **En EcoMarket tenemos:**
• Frutas y verduras orgánicas certificadas
• Legumbres sin transgénicos
• Cereales integrales naturales

¿Qué producto orgánico te gustaría conocer? 🥕`;
  }
  
  return `🌱 **¡Soy EcoIA, tu guía hacia una vida más sostenible!**

💚 **Puedo ayudarte con:**
• Consejos de vida ecológica
• Productos orgánicos certificados
• Alimentación sostenible
• Reducción de huella ambiental

¿Qué aspecto ecológico te interesa más? 🌍`;
}

function responderSobreNutricion(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  if (preguntaLower.includes('proteina') || preguntaLower.includes('proteinas')) {
    return `💪 **Proteínas vegetales en EcoMarket**

🫘 **Excelentes fuentes:**
• Lentejas - S/ 2.40/kg (18g proteína/100g)
• Garbanzos - S/ 2.60/kg (19g proteína/100g)
• Quinoa - S/ 4.20/kg (14g proteína/100g)
• Frijoles negros - S/ 2.40/kg (21g proteína/100g)

🌱 **Combinaciones perfectas:**
• Lentejas + arroz = proteína completa
• Garbanzos + quinoa = súper alimento

¿Te preparo una receta rica en proteínas? 🏋️‍♀️`;
  }
  
  if (preguntaLower.includes('vitamina') || preguntaLower.includes('antioxidante')) {
    return `🍎 **Vitaminas y antioxidantes en EcoMarket**

🌈 **Por colores:**
• **Rojos:** Tomates (licopeno), fresas (vitamina C)
• **Naranjas:** Zanahorias (betacaroteno), naranjas (vitamina C)
• **Verdes:** Lechuga (folato), manzanas (fibra)

💊 **Beneficios:**
• Fortalecen sistema inmune
• Protegen células del envejecimiento
• Mejoran energía y vitalidad

¿Quieres un smoothie cargado de vitaminas? 🥤`;
  }
  
  if (preguntaLower.includes('peso') || preguntaLower.includes('adelgazar') || preguntaLower.includes('dieta')) {
    return `⚖️ **Alimentación saludable para peso ideal**

🥗 **Alimentos EcoMarket ideales:**
• **Fibra:** Avena, lentejas, manzanas (te sacian más)
• **Bajas calorías:** Lechuga, pepino, tomate
• **Metabolismo:** Jengibre, té verde, limón

📊 **Tips nutricionales:**
• Desayuna frutas y avena
• Almuerza ensaladas coloridas  
• Cena ligero con verduras

¿Te preparo un menú semanal saludable? 📅`;
  }
  
  return `🍎 **¡Nutrición inteligente con EcoIA!**

🧠 **Puedo ayudarte con:**
• Información nutricional de productos
• Recetas balanceadas
• Combinaciones de alimentos
• Dietas específicas (vegana, mediterránea, etc.)

¿Sobre qué aspecto nutricional quieres aprender? 🥗`;
}

function responderSobreProductos(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  if (preguntaLower.includes('precio') || preguntaLower.includes('costo')) {
    return `💰 **Precios EcoMarket - Calidad orgánica accesible**

🥬 **Verduras frescas:**
• Lechuga romana - S/ 1.60/kg
• Tomate orgánico - S/ 1.90/kg  
• Zanahoria dulce - S/ 1.50/kg
• Pepino fresco - S/ 1.40/kg

🍎 **Frutas de temporada:**
• Manzana roja - S/ 2.10/kg
• Plátano orgánico - S/ 1.80/kg
• Naranja jugosa - S/ 2.00/kg

💡 **¡Tip de ahorro:** Compra combos para recetas y ahorras hasta 15%!

¿Te ayudo a calcular el costo de alguna receta? 🧮`;
  }
  
  if (preguntaLower.includes('carrito') || preguntaLower.includes('comprar')) {
    return `🛒 **¡Tu carrito inteligente EcoMarket!**

🤖 **Funciones automáticas:**
• Te sugiero los mejores productos
• Calculo costos totales
• Agrego ingredientes de recetas automáticamente
• Ofertas personalizadas según tus gustos

📱 **¿Cómo funciona?**
1. Me dices qué quieres cocinar
2. Te doy la receta completa
3. Agrego automáticamente al carrito
4. Listo para comprar

¿Qué receta quieres que agregue a tu carrito? 👨‍🍳`;
  }
  
  return `🛒 **¡Bienvenido a EcoMarket!**

🌟 **Nuestros productos estrella:**
• Verduras orgánicas certificadas
• Frutas frescas de temporada  
• Legumbres sin transgénicos
• Cereales integrales naturales
• Lácteos de granjas sostenibles

💚 **Todos con certificación ecológica**

¿Qué producto específico te interesa? 🥕`;
}

function responderConversacionGeneral(pregunta) {
  const respuestasVariadas = [
    `🌱 **¡Hola! Soy EcoIA, tu chef ecológico personal**

💚 **Puedo ayudarte con:**
• Recetas saludables y deliciosas
• Consejos de alimentación ecológica  
• Información nutricional
• Productos orgánicos EcoMarket

¿En qué puedo ayudarte hoy? ¡Pregúntame lo que quieras! 😊`,

    `👨‍🍳 **¡Qué gusto saludarte!**

🍽️ **Especialidades que domino:**
• Cocina peruana veggie (ceviche, lomo saltado, causa)
• Platos internacionales (sushi, pasta, curry, tacos)
• Alimentación nutritiva y sostenible

¿Tienes hambre de algo específico? ¡Solo dímelo! 🤤`,

    `🌿 **¡EcoIA a tu servicio!**

✨ **Hoy puedes preguntarme sobre:**
• "¿Cómo hacer sushi vegetariano?"
• "¿Qué receta rica en proteínas me recomiendas?"
• "¿Cuáles son los beneficios de los productos orgánicos?"
• "¿Me ayudas con una dieta balanceada?"

¡Soy tu asistente culinario 24/7! 🤖💚`,

    `🍎 **¡Hola, amante de la vida saludable!**

🎯 **Mi misión:** Ayudarte a comer rico, sano y sostenible

🧠 **Qué puedo hacer:**
• Crear recetas personalizadas
• Explicar beneficios nutricionales
• Recomendar productos EcoMarket
• Darte tips de vida ecológica

¿Por dónde empezamos? 🚀`
  ];
  
  // Seleccionar respuesta aleatoria para variedad
  return respuestasVariadas[Math.floor(Math.random() * respuestasVariadas.length)];
}

// ✅ ENDPOINT PARA OBTENER PRODUCTOS (BONUS)
aplicacion.get('/productos', (req, res) => {
  const productos = [
    {id:'v1', name:'Lechuga Romana', category:'verduras', price:1.6, unit:'pieza', ecologico: true},
    {id:'v2', name:'Tomate', category:'verduras', price:1.9, unit:'kg', ecologico: true},
    {id:'f1', name:'Manzana Roja', category:'frutas', price:2.3, unit:'kg', ecologico: true},
    {id:'l1', name:'Lentejas', category:'legumbres', price:2.6, unit:'kg', ecologico: true}
  ];
  res.json(productos);
});

// ✅ FUNCIÓN PARA EXTRAER PRODUCTOS DEL CARRITO
function extraerProductosCarrito(respuesta) {
  const productos = [];
  
  // Buscar patrón [AGREGAR AL CARRITO: producto1, producto2, producto3]
  const patronCarrito = /\[AGREGAR AL CARRITO:\s*([^\]]+)\]/i;
  const match = respuesta.match(patronCarrito);
  
  if (match) {
    // Extraer productos del texto
    const productosTexto = match[1];
    const productosArray = productosTexto.split(',').map(p => p.trim());
    
    // Mapear a productos reales de EcoMarket
    const mapaProductos = {
      'lechuga': 'lechuga-romana',
      'tomate': 'tomate', 
      'zanahoria': 'zanahoria',
      'pepino': 'pepino',
      'cebolla': 'cebolla',
      'manzana': 'manzana',
      'platano': 'plátano',
      'arroz': 'arroz-integral',
      'quinoa': 'quinoa',
      'lentejas': 'lentejas',
      'garbanzos': 'garbanzos',
      'avena': 'avena',
      'leche': 'leche',
      'queso': 'queso'
    };
    
    // Convertir a IDs válidos
    productosArray.forEach(producto => {
      const productoLimpio = producto.toLowerCase().replace(/[^a-záéíóúñ]/g, '');
      if (mapaProductos[productoLimpio]) {
        productos.push({
          id: mapaProductos[productoLimpio],
          nombre: producto,
          agregado: true
        });
      }
    });
  }
  
  return productos;
}

// ✅ INICIAR SERVIDOR (ÚNICA DECLARACIÓN)
aplicacion.listen(puerto, () => {
  console.log('🚀 ========================================');
  console.log('✅ ECOMARKET BACKEND INICIADO');
  console.log('🤖 Sistema: EcoIA Chef con DeepSeek API + Local Fallback');
  console.log(`📡 Servidor corriendo en puerto: ${puerto}`);
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL local: http://localhost:${puerto}`);
  console.log(`🧠 Endpoint EcoIA: http://localhost:${puerto}/ecoia`);
  console.log(`❤️  Health Check: http://localhost:${puerto}/health`);
  console.log('🚀 ========================================');
  
  // Verificar configuración
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY.length === 0) {
    console.log('⚠️  ADVERTENCIA: DeepSeek API Key no configurado');
    console.log('�️  EcoIA funcionará con base de conocimiento local');
    console.log('📝 Para DeepSeek: Configura DEEPSEEK_API_KEY en variables de entorno');
  } else {
    console.log(`✅ DeepSeek API Key configurado: ${DEEPSEEK_API_KEY.substring(0, 10)}...`);
  }
  
  console.log('🎉 ¡Servidor EcoMarket listo para recibir consultas! 🚀');
});
