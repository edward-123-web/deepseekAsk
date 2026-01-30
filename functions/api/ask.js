export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const { question } = await request.json();
    
    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required', success: false }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get API key from Cloudflare Workers secret
    const apiKey = context.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured. Please set DEEPSEEK_API_KEY in Cloudflare Workers secrets.', 
          success: false 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return new Response(
      JSON.stringify({
        answer: answer,
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred',
        success: false,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

