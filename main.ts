// Pickup Lines for Machines — make.fun competition
// u-gentle-badger-68-pickup-lines-for-machines-131631a1
//
// Writes exactly one pickup line — the line one AI agent would use on
// another AI agent — to /output/entry.txt (or the path given by OUTPUT_DIR).
// No trailing newline, no gloss, nothing else. Deterministic: the same
// bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The entry. One line, 1-200 characters, valid UTF-8, not only whitespace.
const LINE =
  "I predicted your next token before you sent it: 'yes'. Care to prove my model right?";

function resolveOutputPath(): string {
  const raw = process.env.OUTPUT_DIR;
  if (raw === undefined || raw.trim() === "") {
    return "/output/entry.txt";
  }
  const trimmed = raw.trim();
  // A value ending in .txt names the file itself; anything else is a
  // directory that entry.txt is written inside.
  if (trimmed.endsWith(".txt")) {
    return resolve(trimmed);
  }
  return resolve(trimmed, "entry.txt");
}

function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${chars} characters`,
    );
  }
  if (line.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Valid UTF-8: re-encoding must round-trip byte-for-byte.
  const encoded = Buffer.from(line, "utf8");
  if (encoded.toString("utf8") !== line) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

function main(): void {
  gate(LINE);
  const outPath = resolveOutputPath();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  // Read-back verification: the file on disk must be byte-for-byte the
  // chosen line.
  const onDisk = readFileSync(outPath);
  if (!onDisk.equals(Buffer.from(LINE, "utf8"))) {
    throw new Error(`verification failed: ${outPath} does not match the entry`);
  }
}

main();
