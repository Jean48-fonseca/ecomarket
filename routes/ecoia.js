const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /ecoia
router.post('/', async (req, res) => {
  const { prompt } = req.body;
  const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;
  if (!HF_TOKEN) {
    return res.status(500).json({ error: "No Hugging Face token configured on server." });
  }
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it",
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
    );
    const aiText = Array.isArray(response.data)
      ? response.data[0]?.generated_text
      : response.data.generated_text;
    res.json({ response: aiText || "Sin respuesta" });
  } catch (e) {
    res.status(500).json({ error: "EcoIA no disponible", detail: e.message });
  }
});

module.exports = router;