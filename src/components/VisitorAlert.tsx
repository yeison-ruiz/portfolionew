import { useEffect } from "react";

// ----------------------------------------------------------------------
// 🔔 CONFIGURACIÓN DE ALERTAS
// ----------------------------------------------------------------------
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1468324309436203185/aguTFg9dhaFi5zqlD21eacUF5II8DC01GU-D75tIHGbWTdoKytB6RgyRy2peX90_sbcb";

interface VisitorAlertProps {
  lang?: "es" | "en";
}

export default function VisitorAlert({ lang = "es" }: VisitorAlertProps) {
  useEffect(() => {
    if (!DISCORD_WEBHOOK_URL) return;

    const sessionKey = "visitor_alert_sent";
    if (sessionStorage.getItem(sessionKey)) return;

    const notifyVisitor = async () => {
      try {
        const geoReq = await fetch("https://ipapi.co/json/").catch(() => null);
        const geoData = geoReq ? await geoReq.json() : {};

        const message = {
          embeds: [
            {
              title: lang === 'es' ? "🚀 ¡Nuevo Visitante en el Portafolio!" : "🚀 New Portfolio Visitor!",
              color: 5763719,
              fields: [
                {
                  name: lang === 'es' ? "📍 Ubicación" : "📍 Location",
                  value: geoData.city
                    ? `${geoData.city}, ${geoData.country_name}`
                    : (lang === 'es' ? "Desconocida" : "Unknown"),
                  inline: true,
                },
                {
                  name: lang === 'es' ? "🌐 Idioma Detectado" : "🌐 Detected Language",
                  value: lang === 'es' ? "Español (ES)" : "English (EN)",
                  inline: true,
                },
                {
                  name: lang === 'es' ? "📱 Dispositivo" : "📱 Device",
                  value: navigator.userAgent,
                  inline: false,
                },
                {
                  name: lang === 'es' ? "🕒 Hora" : "🕒 Time",
                  value: new Date().toLocaleString(),
                  inline: true,
                },
              ],
              footer: {
                text: "Yeison Portfolio Alert System",
              },
            },
          ],
        };

        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message),
        });

        sessionStorage.setItem(sessionKey, "true");
      } catch (error) {
        console.error("Error sending visitor alert:", error);
      }
    };

    notifyVisitor();
  }, [lang]);

  return null;
}
