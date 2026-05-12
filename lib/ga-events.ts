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
    return parsed.analytics === true;
  } catch {
    return false;
  }
};

export const gaTrack = (eventName: string, params?: Record<string, any>) => {
  if (!consentCheck()) return;
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params || {});
  }
};

export const gaTrackLead = (params?: {
  service?: string;
  district?: string;
  budget?: string;
  value?: number;
}) => {
  gaTrack("generate_lead", {
    currency: "TRY",
    value: params?.value || 1000,
    lead_type: "kitchen_quote",
    service: params?.service,
    district: params?.district,
    budget: params?.budget,
  });
};

export const gaTrackContact = (method: string = "whatsapp") => {
  gaTrack("contact", {
    currency: "TRY",
    value: 500,
    method,
  });
};

export const gaTrackViewService = (serviceName: string) => {
  gaTrack("view_item", {
    item_category: "service",
    item_name: serviceName,
  });
};

if (typeof window !== "undefined") {
  (window as any).__gaDebug = {
    testLead: () =>
      gaTrackLead({
        service: "mutfak-dolabi",
        district: "yasamkent",
      }),
    testContact: () => gaTrackContact(),
    testViewService: () => gaTrackViewService("mutfak-dolabi"),
  };
}
