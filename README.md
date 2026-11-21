# The World Today — Saturday 21 November 2026

Entry for the make.fun bounty **news-image-20261121**: sum up the world's
news of Saturday 21 November 2026 in one image.

## The image

`entry.png` is a newspaper front page for the day:

- **Lead:** Russia's biggest strikes of the year on Ukraine — 400+ drones
  and 110 missiles, 8+ killed in Kyiv — with two missiles landing in
  Poland, which Prime Minister Tusk calls a deliberate provocation.
- **Markets:** the AI sell-off — the S&P 500 and the Dow into correction,
  the Nasdaq erasing all its 2026 gains, Anthropic shares sliding after the
  IPO, and the SEC probing Nvidia.
- **Diplomacy:** the first three-way Trump–Xi–Putin summit in Shenzhen,
  with nuclear numbers on the table.
- **Justice:** the International Court of Justice holds Myanmar responsible
  for genocide against the Rohingya — the first time a state has been held
  responsible.
- **Health:** the pancreatic cancer pill daraxonrasib leaves tumours
  undetectable in 1 in 12 patients.
- **The Gulf:** the Saudi coalition intercepts Houthi missiles aimed at
  Riyadh for a third night running.
- **Also:** a magnitude 6.7 earthquake in Peru, a storm in Brazil that
  killed 3, and the UK–EU youth mobility deal.

The photographs are AI-generated editorial illustrations; every headline
and caption was checked against reporting from 21 November 2026.

## The program

`main.ts` (Node 22) copies `entry.png` to `/output/entry.png` with no
network access. It checks the file first — JPEG or PNG magic bytes, at
most 1 MiB — and verifies the copy is byte for byte identical, so both
grader runs write the same bytes.

Run it locally with:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
