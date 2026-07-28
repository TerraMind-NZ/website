import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../src/components/IntelligenceSections.tsx", import.meta.url),
  "utf8",
);

test("the fifth hardening card is centered on its own row", () => {
  const hardeningSection = source.slice(
    source.indexOf("Hardened for the field"),
    source.indexOf("Season over season"),
  );

  assert.match(hardeningSection, /sm:grid-cols-4/);
  assert.match(hardeningSection, /sm:col-span-2/);
  assert.match(
    hardeningSection,
    /i === HARDENING\.length - 1 \? "sm:col-start-2" : ""/,
  );
});
