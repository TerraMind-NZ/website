"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import ChainSteps from "@/components/ChainSteps";
import AskHub from "@/components/AskHub";
import SectionArt from "@/components/SectionArt";

const PIPELINE = [
  {
    n: "01",
    name: "Query",
    desc: "Every relevant prediction, observation and dollar figure — including actual costs synced read-only from Xero — is retrieved from your blocks' database first.",
  },
  {
    n: "02",
    name: "Bundle",
    desc: "Assembled into a structured context bundle — the AI only ever sees verified figures.",
  },
  {
    n: "03",
    name: "Narrate",
    desc: "The model synthesises and narrates. It never computes a number on its own.",
  },
  {
    n: "04",
    name: "Validate",
    desc: "Output is parsed against a strict schema before a grower ever sees it.",
  },
  {
    n: "05",
    name: "Fall back",
    desc: "If validation fails, a deterministic structured display ships instead. No malformed AI output, ever.",
  },
];

const DETECTORS = [
  {
    name: "Trajectory change",
    desc: "The forecast midpoint has shifted beyond the block's own rolling variability.",
  },
  {
    name: "Cross-prediction correlation",
    desc: "Agronomist-reviewed rules across surfaces — e.g. sustained disease risk while yield softens.",
  },
  {
    name: "Historical anomaly",
    desc: "Today's value sits far outside the same block at the same point in past seasons.",
  },
  {
    name: "Accumulating risk",
    desc: "Cold hours, disease-favourable days or water deficit building without any single-day alert firing.",
  },
  {
    name: "Unexplained deviation",
    desc: "A prediction lands outside the confidence band the block's own season model expects.",
  },
];

const ASK = [
  {
    name: "Agentic tool-calling",
    desc: "A bounded agent loop over read tools, a scenario runner and tiered action tools — hard budgets, one repair retry, deterministic fallback.",
  },
  {
    name: "Grounded retrieval (RAG)",
    desc: "Hybrid full-text + vector search over your own records, rank-fused, isolated to your orchard in SQL. Citations shown.",
  },
  {
    name: "Self-consistency",
    desc: "High-stakes questions are answered three times independently and you get the consensus; if the runs disagree, that disagreement is flagged to you rather than hidden.",
  },
  {
    name: "Voice",
    desc: "Hands-free in the orchard — questions spoken, answers streamed back sentence by sentence.",
  },
  {
    name: "Partner MCP",
    desc: "External agents can read and propose through a consent-gated endpoint. They can never execute a write.",
  },
];

const HARDENING = [
  {
    name: "Injection-safe by design",
    desc: "Facts the model reads from a chat, an image or a retrieved document never auto-write to your profile — they queue as confirm/reject suggestions, so a hidden instruction can't quietly poison every future answer.",
  },
  {
    name: "Honest when it can't finish",
    desc: "A truncated or malformed generation says so and degrades cleanly, instead of stopping mid-sentence or masquerading as an outage.",
  },
  {
    name: "Consensus on the big calls",
    desc: "High-stakes answers are generated multiple times and the response you see is the one the runs agree on — judged by what the answers mean, not how they're worded.",
  },
  {
    name: "Budgeted and bounded",
    desc: "A rolling per-orchard cost budget covers even the agent stream and block ask; context and tool results are capped, with an explicit “trimmed” note rather than a silent drop.",
  },
];

const COMPOUNDING = [
  {
    name: "Microclimate corrections",
    desc: "Observed temperature and humidity are compared to the regional forecast under each synoptic pattern — clear nights, advection fog, nor'west flow — and the block's systematic deviation becomes a correction the frost model applies.",
  },
  {
    name: "Disease pressure antecedents",
    desc: "Which lagged weather conditions precede elevated Psa pressure on this block — learned per block, because aspect and shelter change leaf wetness independently of the region.",
  },
  {
    name: "Yield-weather response",
    desc: "How this block's yield responds to weather at each phenological stage, calibrated against your confirmed harvests. It needs two seasons of confirmed yields — the regional model carries it until then.",
  },
  {
    name: "Irrigation response",
    desc: "The actual soil-moisture evolution of this block under rain and evapotranspiration — correcting FAO-56 for soil properties and drainage the map can't see.",
  },
];

export default function IntelligenceSections() {
  const heroRef = useReveal<HTMLElement>();
  const pipelineRef = useReveal<HTMLElement>();
  const scanRef = useReveal<HTMLElement>();
  const askRef = useReveal<HTMLElement>();
  const hardenRef = useReveal<HTMLElement>();
  const compoundRef = useReveal<HTMLElement>();
  const closeRef = useReveal<HTMLElement>();

  return (
    <>
      <section
        ref={heroRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 pb-24 pt-44 md:px-10"
      >
        <SectionArt seed={5} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            TerraMind Intelligence
          </div>
          <h1 className="mb-6 max-w-3xl font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-white">
            A decision-intelligence layer,{" "}
            <em className="italic text-accent">built for horticulture</em>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/80">
            Twenty-two AI features, and every one exists because of a TerraMind
            prediction. The findings are deterministic — the AI puts them into
            words. Grounded, auditable, and always yours to confirm.
          </p>
        </div>
      </section>

      <section
        ref={pipelineRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">Grounding before generation</div>
        <h2 className="mb-5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          No AI output touches a number{" "}
          <em className="italic text-leaf">it didn&apos;t retrieve</em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Every AI-generated report, briefing, insight and answer runs the same
          five-step discipline. Hallucinated figures aren&apos;t rare —
          they&apos;re architecturally impossible.
        </p>
        <ChainSteps steps={PIPELINE} />
      </section>

      <section
        ref={scanRef}
        className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
      >
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <div className="eyebrow mb-8">While you sleep</div>
            <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
              Five detectors sweep every block,{" "}
              <em className="italic text-leaf">every night</em>
            </h2>
            <p className="text-base leading-relaxed text-ink-mute">
              At 2:30 am the nightly scan runs deterministic detectors over
              each block&apos;s prediction history. Only genuine findings
              surface — deduplicated against alerts you&apos;ve already seen,
              narrated in plain language by morning. It also plans: the AI
              Season Planner reschedules frost, irrigation, harvest and
              scouting events on every forecast update; your 5 am Daily
              Briefing ranks the day&apos;s decisions by expected value; and
              when you open an event, a pre-decision checklist spells out what
              to verify before you act. Weekly, pre-season and debrief reports
              round out the record.
            </p>
          </div>
          <div className="relative">
            <div className="scan-beam z-1" />
            <div className="stagger flex flex-col gap-3">
              {DETECTORS.map((d, i) => (
                <div
                  key={d.name}
                  style={{ "--d": i, "--i": i } as CSSProperties}
                  className="card-lift rounded-xl border border-line bg-paper py-4 pl-9 pr-6"
                >
                  <span
                    className="spine-node"
                    style={{ left: 16, top: 22, width: 6, height: 6 }}
                  />
                  <div
                    className="row-title mb-0.5 text-[14px] font-semibold text-ink"
                    style={{ "--i": i } as CSSProperties}
                  >
                    {d.name}
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-mute">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={askRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">The showpiece</div>
        <h2 className="mb-5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          Ask TerraMind —{" "}
          <em className="italic text-leaf">
            an agent that knows your growing operation
          </em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Ask anything about your operation and get an answer grounded in your
          blocks, your history, your numbers — right down to actual costs
          synced read-only from Xero. Under the hood it&apos;s a
          bounded agentic loop — powerful enough to run what-if scenarios,
          disciplined enough to never act without you.
        </p>
        <AskHub items={ASK} />
      </section>

      <section
        ref={hardenRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 py-24 md:px-10"
      >
        <SectionArt seed={7} />
        <div
          className="glow-breathe pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 25%, rgba(15,122,65,0.2) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-12 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Hardened for the field
          </div>
          <h2 className="mb-5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-white">
            A reliability layer{" "}
            <em className="italic text-accent">under all 22 features</em>
          </h2>
          <p className="mb-14 max-w-2xl text-base leading-relaxed text-white/75">
            An end-to-end adversarial audit hardened every reliability edge of
            the AI layer — the part that keeps it trustworthy under load, bad
            input and provider failure. Each item below shipped with tests, and
            the model-facing ones with a passing evaluation.
          </p>
          <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
            {HARDENING.map((h, i) => (
              <div
                key={h.name}
                style={{ "--d": i } as CSSProperties}
                className="card-lift-dark rounded-xl border border-white/12 bg-white/4 px-6 py-5"
              >
                <div className="mb-2.5 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="row-hairline h-px flex-1 bg-white/15"
                    style={{ "--d": i } as CSSProperties}
                  />
                </div>
                <div className="mb-1 text-[15px] font-semibold text-white">
                  {h.name}
                </div>
                <p className="text-sm leading-relaxed text-white/65">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={compoundRef}
        className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="eyebrow mb-8">Season over season</div>
          <h2 className="mb-4.5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            Intelligence that compounds,{" "}
            <em className="italic text-leaf">block by block</em>
          </h2>
          <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
            Every season you grow with TerraMind, four learned models deepen
            for each block. Each carries an explicit insufficient-data status —
            nothing is fabricated on a young block. What they learn flows back
            through the whole engine: forecast corrections, expectation bands,
            risk thresholds and briefings, all tuned to how each block actually
            behaves — predictions that keep getting sharper, built on a track
            record no competitor can replicate without watching your blocks
            through the same seasons.
          </p>
          <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COMPOUNDING.map((c, i) => (
              <div
                key={c.name}
                style={{ "--d": i, "--i": i } as CSSProperties}
                className="card-lift relative overflow-hidden rounded-xl border border-line bg-paper p-6"
              >
                <div
                  className="row-title mb-1.5 text-[15px] font-semibold text-ink"
                  style={{ "--i": i } as CSSProperties}
                >
                  {c.name}
                </div>
                <p className="text-sm leading-relaxed text-ink-mute">
                  {c.desc}
                </p>
                <div
                  className="learn-bar absolute inset-x-0 bottom-0 h-[2px]"
                  style={{ "--i": i } as CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={closeRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 text-center md:px-10"
      >
        <SectionArt seed={6} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 35%, rgba(15,122,65,0.24) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-3xl">
          <h2 className="mb-5 font-serif text-[clamp(32px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-white">
            The AI drafts.
            <br />
            <em className="italic text-accent">You decide.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/80">
            TerraMind&apos;s AI suggests, schedules, and generates — but nothing
            writes to your operation without your explicit confirmation. Human
            judgment stays exactly where it belongs.
          </p>
          <Link
            href="/work-with-us"
            className="link-arrow inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep hover:shadow-[0_14px_36px_-12px_rgba(67,213,133,0.55)]"
          >
            Work with us <span className="arrow">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
