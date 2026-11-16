/*
 * The site is static. This Worker only answers /api/* (see run_worker_first
 * in wrangler.jsonc); every other request is served straight from site/dist.
 *
 * POST /api/signup  stores an email for event announcements in D1.
 * Works from fetch() (returns JSON) and from a plain form post without
 * JavaScript (redirects to /subscribed).
 */

const ROLES = new Set(["parent", "player", "coach", "school", "other"]);
const INTERESTS = new Set(["quads", "championships", "girls-festival", "classes"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/signup") {
      if (request.method !== "POST") return json({ ok: false, error: "Use POST." }, 405);
      return signup(request, env);
    }

    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "Not found." }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function signup(request, env) {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");

  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(wantsJson, { ok: false, error: "Could not read the form." }, 400);
  }

  // Honeypot: a field people never see. Bots fill it in; pretend it worked.
  if ((form.get("website") || "").toString().trim()) return reply(wantsJson, { ok: true }, 200);

  const email = (form.get("email") || "").toString().trim().toLowerCase().slice(0, 254);
  if (!EMAIL.test(email)) return reply(wantsJson, { ok: false, error: "Please enter a valid email address." }, 400);

  const name = (form.get("name") || "").toString().trim().slice(0, 120) || null;
  const roleRaw = (form.get("role") || "").toString();
  const role = ROLES.has(roleRaw) ? roleRaw : null;
  const interests = form.getAll("interests").map(String).filter((i) => INTERESTS.has(i));
  const page = (form.get("page") || "").toString().slice(0, 200) || null;

  try {
    // Signing up again updates the details instead of failing.
    await env.DB.prepare(
      `INSERT INTO signups (email, name, role, interests, page)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(email) DO UPDATE SET
         name = COALESCE(excluded.name, signups.name),
         role = COALESCE(excluded.role, signups.role),
         interests = CASE WHEN excluded.interests = '' THEN signups.interests ELSE excluded.interests END`
    )
      .bind(email, name, role, interests.join(","), page)
      .run();
  } catch (err) {
    console.error("signup insert failed", err);
    return reply(wantsJson, { ok: false, error: "Something went wrong. Please email us instead." }, 500);
  }

  return reply(wantsJson, { ok: true }, 200);
}

function reply(wantsJson, body, status) {
  if (wantsJson) return json(body, status);
  const target = body.ok ? "/subscribed" : "/subscribed?error=1";
  return new Response(null, { status: 303, headers: { location: target } });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
