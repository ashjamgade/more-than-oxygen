# More Than Oxygen

A personal, responsive story for Dolly with two themes, interactive photographs, original ambient music, and optional WebGL scenes.

## Run and check

```sh
npm ci
npm run dev
node --test tests/story-geometry.test.mjs
npm run build
npm start
```

## Personal details

`lib/story.js` is the source for the request date (5 July 2025), counter start (25 July 2025, midnight IST), IIT Bombay joining date (19 October 2026), city time zones and memory captions. The joining date and some editorial dates are also displayed in chapter copy. Photos and videos are under `public/photos/`.

## Experience

- Golden particles gather into Dolly's name; the portrait can also be revealed immediately.
- A sticky, scroll-driven starfield moves the camera through three story moments.
- An animated discovery-inspired chapter celebrates IIT Bombay.
- A draggable 3D globe connects geographically placed Mumbai and Sydney markers with a moving light. Land silhouettes are deliberately illustrative, not mapping data.
- Six floating photographs form a memory constellation. The same memories can be opened with ordinary keyboard-accessible buttons.
- Photo cards tilt gently on desktop pointers, with a reflective overlay. Their dialog includes previous/next controls and Escape dismissal.
- An envelope unfolds into a paragraph-by-paragraph letter, with a Show all button.
- A sunflower blooms at the finale. All three response choices work; answers stay in the page and are not sent or stored.
- An original ambient score uses Web Audio. Sound starts only after Play; pause, mute and volume are available. No external music service is loaded.

## Motion and compatibility

3D scenes are lazy-mounted near the viewport, pause rendering when offscreen or the tab is hidden, and cap pixel density. WebGL failures and reduced-motion preferences use static fallbacks; memory buttons remain usable. Light/dark selection persists locally and initially follows the device preference. The pre-hydration theme script avoids a flash of the wrong theme.

## Privacy and deployment

The secret-word screen is a surprise reveal, not authentication. A public repository and `public/` media remain publicly accessible. No genuine access-control layer is included.

The project retains its existing Next.js dependency; this feature change is not a dependency/security upgrade. Use a hosting preview to verify the full GPU effects and phone layouts before merging into production.
