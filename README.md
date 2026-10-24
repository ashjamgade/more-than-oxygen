# More Than Oxygen

A private, personal universe for Dolly: a shorter main story, optional memory album, light/dark themes, interactive flowers and research nodes, city lighting, an anniversary capsule, and a sunflower postcard.

## Configure before deployment

The server gate is **closed by default**. In the Vercel project, add both environment variables to **Production and Preview**, then redeploy:

- `SITE_PASSWORD`: a unique secret phrase of at least 12 characters. Share it privately with Dolly, not in GitHub or chat.
- `SESSION_SECRET`: a random value of at least 32 characters. Generate one locally with `openssl rand -hex 32`; never commit it.

For local development, copy `.env.example` to `.env.local` and fill in the values. `.env*` files are ignored except the empty example. Until configuration is present, visitors see a preparation screen. The old `oxygen` word is no longer an authentication mechanism.

The server verifies the phrase and issues a seven-day, signed HttpOnly, SameSite=Strict cookie (Secure over HTTPS). The home page independently checks the session, in addition to middleware checks. Media URLs under `/photos/`, the capsule, and postcard download require authentication. The capsule and postcard handlers independently verify the session too. Protected responses are not publicly cached. `Lock this space` clears the browser cookie. Password attempts have a best-effort per-instance limit; use the hosting provider's rate protection for distributed protection.

**The GitHub repository and its history must also be made private.** A website password cannot protect publicly downloadable repository files or copies already shared. The entry page uses standalone HTML and a native form; private application bundles are also gated, rather than exposed just to render the login. The capsule's server-side letter source also lives in the repository. Repository visibility and Vercel environment values were not changed by this code update.

The project upgrades Next.js from 14.2.15 to 15.5.28, following the October 2026 maintenance security release. React and the 3D/motion packages are upgraded together for compatibility; the unused legacy smooth-scroll dependency is removed: https://nextjs.org/blog/nextjs-security-update-october-14-2026

## Run and check

```sh
npm ci
npm run dev
node --test tests/*.test.mjs
npm run build
node tests/private-http.cjs
npm start
```

## Personal details and missing media

`lib/story.js` contains the accepted-request date (5 July 2025), counter start (25 July 2025, midnight IST), joining date (19 October 2026), city time zones and memory captions. Some editorial dates also appear in chapter copy.

`lib/personal.js` holds the short personal note and small verified details. No favourite phrases, private anecdotes or recordings were invented. To add Ashwin's real voice, upload the original audio to `public/photos/ashwin-voice-note.m4a`, set `PERSONAL.voiceSrc` to `/photos/ashwin-voice-note.m4a`, and update the transcript to match the recording. The voice player and decorative waveform appear only when a real source is configured; the written note is shown otherwise. Voice/video/background music pause one another.

The current graduation and skirt MP4s contain audio but almost entirely repeated still frames. The later supplied uploads were identical. Replace `public/photos/dolly-graduation.mp4` and `public/photos/dolly-skirt.mp4` with actual moving originals when supplied. Playback uses explicit Play, starts with sound, and provides native seek/mute/fullscreen controls and a direct-file fallback.

## Experience

- The journey chooser links to the story, research celebration, or letter, with a brief transition in Full effects mode.
- The main route omits repetitive full-screen sections; the complete gallery, timeline, story frames, achievements, profiles, reasons and promises load only when the visitor opens the optional album.
- Drag the 3D sunflower and touch its petals. The same six messages are available as keyboard-accessible buttons, including in Gentle effects or without WebGL.
- Research nodes support mouse, touch and keyboard arrow/Home/End navigation.
- City cards use each city's current local clock for dawn/day/evening/night colour palettes. These are time-of-day scenes, not astronomical sunrise calculations. Sydney daylight saving uses the named time zone.
- The anniversary capsule is checked by the server. It releases only at **19 October 2027, 00:00 IST**. Before then the API returns the release date but not the letter.
- The downloadable postcard is a self-contained SVG, served as an authenticated attachment by `/api/postcard`. It needs no external fonts or images.
- Full/Gentle effects selection persists locally. Gentle mode replaces 3D with static alternatives and reduces CSS/Framer Motion. System reduced-motion preferences are respected even in Full mode.
- 3D scenes lazy-mount near the viewport, cap pixel density, and pause offscreen/in hidden tabs. Globe land silhouettes are illustrative. Complete GPU and real-phone visual testing remains recommended; the cloud browser used for QA has no WebGL.
