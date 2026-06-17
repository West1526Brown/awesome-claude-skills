# PWA Icons for Android

## Required icons

Android Chrome needs at least these to consider the app installable:

| File | Size | `purpose` | Notes |
| --- | --- | --- | --- |
| `icon-192.png` | 192×192 | `any` | Minimum installable size; also used as Apple touch icon. |
| `icon-512.png` | 512×512 | `any` | Used for splash screen and high-density displays. |
| `icon-maskable-512.png` | 512×512 | `maskable` | Lets Android crop the icon into any shape without white padding. |

Place them under `/icons/` (or update the paths in `manifest.webmanifest`).

## Maskable safe zone

Maskable icons can be cropped into circles, squircles, rounded squares, etc.
depending on the device. Keep all important content (logo, text) inside the
**center 80%** — a circle of ~409px diameter on a 512px canvas. The outer ring
is "bleed" that may be clipped. Use a solid (not transparent) background so the
icon never shows the page behind it.

Preview maskable icons at https://maskable.app/ before shipping.

## Generating icons from one source image

Start from a square master image (ideally 1024×1024 PNG with a solid background).

With ImageMagick:

```bash
magick master.png -resize 192x192 icons/icon-192.png
magick master.png -resize 512x512 icons/icon-512.png
# Maskable: pad the logo so it sits in the safe zone, then flatten onto a bg.
magick master.png -resize 410x410 -background "#0b5fff" -gravity center \
  -extent 512x512 icons/icon-maskable-512.png
```

Or use a generator that outputs the full set plus manifest entries:

```bash
npx pwa-asset-generator master.png ./icons --manifest ./manifest.webmanifest
```

## Optional extra sizes

For broader coverage you can also add 48, 72, 96, 128, 144, 256, and 384 px
icons with `purpose: "any"`, but they are not required for installability.
