"use client";

import { useReveal } from "@/hooks/useReveal";
import Atmosphere from "./Atmosphere";

export default function CTASection() {
  const titleRef = useReveal<HTMLHeadingElement>();
  const metaRef = useReveal<HTMLDivElement>();

  return (
    <div className="cta-wrap">
      <div id="contact" className="cta-section">
        <Atmosphere variant="dusk" grain />
        <div className="cta-content">
          <h2 ref={titleRef} className="cta-title reveal-blur">
            Growing fruit, vines, or berries, <em>anywhere?</em>
            <br />
            We want to hear from you.
          </h2>
          <div ref={metaRef} className="cta-meta reveal">
            <p>
              We&rsquo;re recruiting pilot orchards, vineyards, and growers in
              Aotearoa right now. If you&rsquo;d like to be part of what comes
              next, or you&rsquo;re a grower anywhere who wants to hear when
              the first prototypes are ready, please reach out.
            </p>
            <p>
              <a href="mailto:partners@terramind.co.nz">
                partners@terramind.co.nz
              </a>
              <br />
              <a href="https://www.linkedin.com/company/terramindnz/" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <br />
              Christchurch · Aotearoa New Zealand
            </p>
            <a href="mailto:partners@terramind.co.nz" className="cta-btn">
              Work with us <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
