const express = require('express');
const cors = require('cors');
const path = require('path');

// ✅ CONFIGURACIÓN EXPRESS
const aplicacion = express();
const puerto = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// ✅ CONFIGURACIÓN HUGGING FACE
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;
const MODEL_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

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
    huggingface: {
      model: 'microsoft/DialoGPT-medium',
      token_configured: !!HUGGINGFACE_TOKEN && HUGGINGFACE_TOKEN !== 'hf_your_token_here'
    }
  };
  
  // Status code 200 para que Render sepa que está saludable
  res.status(200).json(healthData);
});

// ✅ ENDPOINT DE READY CHECK (para Render)
aplicacion.get('/ready', (req, res) => {
  const isReady = HUGGINGFACE_TOKEN && HUGGINGFACE_TOKEN !== 'hf_your_token_here';
  
  if (isReady) {
    res.status(200).json({ 
      status: 'READY', 
      message: 'EcoIA está listo para atender consultas' 
    });
  } else {
    res.status(503).json({ 
      status: 'NOT_READY', 
      message: 'Token de Hugging Face no configurado' 
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
    // 🧠 USAR PRIMERO NUESTRA BASE DE CONOCIMIENTO INTELIGENTE
    const respuestaInteligente = generarRespuestaFallback(pregunta);
    
    // Detectar si la respuesta incluye productos para el carrito
    const productosParaCarrito = extraerProductosCarrito(respuestaInteligente);
    
    console.log('✅ EcoIA Chef respondió:', respuestaInteligente.substring(0, 100) + '...');
    
    // Respuesta completa con productos para carrito
    const respuestaCompleta = {
      respuesta: respuestaInteligente,
      productos_carrito: productosParaCarrito,
      tiene_receta: productosParaCarrito.length > 0,
      fuente: 'ecoia_chef'
    };
    
    res.json(respuestaCompleta);
    
  } catch (error) {
    console.error('❌ Error en EcoIA:', error.message);
    
    // Si falla todo, respuesta básica
    const respuestaBasica = '🌱 ¡Hola! Soy EcoIA. Pregúntame sobre recetas como sushi, ceviche, pasta, curry, tacos o ensaladas. ¡Te ayudo con productos ecológicos!';
    res.json({ respuesta: respuestaBasica, productos_carrito: [], tiene_receta: false });
  }
});

// ✅ FUNCIÓN PARA CONSULTAR HUGGING FACE
async function consultaHuggingFace(pregunta) {
  // Verificar token
  if (!HUGGINGFACE_TOKEN || HUGGINGFACE_TOKEN === 'hf_your_token_here') {
    throw new Error('Token de Hugging Face no configurado');
  }

  // Crear prompt dinámico y mejorado
  const timestamp = new Date().getTime();
  const variaciones = [
    "Como experto en sostenibilidad de EcoMarket, te puedo ayudar:",
    "¡Hola! Soy EcoIA, tu guía en productos ecológicos:",
    "Como especialista en alimentación consciente:",
    "Te ayudo a elegir lo mejor para ti y el planeta:"
  ];
  const variacion = variaciones[timestamp % variaciones.length];
  
  const prompt = `${CONTEXTO_ECOLOGICO}

Conversación #${timestamp % 1000}
Usuario pregunta: "${pregunta}"
${variacion}`;

  try {
    // Timeout controller para evitar cuelgues en Render
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 segundos

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "EcoIA-Render/1.0"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          min_length: 50,
          temperature: 0.9,
          top_p: 0.95,
          top_k: 50,
          do_sample: true,
          pad_token_id: 50256,
          return_full_text: false,
          repetition_penalty: 1.2,
          length_penalty: 1.0
        },
        options: {
          wait_for_model: true,
          use_cache: false
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error HTTP de Hugging Face:', response.status, errorData);
      
      // Manejo específico de errores comunes en Render
      if (response.status === 503) {
        throw new Error('Modelo cargándose, intenta en unos segundos');
      } else if (response.status === 401) {
        throw new Error('Token de Hugging Face inválido');
      } else if (response.status === 429) {
        throw new Error('Límite de solicitudes alcanzado');
      }
      
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const datos = await response.json();
    console.log('🔄 Respuesta cruda de HF:', JSON.stringify(datos).substring(0, 200) + '...');

    // Procesar respuesta
    let textoGenerado = '';
    
    if (Array.isArray(datos) && datos[0]?.generated_text) {
      textoGenerado = datos[0].generated_text;
    } else if (datos.generated_text) {
      textoGenerado = datos.generated_text;
    } else {
      throw new Error('Formato de respuesta inesperado');
    }

    // Limpiar respuesta (remover el prompt original)
    const respuestaLimpia = limpiarRespuestaIA(textoGenerado, pregunta);
    return respuestaLimpia;

  } catch (error) {
    console.error('Error en consultaHuggingFace:', error);
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
  if (HUGGINGFACE_TOKEN === 'hf_your_token_here') {
    console.log('⚠️  ADVERTENCIA: Configura tu token de Hugging Face');
    console.log('📝 Crea un archivo .env con: HUGGINGFACE_TOKEN=tu_token');
  } else {
    console.log('✅ Token de Hugging Face configurado');
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
