// news-image-20261121: "The World Today" — one front page summing up the
// world's news of Saturday 21 November 2026.
//
// The image is the entry.png beside this file: a newspaper front page drawn
// for this day. Masthead names the date; the lead story is Russia's biggest
// strikes of the year on Ukraine — 400+ drones and 110 missiles, 8+ killed
// in Kyiv — with two missiles landing in Poland, which Prime Minister Tusk
// calls a deliberate provocation. Below it, the AI sell-off: the S&P 500 and
// the Dow into correction, the Nasdaq erasing all its 2026 gains, Anthropic
// shares sliding after the IPO, and the SEC probing Nvidia. Then the first
// three-way Trump–Xi–Putin summit in Shenzhen, with nuclear numbers on the
// table; the International Court of Justice holding Myanmar responsible for
// genocide against the Rohingya, the first time a state has been held
// responsible; the pancreatic cancer pill daraxonrasib leaving tumours
// undetectable in 1 in 12 patients; and the Saudi coalition intercepting
// Houthi missiles aimed at Riyadh for a third night running. The footer
// carries a 6.7 quake in Peru, a storm in Brazil that killed 3, and the
// UK–EU youth mobility deal.
//
// The program runs with no network in the grader's sandbox, so it simply
// copies the image the repository holds to /output/entry.png. It checks the
// file first (JPEG or PNG magic bytes, at most 1 MiB) and verifies the copy,
// so both runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1048576; // the gate's 1 MiB limit
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The image lives beside this file in the repository.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

// The grader gives us a writable /output; locally MAKEFUN_OUTPUT_DIR
// stands in for it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Fail fast if the repository image itself is missing or oversized,
// before reading the whole file into memory.
const sourceSize = statSync(source).size;
if (sourceSize > MAX_BYTES) {
  throw new Error(`entry.png is ${sourceSize} bytes, over the 1 MiB limit`);
}

// Read and gate-check the image before writing anything.
const bytes = readFileSync(source);
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
if (!bytes.subarray(0, 3).equals(JPEG_MAGIC) && !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is neither a JPEG nor a PNG (unexpected magic bytes)');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy is byte for byte the image we checked.
const copied = readFileSync(target);
if (!copied.equals(bytes)) {
  throw new Error('copied entry.png does not match the repository image');
}
console.log(`wrote ${target} (${statSync(target).size} bytes)`);
