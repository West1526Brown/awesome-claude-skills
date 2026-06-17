# Publishing a PWA to Google Play with a Trusted Web Activity (TWA)

A **Trusted Web Activity (TWA)** is a thin Android container that opens your PWA
full-screen (no browser URL bar) using the user's Chrome engine. You publish the
TWA `.aab` to Google Play; the actual app content stays on your web server. This
is the supported way to ship a PWA to the Play Store without writing native code.

## Prerequisites

- A deployed, installable PWA over **HTTPS** (passes the installability checklist
  in `SKILL.md`).
- Java JDK and the Android SDK (Bubblewrap can install these for you).
- A Google Play Developer account ($25 one-time) to publish.

## Option A — Bubblewrap (CLI)

```bash
# 1. Install the CLI
npm install -g @bubblewrap/cli

# 2. Initialize from your live manifest
bubblewrap init --manifest https://example.com/manifest.webmanifest

# 3. Build a signed Android App Bundle (.aab)
bubblewrap build
```

`bubblewrap init` asks for the app ID (e.g. `com.example.app`), signing key
details, and colors (it reads defaults from your manifest). `bubblewrap build`
produces `app-release-signed.aab` plus a signing keystore — **back up the
keystore**; you cannot update the app on Play without it.

## Option B — PWABuilder (web UI)

1. Go to https://www.pwabuilder.com and enter your PWA URL.
2. Review the report card (it flags any missing manifest/service-worker items).
3. Choose **Android package** → download the generated `.aab` and the
   `assetlinks.json`.

## Required: Digital Asset Links

To remove the browser URL bar (so it looks like a native app), Android must verify
that your website and the app belong to the same owner.

1. Get the SHA-256 fingerprint of your signing key. Bubblewrap prints it, or:
   ```bash
   keytool -list -v -keystore android.keystore -alias android
   ```
2. Host this file at **`https://example.com/.well-known/assetlinks.json`**:
   ```json
   [
     {
       "relation": ["delegate_permission/common.handle_all_urls"],
       "target": {
         "namespace": "android_app",
         "package_name": "com.example.app",
         "sha256_cert_fingerprints": ["AA:BB:CC:..."]
       }
     }
   ]
   ```
3. The file must be served over HTTPS with `Content-Type: application/json` and
   no redirect. Verify it with Google's
   [Statement List Generator and Tester](https://developers.google.com/digital-asset-links/tools/generator).

If asset links fail to verify, the TWA still runs but shows a Chrome URL bar at
the top — that's the #1 sign this step is misconfigured.

## Publishing

1. In the [Play Console](https://play.google.com/console), create the app.
2. Upload the `.aab` to a testing or production track.
3. Complete store listing, content rating, data-safety, and privacy policy.
4. If you used Play App Signing, copy Google's signing SHA-256 into
   `assetlinks.json` too (Play re-signs your bundle, so its fingerprint differs).

## Updating

- **App content / web changes**: just deploy your website — no Play update needed.
- **App shell changes** (name, icon, target SDK, TWA config): rebuild the `.aab`
  with the same keystore, bump `versionCode`, and upload a new release.
