"use client";

import { useMemo } from "react";

const RAW_HEADLINE =
  "The Intelligence Ecosystem for {em}Horticulture{/em}.";

export default function HeroHeadline() {
  const nodes = useMemo(() => {
    const tokens = RAW_HEADLINE.split(/(\{em\}.*?\{\/em\}|\s+)/).filter(Boolean);
    let wordIndex = 0;
    return tokens.map((tok, i) => {
      if (/^\s+$/.test(tok)) {
        return " ";
      } else if (tok.startsWith("{em}")) {
        const inner = tok.replace("{em}", "").replace("{/em}", "");
        const delay = 0.15 + wordIndex++ * 0.075;
        return (
          <em key={i}>
            <span className="word" style={{ animationDelay: `${delay}s` }}>
              {inner}
            </span>
          </em>
        );
      } else {
        const delay = 0.15 + wordIndex++ * 0.075;
        return (
          <span key={i} className="word" style={{ animationDelay: `${delay}s` }}>
            {tok}
          </span>
        );
      }
    });
  }, []);

  return <h1 className="headline">{nodes}</h1>;
}
