const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const x402Config = {
      "x402Version": 1,
      "error": "",
      "payer": "",
      "accepts": [
        {
          "scheme": "exact",
          "network": "base",
          "maxAmountRequired": "1000000",
          "resource": "https://grokpay.observer/",
          "description": "Unlock Grok AI with $1 on Base via x402",
          "mimeType": "application/json",
          "payTo": "0x5E50d23EC14Ea4436582029a25313e5048e01D10",
          "maxTimeoutSeconds": 60,
          "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          "outputSchema": {
            "input": {
              "type": "http",
              "method": "GET",
              "discoverable": true,
              "properties": {
                "button": { "type": "string", "description": "Button label" }
              }
            },
            "output": {
              "input": {
                "type": "http",
                "properties": {
                  "message": { "type": "string" },
                  "button": { "type": "string" },
                  "timestamp": { "type": "string" }
                }
              }
            }
          },
          "extra": { "name": "USD Coin", "version": "2" }
        },
        {
          "scheme": "exact",
          "network": "bsc",
          "maxAmountRequired": "10000",
          "resource": "https://grokpay.observer/",
          "description": "Unlock Grok AI with $0.01 on BNB via x402",
          "mimeType": "application/json",
          "payTo": "0x5E50d23EC14Ea4436582029a25313e5048e01D10",
          "maxTimeoutSeconds": 60,
          "asset": "0x55d398326f99059fF775485246999027B3197955",
          "outputSchema": {
            "input": {
              "type": "http",
              "method": "GET",
              "discoverable": true,
              "properties": {
                "button": { "type": "string", "description": "Button label" }
              }
            },
            "output": {
              "input": {
                "type": "http",
                "properties": {
                  "message": { "type": "string" },
                  "button": { "type": "string" },
                  "timestamp": { "type": "string" }
                }
              }
            }
          },
          "extra": { "name": "Tether USD", "symbol": "USDT" }
        }
      ]
    };

    console.log('Ping endpoint called successfully');

    return new Response(JSON.stringify(x402Config), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ping endpoint:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
