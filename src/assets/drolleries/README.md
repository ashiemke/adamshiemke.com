# Drolleries

The blog uses small Gothic manuscript drawings in the margins. Each one should make a section's idea easier to remember or give the reader a little joke. Use `<Drollery art="NAME" />` after the paragraph or heading it belongs to. On narrow screens it becomes a small picture in the reading column.

## Reference drawings

- [Ape scribe](ape-scribe.webp) shows the line quality and a mechanical tool with a living root for a mount.
- [Falcon with a balance](falcon-proof.webp) shows how a scene can make an abstract idea concrete with a few shapes.
- [Potted hydra](mechanical-hydra.webp) shows the plant and machine sharing one silhouette, with just enough detail to tell the joke.

## Line, colour and composition

- Draw in the spirit of a hurried Gothic scribe. Use uneven brown pen lines, occasional restarted contours and a few gaps. Let the line thin or break where the hand lifts.
- Use broad, mostly flat washes of muted brick, mineral blue, ochre and moss green. Let a brush stroke overlap a contour or leave a patch unpainted. A few visible brush passes do more than a uniform grain overlay.
- Use stiff profiles, simple eyes and awkward proportions. Give the scene one readable action and a handful of large shapes. Keep the footing to a stray line or a leaf or two.
- Blend nature and machinery where it earns the joke. Roots can support a joint or feed gears, a seed can be a test sample, and a tree can grow a chart. Use a pin joint, winding key or hinged wing to make the machine legible at small size.
- Keep the image flat. Skip reflective metal, polished contours, deep shading, and intricate backgrounds. Keep any lettering short and check that it reads in the page.
- Aim for about 200 CSS pixels wide in the desktop margin. The smallest README drawings show closer to 140 pixels. If an important detail disappears at that size, simplify the scene or give that detail more room.

## Image-generation brief

Supply one of the reference drawings and say it is a style reference. If revising an existing scene, also supply that image and identify it as the subject reference. Give each new drawing a brief like this:

> Draw [subject and one clear action] as a small Gothic manuscript marginal sketch. Use loose, scratchy brown pen with a few restarted or broken contours and patchy, broadly flat mineral washes. Keep the figures stiff and side-on. [Describe any plant and machine hybrid in one sentence.] Compose a compact scene readable in a narrow margin. Isolate it on actual transparency with a little clearance on every side.
>
> Skip polished outlines, gradients, metallic shine, synthetic distress, parchment backdrops and extra lettering.

## Files and review

- Use a transparent WebP in this directory with a stable, descriptive name. A width around 660 pixels works for a standard drawing, and around 440 pixels is enough for the smaller ones. Remove excess transparent canvas while keeping stray intentional pen marks.
- Preview on the page in both themes. Check the cutout edges, the silhouette at its rendered width, and the art's placement beside the intended section. Check a phone width as well as a wide screen.
- An SVG can share a name with a WebP. The component displays the WebP when both exist. Older SVG drawings use the page's `.dr-*` colour classes and can still be checked with `python3 scripts/preview-drollery.py .drolleries-preview src/assets/drolleries/NAME.svg`.
