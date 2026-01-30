# DeepSeek Q&A Interface - Cloudflare Pages

A serverless web interface for asking questions and getting answers using the DeepSeek API, deployed on Cloudflare Pages.

## Features

- ✅ No Python required - Pure JavaScript/Cloudflare Workers
- ✅ Serverless deployment on Cloudflare Pages
- ✅ Clean, modern UI
- ✅ Real-time question answering
- ✅ Loading indicators
- ✅ Error handling
- ✅ Responsive design

## Deployment to Cloudflare Pages

### Option 1: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository: `edward-123-web/deepseekAsk`
4. Build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
5. Click **Save and Deploy**

### Option 2: Using Wrangler CLI

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   wrangler pages deploy .
   ```

## Project Structure

```
.
├── index.html              # Main frontend page
├── functions/
│   └── api/
│       └── ask.js          # Cloudflare Pages Function (API endpoint)
├── wrangler.toml           # Cloudflare configuration
└── README.md               # This file
```

## API Endpoint

The API endpoint is automatically available at: `/api/ask`

It accepts POST requests with JSON body:
```json
{
  "question": "Your question here"
}
```

## Configuration

The DeepSeek API key is configured in `functions/api/ask.js`. 

**Note**: For production, consider using Cloudflare Environment Variables to store the API key securely:
1. Go to Pages → Settings → Environment Variables
2. Add `DEEPSEEK_API_KEY` variable
3. Update `ask.js` to use `context.env.DEEPSEEK_API_KEY`

## Usage

1. Deploy to Cloudflare Pages
2. Visit your deployed site
3. Enter your question
4. Click "Ask Question" or press Ctrl+Enter
5. View the AI-generated answer
