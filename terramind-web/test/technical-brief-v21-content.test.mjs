import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const platform = read("src/components/PlatformRows.tsx");
const metrics = read("src/components/MetricsBand.tsx");
const aiLayer = read("src/components/AILayerSection.tsx");
const intelligence = read("src/components/IntelligenceSections.tsx");
const intelligenceMetadata = read("src/app/intelligence/page.tsx");
const proof = read("src/components/ProofSections.tsx");
const footer = read("src/components/Footer.tsx");

test("homepage presents the two new annual crops and insect phenology", () => {
  assert.match(platform, /Annual Crop Intelligence/);
  assert.match(platform, /potato and open-field tomato/i);
  assert.match(platform, /active crop cycle/i);
  assert.match(platform, /Insect Phenology/);
  assert.match(platform, /Codling moth/);
  assert.match(platform, /potato tuber moth/);
  assert.match(platform, /tomato-potato psyllid/);
});

test("public AI copy consistently presents a 24-feature layer", () => {
  for (const source of [aiLayer, intelligence, intelligenceMetadata]) {
    assert.doesNotMatch(source, /23-feature|Twenty-three|all 23/i);
    assert.match(source, /24-feature|Twenty-four|all 24/i);
  }
});

test("AI alerts retain the existing proposition and add digest behaviour", () => {
  assert.match(aiLayer, /AI Alerts/);
  assert.match(aiLayer, /SMS and email/);
  assert.match(aiLayer, /deduped/i);
  assert.match(intelligence, /AI Alert Digests/);
  assert.match(intelligence, /watch[^\n]+critical/i);
  assert.match(intelligence, /quiet hours/i);
  assert.match(intelligence, /action window/i);
});

test("Ask TerraMind explains provenance reconciliation across predictions", () => {
  assert.match(intelligence, /Current evidence/);
  assert.match(intelligence, /prediction identity/i);
  assert.match(intelligence, /validity window/i);
  assert.match(intelligence, /current, superseded, expired or unresolved/i);
  assert.match(intelligence, /claim-level grounding/i);
  assert.doesNotMatch(intelligence, /Critical frost answers use/);
});

test("v21 engineering and crop counts replace stale figures", () => {
  for (const source of [metrics, proof]) {
    assert.doesNotMatch(source, /1,818/);
    assert.match(source, /2,103/);
    assert.match(source, /486/);
  }
  assert.doesNotMatch(proof, /7 · 13|Five of seven/);
  assert.match(proof, /9 · 13/);
  assert.match(proof, /Five of nine/);
  assert.match(proof, /35/);
  assert.match(proof, /38/);
});

test("proof includes v21 annual-crop capability without changing rejected sections", () => {
  assert.match(proof, /Annual-crop intelligence/);
  assert.match(proof, /Late blight/);
  assert.match(proof, /Early blight/);
  assert.match(proof, /Insect phenology/);
  assert.match(proof, /6,510/);
  assert.match(proof, /1,000-sample/);
  assert.match(proof, /60% formula/);
  assert.match(proof, /40% guarded classifier/);

  assert.match(proof, /Every TerraMind surface ships with a measured accuracy stat on real\s+New Zealand data/);
  assert.match(proof, /Each one beats the raw\s+forecast or climatology/);
  assert.match(proof, /No named-competitor benchmark yet/);
});

test("footer exposes annual-crop coverage", () => {
  assert.match(footer, /Annual Crops/);
});
