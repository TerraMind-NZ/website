import Link from "next/link";
import LegalNav from "./LegalNav";
import Footer from "./Footer";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <LegalNav />
      <main className="legal-main">
        <div className="container">
          <div className="legal-wrap">
            <Link href="/" className="legal-back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>

            <h1 className="legal-title">{title}.</h1>
            <p className="legal-date">Last Updated: {lastUpdated}</p>

            <div className="legal-body">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
