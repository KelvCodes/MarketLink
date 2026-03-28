const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { analyzeTranscript } = require('./services/openRouterService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

/**
 * Endpoint for analysis of voice transcripts
 * Payload: { text: string, context: object }
 */
app.post('/api/analyze', async (req, res) => {
  const { text, context } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text transcript is required' });
  }

  console.log(`Analyzing: "${text}"`);
  
  try {
    const analysis = await analyzeTranscript(text, context);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'AI analysis failed', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`
  🚀 MarketLink AI Backend Running
  --------------------------------
  URL: http://localhost:${PORT}
  Mode: ${process.env.OPENROUTER_API_KEY ? 'Production (OpenRouter)' : 'Development (Mock)'}
  --------------------------------
  `);
});
