export default function HeroArtwork() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="heroCloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D5E3E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2D5E3E" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Atmospheric topographic backdrop, slowly rotating */}
        <g className="ring-spin" opacity="0.35">
          <path
            className="ring"
            d="M 200 30 C 300 40, 380 110, 370 220 C 360 320, 270 380, 170 365 C 70 350, 25 250, 40 160 C 55 80, 130 25, 200 30 Z"
          />
        </g>
        <g className="ring-spin-rev" opacity="0.4">
          <path
            className="ring"
            d="M 200 70 C 280 80, 335 145, 325 230 C 315 305, 245 345, 170 330 C 100 315, 65 240, 80 175 C 95 115, 145 65, 200 70 Z"
          />
        </g>

        {/* Connection backbone */}
        <line
          x1="200" y1="125" x2="200" y2="298"
          stroke="#3B413C" strokeWidth="0.5" strokeDasharray="2,3" opacity="0.28"
        />

        {/* 03 · LEDGER (Finance, top) */}
        <g transform="translate(105, 30)">
          <rect width="190" height="84" rx="12" fill="#1F4A30" />
          <text x="16" y="22" fontFamily="Manrope, sans-serif" fontSize="9" letterSpacing="1.6" fill="#A8C7B0" fontWeight="600">03 · LEDGER</text>
          <text x="16" y="52" fontFamily="Fraunces, serif" fontSize="28" fill="#F4F0E6" fontWeight="400">$24,500</text>
          <text x="16" y="68" fontFamily="Manrope, sans-serif" fontSize="10" fill="#A8C7B0" opacity="0.85">forecast revenue · Q3</text>
          <g transform="translate(118, 38)">
            <path d="M 0 26 L 14 22 L 28 24 L 42 14 L 56 16 L 64 6" stroke="#A8C7B0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="64" cy="6" r="2.5" fill="#A8C7B0" />
          </g>
        </g>
        <polygon points="197,131 200,137 203,131" fill="#3B413C" opacity="0.45" />

        {/* 02 · FORECAST (middle) */}
        <g transform="translate(50, 155)">
          <text x="0" y="0" fontFamily="Manrope, sans-serif" fontSize="9" letterSpacing="1.6" fill="#3B413C" fontWeight="600" opacity="0.85">02 · FORECAST</text>
          {/* Probability cloud */}
          <path d="M 0 56 Q 75 36, 150 46 T 300 56 L 300 90 Q 225 84, 150 86 T 0 96 Z" fill="url(#heroCloudGrad)" />
          {/* Main forecast line */}
          <path d="M 0 72 Q 75 62, 150 67 Q 225 72, 300 70" stroke="#1F4A30" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Frost scenario branch */}
          <path d="M 150 67 Q 225 88, 300 95" stroke="#B89060" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeDasharray="3,3" opacity="0.75" />
          {/* Confidence pill */}
          <g transform="translate(180, 8)">
            <rect width="120" height="24" rx="12" fill="#1F4A30" />
            <text x="60" y="16" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="700" fill="#F4F0E6" letterSpacing="0.5">88% CONFIDENCE</text>
          </g>
          <text x="248" y="108" fontFamily="Manrope, sans-serif" fontSize="9" fill="#8A6B45" fontStyle="italic" opacity="0.9">↳ if frost</text>
        </g>
        <polygon points="197,286 200,292 203,286" fill="#3B413C" opacity="0.45" />

        {/* 01 · SENSORS (bottom) */}
        <g transform="translate(40, 305)">
          <text x="0" y="0" fontFamily="Manrope, sans-serif" fontSize="9" letterSpacing="1.6" fill="#3B413C" fontWeight="600" opacity="0.85">01 · SENSORS</text>
          {/* Orchard row */}
          <g transform="translate(0, 24)">
            <g fill="#2D5E3E" opacity="0.5">
              <circle cx="15" cy="18" r="5" />
              <circle cx="45" cy="18" r="5" />
              <circle cx="75" cy="18" r="5" />
              <circle cx="105" cy="18" r="5" />
              <circle cx="135" cy="18" r="5" />
              <circle cx="165" cy="18" r="5" />
              <circle cx="195" cy="18" r="5" />
              <circle cx="225" cy="18" r="5" />
              <circle cx="255" cy="18" r="5" />
              <circle cx="285" cy="18" r="5" />
              <circle cx="315" cy="18" r="5" />
            </g>
            {/* Active pulsing sensors */}
            <g>
              <circle cx="75" cy="18" r="3" fill="#1F4A30" />
              <circle cx="75" cy="18" r="6" fill="none" stroke="#1F4A30" strokeWidth="0.7">
                <animate attributeName="r" from="3" to="22" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <circle cx="195" cy="18" r="3" fill="#1F4A30" />
              <circle cx="195" cy="18" r="6" fill="none" stroke="#1F4A30" strokeWidth="0.7">
                <animate attributeName="r" from="3" to="22" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <circle cx="285" cy="18" r="3" fill="#1F4A30" />
              <circle cx="285" cy="18" r="6" fill="none" stroke="#1F4A30" strokeWidth="0.7">
                <animate attributeName="r" from="3" to="22" dur="2.8s" begin="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="2.8s" begin="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          <text x="160" y="78" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="9" fontStyle="italic" fill="#3B413C" opacity="0.65">ground truth · 12 active in Block B</text>
        </g>

        {/* Data dots traveling up the backbone */}
        <circle cx="200" r="2" fill="#1F4A30" opacity="0">
          <animate attributeName="cy" from="296" to="125" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" r="2" fill="#1F4A30" opacity="0">
          <animate attributeName="cy" from="296" to="125" dur="4.5s" begin="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur="4.5s" begin="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
