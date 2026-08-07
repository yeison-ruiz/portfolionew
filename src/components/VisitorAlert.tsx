import { useEffect } from "react";

interface VisitorAlertProps {
  lang?: "es" | "en";
}

export default function VisitorAlert({ lang = "es" }: VisitorAlertProps) {
  useEffect(() => {
    const sessionKey = "visitor_alert_sent";
    if (sessionStorage.getItem(sessionKey)) return;

    // Geolocation is resolved server-side from Vercel's edge headers, so the
    // visitor's IP is never sent to a third-party lookup service.
    const notifyVisitor = async () => {
      try {
        const response = await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "visitor", lang }),
        });

        if (response.ok) {
          sessionStorage.setItem(sessionKey, "true");
        }
      } catch (error) {
        console.error("Error sending visitor alert:", error);
      }
    };

    notifyVisitor();
  }, [lang]);

  return null;
}
