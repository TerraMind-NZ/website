"use client";

import { useEffect, useRef } from "react";

export const CAL_LINK = "terramind-bahrjw/terramind";
const NAMESPACE = "book-a-call";

/* Official Cal.com embed loader — queues calls until embed.js arrives. */
/* eslint-disable @typescript-eslint/no-explicit-any */
function getCal(): any {
  const w = window as any;
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: any[]) {
        const cal = C.Cal;
        const ar = args;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function (...apiArgs: any[]) {
            p(api, apiArgs);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(w, "https://app.cal.com/embed/embed.js", "init");
  return w.Cal;
}

export default function CalEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || containerRef.current.childElementCount > 0)
      return;
    const Cal = getCal();
    Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    Cal.ns[NAMESPACE]("inline", {
      elementOrSelector: containerRef.current,
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "dark" },
    });
    Cal.ns[NAMESPACE]("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Negative margin crops the Cal.com branding strip at the iframe's bottom */}
      <div
        ref={containerRef}
        className="min-h-[560px] w-full [&_iframe]:!-mb-[92px]"
      />
    </div>
  );
}
