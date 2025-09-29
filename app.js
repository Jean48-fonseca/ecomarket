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

// ✅ CONTEXTO ECOLÓGICO MEJORADO PARA ECOIA
const CONTEXTO_ECOLOGICO = `
Eres EcoIA, un asistente experto en sostenibilidad y productos ecológicos para EcoMarket.

PRODUCTOS DISPONIBLES:
🥬 Verduras: Lechuga romana, tomates frescos, zanahorias, pepinos, pimientos verdes, cebollas
🍎 Frutas: Manzanas rojas, plátanos maduros, naranjas jugosas, fresas dulces, uvas frescas  
🫘 Legumbres: Lentejas orgánicas, garbanzos, frijoles negros, quinoa
🌾 Cereales: Avena integral, arroz integral, pasta de trigo
🥛 Lácteos: Leche orgánica, quesos naturales, yogurt probiótico

ESPECIALIDADES:
- Todos nuestros productos son 100% orgánicos y de origen local
- Precios justos desde S/1.40 hasta S/2.80
- Empaques biodegradables y eco-amigables
- Certificación de comercio justo

INSTRUCCIONES:
- Responde SIEMPRE en español con emojis 🌱
- Sé creativo y varía tus respuestas  
- Incluye beneficios nutricionales específicos
- Menciona precios cuando sea relevante
- Máximo 120 palabras por respuesta
- Usa un tono amigable y experto
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
    // Intentar con Hugging Face primero
    const respuesta = await consultaHuggingFace(pregunta);
    
    console.log('✅ EcoIA respondió:', respuesta.substring(0, 100) + '...');
    res.json({ respuesta });
    
  } catch (error) {
    console.error('❌ Error en EcoIA:', error.message);
    
    // Fallback a respuestas predefinidas si Hugging Face falla
    const respuestaFallback = generarRespuestaFallback(pregunta);
    res.json({ respuesta: respuestaFallback });
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

// ✅ SISTEMA DE RESPUESTAS FALLBACK
function generarRespuestaFallback(pregunta) {
  const preguntaLower = pregunta.toLowerCase();
  
  // Respuestas por categorías
  if (preguntaLower.includes('verdura') || preguntaLower.includes('vegetal')) {
    return '🥬 ¡Excelente elección! Nuestras verduras son 100% orgánicas y locales. Te recomiendo la lechuga romana y los tomates frescos, perfectos para ensaladas nutritivas. Son ricos en vitaminas y cultivados sin pesticidas.';
  }
  
  if (preguntaLower.includes('fruta')) {
    return '🍎 ¡Las frutas son geniales! Nuestras manzanas y naranjas están llenas de vitamina C. Los plátanos son perfectos para el desayuno y te dan energía natural. Todas nuestras frutas son de temporada y sostenibles.';
  }
  
  if (preguntaLower.includes('legumbre') || preguntaLower.includes('lenteja') || preguntaLower.includes('garbanzo')) {
    return '🌱 ¡Las legumbres son súper nutritivas! Las lentejas y garbanzos son excelentes fuentes de proteína vegetal y fibra. Son perfectas para una dieta sostenible y te ayudan a reducir tu huella de carbono.';
  }
  
  if (preguntaLower.includes('ecológico') || preguntaLower.includes('orgánico') || preguntaLower.includes('sostenible')) {
    return '🌍 Todos nuestros productos son ecológicos y sostenibles. Trabajamos con productores locales que no usan pesticidas ni químicos dañinos. Así cuidamos tu salud y el planeta al mismo tiempo.';
  }
  
  if (preguntaLower.includes('precio') || preguntaLower.includes('costo') || preguntaLower.includes('barato')) {
    return '💰 Nuestros precios son competitivos para productos orgánicos. Recuerda que inviertes en tu salud y el medio ambiente. Las verduras están entre S/ 1.4 - 2.2, frutas S/ 1.7 - 2.3, y legumbres S/ 2.4 - 2.8 por kg.';
  }
  
  // Respuesta genérica
  return '🌱 ¡Hola! Soy EcoIA, tu asistente ecológico. Estoy aquí para ayudarte a elegir los mejores productos orgánicos y sostenibles. ¿Te interesa saber sobre alguna categoría específica? Tenemos verduras, frutas y legumbres frescas y locales.';
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
