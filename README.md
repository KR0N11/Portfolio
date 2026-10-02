# pingchunlui.ca

My portfolio, built around one idea: draw the blade, walk the road.

1. **The Gate** (`/`). The kneeling Tarnished under the ring. Drag the sword upward: the hilt and the fist on it rise against the pull and the blade comes up out of the ground. Let go early and it sinks back. The first touch also starts the music.
2. **The Road** (`/road`). A loop from the official Shadow of the Erdtree gameplay trailer (the Tarnished rides the ridge and the Erdtree comes into view) behind a game-style menu: Profile, Projects, Contact. Arrow keys choose, Enter travels, Esc goes back to the sword.
3. **Status** (`/profile`). A long scroll: who I am, the companies I've worked at (with logos), and full-screen scenes for each pastime. No timeline on purpose.
4. **Great Works** (`/works`). An inventory of projects. Each one plays a recording of the real app running.

## How the scenes move

The two scenes are still 4K frames. `components/LivingImage.tsx` draws each one through a small WebGL fragment shader at the screen's real resolution. A hand-made mask (`public/art/gate-mask.png`) says what may move: the clouds (G) and a weight map over the sword, fist and forearm (R) that the Gate lifts while you drag. Embers are a 2D canvas (`components/Motes.tsx`). With `prefers-reduced-motion` the scenes render a single frame.

## Editing

- All copy is in `lib/content.ts`.
- Project recordings live in `public/clips/<slug>/` (`demo.mp4`, `poster.jpg`).
- Profile photos: drop files into `public/profile/<slug>/` (`genetec`, `vffice`, `paultech`, `photography`, `gym`, `travel`, `games`) and they appear on the next build. A `public/profile/portrait.jpg` shows in the opening frame.
- Music: `public/audio/ambient-1.mp3`, credits in `public/audio/CREDITS.md`.
- Scene art and masks are in `public/art/` (official Elden Ring / Shadow of the Erdtree art from the Steam store page, FromSoftware / Bandai Namco).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/nextjs.yml`).
