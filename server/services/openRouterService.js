const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "anthropic/claude-3.5-sonnet:beta"; // Claude 3.5 Sonnet on OpenRouter

/**
 * Analyzes a voice transcript to extract structured trade data.
 * Optimized for West African market contexts and Twi-language nuances.
 */
async function analyzeTranscript(text, context = {}) {
  try {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'YOUR_OPENROUTER_KEY_HERE') {
      console.warn("OpenRouter API Key not set. Using mock response.");
      return mockAnalysis(text);
    }

    const systemPrompt = `
      You are MarketLink AI, an expert financial analyst for Ghanaian market traders.
      Your task is to convert voice transcripts (which may be in English, Twi, or a mix) into structured JSON data.

      TRANSACTION RULES:
      1. amount: The total value in GHS (cedis).
      2. item: The primary item traded (e.g., "Tomato", "Fish").
      3. type: either "income" (sale) or "expense" (purchase/cost).
      4. counterparty: The person or entity involved (e.g., "Ama", "The Driver").
      5. quantity: If available, specify (e.g., "3 crates").
      6. confidence: Your confidence score (0-1).

      CONTEXT:
      User Preferred Languages: ${context.languages?.join(', ') || 'English, Twi'}
      Business Focus: ${context.businessTypes?.join(', ') || 'General'}

      RESPOND ONLY WITH VALID JSON.
      EXAMPLE:
      Input: "I sold three crates of tomatoes for 200 cedis each to Ama."
      Output: { "amount": 600, "item": "Tomato", "type": "income", "counterparty": "Ama", "quantity": "3 crates", "confidence": 0.95 }
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this transcript: "${text}"` }
        ],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://marketlink.gh", // Optional for OpenRouter rankings
          "X-Title": "MarketLink AI",
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data.choices[0].message.content;
    return JSON.parse(result);
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    return mockAnalysis(text);
  }
}

function mockAnalysis(text) {
  // Simple heuristic for demo/fallback
  const amountMatch = text.match(/\d+/);
  return {
    amount: amountMatch ? parseInt(amountMatch[0]) : 0,
    item: "Unknown Item",
    type: text.toLowerCase().includes("sold") ? "income" : "expense",
    counterparty: "Someone",
    quantity: "1",
    confidence: 0.5,
    isMock: true
  };
}

module.exports = { analyzeTranscript };
