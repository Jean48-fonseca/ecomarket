const express = require('express');
const fetch = require('node-fetch'); // Si usas Node 18+, puedes quitar esta línea y usar fetch nativo
const path = require('path');
const aplicacion = express();
const puerto = process.env.PORT || 3000;

aplicacion.use(express.json());

// Servir archivos estáticos desde la raíz (para imágenes, .js, etc.)
aplicacion.use(express.static(__dirname));

// MOSTRAR el HTML principal al entrar a la raíz
aplicacion.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Untitled-1.html'));
});

// Endpoint para preguntas a la IA (EcoIA)
aplicacion.post('/ecoia', async (req, res) => {
  const { pregunta } = req.body;
  if (!pregunta) {
    return res.status(400).json({ error: "Falta la pregunta en el cuerpo de la solicitud." });
  }

  try {
    const respuesta = await consultaHuggingFace(pregunta);
    res.json({ respuesta });
  } catch (error) {
    res.status(500).json({ error: "Error consultando a Hugging Face." });
  }
});

// Función auxiliar para consultar Hugging Face
async function consultaHuggingFace(pregunta) {
  const respuesta = await fetch("https://api-inference.huggingface.co/models/google/gemma-7b-it", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: pregunta
    })
  });

  const datos = await respuesta.json();
  if (Array.isArray(datos) && datos[0]?.generated_text) {
    return datos[0].generated_text;
  } else if (datos.generated_text) {
    return datos.generated_text;
  }
  return "No se pudo obtener respuesta de EcoIA.";
}

aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
