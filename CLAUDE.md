# Portfolio (pingchunlui.ca)

My personal site, in pixel art. Next.js 16 static export (`output: "export"`,
`trailingSlash: true`), React 19, CSS modules, no UI library. GitHub Pages
deploys it through `.github/workflows/nextjs.yml`. A push to `main` goes live
right away, so every push is a release.

## Commands
```bash
npm ci
npm run dev       # http://localhost:3000
npm run build     # static export to out/ (the same build CI runs)
```
There are no tests and no lint script. The check before every commit is:
`npm run build` finishes with no errors, and the changed page works in
`npm run dev` at desktop width and at 390px.

## Layout
- `app/page.tsx` Gate (sword pull), `app/road/` grace menu, `app/profile/`
  About, `app/works/` projects.
- `components/Knight.tsx` plays the knight's sprite sheet. `LivingImage.tsx`
  and `DepthScene.tsx` draw scenes with WebGL.
- `lib/content.ts` holds all site copy. Change words there, not in pages.
- `public/art/` scene art and sprite sheets, `public/clips/<slug>/` project
  recordings, `public/pixel/` 9-slice frames.
- The knight's sprite sheet is built by scripts outside this repo
  (`~/Downloads/sword_pull/rig/build3.py`). Don't hand-edit the PNG.

## How a change gets made
One change = one branch in its own worktree, merged into `main` with a
merge commit. The history should read as a list of features.

```bash
git worktree add ../Portfolio-<slug> -b feature/<slug> main
# work, build and commit inside ../Portfolio-<slug>
git switch main
git merge --no-ff feature/<slug>
git worktree remove ../Portfolio-<slug>
```

- Prefixes: `feature/` something new, `fix/` something broken, `design/` a
  review round, `chore/` setup, `ci/` the workflow.
- Commit message: what changed for a visitor, in one line.
  Example: `Gate: the knight yanks the sword straight up, nothing rotates`.
- Merge message:
  ```
  Merge feature/<slug>: <one line>

  Goal: what it should do.
  Changed course: what was tried and dropped, and why. (if any)
  Checked: what was actually run or opened.
  Not checked: what wasn't. (if any)
  ```
  Only write `Checked:` for something that was really run. No made-up numbers.

## Design rules
These come from versions I rejected.
- Keep the original key-art knight. Never redraw, rotate, stretch or
  "clean up" his pixels with an algorithm. He only moves in whole pixels.
- Art must look hand-made. Failures so far: global dither (screen door), mode
  filters (camouflage), glow, gold gradients, template layouts, serif
  monogram icons.
- Pixel grid: `--px` is 4px, 2px on phones (`max-width: 640px` or short
  landscape). Textures sample with `NEAREST` and snap to the art grid.
- Fonts: Jersey 15 for titles and menus, lowercase only (its capital S reads
  as B). IBM Plex Sans for paragraphs.
- Before showing me any visual change, even a favicon, run two independent
  reviews: one for design quality, one for "does this look generic or
  AI-made?" Give the reviewers my past reactions word for word. Fix and repeat
  until both pass.

## Content rules
- No resume link anywhere on the site.
- No timeline or dates on the profile.
- Tagline is "Software developer". Don't put CS or Concordia in it.

## Deploy
- Ask before every push to `main`.
- Don't add `static_site_generator: next` back to the configure-pages step.
  It rewrites next.config, drops `trailingSlash`, and every subpage 404s.
- When you replace an image that browsers may have cached, give it a new file
  name (that's why the sheet is `gate-knight-yank.png`).
- After a deploy, check that `/`, `/road/`, `/profile/` and `/works/` all
  return 200 on https://pingchunlui.ca.

## Git
- Commit author: `Ping <129549223+KR0N11@users.noreply.github.com>`.
- No Claude co-author trailer or attribution on commits or PRs
  (`.claude/settings.json` turns it off).
