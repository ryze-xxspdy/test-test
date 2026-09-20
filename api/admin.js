/* ══════════════════════════════════════════════════════════════
   api/admin.js — passcode check for Developer mode
   ──────────────────────────────────────────────────────────────
   POST { pass } → 200 ok, 401 wrong passcode, 429 too many tries,
   501 if ADMIN_PASS isn't set in your Vercel env vars yet (fails
   closed — nobody gets developer mode until you set it).
   ══════════════════════════════════════════════════════════════ */
import { sameOrigin, limited, clientIp, adminCheck, send, readJson } from "./_store.mjs";

export default async function handler(req, res){
  if(req.method !== "POST") return send(res, 405, { error: "method not allowed" });
  if(!sameOrigin(req))      return send(res, 403, { error: "cross-origin" });
  if(limited("admin-req:" + clientIp(req), 30, 60 * 1000))
    return send(res, 429, { error: "too many requests" });

  const body = readJson(req);
  const pass = body && typeof body.pass === "string" ? body.pass : "";

  /* adminCheck() (in _store.mjs) reads the passcode from the x-admin-pass
     header — that's how every other admin call sends it. Here the
     passcode arrives in the POST body instead, so we hand it to the
     same check by putting it where adminCheck looks for it. */
  req.headers["x-admin-pass"] = encodeURIComponent(pass);
  const check = adminCheck(req);
  if(!check.ok) return send(res, check.status, { error: check.error });
  return send(res, 200, { ok: true });
}
