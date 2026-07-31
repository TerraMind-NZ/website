import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) =>
  readFileSync(new URL(path, import.meta.url), "utf8");

const navSource = readSource("../src/components/Nav.tsx");
const heroSource = readSource("../src/components/Hero.tsx");
const platformSource = readSource("../src/components/PlatformRows.tsx");
const economicsSource = readSource("../src/components/EconomicsBand.tsx");
const hardwareSource = readSource("../src/components/HardwareSection.tsx");
const footerSource = readSource("../src/components/Footer.tsx");

test("overview represents the whole homepage across navigation and deep links", () => {
  assert.match(navSource, /\{ href: "\/", label: "Overview" \}/);
  assert.match(heroSource, /href="#problem"/);
  assert.match(heroSource, /See how it works/);

  assert.match(platformSource, /id="predictions"/);
  assert.match(platformSource, />Prediction areas</);
  assert.match(platformSource, /id="platform"/);
  assert.match(economicsSource, /id="economics"/);
  assert.match(hardwareSource, /id="soil-scouter"/);

  assert.match(footerSource, />\s*Overview\s*</);
  assert.match(footerSource, /href="\/#problem"[\s\S]*How it works/);
  assert.match(
    footerSource,
    /href="\/#predictions"[\s\S]*Prediction areas/,
  );
  assert.match(
    footerSource,
    /href="\/#economics"[\s\S]*Decision economics/,
  );
  assert.match(footerSource, /href="\/#soil-scouter"[\s\S]*Soil Scouter/);

  assert.doesNotMatch(navSource, /label: "Platform"/);
  assert.doesNotMatch(heroSource, /See the platform/);
});
