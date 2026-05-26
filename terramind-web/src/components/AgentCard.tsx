"use client";

import { useReveal } from "@/hooks/useReveal";

interface AgentCardProps {
  number: "01" | "02" | "03";
  tag: string;
  title: string;
  body: React.ReactNode;
  visualization: React.ReactNode;
}

export default function AgentCard({
  number,
  tag,
  title,
  body,
  visualization,
}: AgentCardProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <article ref={ref} className="agent-card reveal">
      <div className="agent-num">{number}</div>
      <div className="agent-text">
        <div className="agent-tag">{tag}</div>
        <h3 className="agent-title">{title}</h3>
        <p className="agent-body">{body}</p>
      </div>
      <div className="agent-viz">{visualization}</div>
    </article>
  );
}
