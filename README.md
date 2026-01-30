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

## Configuration - Setting the API Secret

The DeepSeek API key must be set as a **secret** in Cloudflare Workers/Pages. The code requires `DEEPSEEK_API_KEY` to be configured.

### Setting the Secret in Cloudflare Dashboard

1. Go to your Cloudflare Dashboard
2. Navigate to **Pages** → Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add variable**
5. Set:
   - **Variable name**: `DEEPSEEK_API_KEY`
   - **Value**: Your DeepSeek API key (e.g., `sk-your-api-key-here`)
   - **Environment**: Select **Production** (and optionally **Preview**)
6. Click **Save**

### Setting the Secret via Wrangler CLI

For local development or CLI deployment:

1. Create a `.dev.vars` file in the project root (this file is gitignored):
   ```
   DEEPSEEK_API_KEY=sk-your-api-key-here
   ```

2. For production deployment with secrets:
   ```bash
   wrangler secret put DEEPSEEK_API_KEY
   ```
   Then enter your API key when prompted.

**Important**: Never commit your API key to git! The `.dev.vars` file is already in `.gitignore`.

## Usage

1. Deploy to Cloudflare Pages
2. Visit your deployed site
3. Enter your question
4. Click "Ask Question" or press Ctrl+Enter
5. View the AI-generated answer
