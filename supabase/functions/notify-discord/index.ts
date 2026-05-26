const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const webhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");

  if (!webhookUrl) {
    return new Response(JSON.stringify({ error: "Discord webhook is not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const payload = (await request.json().catch(() => ({}))) as ContactPayload;
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const discordResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Narr Homepage",
      embeds: [
        {
          title: "New Portfolio Message",
          color: 0x2563eb,
          fields: [
            { name: "Name", value: name.slice(0, 1024), inline: true },
            { name: "Email", value: email.slice(0, 1024), inline: true },
            { name: "Message", value: message.slice(0, 1024) },
          ],
          footer: { text: "narr-homepage contact form" },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    const errorText = await discordResponse.text();

    return new Response(JSON.stringify({ error: "Failed to send Discord notification", detail: errorText }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
