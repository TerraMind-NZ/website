const ITEMS = [
  "Built for horticulture, born in Aotearoa",
  "From sensor to forecast to ledger, in one platform",
  "Software you trust enough to stake a season on",
  "Uncertainty as the headline, not the footnote",
];

const ALL = [...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <div className="whisper">
      <div className="marquee-track">
        {ALL.map((text, i) => (
          <span key={i}>
            {text}
            <span className="dot-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}
