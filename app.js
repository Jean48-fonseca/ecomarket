const express = require('express');
const cors = require('cors');
const path = require('path');

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
    deepseek: {
      model: 'deepseek-chat',
      api_key_configured: !!DEEPSEEK_API_KEY && DEEPSEEK_API_KEY.length > 0
    }
  };
  
  // Status code 200 para que Render sepa que está saludable
  res.status(200).json(healthData);
});

// ✅ ENDPOINT DE READY CHECK (para Render)
aplicacion.get('/ready', (req, res) => {
  const isReady = DEEPSEEK_API_KEY && DEEPSEEK_API_KEY.length > 0;
  
  if (isReady) {
    res.status(200).json({ 
      status: 'READY', 
      message: 'EcoIA está listo para atender consultas' 
    });
  } else {
    res.status(503).json({ 
      status: 'NOT_READY', 
      message: 'API Key de DeepSeek no configurado' 
    });
  }
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
    // 🚀 INTENTAR PRIMERO CON DEEPSEEK API
    let respuesta;
    let fuente = 'deepseek';
    
    try {
      respuesta = await consultaDeepSeek(pregunta);
      console.log('✅ DeepSeek respondió exitosamente');
    } catch (deepseekError) {
      console.log('⚠️ DeepSeek falló, usando base de conocimiento local:', deepseekError.message);
      respuesta = generarRespuestaFallback(pregunta);
      fuente = 'ecoia_chef_local';
    }
    
    // Detectar si la respuesta incluye productos para el carrito
    const productosParaCarrito = extraerProductosCarrito(respuesta);
    
    console.log('✅ EcoIA respondió (fuente: ' + fuente + '):', respuesta.substring(0, 100) + '...');
    
    // Respuesta completa con productos para carrito
    const respuestaCompleta = {
      respuesta: respuesta,
      productos_carrito: productosParaCarrito,
      tiene_receta: productosParaCarrito.length > 0,
      fuente: fuente,
      timestamp: new Date().toISOString()
    };
    
    res.json(respuestaCompleta);
    
  } catch (error) {
    console.error('❌ Error total en EcoIA:', error.message);
    
    // Si falla todo, respuesta básica de emergencia
    const respuestaEmergencia = '🌱 ¡Hola! Soy EcoIA. Pregúntame sobre recetas como sushi, ceviche, pasta, curry, tacos o ensaladas. ¡Te ayudo con productos ecológicos!';
    res.json({ respuesta: respuestaEmergencia, productos_carrito: [], tiene_receta: false, fuente: 'emergency' });
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

// ✅ ECOIA CHEF INTELIGENTE - BASE DE CONOCIMIENTO DE RECETAS
function generarRespuestaFallback(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  // 🍣 RECETAS INTERNACIONALES
  if (preguntaLower.includes('sushi')) {
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
  
  // 🐟 CEVICHE PERUANO VEGGIE
  if (preguntaLower.includes('ceviche')) {
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
  
  // 🥩 LOMO SALTADO VEGGIE
  if (preguntaLower.includes('lomo saltado') || preguntaLower.includes('lomo')) {
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
  
  // 🍝 PASTA ITALIANA
  if (preguntaLower.includes('pasta') || preguntaLower.includes('espagueti')) {
    return `� **Pasta Primavera Orgánica**

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
  
  // 🍛 CURRY DE VERDURAS
  if (preguntaLower.includes('curry')) {
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
  
  // 🥗 ENSALADAS
  if (preguntaLower.includes('ensalada') || preguntaLower.includes('verdura')) {
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
  
  // 🍓 SMOOTHIES
  if (preguntaLower.includes('smoothie') || preguntaLower.includes('batido') || preguntaLower.includes('fruta')) {
    return `� **Smoothie Energético Power**

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
  
  // 🌮 TACOS MEXICANOS
  if (preguntaLower.includes('taco') || preguntaLower.includes('mexicano')) {
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
  
  // 🍛 CAUSA LIMEÑA
  if (preguntaLower.includes('causa')) {
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
  
  // 🌾 RESPUESTA DEFAULT CON MENÚ
  return `🌱 **¡Hola! Soy EcoIA, tu chef ecológico personal!**

**Especialidades que puedo preparar:**
🍣 **Internacionales:** sushi, pasta, curry, tacos
🐟 **Peruanas:** ceviche, lomo saltado, causa
🥗 **Saludables:** ensaladas, smoothies, bowls

**¡Solo pregúntame!**
• "¿Cómo hago sushi vegetariano?"
• "Receta de ceviche de verduras"
• "Quiero curry de garbanzos"

💚 **¡Agregaré automáticamente los ingredientes a tu carrito!**

¿Qué te provoca cocinar hoy? 👨‍🍳✨`;
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

// ✅ INICIAR SERVIDOR
aplicacion.listen(puerto, () => {
  console.log('🚀 ========================================');
  console.log('🌱 ECOMARKET BACKEND INICIADO');
  console.log('🚀 ========================================');
  console.log(`✅ Servidor corriendo en puerto: ${puerto}`);
  console.log(`🌐 URL local: http://localhost:${puerto}`);
  console.log(`🤖 EcoIA endpoint: http://localhost:${puerto}/ecoia`);
  console.log(`❤️  Salud del servidor: http://localhost:${puerto}/health`);
  console.log('🚀 ========================================');
  
  // Verificar configuración
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY.length === 0) {
    console.log('⚠️  ADVERTENCIA: Configura tu API Key de DeepSeek');
    console.log('📝 Crea un archivo .env con: DEEPSEEK_API_KEY=tu_api_key');
    console.log('🌐 Obtén tu key en: https://platform.deepseek.com/api_keys');
  } else {
    console.log('✅ API Key de DeepSeek configurado');
  }
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

// ✅ INICIAR SERVIDOR
aplicacion.listen(puerto, () => {
  console.log('🚀 ========================================');
  console.log('✅ ECOMARKET BACKEND INICIADO');
  console.log('🤖 Sistema: EcoIA con DeepSeek API');
  console.log(`📡 Servidor corriendo en puerto: ${puerto}`);
  console.log(`🌐 URL local: http://localhost:${puerto}`);
  console.log(`🧠 Punto final de EcoIA: http://localhost:${puerto}/ecoia`);
  console.log(`❤️  Salud del servidor: http://localhost:${puerto}/health`);
  console.log('🚀 ========================================');
  
  // Verificar configuración
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY.length === 0) {
    console.log('⚠️  ADVERTENCIA: Configura tu API Key de DeepSeek');
    console.log('📝 Crea un archivo .env con: DEEPSEEK_API_KEY=tu_api_key');
    console.log('🌐 Obtén tu key en: https://platform.deepseek.com/api_keys');
  } else {
    console.log('✅ API Key de DeepSeek configurado');
  }
  
  console.log('🎉 Tu servicio está activo 🚀');
});
