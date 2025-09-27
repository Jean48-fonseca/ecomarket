const express = require('express');
const fetch = require('node-fetch'); // Si usas Node 18+, puedes quitar esta línea y usar fetch nativo
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos desde la raíz (para imágenes, .js, etc.)
app.use(express.static(__dirname));

// Mostrar la página principal al entrar al root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Untitled-1.html'));
});

// Endpoint para preguntas a la IA (EcoIA)
app.post('/ecoia', async (req, res) => {
  const { pregunta } = req.body;
  if (!pregunta) {
    return res.status(400).json({ error: "Falta la pregunta en el cuerpo de la solicitud." });
  }

  try {
    const respuestaIA = await consultaHuggingFace(pregunta);
    res.json({ respuesta: respuestaIA });
  } catch (error) {
    res.status(500).json({ error: "Error consultando a Hugging Face." });
  }
});

// Función auxiliar para consultar Hugging Face
async function consultaHuggingFace(pregunta) {
  const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-7b-it", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: pregunta
    })
  });

  const data = await response.json();
  if (data && Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  } else if (data.generated_text) {
    return data.generated_text;
  }
  return "No se pudo obtener respuesta de EcoIA.";
}

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
