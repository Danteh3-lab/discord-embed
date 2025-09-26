import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const fetchClient = globalThis.fetch ?? fetch;

app.use(express.json({ limit: '1mb' }));

if (!DISCORD_WEBHOOK_URL) {
  console.warn('Warning: DISCORD_WEBHOOK_URL is not set. POST /send-message will fail until it is configured.');
}

app.post('/send-message', async (req, res) => {
  const payload = req.body;

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'Request body must be a JSON object.' });
  }

  const hasContent = typeof payload.content === 'string' && payload.content.length > 0;
  const hasEmbeds = Array.isArray(payload.embeds) && payload.embeds.length > 0;

  if (!hasContent && !hasEmbeds) {
    return res.status(400).json({ error: 'Payload must include either a non-empty "content" string or a non-empty "embeds" array.' });
  }

  try {
    const response = await fetchClient(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      const statusText = response.statusText || 'Unknown error';
      return res.status(response.status).json({
        error: `Discord webhook responded with status ${response.status} (${statusText}). Details: ${errorText}`
      });
    }

    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Failed to send message to Discord webhook:', error);
    return res.status(500).json({ error: 'Failed to deliver message to Discord webhook. See server logs for details.' });
  }
});

app.listen(PORT, () => {
  console.log(`discord-embed server running on port ${PORT}`);
});
