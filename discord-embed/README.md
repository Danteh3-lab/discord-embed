# discord-embed

Express server for forwarding JSON payloads to a Discord webhook.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following content:

   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token
   PORT=3000
   ```

   Replace the webhook URL with your actual Discord webhook.

3. Start the server:

   ```bash
   npm start
   ```

   The server runs on `http://localhost:3000` by default.

## Usage

Send a POST request to `/send-message` with JSON body containing either `content` or `embeds` to forward the message to the configured Discord webhook.

Example payload with embeds:

```json
{
  "content": "Check out this embed message!",
  "embeds": [
    {
      "title": "Pricing Explained",
      "description": "Everything you need to know about the Nebula client pricing tiers.",
      "color": 16746496,
      "fields": [
        {
          "name": "NebulaBasic",
          "value": "Perfect for beginners, with all the features you need to get started.",
          "inline": false
        },
        {
          "name": "NebulaPro",
          "value": "Unlock full power with premium modules, enhanced support, and analytics.",
          "inline": false
        }
      ]
    },
    {
      "title": "Beta Access",
      "description": "Gain early access to experimental features and help shape the future of Nebula.",
      "color": 65363,
      "footer": {
        "text": "Powered by NebulaClient"
      }
    }
  ]
}
```

## Example Frontend Code

Use the following fetch call to send an embed message from a frontend application:

```html
<script>
async function sendEmbedMessage() {
  const response = await fetch('http://localhost:3000/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: "Welcome to NebulaClient!",
      embeds: [
        {
          title: "Welcome to 💼 | info!",
          description: "This is the official server of NebulaClient!",
          color: 3447003,
          fields: [
            {
              name: "Pricing Explained",
              value: "See the pricing tiers and choose the plan that suits you best.",
              inline: false
            },
            {
              name: "Beta Access",
              value: "Learn how to apply for beta access and the benefits you get.",
              inline: false
            }
          ],
          footer: {
            text: "NebulaClient • Stay innovative"
          }
        }
      ]
    })
  });

  const data = await response.json();
  console.log(data);
}
</script>
```
