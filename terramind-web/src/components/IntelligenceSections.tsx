"use client";

import { useReveal } from "@/hooks/useReveal";
import { useModal } from "./ModalProvider";

const PIPELINE = [
  {
    n: "01",
    name: "Query",
    desc: "Every relevant prediction, observation and dollar figure is retrieved from your blocks' database first.",
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
    desc: "High-stakes questions run a three-temperature ensemble; when the answers disagree, the disagreement is surfaced as an explicit limitation.",
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

export default function IntelligenceSections() {
  const heroRef = useReveal<HTMLElement>();
  const pipelineRef = useReveal<HTMLElement>();
  const scanRef = useReveal<HTMLElement>();
  const askRef = useReveal<HTMLElement>();
  const closeRef = useReveal<HTMLElement>();
  const { openModal } = useModal();

  return (
    <>
      <section
        ref={heroRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 pb-24 pt-44 md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            TerraMind Intelligence
          </div>
          <h1 className="mb-6 max-w-3xl font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-white">
            A decision-intelligence layer,{" "}
            <em className="italic text-accent">not a chatbot</em>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/70">
            Fourteen AI features, and every one exists because of a TerraMind
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-line bg-white/60 p-5"
            >
              <div className="mb-3 font-mono text-[11px] tracking-[0.2em] text-leaf">
                {s.n}
              </div>
              <div className="mb-1.5 text-[15px] font-semibold text-ink">
                {s.name}
              </div>
              <p className="text-[13px] leading-relaxed text-ink-mute">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
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
          <div className="flex flex-col gap-3">
            {DETECTORS.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-line bg-paper px-6 py-4"
              >
                <div className="mb-0.5 text-[14px] font-semibold text-ink">
                  {d.name}
                </div>
                <p className="text-[13px] leading-relaxed text-ink-mute">
                  {d.desc}
                </p>
              </div>
            ))}
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
          <em className="italic text-leaf">an agent that knows your orchard</em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Ask anything about your operation and get an answer grounded in your
          blocks, your history, your numbers. Under the hood it&apos;s a
          bounded agentic loop — powerful enough to run what-if scenarios,
          disciplined enough to never act without you.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASK.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border border-line bg-white/60 p-6 transition-colors hover:border-ink/20 hover:bg-mint"
            >
              <div className="mb-1.5 text-[15px] font-semibold text-ink">
                {f.name}
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={closeRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 text-center md:px-10"
      >
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
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/65">
            TerraMind&apos;s AI suggests, schedules, and generates — but nothing
            writes to your operation without your explicit confirmation. Human
            judgment stays exactly where it belongs.
          </p>
          <button
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
          >
            Get early access ↗
          </button>
        </div>
      </section>
    </>
  );
}
