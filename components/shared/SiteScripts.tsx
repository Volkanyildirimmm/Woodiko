'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useSiteSettings } from '@/context/SiteSettingsContext'
import { CONSENT_EVENT, readConsent, type ConsentState } from '@/lib/consent'

export function SiteScripts() {
  const { seo } = useSiteSettings()
  const ga = (seo.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '').trim()
  const gtm = (seo.googleTagManagerId || process.env.NEXT_PUBLIC_GTM_ID || '').trim()
  const fbp = (seo.facebookPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID || '').trim()
  const adsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '').trim()

  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    setConsent(readConsent())
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail
      setConsent(detail ?? readConsent())
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  const allowAnalytics = !!consent?.analytics
  const allowMarketing = !!consent?.marketing

  return (
    <>
      {(ga || (adsId && allowMarketing)) && (allowAnalytics || allowMarketing) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga || adsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ga && allowAnalytics ? `gtag('config', '${ga}', { send_page_view: true, anonymize_ip: true });` : ''}
${adsId && allowMarketing ? `gtag('config', '${adsId}');` : ''}`}
          </Script>
        </>
      )}

      {gtm && allowAnalytics && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {fbp && allowMarketing && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbp}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${fbp}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  )
}
