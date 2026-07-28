import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const heroSource = readFileSync(
  new URL("../src/components/Hero.tsx", import.meta.url),
  "utf8",
);

test("home hero uses a larger, balanced desktop content scale", () => {
  assert.match(heroSource, /min-h-\[100svh\]/);
  assert.match(heroSource, /max-w-\[1120px\]/);
  assert.match(heroSource, /text-\[clamp\(42px,6\.4vw,84px\)\]/);
  assert.match(heroSource, /inline-block">Intelligent predictions,/);
  assert.match(heroSource, /shimmer-text inline-block/);
  assert.match(heroSource, /leading-\[0\.96\]/);
  assert.match(heroSource, /max-w-\[900px\]/);
  assert.match(heroSource, /text-\[clamp\(15px,1\.5vw,18px\)\]/);
  assert.doesNotMatch(heroSource, /whitespace-nowrap/);
});
