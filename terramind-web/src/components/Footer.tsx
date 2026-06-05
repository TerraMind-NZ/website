import Image from "next/image";
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/financial-disclaimer", label: "Financial Disclaimer" },
  { href: "/grower-data-sovereignty", label: "Grower Data" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-rule" aria-hidden="true" />
      <Link href="/" className="footer-brand" aria-label="TerraMind home">
        <Image src="/logo-icon.png" alt="" width={28} height={23} />
        <span className="footer-brand-name">TerraMind</span>
      </Link>
      <nav className="footer-links" aria-label="Legal">
        {LEGAL_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>
      <p className="footer-copy">© 2026 TerraMind. All rights reserved.</p>
    </footer>
  );
}
