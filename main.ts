// news-image-20261121 v5 — deterministic entry program.
//
// The entry is a single pre-rendered front page, entry.png (1024x1024),
// summing up Saturday 21 November 2026 in 35 dated, sourced stories.
// This program does no rendering: it copies the shipped image byte for
// byte to the harness output directory, so every run produces the exact
// same file the judges saw when the entry was built.
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
// The harness sets MAKEFUN_OUTPUT_DIR; /output is the documented default.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts (${source})`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target}`);
