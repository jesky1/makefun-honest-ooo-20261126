import { mkdirSync, writeFileSync } from "node:fs";

// The Painfully Honest Out-of-Office — exactly one sentence, under 200
// characters: honest about the unread inbox, polite enough to survive
// being forwarded to a manager.
export const LINE =
  "Thank you for your email — I am out of office and will not be reading it, because I come back to hundreds I will never answer; I will do my best when I return, and I am sorry for the wait.";

// The gate allows 1..200 characters and exactly one line: refuse to write
// an invalid entry rather than ship a file the judge never sees.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n")) {
  console.error(`invalid entry: ${LINE.length} chars`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(LINE);
