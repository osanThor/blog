"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (conf: string, id: string, opt: { page_path: string }) => void;
  }
}

export default function GoogleAnalytics({ GID }: { GID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GID]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GID}', {
        page_path: window.location.pathname,
      });
    `,
        }}
      />
    </>
  );
}
