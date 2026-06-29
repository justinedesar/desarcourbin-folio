// TODO: once desarcourbin.com domain is live and verified in Resend, replace both
// TO_EMAIL and FROM_EMAIL with the production addresses.
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const TO_EMAIL = "justine.desar@gmail.com"; // temp — replace with contact@desarcourbin.com
const FROM_EMAIL = "onboarding@resend.dev"; // temp — replace with contact@desarcourbin.com

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  try {
    const data = await req.json();
    const subject = `[desarcourbin.com] Nouvelle demande · ${data.full_name} — ${data.company}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        html: buildHtml(data),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[notify-contact] Resend error:", err);
      return new Response(JSON.stringify({ error: err }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[notify-contact]", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});

type Row = string | string[] | null | undefined;

function buildHtml(d: Record<string, Row>): string {
  const row = (label: string, value: Row): string => {
    if (!value || (Array.isArray(value) && value.length === 0)) return "";
    const display = Array.isArray(value) ? value.join(", ") : String(value);
    return `<tr>
      <td style="padding:5px 20px 5px 0;color:#4A4A42;font-size:13px;white-space:nowrap;vertical-align:top"><strong>${label}</strong></td>
      <td style="padding:5px 0;color:#1A1A18;font-size:13px;">${display}</td>
    </tr>`;
  };

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="font-family:sans-serif;background:#FAFAF8;margin:0;padding:32px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E8E8E4;border-radius:4px;padding:32px;">
    <h2 style="font-family:Georgia,serif;font-size:20px;color:#1A1A18;margin:0 0 4px">Nouvelle demande de contact</h2>
    <p style="font-size:12px;color:#2E6B4F;margin:0 0 28px">desarcourbin.com</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Nom", d.full_name)}
      ${row("Email", d.email)}
      ${row("LinkedIn", d.linkedin_url)}
      ${row("Entreprise", d.company)}
      ${row("Stade financement", d.funding_stage)}
      ${row("Taille équipe", d.team_size)}
      ${row("Secteur", d.sector)}
      ${row("Marché cible", d.target_market)}
      ${row("Type de mission", d.mission_type)}
      ${row("Engagement", d.engagement)}
      ${row("Durée", d.duration)}
      ${row("Date de démarrage", d.start_date)}
      ${row("Budget", d.budget)}
      ${row("Contexte", d.context)}
      ${row("Objectif", d.objective)}
      ${row("Critères de succès", d.success_criteria)}
      ${row("Langue", d.language)}
    </table>
  </div>
</body></html>`;
}
