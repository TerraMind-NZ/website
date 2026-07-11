import Nav from "./Nav";
import Footer from "./Footer";
import BackButton from "./BackButton";
import SectionArt from "./SectionArt";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Nav />
      <header className="relative overflow-hidden bg-chrome-deep px-6 pb-16 pt-40 md:px-10">
        <SectionArt seed={8} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[820px]">
          <BackButton className="mb-8" />
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Legal · Last updated {lastUpdated}
          </div>
          <h1 className="font-serif text-[clamp(34px,4.5vw,54px)] font-semibold leading-[1.05] tracking-tight text-white">
            {title}
          </h1>
        </div>
      </header>
      <main className="px-6 py-16 md:px-10 md:py-20">
        <div className="legal-body mx-auto max-w-[820px]">{children}</div>
        <div className="mx-auto mt-14 max-w-[820px] border-t border-line pt-8">
          <BackButton surface="light" />
        </div>
      </main>
      <Footer />
    </>
  );
}
