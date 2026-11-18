# Drolleries

Marginal drawings for posts and pages. Use one in MDX with `<Drollery art="NAME" />`, placed right after a section's opening paragraph (see `src/components/Drollery.astro`). This guide is the brief for drawing new ones, by hand or by an agent.

## Style guide

We're decorating a blog styled like a Gothic illuminated manuscript. Each section of an essay (and of the author's personal README) gets one *drollery*: a small, funny marginal drawing in the spirit of 13th–14th-century manuscript margins (knights fighting snails, apes playing scribe, monkey doctors). Each drawing makes a joke about the point of the section it sits beside, so readers remember the point.

Drawings show in the page margin at about **180–200px wide** on desktop, and as a centered picture at up to **230px wide** on phones. Design for that size: bold, simple shapes, readable at a glance.

## Read these first
The three finished samples set the style. Match them closely:
- `src/assets/drolleries/knight-snail.svg`
- `src/assets/drolleries/physician.svg`
- `src/assets/drolleries/bug-report.svg`

## Look
- Naive medieval pen drawing: ink outlines with flat washes of pigment. No gradients, no shading, no perspective tricks. Figures are in profile or three-quarter view, with a dot for an eye and a simple nose bump.
- Most scenes stand on a short, slightly wavy ground line (`dr-l` path) with a tuft or two of grass (small `dr-v dr-o` triangles), as in the samples. Flying things can float.
- Keep it to 2–4 elements. One clear joke beats a busy scene.
- A rendering filter adds a slight hand-drawn wobble at display time. Draw clean lines; don't try to fake wobble.

## File format (strict)
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 W H">
	<g class="dr-art">
		<!-- every shape goes in here -->
	</g>
	<text class="dr-text" x=".." y="..">optional lettering</text>
</svg>
```
- `viewBox` only. No `width`, `height`, `<style>`, `<filter>`, `<defs>` ids, gradients, images or fonts other than `dr-text`.
- W between 150 and 240, H between 70 and 160. Leave about 4 units of padding, and keep everything inside the viewBox.
- Use ONLY these classes for colour. The page defines them for light and dark mode, so never hard-code a colour:
  - `dr-o`: ink outline (stroke) for a filled shape. Combine it with one fill, e.g. `class="dr-r dr-o"`.
  - `dr-l`: ink line, no fill (stems, limbs, folds, ground).
  - `dr-t`: dotted ink trail (paths, sight lines, motion).
  - Fills: `dr-r` vermilion, `dr-b` lapis blue, `dr-g` gold, `dr-v` green, `dr-n` brown (wood, fur, earth), `dr-s` skin, `dr-p` paper/white (undyed cloth, stone, pages, white fur), `dr-m` steel grey (armour, metal), `dr-k` solid ink (eyes, small dark details).
  - `dr-text`: lettering on a banderole (scroll ribbon), set in Almendra at the drawings' pen weight. See "Lettering" below.
  - A thick limb in a colour, like the sample sword arm: draw two paths, an ink one at width N+2.5 under a coloured one at width N, using inline `style="stroke-width: N; stroke: var(--dr-blue, #35589e)"`. Inline styles may only use `var(--dr-ink|red|blue|gold|green|brown|skin|paper|steel, fallback)`.
- Stroke widths: outlines come from the classes (1.3). Don't go below 0.9 for any line, and no details smaller than about 2 units.
- Lettering: optional. At most one short banderole of 2–5 words, and only where words make the joke. Old-fashioned wording is welcome ("thither, by any road").

## Lettering
Words run along the banner's curve rather than sitting on a straight line. Draw the banner as a ribbon (top edge, then the bottom edge back), then add an invisible centre-line path and a `textPath`, outside the `dr-art` group:

```svg
	<path id="dr-band-NAME" d="M63.5 25.9C81 21.9 118 29.9 143.5 22.9" fill="none"/>
	<text class="dr-text" text-anchor="middle" style="font-size: 8.2px"><textPath href="#dr-band-NAME" xlink:href="#dr-band-NAME" startOffset="50%">thither, by any road</textPath></text>
```

- The centre line is the average of the ribbon's top and bottom curves, moved down about 0.3 × the font size so the letters sit in the middle. Add `xmlns:xlink="http://www.w3.org/1999/xlink"` to the `<svg>` element.
- Size the text so it fills about 85% of the banner's length, between 7.5 and 10px and no taller than the banner. For short words, add a little `letter-spacing` (up to 0.1em) instead of a larger size.
- The id must be unique across all drawings (`dr-band-` plus the file name).
- Comments in the SVG are fine and help: `<!-- knight -->`.

## Check your work
Render light and dark PNGs at 3x and look at them with the Read tool:

```bash
python3 scripts/preview-drollery.py .drolleries-preview src/assets/drolleries/NAME.svg
```

It writes `.drolleries-preview/NAME.png` (light) and `NAME-dark.png` (dark), using macOS Quick Look. The preview substitutes Georgia for the lettering font, which runs a little wider than the real one.

For each drawing, go through at least two render-and-fix passes. Check:
- Could someone name the subject and get the joke at 180px wide?
- Are the figures well constructed? Limbs attach to bodies, things stand on the ground, nothing floats by accident, no stray overlaps.
- Is everything inside the viewBox, with banderole text inside its ribbon?
- Does the dark version still read?

Add new drawings to `src/assets/drolleries/`. The colour classes are defined in `src/styles/global.css`, and the wobble filter in `src/components/DrolleryDefs.astro`; `scripts/preview-drollery.py` keeps a copy of both for previews.
