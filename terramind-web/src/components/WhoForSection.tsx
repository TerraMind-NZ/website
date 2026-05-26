"use client";

import { useReveal } from "@/hooks/useReveal";
import Atmosphere from "./Atmosphere";

const CROPS = [
  {
    crop: "Kiwifruit",
    region:
      "Launching in Bay of Plenty. Designed for kiwifruit growers globally: green, gold, and red across hemispheres.",
  },
  {
    crop: "Viticulture",
    region:
      "Launching in Marlborough and Central Otago. Designed for vineyards everywhere: premium wine, sparkling, and table grapes.",
  },
  {
    crop: "Avocado",
    region:
      "Launching in Northland and Bay of Plenty. Designed for avocado producers worldwide: alternate-bearing cycles and export quality.",
  },
  {
    crop: "Stone & pipfruit",
    region:
      "Launching in Central Otago and Hawke's Bay. Designed for cherry, apple, pear, and berry growers worldwide.",
  },
];

function CropItem({ crop, region }: { crop: string; region: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="for-item reveal">
      <div className="for-item-crop">{crop}</div>
      <div className="for-item-region">{region}</div>
    </div>
  );
}

export default function WhoForSection() {
  const labelRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();

  return (
    <section id="who" className="sec">
      <Atmosphere variant="harvest" />
      <div className="container">
        <div className="section-head who-section-head">
          <div ref={labelRef} className="section-label reveal">
            Who it&rsquo;s for
          </div>
          <h2 ref={titleRef} className="section-title reveal-blur">
            For orchards, vineyards, and everything in{" "}
            <em>between the rows.</em>
          </h2>
        </div>

        <div className="for-list">
          {CROPS.map((item) => (
            <CropItem key={item.crop} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
