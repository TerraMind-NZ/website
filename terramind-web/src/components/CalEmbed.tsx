"use client";

import { useEffect, useRef } from "react";
import { CAL_LINK, CAL_NAMESPACE } from "./calConfig";

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

function configureCalendar() {
  const Cal = getCal();

  if (!Cal.ns?.[CAL_NAMESPACE]) {
    Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
  }
  Cal.ns[CAL_NAMESPACE]("ui", {
    theme: "dark",
    hideEventTypeDetails: true,
    showTimezoneWhenEventDetailsHidden: true,
    layout: "month_view",
  });

  return Cal;
}

export default function CalEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    initializedRef.current = true;
    const container = containerRef.current;
    const Cal = configureCalendar();
    Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: container,
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "dark" },
    });
    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="cal-embed-crop overflow-hidden">
      {/* Oversize the iframe so the lower brand strip stays outside the crop. */}
      <div
        ref={containerRef}
        className="h-full w-full [&_iframe]:origin-top [&_iframe]:scale-[0.96] [&_iframe]:w-[104.167%] [&_iframe]:!-mb-[64px] [&_iframe]:!h-[calc(100%+64px)]"
      />
    </div>
  );
}
