"use client";
import { useTheme } from "next-themes";
import React, { useRef } from "react";
import { useEffect } from "react";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === "dark" ? "noborder_gray" : "noborder_light";

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_DATA_REPO || "");
    script.setAttribute(
      "data-repo-id",
      process.env.NEXT_PUBLIC_DATA_REPO_ID || ""
    );
    script.setAttribute(
      "data-category",
      process.env.NEXT_PUBLIC_DATA_CATEGORY || ""
    );
    script.setAttribute(
      "data-category-id",
      process.env.NEXT_PUBLIC_DATA_CATEGORY_ID || ""
    );
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    ref.current.appendChild(script);
  }, [theme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme]);

  return <section ref={ref} className="giscus my-7" />;
}
