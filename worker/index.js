export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    const body = await request.json();
    const note = body.note || "";

    const res = await fetch(
      `https://api.github.com/repos/si-tm/train-routine/dispatches`,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `token ${env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "densha-routine-worker"  // ← これが必須
        },
        body: JSON.stringify({ event_type: "add-memo", client_payload: { note } })
      }
    );

    const text = await res.text();

    return new Response(
      res.ok ? "ok" : `GitHub API error: ${text}`,
      { status: res.status, headers: corsHeaders }
    );
  }
};
