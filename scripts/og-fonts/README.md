# OG image fonts

Static-cut TrueType fonts consumed by `scripts/og-image.tsx` via Satori.

Satori rejects `.woff2` (the format Fontsource ships) and requires `.ttf`,
`.otf`, or `.woff`. These files are committed
to make the build self-contained — without them `pnpm build` fails at the
`og-image` step.

## Files

| File | Family | Weight | Source |
|------|--------|--------|--------|
| Fraunces-Medium.ttf | Fraunces | 500 | https://github.com/undercasetype/Fraunces/releases — latest static cut, weight 500 |
| JetBrainsMono-Regular.ttf | JetBrains Mono | 400 | https://github.com/JetBrains/JetBrainsMono/releases — latest static cut, weight 400 |

## Licensing

- Fraunces: SIL Open Font License 1.1 (https://github.com/undercasetype/Fraunces/blob/main/OFL.txt)
- JetBrains Mono: SIL Open Font License 1.1 (https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt)

Both licenses permit commercial use and redistribution.

## Updating

To refresh: download the new release from the upstream GitHub repo, replace
the `.ttf` file in this directory, run `pnpm build`, and verify the output
`dist/og-en.png` and `dist/og-tr.png` render correctly.

Do NOT replace these files with `.woff2` — Satori will throw an "Unsupported
font format" error.
