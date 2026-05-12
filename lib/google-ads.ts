declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const consentCheck = (): boolean => {
  if (typeof window === "undefined") return false;
  const consent = localStorage.getItem("woodiko-cookie-consent");
  if (!consent) return false;
  try {
    const parsed = JSON.parse(consent);
    return parsed.marketing === true;
  } catch {
    return false;
  }
};

export const googleAdsTrackLead = (value: number = 1000) => {
  if (!consentCheck()) return;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (!adsId || !label || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value,
    currency: "TRY",
  });
};

export const googleAdsTrackContact = (value: number = 500) => {
  if (!consentCheck()) return;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL;
  if (!adsId || !label || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value,
    currency: "TRY",
  });
};

if (typeof window !== "undefined") {
  (window as any).__googleAdsDebug = {
    testLead: () => googleAdsTrackLead(1000),
    testContact: () => googleAdsTrackContact(500),
  };
}
