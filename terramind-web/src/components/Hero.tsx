import Atmosphere from "./Atmosphere";
import HeroHeadline from "./HeroHeadline";
import HeroArtwork from "./HeroArtwork";

export default function Hero() {
  return (
    <section className="hero">
      <Atmosphere variant="meadow" grain />
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="eyebrow-text">
                Designed and built in Aotearoa, New Zealand. Coming soon.
              </span>
            </div>
            <HeroHeadline />
            <p className="lede">
              TerraMind is the intelligence ecosystem for horticulture: sensing,
              forecasting, and finance workflows that turn uncertainty into
              decisions &mdash; saving growers time and guesswork.
            </p>
            <div className="cta-row">
              <a href="#contact" className="btn btn-primary">
                Talk to us <span className="arrow">→</span>
              </a>
              <a href="#what" className="btn btn-ghost">
                See the platform
              </a>
            </div>
          </div>
          <HeroArtwork />
        </div>
      </div>
    </section>
  );
}
