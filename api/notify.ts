// Vercel Edge Function that proxies notifications to Discord.
//
// The webhook URL never reaches the browser: it is read from the
// DISCORD_WEBHOOK_URL environment variable (no PUBLIC_ prefix, so Astro/Vite
// never inlines it into the client bundle).
//
// The client sends structured, typed data only. Embeds are built here, on the
// server. Accepting a ready-made embed from the client would defeat the whole
// purpose of the proxy, since any caller could then post arbitrary content.

export const config = { runtime: "edge" };

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

const MAX_BODY_BYTES = 8 * 1024;
const MAX_FIELD_LENGTH = 1000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const COLOR_CONTACT = 3447003;
const COLOR_LEAD_PARTIAL = 16761095;
const COLOR_LEAD_FINAL = 15381256;
const COLOR_VISITOR = 5763719;

// Best-effort rate limiting. Edge instances are ephemeral and geographically
// distributed, so this bounds casual abuse but is not a hard guarantee. Move to
// Vercel KV or Upstash if stronger limits are needed.
const requestLog = new Map<string, number[]>();

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of requestLog) {
    const recent = timestamps.filter((t) => t > windowStart);
    if (recent.length === 0) requestLog.delete(key);
    else requestLog.set(key, recent);
  }

  const timestamps = requestLog.get(clientId) ?? [];
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) return true;

  timestamps.push(now);
  requestLog.set(clientId, timestamps);
  return false;
}

// Neutralizes Discord mention syntax so a submitted field cannot ping a channel,
// and collapses the markdown characters that would let it forge embed structure.
function clean(value: unknown, fallback = "N/A"): string {
  if (typeof value !== "string") return fallback;
  const sanitized = value
    .replace(/@(everyone|here)/gi, "@​$1")
    .replace(/<@[!&]?\d+>/g, "[mention]")
    .replace(/[`*_~|]/g, "")
    .trim()
    .slice(0, MAX_FIELD_LENGTH);
  return sanitized || fallback;
}

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

// Only same-origin callers are accepted. Comparing against the request's own
// host covers production, preview deployments and localhost without hardcoding
// any domain.
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type DiscordField = { name: string; value: string; inline?: boolean };

function buildContactEmbed(payload: Record<string, unknown>) {
  if (!isValidEmail(payload.email)) return null;
  if (typeof payload.name !== "string" || payload.name.trim().length < 2) return null;
  if (typeof payload.message !== "string" || payload.message.trim().length < 5) return null;

  const fields: DiscordField[] = [
    { name: "👤 Nombre", value: clean(payload.name), inline: true },
    { name: "📧 Email", value: clean(payload.email), inline: true },
    { name: "📞 Teléfono", value: clean(payload.phone), inline: true },
    { name: "💬 Mensaje", value: clean(payload.message) },
    { name: "🕒 Hora", value: new Date().toISOString() },
  ];

  return {
    title: "📩 ¡Nuevo Mensaje de Contacto!",
    color: COLOR_CONTACT,
    fields,
    footer: { text: "Yeison Portfolio Contact Form" },
  };
}

function buildLeadEmbed(payload: Record<string, unknown>) {
  if (typeof payload.name !== "string" || payload.name.trim().length < 1) return null;

  const isSpanish = payload.lang !== "en";
  const isPartial = payload.partial === true;

  const contactMethod = clean(payload.contactMethod);
  const contactValue =
    contactMethod === "WhatsApp"
      ? "Redirigido a WhatsApp 🚀"
      : `[${contactMethod}] ${clean(payload.contactValue)}`;

  const fields: DiscordField[] = [
    { name: isSpanish ? "👤 Nombre" : "👤 Name", value: clean(payload.name), inline: true },
    { name: isSpanish ? "📞 Teléfono" : "📞 Phone", value: clean(payload.phone), inline: true },
    { name: isSpanish ? "📍 Intención" : "📍 Intent", value: clean(payload.intent), inline: true },
    { name: isSpanish ? "💼 Tipo" : "💼 Type", value: clean(payload.projectType), inline: true },
    { name: isSpanish ? "📊 Alcance" : "📊 Scope", value: clean(payload.scope), inline: true },
    { name: isSpanish ? "📝 Detalles" : "📝 Details", value: clean(payload.details) },
    { name: isSpanish ? "📞 Contacto Final" : "📞 Final Contact", value: contactValue },
    { name: "🕒 Hora", value: new Date().toISOString(), inline: true },
  ];

  const title = isPartial
    ? isSpanish
      ? "⏳ Lead en progreso (Detalles recibidos)"
      : "⏳ Lead in progress (Details received)"
    : isSpanish
      ? "✅ ¡Lead Completo y Validado!"
      : "✅ Final Lead Received!";

  return {
    title,
    color: isPartial ? COLOR_LEAD_PARTIAL : COLOR_LEAD_FINAL,
    fields,
    footer: { text: "Yeison Portfolio Chat System" },
  };
}

// Geo data comes from Vercel's own edge headers, so no visitor IP is handed to a
// third-party lookup service and there is no external quota to exhaust.
function buildVisitorEmbed(payload: Record<string, unknown>, request: Request) {
  const isSpanish = payload.lang !== "en";

  const city = request.headers.get("x-vercel-ip-city");
  const country = request.headers.get("x-vercel-ip-country");
  const location = city
    ? `${decodeURIComponent(city)}${country ? `, ${country}` : ""}`
    : isSpanish
      ? "Desconocida"
      : "Unknown";

  const fields: DiscordField[] = [
    {
      name: isSpanish ? "📍 Ubicación" : "📍 Location",
      value: clean(location),
      inline: true,
    },
    {
      name: isSpanish ? "🌐 Idioma Detectado" : "🌐 Detected Language",
      value: isSpanish ? "Español (ES)" : "English (EN)",
      inline: true,
    },
    {
      name: isSpanish ? "📱 Dispositivo" : "📱 Device",
      value: clean(request.headers.get("user-agent")),
    },
    { name: "🕒 Hora", value: new Date().toISOString(), inline: true },
  ];

  return {
    title: isSpanish ? "🚀 ¡Nuevo Visitante en el Portafolio!" : "🚀 New Portfolio Visitor!",
    color: COLOR_VISITOR,
    fields,
    footer: { text: "Yeison Portfolio Alert System" },
  };
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!DISCORD_WEBHOOK_URL) {
    console.error("DISCORD_WEBHOOK_URL is not configured.");
    return json(500, { error: "Notification channel not configured" });
  }

  if (!isSameOrigin(request)) {
    return json(403, { error: "Forbidden" });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json(413, { error: "Payload too large" });
  }

  const clientId =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(clientId)) {
    return json(429, { error: "Too many requests" });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json(400, { error: "Invalid payload" });
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  // Honeypot: a real user never fills a field that is hidden from the layout.
  // Answering 204 keeps bots from learning that the submission was dropped.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return new Response(null, { status: 204 });
  }

  let embed: ReturnType<typeof buildContactEmbed>;
  switch (payload.type) {
    case "contact":
      embed = buildContactEmbed(payload);
      break;
    case "lead":
      embed = buildLeadEmbed(payload);
      break;
    case "visitor":
      embed = buildVisitorEmbed(payload, request);
      break;
    default:
      return json(400, { error: "Unknown notification type" });
  }

  if (!embed) {
    return json(422, { error: "Validation failed" });
  }

  try {
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordResponse.ok) {
      console.error("Discord rejected the notification:", discordResponse.status);
      return json(502, { error: "Upstream rejected the notification" });
    }
  } catch (error) {
    console.error("Failed to reach Discord:", error);
    return json(502, { error: "Upstream unreachable" });
  }

  return new Response(null, { status: 204 });
}
