# pingchunlui.ca

My portfolio, built around one idea: draw the blade, walk the road.

1. **The Gate** (`/`). The kneeling Tarnished under the ring. Drag the sword upward: the hilt and the fist on it rise against the pull and the blade comes up out of the ground. Let go early and it sinks back.
2. **The Road** (`/road`). Grass and mist move in the wind. Scroll to walk toward the tree. The wanderer opens the profile, the tree opens the projects, the lantern sends an email.
3. **Status** (`/profile`). Who I am, where I've worked, what I do off the clock. No timeline on purpose.
4. **Great Works** (`/works`). An inventory of projects. Each one plays a recording of the real app running.

## How the scenes move

The two scenes are still 4K frames. `components/LivingImage.tsx` draws each one through a small WebGL fragment shader at the screen's real resolution. A hand-made mask per scene (`public/art/*-mask.png`) says what may move: grass and sky veils on the road (gravestones and the rider are cut out), clouds on the gate, and a weight map over the sword, fist and forearm that the Gate page lifts while you drag. Embers are a 2D canvas (`components/Motes.tsx`). With `prefers-reduced-motion` the scenes render a single frame.

## Editing

- All copy is in `lib/content.ts`.
- Project recordings live in `public/clips/<slug>/` (`demo.mp4`, `poster.jpg`).
- Scene art and masks are in `public/art/` (official Elden Ring / Shadow of the Erdtree art from the Steam store page, FromSoftware / Bandai Namco).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/nextjs.yml`).
