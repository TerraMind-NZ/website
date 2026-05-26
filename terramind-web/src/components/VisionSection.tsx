"use client";

import { useReveal } from "@/hooks/useReveal";
import Atmosphere from "./Atmosphere";

export default function VisionSection() {
  const labelRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLParagraphElement>();

  return (
    <section id="vision" className="vision-section">
      <Atmosphere variant="mist" />
      <div className="container">
        <div className="vision-content">
          <div
            ref={labelRef}
            className="section-label reveal"
            style={{ marginBottom: "32px", display: "inline-block" }}
          >
            Our vision
          </div>
          <h2 ref={titleRef} className="vision-title reveal-blur">
            Agricultural intelligence,
            <br />
            <em>built between the rows.</em>
          </h2>
          <p ref={bodyRef} className="vision-body reveal">
            Most agricultural AI was built for broadacre commodity crops
            (corn, wheat, soy) and bent to fit everything else. We&rsquo;re
            going the other way. Horticulture is its own world: trees that take
            years to bear, vines that depend on a single frost-free night, fruit
            picked by hand. What we build for it should match, end to end, from
            the sensor in the soil to the line on the ledger. We&rsquo;re
            launching from Aotearoa because that&rsquo;s where we live and where
            the listening tour starts. The goal isn&rsquo;t a dashboard growers
            tolerate, it&rsquo;s a system they trust enough to stake a season on.
          </p>
        </div>
      </div>
    </section>
  );
}
