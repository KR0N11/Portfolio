# pingchunlui.ca

My portfolio, built around one idea: draw the blade, walk the road.

1. **The Gate** (`/`). A kneeling figure under a sleeping ring. Press and hold the sword (or tap it three times) and light climbs from the hilt into the ring. At full draw the screen floods gold.
2. **The Road** (`/road`). Grass and mist move in the wind. Scroll to walk toward the tree. The wanderer opens the profile, the tree opens the projects, the lantern sends an email.
3. **Status** (`/profile`). Who I am, where I've worked, what I do off the clock. No timeline on purpose.
4. **Great Works** (`/works`). An inventory of projects. Each one plays a recording of the real app running.

## How the scenes move

The two scenes are still frames. `components/LivingImage.tsx` draws each one through a small WebGL fragment shader that displaces only what would move in the world (clouds, the veils in the sky, grass in the wind, ground mist) and masks out the figure, so he stays still. The ring's glow and the light climbing from the sword are drawn in the same shader from one `draw` value the Gate page drives. Embers are a 2D canvas (`components/Motes.tsx`). With `prefers-reduced-motion` the scenes render a single frame.

## Editing

- All copy is in `lib/content.ts`.
- Project recordings live in `public/clips/<slug>/` (`demo.mp4`, `poster.jpg`).
- Scene art is in `public/art/`.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/nextjs.yml`).
