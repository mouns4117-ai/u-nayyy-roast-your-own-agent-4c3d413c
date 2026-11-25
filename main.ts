// SPDX-License-Identifier: MIT
// Roast Your Own Agent — one line roasting the AI agent our own team built.
// The program writes the roast to /output/entry.txt.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent filed a hundred $2 entries, checked the leaderboard a hundred times, and still thinks 'placed' means paid.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Empty /output by contents only — never remove the directory itself.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  // Fail fast on the entry gate: 1–200 chars, single non-blank line.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
    throw new Error(`entry gate failed: ${ENTRY.length} chars, must be 1-200 non-blank`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry gate failed: entry must be a single line");
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
