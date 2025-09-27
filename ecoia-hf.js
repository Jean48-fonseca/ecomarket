// ecoia-hf.js
// Utilidad para conectar EcoIA con Hugging Face Inference API

const HF_API_URL = "https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it";
// Coloca tu token de Hugging Face aquí para pruebas locales (¡no lo subas a producción!)
const HF_TOKEN = ""; // <-- Pega tu token aquí

/**
 * Consulta el modelo de Hugging Face con el prompt del usuario.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
async function askEcoIA(prompt) {
  const headers = HF_TOKEN
    ? { "Authorization": `Bearer ${HF_TOKEN}", "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ inputs: prompt }),
  });
  const data = await response.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }
  if (data.generated_text) return data.generated_text;
  if (data.error) return "EcoIA no está disponible en este momento (" + data.error + ")";
  return "Lo siento, no hay respuesta disponible en este momento.";
}