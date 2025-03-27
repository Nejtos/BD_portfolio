import { useEffect } from "react";

const CookieConsentBanner = () => {
  useEffect(() => {
    if (window.CookieYes?.loaded || document.cookie.includes('cookieyes-consent')) {
      return;
    }

    const script = document.createElement("script");
    script.id = "cookieyes";
    script.type = "text/javascript";
    script.src = import.meta.env.VITE_COOKIEYES_KEY;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // const existingScript = document.getElementById("cookieyes");
      // existingScript?.remove();
    };
  }, []);

  return null;
};

export default CookieConsentBanner;
