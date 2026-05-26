"use client";

import { useReveal } from "@/hooks/useReveal";

const FOUNDERS = [
  {
    initial: "B",
    name: "[Founder name]",
    role: "Co-founder · Engineering & ops",
    bio: "Engineering, focused on hardware design, manufacturing, and the pilot-grower partnerships shipping June 10. [One real sentence about background.]",
  },
  {
    initial: "A",
    name: "[Founder name]",
    role: "Co-founder · Software",
    bio: "Computer science, focused on the prediction engine and data infrastructure. [One real sentence about background — internships, projects, what you've shipped.]",
  },
];

function FounderCard({
  initial,
  name,
  role,
  bio,
}: {
  initial: string;
  name: string;
  role: string;
  bio: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="founder-card reveal">
      <div className="founder-avatar">{initial}</div>
      <div className="founder-name">{name}</div>
      <div className="founder-role">{role}</div>
      <p className="founder-bio">{bio}</p>
    </div>
  );
}

export default function TeamSection() {
  const labelRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();

  return (
    <section id="team" className="sec">
      <div className="container">
        <div className="section-head">
          <div ref={labelRef} className="section-label reveal">
            The team
          </div>
          <h2 ref={titleRef} className="section-title reveal-blur">
            Two founders, <em>building in the open.</em>
          </h2>
        </div>

        <div className="founders-grid">
          {FOUNDERS.map((f) => (
            <FounderCard key={f.initial} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
