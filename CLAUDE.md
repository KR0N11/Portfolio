# Portfolio (pingchunlui.ca)

Personal site. Next.js static export (`output: "export"`, `trailingSlash: true`)
deployed to GitHub Pages by `.github/workflows/nextjs.yml`. A push to `main`
deploys live, so treat every push as a release.

## Commands
```bash
npm ci
npm run dev       # local dev server
npm run build     # static export to out/ (what CI runs)
```

## Layout
- `app/` routes, `components/` scene and UI pieces, `lib/content.ts` site copy,
  `public/` art, clips and audio.

## Rules
- Ask before every push to `main`; it goes live immediately.
- Don't add `static_site_generator: next` back to the configure-pages step.
  It rewrites next.config, drops `trailingSlash`, and every subpage 404s.
- Before showing any visual change (including small assets like the favicon),
  run two independent reviews: one for design quality and one for "does this
  look generic / AI-made?" Fix and repeat until both pass. Glow, gold
  gradients, template layouts and generic serif monograms count as failures.
- After a deploy, check every route returns 200 on the live domain.
- Commit author: `Ping <129549223+KR0N11@users.noreply.github.com>`.
- No Claude co-author trailer or attribution on commits or PRs.
