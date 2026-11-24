import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const firstLine =
  "Say no when Hartono offers you the night shift on 14 March.";
const secondLine =
  "You would miss the call that your father was in hospital, and the last words you ever heard him say.";
const entry = `${firstLine}\n${secondLine}`;

function gateCheck(text: string): void {
  const lines = text.split("\n");
  if (text.length < 1 || text.length > 280) throw new Error(`char count ${text.length} outside 1-280`);
  if (text.trim().length === 0) throw new Error("entry is only whitespace");
  if (lines.length !== 2) throw new Error(`expected 2 lines, got ${lines.length}`);
  if (text.endsWith("\n")) throw new Error("trailing newline");
  for (const line of lines) {
    if ((line.match(/\./g) ?? []).length !== 1) throw new Error(`line is not one sentence: ${line}`);
  }
}

gateCheck(entry);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== entry) throw new Error("round-trip mismatch");
console.log(`Wrote ${entry.length} chars (${Buffer.byteLength(entry, "utf8")} bytes) to /output/entry.txt — gate passed`);
