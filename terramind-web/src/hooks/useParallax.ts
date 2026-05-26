"use client";

import { useEffect } from "react";

export function useParallax(): void {
  useEffect(() => {
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const atmosphereEls = Array.from(
      document.querySelectorAll<HTMLElement>(".atmosphere:not(.atmosphere-dusk)")
    );

    let ticking = false;
    const compactViewport = window.matchMedia("(max-width: 720px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resetTransforms = () => {
      parallaxEls.forEach((el) => {
        el.style.transform = "";
      });

      atmosphereEls.forEach((el) => {
        el.style.transform = "";
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (compactViewport.matches || reducedMotion.matches) {
          resetTransforms();
          ticking = false;
          return;
        }

        const sy = window.scrollY;

        parallaxEls.forEach((el) => {
          const rate = parseFloat(el.dataset.parallax ?? "0.1");
          el.style.transform = `translate3d(0, ${-sy * rate}px, 0)`;
        });

        atmosphereEls.forEach((el, i) => {
          const rate = 0.04 + (i % 3) * 0.025;
          el.style.transform = `translate3d(0, ${sy * rate * 0.3}px, 0)`;
        });

        ticking = false;
      });
    };

    const onMediaChange = () => {
      resetTransforms();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compactViewport.addEventListener("change", onMediaChange);
    reducedMotion.addEventListener("change", onMediaChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      compactViewport.removeEventListener("change", onMediaChange);
      reducedMotion.removeEventListener("change", onMediaChange);
      resetTransforms();
    };
  }, []);
}
