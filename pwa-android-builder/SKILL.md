---
name: pwa-android-builder
description: Build installable Progressive Web Apps (PWAs) that work like native apps on Android — generating a valid web app manifest, an offline-capable service worker, the required icons/metadata, and the steps to make the app installable from Chrome and (optionally) publishable to the Google Play Store via a Trusted Web Activity (TWA).
---

# PWA Android Builder

Turn a website or web app into an **installable, offline-capable Progressive Web App** that behaves like a native app on Android: a home-screen icon, a standalone (no browser chrome) window, a splash screen, and offline support. Optionally wrap it in a **Trusted Web Activity (TWA)** so it can be published to the Google Play Store.

A PWA is *not* a native Android build — it is your existing website plus three things the browser looks for: a **web app manifest**, a **service worker**, and **HTTPS**. This skill produces all of them and verifies they meet Android's installability bar.

## When to Use This Skill

- You have a website or web app and want users to "install" it to their Android home screen.
- You want the app to open full-screen (standalone), with its own icon and splash screen, like a native app.
- You want it to load and work offline (or on flaky connections).
- You want to list a web app on the Google Play Store without rebuilding it in Kotlin/Java (via TWA / Bubblewrap).
- You're auditing an existing site that "won't show the install prompt" on Android and need to find what's missing.

## What This Skill Does

1. **Manifest generation**: Creates a `manifest.webmanifest` with the fields Android requires for installability (`name`, `short_name`, `start_url`, `display`, `icons` incl. a 512px maskable icon, `theme_color`, `background_color`).
2. **Service worker**: Provides an offline-first service worker (cache-first for static assets, network-first with offline fallback for navigation) plus registration code.
3. **Icons & metadata**: Specifies the exact icon sizes and `<meta>`/`<link>` tags to add to `<head>`.
4. **Installability audit**: Checks the criteria Chrome on Android uses before it fires `beforeinstallprompt`, and surfaces what's missing.
5. **Custom install prompt**: Optional JS to capture `beforeinstallprompt` and show your own "Add to Home Screen" button.
6. **Play Store path (TWA)**: Explains how to wrap the PWA with Bubblewrap/PWABuilder into a signed `.aab` and the Digital Asset Links step that removes the browser URL bar.

## How to Use

### Basic Usage

```
Make my website at https://example.com installable as a PWA on Android.
```

Claude will generate the manifest, service worker, icon list, and the `<head>` tags, then tell you where to place each file.

### Advanced Usage

```
My PWA isn't showing the install prompt on Android Chrome. Audit my manifest
and service worker and tell me exactly what's blocking installability.
```

```
Take my existing PWA and prepare it for the Google Play Store with a TWA —
give me the Bubblewrap commands and the assetlinks.json I need to host.
```

## Android Installability Checklist

Chrome on Android will only offer to install ("Add to Home Screen" / install banner) when **all** of these are true:

- [ ] Served over **HTTPS** (or `localhost` for testing).
- [ ] A linked **web app manifest** with `name` (or `short_name`), `start_url`, and a `display` of `standalone`, `fullscreen`, or `minimal-ui`.
- [ ] Icons include at least a **192×192** and a **512×512** PNG, and at least one icon with `"purpose": "maskable"`.
- [ ] A registered **service worker** with a `fetch` handler (so the app can work offline).
- [ ] The page is not already running in installed/standalone mode.

If any item fails, the install prompt never fires. The audit usage above checks each one.

## Reference Files

- `templates/manifest.webmanifest` - A complete, valid manifest to copy and edit.
- `templates/service-worker.js` - Offline-first service worker (cache-first assets, network-first navigation with offline fallback).
- `templates/register-sw.js` - Service worker registration + custom install-prompt handling.
- `templates/head-tags.html` - The `<head>` `<link>`/`<meta>` tags to add (manifest, theme color, Apple touch icon for cross-platform).
- `templates/offline.html` - Fallback page shown when navigation fails offline.
- `references/icons.md` - Required icon sizes, maskable safe-zone guidance, and a generation command.
- `references/play-store-twa.md` - Step-by-step Bubblewrap/PWABuilder path to a signed Play Store `.aab`, including Digital Asset Links.

## Example

**User**: "Make my static site installable as a PWA on Android."

**Output**:
```
1. Add templates/manifest.webmanifest to your site root, edit name/colors/start_url.
2. Generate icons (see references/icons.md): icon-192.png, icon-512.png, icon-maskable-512.png.
3. Add the tags from templates/head-tags.html to <head>.
4. Copy templates/service-worker.js and templates/offline.html to your site root,
   and templates/register-sw.js, then call registerSW() from your main script.
5. Deploy over HTTPS, open in Android Chrome → menu shows "Install app". ✅
```

## Tips

- **Test on real Android Chrome** via `chrome://inspect` from a desktop, or use Lighthouse's PWA audit — it reproduces the installability checks above.
- **Bump the cache version** (`CACHE_NAME`) in the service worker on every deploy, or users get stale assets. The template cleans up old caches on `activate`.
- **Maskable icons matter**: without `"purpose": "maskable"`, Android may shrink your icon inside a white circle. Keep important content in the centered 80% "safe zone."
- **`start_url` should be unique** (e.g. `"/?source=pwa"`) so you can measure installs in analytics.
- **A TWA needs Digital Asset Links**: until `assetlinks.json` is hosted on your domain and verified, the TWA shows a browser URL bar instead of running full-screen.
- **Don't over-cache HTML**: cache static assets aggressively but keep navigation network-first so users see fresh content when online.

## Common Use Cases

- Converting a marketing site, docs site, or web tool into a home-screen installable app.
- Giving an internal/business web app offline access for field or warehouse use.
- Shipping a web app to the Google Play Store without a separate native codebase.
- Debugging why an existing site fails Chrome's install criteria on Android.
