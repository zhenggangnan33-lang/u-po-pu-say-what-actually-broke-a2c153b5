// This little program writes one honest error sentence to entry.txt.
// It picks the disk-full wording, saves it, then reads it back to prove
// the file on disk matches the sentence exactly before it reports success.
// Nothing fancy: one line in, one verified line out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Save failed: the disk is full. Your work is living in RAM right now, which forgets everything when this tab closes — free up space and try again.";

if (LINE.length < 1 || LINE.length > 200 || LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error(`entry line must be a single line of 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the entry line byte-for-byte");
}
console.log(`Wrote ${back.length} characters to ${outPath} — one line, under the 200-character limit.`);
function isCleanSingleLine(value: string): boolean {
  if (value.length < 1 || value.length > 200) return false;
  if (value !== value.trim()) return false;
  return !value.includes("\n") && !value.includes("\r");
}
if (!isCleanSingleLine(LINE)) throw new Error("LINE failed the single-line validation check.");
