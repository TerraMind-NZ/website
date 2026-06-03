"use client";

import {
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useReveal } from "@/hooks/useReveal";
import Atmosphere from "./Atmosphere";

interface LayerInfo {
  number: "01" | "02" | "03";
  tag: string;
  title: string;
  body: ReactNode;
  preview: ReactNode;
}

const HardwareSVG = (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#F4F0E6" />
    <text x="20" y="22" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" fill="#3B413C" letterSpacing="1.2" opacity="0.6">BLOCK B · 4.2 HA · 280 TREES</text>
    <g opacity="0.12" stroke="#3B413C" strokeWidth="0.4" strokeDasharray="2,3">
      <line x1="20" y1="55" x2="380" y2="55" />
      <line x1="20" y1="115" x2="380" y2="115" />
      <line x1="20" y1="175" x2="380" y2="175" />
    </g>
    <g>
      <circle cx="60" cy="55" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="60" cy="55" r="4" fill="#1F4A30" />
      <circle cx="130" cy="55" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="130" cy="55" r="4" fill="#1F4A30" />
      <circle cx="200" cy="55" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="200" cy="55" r="4" fill="#1F4A30" />
      <circle cx="270" cy="55" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="270" cy="55" r="4" fill="#1F4A30" />
      <circle cx="340" cy="55" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="340" cy="55" r="4" fill="#1F4A30" />
      <circle cx="60" cy="115" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="60" cy="115" r="4" fill="#1F4A30" />
      <circle cx="130" cy="115" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="130" cy="115" r="4" fill="#1F4A30" />
      <circle cx="200" cy="115" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="200" cy="115" r="4" fill="#1F4A30" />
      <circle cx="270" cy="115" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="270" cy="115" r="4" fill="#1F4A30" />
      <circle cx="340" cy="115" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="340" cy="115" r="4" fill="#1F4A30" />
      <circle cx="60" cy="175" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="60" cy="175" r="4" fill="#1F4A30" />
      <circle cx="130" cy="175" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="130" cy="175" r="4" fill="#1F4A30" />
      <circle cx="200" cy="175" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="200" cy="175" r="4" fill="#1F4A30" />
      <circle cx="270" cy="175" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="270" cy="175" r="4" fill="#1F4A30" />
      <circle cx="340" cy="175" r="11" fill="#2D5E3E" opacity="0.55" /><circle cx="340" cy="175" r="4" fill="#1F4A30" />
    </g>
    <g>
      <circle cx="165" cy="85" r="2.5" fill="#B89060" />
      <circle cx="235" cy="85" r="2.5" fill="#B89060" />
      <circle cx="305" cy="85" r="2.5" fill="#B89060" />
      <circle cx="235" cy="145" r="2.5" fill="#B89060" />
      <circle cx="305" cy="145" r="2.5" fill="#B89060" />
    </g>
    <g>
      <circle cx="95" cy="145" r="4" fill="#1F4A30" />
      <circle cx="95" cy="145" r="9" fill="none" stroke="#1F4A30" strokeWidth="1" opacity="0.5" />
      <circle cx="95" cy="145" r="14" fill="none" stroke="#1F4A30" strokeWidth="0.6" opacity="0.3">
        <animate attributeName="r" from="4" to="24" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </g>
    <g transform="translate(215, 215)">
      <rect width="160" height="70" rx="8" fill="#1F4A30" />
      <text x="14" y="20" fontFamily="Manrope, sans-serif" fontSize="9" fontWeight="600" fill="#A8C7B0" letterSpacing="1.2">SENSOR B-07 · LIVE</text>
      <text x="14" y="40" fontFamily="Manrope, sans-serif" fontSize="11" fill="#F4F0E6">Soil moisture</text>
      <text x="146" y="40" fontFamily="Manrope, sans-serif" fontSize="11" fill="#F4F0E6" fontWeight="700" textAnchor="end">28%</text>
      <text x="14" y="58" fontFamily="Manrope, sans-serif" fontSize="11" fill="#F4F0E6">Canopy temp</text>
      <text x="146" y="58" fontFamily="Manrope, sans-serif" fontSize="11" fill="#F4F0E6" fontWeight="700" textAnchor="end">14.2°C</text>
    </g>
    <text x="20" y="290" fontFamily="Manrope, sans-serif" fontSize="10" fill="#3B413C" fontStyle="italic" opacity="0.7">Ground truth, block by block</text>
  </svg>
);

const ForecastSVG = (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="confGrad-02" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2D5E3E" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#2D5E3E" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="riskGrad-02" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B89060" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#B89060" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="#F4F0E6" />
    <g stroke="#161A17" strokeWidth="0.4" opacity="0.08">
      <line x1="40" y1="60" x2="380" y2="60" />
      <line x1="40" y1="120" x2="380" y2="120" />
      <line x1="40" y1="180" x2="380" y2="180" />
      <line x1="40" y1="240" x2="380" y2="240" />
    </g>
    <path className="forecast-band" d="M 40 80 Q 120 70, 200 90 T 380 110 L 380 180 Q 300 170, 200 175 T 40 200 Z" fill="url(#confGrad-02)" />
    <path className="forecast-risk" d="M 200 175 Q 260 200, 320 230 L 380 240 L 380 175 Z" fill="url(#riskGrad-02)" opacity="0.6" />
    <path className="forecast-line" d="M 40 130 Q 120 115, 200 130 Q 260 145, 320 175 L 380 195" fill="none" stroke="#1F4A30" strokeWidth="2" strokeLinecap="round" />
    <path className="forecast-risk-line" d="M 200 130 Q 260 165, 320 220 L 380 240" fill="none" stroke="#B89060" strokeWidth="1.5" strokeDasharray="4,3" strokeLinecap="round" />
    <line x1="200" y1="50" x2="200" y2="260" stroke="#161A17" strokeWidth="0.6" strokeDasharray="2,3" opacity="0.4" />
    <circle className="forecast-now-dot" cx="200" cy="130" r="4" fill="#1F4A30" />
    <g fontFamily="Manrope, sans-serif" fontSize="10" fill="#3B413C">
      <text x="46" y="48" fontWeight="600">YIELD FORECAST</text>
      <text x="46" y="62" opacity="0.6" fontSize="9">tonnes / ha</text>
      <text x="208" y="62" fontSize="9" opacity="0.6">NOW</text>
      <text x="328" y="218" fontSize="9" fill="#8A6B45" fontWeight="600">↳ if frost</text>
      <text x="328" y="195" fontSize="9" fill="#1F4A30" fontWeight="600">↳ baseline</text>
    </g>
    <g className="forecast-confidence" transform="translate(280, 80)">
      <rect width="92" height="28" rx="14" fill="#1F4A30" />
      <text x="46" y="18" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#F4F0E6">88% confidence</text>
    </g>
  </svg>
);

const FinanceSVG = (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#F4F0E6" />
    <g fontFamily="Manrope, sans-serif" fontSize="11" fill="#161A17">
      <g className="finance-row finance-row-1" transform="translate(40, 40)">
        <rect width="320" height="40" rx="8" fill="rgba(45,94,62,0.08)" stroke="#2D5E3E" strokeWidth="0.6" />
        <circle cx="22" cy="20" r="8" fill="#2D5E3E" />
        <path className="finance-check" d="M 18 20 L 21 23 L 26 17" stroke="#F4F0E6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="44" y="18" fontWeight="600">Expected harvest revenue</text>
        <text x="44" y="32" opacity="0.6" fontSize="9">P50 NZ$1.84m · P95 NZ$2.11m</text>
        <text x="308" y="25" fill="#2D5E3E" fontWeight="600" fontSize="10" textAnchor="end">LIVE</text>
      </g>
      <g className="finance-row finance-row-2" transform="translate(40, 92)">
        <rect width="320" height="40" rx="8" fill="rgba(45,94,62,0.08)" stroke="#2D5E3E" strokeWidth="0.6" />
        <circle cx="22" cy="20" r="8" fill="#2D5E3E" />
        <path className="finance-check" d="M 18 20 L 21 23 L 26 17" stroke="#F4F0E6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="44" y="18" fontWeight="600">Read-only ledger sync</text>
        <text x="44" y="32" opacity="0.6" fontSize="9">Synced 4 hours ago · 142 transactions</text>
        <text x="308" y="25" fill="#2D5E3E" fontWeight="600" fontSize="10" textAnchor="end">SYNCED</text>
      </g>
      <g className="finance-row finance-row-3" transform="translate(40, 144)">
        <rect width="320" height="40" rx="8" fill="rgba(184,144,96,0.12)" stroke="#B89060" strokeWidth="0.6" />
        <circle cx="22" cy="20" r="8" fill="none" stroke="#B89060" strokeWidth="1.4" />
        <text x="44" y="18" fontWeight="600">Frost protection tonight</text>
        <text x="44" y="32" opacity="0.6" fontSize="9">Wind machines · net benefit +NZ$22.8k</text>
        <text x="308" y="25" fill="#8A6B45" fontWeight="600" fontSize="10" textAnchor="end">RECOMMEND</text>
      </g>
      <g className="finance-row finance-row-4" transform="translate(40, 196)">
        <rect width="320" height="40" rx="8" fill="rgba(45,94,62,0.08)" stroke="#2D5E3E" strokeWidth="0.6" />
        <circle cx="22" cy="20" r="8" fill="#2D5E3E" />
        <path className="finance-check" d="M 18 20 L 21 23 L 26 17" stroke="#F4F0E6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="44" y="18" fontWeight="600">Orchard rollup</text>
        <text x="44" y="32" opacity="0.6" fontSize="9">Revenue at risk NZ$86k · 3 blocks exposed</text>
        <text x="308" y="25" fill="#2D5E3E" fontWeight="600" fontSize="10" textAnchor="end">LIVE</text>
      </g>
      <text x="40" y="262" opacity="0.5" fontSize="10" fontStyle="italic">Forecasts translated into dollars and decisions.</text>
    </g>
  </svg>
);

const LAYERS: LayerInfo[] = [
  {
    number: "01",
    tag: "Hardware Layer",
    title: "Ground truth from the orchard floor.",
    body: (
      <>
        Purpose-built on-farm sensors capture what satellites and weather
        stations miss: soil moisture in the root zone, microclimate variation
        block-by-block, plant stress signals. <em>The ground truth</em>{" "}
        that makes everything else honest.
      </>
    ),
    preview: HardwareSVG,
  },
  {
    number: "02",
    tag: "Forecast Layer",
    title: "Probabilistic forecasting that leads with uncertainty.",
    body: (
      <>
        Yield, weather, and risk forecasts that surface confidence as the
        headline, not the footnote.{" "}
        <em>&ldquo;88%, drops to 42% if frost hits Tuesday.&rdquo;</em>{" "}
        Decisions worth the season they&rsquo;re staking.
      </>
    ),
    preview: ForecastSVG,
  },
  {
    number: "03",
    tag: "Finance Layer",
    title: "Revenue, losses, and recommendations from every forecast.",
    body: (
      <>
        Turns probabilistic forecast outputs into dollar-denominated revenue,
        loss, and action views for each block, with explicit recommendations,
        confidence levels, and transaction-grounded context for the orchard in
        front of you.
      </>
    ),
    preview: FinanceSVG,
  },
];

interface LayerCardProps {
  layer: LayerInfo;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
}

function LayerCard({ layer, index, isActive, onActivate }: LayerCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onActivate(index);
  };

  return (
    <article
      className={`layer-agent-card${isActive ? " is-active" : ""}`}
      tabIndex={0}
      onClick={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onKeyDown={handleKeyDown}
    >
      <div className="layer-agent-summary">
        <h3 className="layer-agent-name">{layer.tag}</h3>
        <span className="layer-agent-number">{layer.number}</span>
      </div>
      <div className="layer-agent-details" aria-hidden={!isActive}>
        <h4 className="layer-agent-title">{layer.title}</h4>
        <p className="layer-agent-body">{layer.body}</p>
        <a
          href="#contact"
          className="layer-agent-link"
          onClick={(event) => event.stopPropagation()}
        >
          Talk to us <span className="arrow">→</span>
        </a>
      </div>
      <div className="layer-card-preview" aria-hidden={!isActive}>
        <div className="layer-card-preview-surface">{layer.preview}</div>
      </div>
    </article>
  );
}

export default function PlatformSection() {
  const labelRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();
  const introRef = useReveal<HTMLParagraphElement>();
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section id="what" className="sec platform-section">
      <Atmosphere variant="mist" />
      <div className="container">
        <div className="platform-agents-header">
          <div className="platform-heading-copy">
            <div ref={labelRef} className="section-label reveal">
              The platform
            </div>
            <h2 ref={titleRef} className="section-title reveal-blur">
              Three layers (hardware, forecast, finance) designed as one{" "}
              <em>ecosystem,</em> working together end-to-end.
            </h2>
          </div>
          <p ref={introRef} className="platform-intro reveal">
            The manual work behind every season: sensing block conditions,
            predictive and probabilistic forecasting for yield and risk, and
            finance or compliance workflows, connected in one system that moves
            together.
          </p>
        </div>

        <div className="layer-agents-showcase">
          <div className="layer-agents-list">
            {LAYERS.map((layer, index) => (
              <LayerCard
                key={layer.number}
                layer={layer}
                index={index}
                isActive={activeLayer === index}
                onActivate={setActiveLayer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
