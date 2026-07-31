import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../src/components/ProblemSolution.tsx", import.meta.url),
  "utf8",
);

test("the distribution label points down to the histogram", () => {
  assert.match(source, /End-state distribution ↓/);
  assert.doesNotMatch(source, /Distribution →/);
});
