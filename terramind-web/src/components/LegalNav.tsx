import Image from "next/image";
import Link from "next/link";

export default function LegalNav() {
  return (
    <nav className="scrolled" style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="TerraMind home">
          <Image
            src="/logo-icon.png"
            alt="TerraMind"
            width={36}
            height={30}
            className="brand-mark"
            priority
          />
          <span className="brand-name">TerraMind</span>
        </Link>
        <div className="nav-links">
          <Link href="/#contact" className="nav-cta">
            Talk to us
          </Link>
        </div>
      </div>
    </nav>
  );
}
