export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await request.json();
    const note = body.note || "";

    // GitHub repository_dispatch を叩く
    const res = await fetch(`https://api.github.com/repos/si-tm/train-routine/dispatches`, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${env.GITHUB_TOKEN}`, // Cloudflare Secret に保存
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_type: "add-memo",
        client_payload: { note }
      })
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(`GitHub API error: ${text}`, { status: res.status });
    }

    return new Response("ok", { status: 200 });
  }
};
