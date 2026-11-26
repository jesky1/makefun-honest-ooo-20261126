import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { LINE } from "./main.ts";

test("entry is one line, 1-200 chars, not blank", () => {
  assert.equal(typeof LINE, "string");
  assert.ok(LINE.length >= 1 && LINE.length <= 200, `length ${LINE.length}`);
  assert.ok(!LINE.includes("\n"), "must be a single line");
  assert.ok(LINE.trim().length > 0, "must not be blank");
});

test("entry is on-topic: out of office, honest about the inbox, polite", () => {
  const lower = LINE.toLowerCase();
  assert.ok(lower.includes("out of office"), "mentions being out of office");
  assert.ok(lower.includes("will not be reading"), "honest about not reading");
  assert.ok(lower.includes("thank you"), "opens politely");
  assert.ok(lower.includes("sorry"), "apologises for the wait");
  // One sentence: exactly one terminal period, at the end.
  assert.equal((LINE.match(/\./g) ?? []).length, 1, "single sentence");
  assert.ok(LINE.endsWith("."), "ends with a period");
});

test("main.ts writes the entry deterministically", () => {
  const a = execFileSync("node", ["main.ts"], { encoding: "utf8", cwd: import.meta.dirname });
  const b = execFileSync("node", ["main.ts"], { encoding: "utf8", cwd: import.meta.dirname });
  assert.equal(a, b, "stdout identical across runs");
  assert.equal(a.trim(), LINE, "program output is the entry line");
  assert.ok(existsSync("/output/entry.txt"), "/output/entry.txt written");
  assert.equal(readFileSync("/output/entry.txt", "utf8"), LINE);
});
