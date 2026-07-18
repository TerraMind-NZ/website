import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const pageSource = readFileSync(
  new URL("../src/app/work-with-us/page.tsx", import.meta.url),
  "utf8",
);
const baseCssSource = readFileSync(
  new URL("../src/app/base.css", import.meta.url),
  "utf8",
);
const calEmbedSource = readFileSync(
  new URL("../src/components/CalEmbed.tsx", import.meta.url),
  "utf8",
);
const bookingCtaSource = readFileSync(
  new URL("../src/components/BookingCTA.tsx", import.meta.url),
  "utf8",
);
const termsSource = readFileSync(
  new URL("../src/app/terms/page.tsx", import.meta.url),
  "utf8",
);
const pilotCardsSource = readFileSync(
  new URL("../src/components/PilotCards.tsx", import.meta.url),
  "utf8",
);
const animationsSource = readFileSync(
  new URL("../src/app/animations.css", import.meta.url),
  "utf8",
);

test("work-with-us content uses one shared centered shell", () => {
  const shellUses = pageSource.match(/work-with-us-shell/g) ?? [];

  assert.equal(
    shellUses.length,
    1,
    "narrative, booking CTA, and pilot cards should share one shell",
  );

  assert.match(baseCssSource, /margin-inline:\s*auto/);
  assert.doesNotMatch(baseCssSource, /left:\s*50%/);
  assert.doesNotMatch(baseCssSource, /translateX\(-50%\)/);
  assert.match(
    baseCssSource,
    /@media \(min-width: 1200px\)[\s\S]*translate\(-4px,\s*-4px\)/,
  );
});

test("work-with-us content keeps its rhythm with a slight upward adjustment", () => {
  assert.match(pageSource, /className="work-with-us-stage relative px-6 text-center md:px-10"/);
  assert.match(baseCssSource, /\.work-with-us-stage\s*\{[\s\S]{0,180}min-height:\s*100svh/);
  assert.match(baseCssSource, /@media \(min-width: 1024px\) and \(max-height: 900px\)/);
  assert.match(baseCssSource, /\.work-with-us-stage\s*\{\s*padding-top:\s*74px;\s*padding-bottom:\s*12px/);
  assert.match(baseCssSource, /\.work-with-us-booking-row\s*\{[\s\S]{0,100}margin:\s*28px 0 34px/);
  assert.match(baseCssSource, /\.work-with-us-booking-row\s*\{\s*margin:\s*14px 0 16px/);
  assert.match(baseCssSource, /\.work-with-us-copy\s*\{[\s\S]{0,100}translateY\(-32px\)/);
  assert.match(baseCssSource, /\.work-with-us-booking-row\s*\{[\s\S]{0,140}translateY\(-10px\)/);
  assert.match(baseCssSource, /\.work-with-us-cards\s*\{[\s\S]{0,100}translateY\(18px\)/);
});

test("booking CTA bridges the narrative and pilot cards inline", () => {
  assert.doesNotMatch(pageSource, />\s*Work with us\s*</);

  const secondParagraph = pageSource.indexOf("For growers tired");
  const bookingCta = pageSource.indexOf("<BookingCTA />");
  const pilotCards = pageSource.indexOf("<PilotCards />");

  assert.notEqual(secondParagraph, -1);
  assert.notEqual(bookingCta, -1);
  assert.notEqual(pilotCards, -1);
  assert.ok(secondParagraph < bookingCta);
  assert.ok(bookingCta < pilotCards);
  assert.match(pageSource, /className="work-with-us-booking-row"/);
  assert.match(animationsSource, /\.booking-cta-wrap--inline\s*\{[\s\S]{0,180}position:\s*relative/);
  assert.doesNotMatch(
    animationsSource,
    /\.booking-cta-wrap\s*\{[\s\S]{0,180}position:\s*fixed/,
  );
});

test("booking opens a custom modal containing context and the calendar", () => {
  const ctaUrl = new URL(
    "../src/components/BookingCTA.tsx",
    import.meta.url,
  );

  assert.equal(existsSync(ctaUrl), true, "BookingCTA should exist");

  const ctaSource = readFileSync(ctaUrl, "utf8");
  assert.match(pageSource, /import BookingCTA/);
  assert.match(pageSource, /<BookingCTA \/>/);
  assert.match(ctaSource, /aria-label="Book a call with TerraMind"/);
  assert.match(ctaSource, /event\.stopPropagation\(\)/);
  assert.doesNotMatch(ctaSource, /data-cal-link=/);
  assert.doesNotMatch(ctaSource, /data-cal-namespace=/);
  assert.match(ctaSource, /role="dialog"/);
  assert.match(ctaSource, /<CalEmbed \/>/);
  assert.match(ctaSource, /PILOT SEASON/);
  assert.match(ctaSource, /Thirty minutes with the people building it\./);
  assert.match(
    ctaSource,
    /No deck, no pressure — pick a\s+time below\./,
  );
  assert.match(ctaSource, /partners@terramind\.co\.nz/);
  assert.match(ctaSource, /className="booking-cta__email"/);
  assert.ok(
    ctaSource.indexOf('className="booking-cta__email"') <
      ctaSource.indexOf("createPortal("),
    "email should be integrated into the booking capsule",
  );
  assert.doesNotMatch(pageSource, /pick a time below/);
  assert.doesNotMatch(pageSource, /<CalEmbed \/>/);
  assert.match(
    ctaSource,
    /const portalRoot = typeof document === "undefined" \? null : document\.body/,
  );
  assert.match(ctaSource, /portalRoot\s*&&\s*createPortal/);
  assert.match(ctaSource, /aria-hidden=\{!open\}/);
  assert.match(ctaSource, /inert=\{!open\}/);
  assert.doesNotMatch(calEmbedSource, /\("preload"/);
  assert.match(calEmbedSource, /initializedRef\.current = true/);
  assert.match(calEmbedSource, /hideEventTypeDetails:\s*true/);
  assert.match(calEmbedSource, /cal-embed-crop/);
  assert.doesNotMatch(ctaSource, /target="_blank"/);
});

test("booking control is compact, centered, and free of divider clutter", () => {
  assert.doesNotMatch(bookingCtaSource, /booking-cta__signal/);
  assert.match(animationsSource, /\.booking-cta__primary\s*\{[\s\S]{0,180}justify-content:\s*center/);
  assert.match(animationsSource, /\.booking-cta__arrow\s*\{[\s\S]{0,140}position:\s*absolute/);
  assert.match(animationsSource, /\.booking-cta__email\s*\{[\s\S]{0,220}border-top:\s*0/);
});

test("hero narrative and booking scale up slightly while staying centered", () => {
  assert.match(
    pageSource,
    /text-\[clamp\(42px,6vw,78px\)\]/,
  );
  assert.match(pageSource, /text-\[17px\] leading-relaxed text-white\/80/);
  assert.match(
    baseCssSource,
    /\.work-with-us-copy h1\s*\{[\s\S]{0,120}font-size:\s*clamp\(42px,\s*5vw,\s*60px\)/,
  );
  assert.match(
    baseCssSource,
    /\.work-with-us-copy p\s*\{[\s\S]{0,120}font-size:\s*16px;/,
  );
  assert.match(
    bookingCtaSource,
    /text-\[19px\] font-semibold text-white/,
  );
  assert.match(
    bookingCtaSource,
    /text-\[12px\] uppercase tracking-\[0\.16em\] text-white\/55/,
  );
  assert.match(
    animationsSource,
    /\.booking-cta\s*\{[\s\S]{0,180}width:\s*min\(420px,\s*calc\(100vw - 40px\)\)/,
  );
  assert.match(
    animationsSource,
    /\.booking-cta__arrow\s*\{[\s\S]{0,180}width:\s*46px;[\s\S]{0,80}height:\s*46px/,
  );
});

test("booking modal gives the calendar the full panel and crops branding", () => {
  assert.match(animationsSource, /\.booking-modal-backdrop\s*\{[\s\S]{0,180}padding:\s*40px/);
  assert.match(animationsSource, /\.booking-modal-backdrop\s*\{[\s\S]{0,360}opacity:\s*0/);
  assert.doesNotMatch(animationsSource, /visibility:\s*hidden/);
  assert.match(animationsSource, /\.booking-modal-backdrop\.is-open\s*\{[\s\S]{0,160}opacity:\s*1/);
  assert.match(animationsSource, /\.booking-modal-panel\s*\{[\s\S]{0,220}width:\s*min\(1480px,\s*calc\(100vw - 160px\)\)/);
  assert.match(animationsSource, /\.booking-modal-panel\s*\{[\s\S]{0,260}height:\s*min\(1020px,\s*calc\(100dvh - 88px\)\)/);
  assert.match(animationsSource, /\.booking-modal-panel\s*\{[\s\S]{0,260}display:\s*flex/);
  assert.match(animationsSource, /\.booking-modal-intro\s*\{[\s\S]{0,160}padding:\s*28px 64px 20px/);
  assert.match(animationsSource, /\.booking-modal-title\s*\{[\s\S]{0,180}font-size:\s*clamp\(38px,\s*4\.6vw,\s*58px\)/);
  assert.match(animationsSource, /\.booking-modal-copy\s*\{[\s\S]{0,180}font-size:\s*clamp\(14px,\s*1\.45vw,\s*17px\)/);
  assert.match(animationsSource, /\.booking-modal-calendar\s*\{[\s\S]{0,160}flex:\s*1 1 auto/);
  assert.match(animationsSource, /\.booking-modal-calendar\s*\{[\s\S]{0,220}padding:\s*8px 0 0/);
  assert.match(animationsSource, /\.booking-modal-calendar\s*\{[\s\S]{0,220}min-height:\s*0/);
  assert.match(animationsSource, /\.cal-embed-crop\s*\{[\s\S]{0,140}height:\s*100%/);
  assert.match(animationsSource, /\.cal-embed-crop::after\s*\{[\s\S]{0,180}height:\s*20px/);
  assert.match(calEmbedSource, /\[&_iframe\]:origin-top/);
  assert.match(calEmbedSource, /\[&_iframe\]:scale-\[0\.96\]/);
  assert.match(calEmbedSource, /\[&_iframe\]:w-\[104\.167%\]/);
  assert.match(calEmbedSource, /\[&_iframe\]:!h-\[calc\(100%\+64px\)\]/);
});

test("terms contact uses the legal inbox", () => {
  const contactSection = termsSource.slice(termsSource.indexOf("15. Contact"));

  assert.match(contactSection, /mailto:legal@terramind\.co\.nz/);
  assert.match(contactSection, />legal@terramind\.co\.nz</);
});

test("booking remains separate from the three pilot cards", () => {
  assert.match(pageSource, /import BookingCTA/);
  assert.match(pageSource, /<BookingCTA \/>/);
  assert.doesNotMatch(pilotCardsSource, /import BookingCTA/);
  assert.match(pilotCardsSource, /lg:grid-cols-3/);
  assert.match(animationsSource, /\.booking-cta-wrap--inline\s*\{[\s\S]{0,80}position:\s*relative/);
  assert.doesNotMatch(animationsSource, /\.booking-cta-wrap\s*\{[\s\S]{0,160}position:\s*fixed/);
  assert.match(pilotCardsSource, /p-7/);
  assert.match(pilotCardsSource, /text-sm/);
  assert.match(pilotCardsSource, /text-center/);
  assert.match(pilotCardsSource, /mx-auto/);
});
