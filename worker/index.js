export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    // プリフライト OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // POST 以外は拒否
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const note = body.note || "";

      const res = await fetch(
        "https://api.github.com/repos/si-tm/train-routine/dispatches",
        {
          method: "POST",
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `token ${env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "densha-routine-worker"
          },
          body: JSON.stringify({ event_type: "add-memo", client_payload: { note } })
        }
      );

      const text = await res.text();

      return new Response(
        res.ok ? "ok" : `GitHub API error: ${text}`,
        { status: res.status, headers: corsHeaders }
      );
    } catch (err) {
      return new Response(`Internal Server Error: ${err}`, { status: 500, headers: corsHeaders });
    }
  }
};
