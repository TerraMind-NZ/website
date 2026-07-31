"use client";

export interface PillItem {
  name: string;
  desc: string;
}

function Entry({ item, index }: { item: PillItem; index: number }) {
  return (
    <span className="flex shrink-0 items-baseline whitespace-nowrap">
      <span className="mr-2.5 font-mono text-[10px] tracking-[0.15em] text-leaf tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {item.name}
      </span>
      <span className="mx-2 text-[14px] text-ink-mute/60">—</span>
      <span className="text-[14px] text-ink-mute">{item.desc}</span>
      <span aria-hidden className="mx-7 text-[9px] text-leaf/50">
        ✦
      </span>
    </span>
  );
}

function Row({
  items,
  offset,
  reverse,
  duration,
}: {
  items: PillItem[];
  offset: number;
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="marquee-row overflow-hidden py-3">
      <div
        className={`marquee-track ${reverse ? "rev" : ""}`}
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <Entry key={item.name} item={item} index={offset + i} />
        ))}
        <span aria-hidden className="contents">
          {items.map((item, i) => (
            <Entry key={`dup-${item.name}`} item={item} index={offset + i} />
          ))}
        </span>
      </div>
    </div>
  );
}

export default function FeaturePills({
  label,
  items,
}: {
  label: string;
  items: PillItem[];
}) {
  const mid = Math.ceil(items.length / 2);
  const top = items.slice(0, mid);
  const bottom = items.slice(mid);

  return (
    <div className="border-y border-line-soft py-2">
      <div className="flex items-baseline justify-between gap-4 px-1 pt-3 pb-1">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          {label}
        </div>
        <div className="font-mono text-[11px] tracking-[0.15em] text-leaf tabular-nums">
          {String(items.length).padStart(2, "0")} features
        </div>
      </div>
      <div className="marquee-mask -mx-6 md:-mx-10">
        <Row items={top} offset={0} duration={44} />
        {bottom.length > 0 && (
          <Row items={bottom} offset={mid} reverse duration={52} />
        )}
      </div>
    </div>
  );
}
