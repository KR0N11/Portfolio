# Ping Chun Lui — Portfolio

A modern, Netflix-inspired developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Framer Motion**. Features smooth animations, responsive design, and an interactive guestbook.

**Live:** [pingchunlui.ca](https://pingchunlui.ca)

---

## Table of Contents

- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Data Management](#data-management)
- [Styling](#styling)
- [Deployment](#deployment)
- [License](#license)

---

## Preview

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen intro with animated gradient orbs, profile image, and CTA buttons |
| **About** | Location map, education, languages, tech tags, and 3D hobby carousel |
| **Projects** | Auto-rotating showcase with phone/browser mockups and detail modals |
| **Skills** | Categorized grid with tech icons across 6 domains |
| **Experience** | Vertical timeline with alternating cards and animated markers |
| **Guestbook** | Interactive post-it note board with CRUD functionality |
| **Achievements** | Horizontal scroll row with certifications and personal milestones |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/), [DevIcons](https://devicon.dev/), [Simple Icons](https://simpleicons.org/) |
| **Font** | Inter (self-hosted woff2 via `next/font`) |
| **Linting** | ESLint 9 with `eslint-config-next` |

---

## Project Structure

```
Portfolio/
├── public/
│   ├── image/              # Project mockups, profile photo, hobby images
│   └── fonts/              # Inter font files (woff2, weights 300–700)
├── data/
│   └── notes.json          # Guestbook entries (file-based storage)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout — metadata, fonts, theme provider
│   │   ├── page.tsx        # Homepage — assembles all sections
│   │   ├── globals.css     # Tailwind imports + Netflix theme variables
│   │   ├── guestbook/
│   │   │   └── page.tsx    # Guestbook page
│   │   ├── achievements/
│   │   │   └── page.tsx    # Achievements page
│   │   └── api/
│   │       └── notes/
│   │           └── route.ts # Guestbook REST API (GET/POST/DELETE)
│   ├── components/
│   │   ├── Navbar.tsx      # Fixed nav with mobile hamburger menu
│   │   ├── Hero.tsx        # Animated hero with gradient background
│   │   ├── About.tsx       # Bio, map, education, hobbies carousel
│   │   ├── Projects.tsx    # Auto-rotating project showcase
│   │   ├── Skills.tsx      # Categorized tech skills grid
│   │   ├── SkillsGlobe.tsx # 3D canvas-based skills globe (alternative)
│   │   ├── SkillsMobile.tsx# Accordion skills layout (alternative)
│   │   ├── Experience.tsx  # Work experience timeline
│   │   ├── MoreToExplore.tsx # Navigation cards to subpages
│   │   ├── Footer.tsx      # Contact CTA + site footer
│   │   ├── Guestbook.tsx   # Post-it note board
│   │   ├── Achievements.tsx# Certifications & milestones
│   │   └── ScrollRow.tsx   # Reusable horizontal scroll container
│   ├── context/
│   │   └── ThemeContext.tsx # Dark/light mode with localStorage persistence
│   └── data/
│       └── portfolio.ts    # Centralized portfolio content
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
├── eslint.config.mjs
└── CNAME                   # Custom domain: pingchunlui.ca
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/KR0N11/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server at http://localhost:3000
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

---

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Main portfolio — Hero, About, Projects, Skills, Experience, Footer |
| `/guestbook` | `src/app/guestbook/page.tsx` | Interactive post-it note guestbook |
| `/achievements` | `src/app/achievements/page.tsx` | Certifications, awards, and personal milestones |
| `/api/notes` | `src/app/api/notes/route.ts` | REST API for guestbook entries (GET, POST, DELETE) |

---

## Components

### Core Sections

| Component | Description |
|-----------|-------------|
| `Navbar` | Fixed navigation with smooth scroll anchors. Transparent on top, solid on scroll. Mobile hamburger menu with staggered animation. |
| `Hero` | Full-viewport intro with animated gradient orbs, grid overlay, profile image with mask, and dual CTA buttons. |
| `About` | OpenStreetMap embed with scanner animation, education card, language proficiency bars, floating tech tags, and a 3D Coverflow hobby carousel with tilt/holographic effects. |
| `Projects` | Auto-rotating featured project display (6s interval) with phone/browser frame mockups, thumbnail sidebar, and a detail modal showing description, tech stack, and action links. |
| `Skills` | Six-category grid (Languages, Frameworks, Cloud & AI, Tools, Databases, Enterprise) with color-coded accent bars and tech icons from DevIcons/Simple Icons. |
| `Experience` | Vertical timeline with alternating left/right cards. Current role has a pulsing red marker. Keyword tags extracted from highlights. |
| `Footer` | Contact call-to-action, four-column navigation grid, social icons, and copyright. |

### Subpages

| Component | Description |
|-----------|-------------|
| `Guestbook` | Draggable post-it notes with random colors, rotation, and positions. Create and delete notes via the `/api/notes` endpoint. Spring-based add/remove animations. |
| `Achievements` | Horizontal scroll row of cards — certifications (PL-900, PL-400), awards, and fitness milestones with progress bars. |
| `ScrollRow` | Reusable horizontal scroll wrapper with hover-activated arrow buttons. |

### Alternative Skill Views

| Component | Description |
|-----------|-------------|
| `SkillsGlobe` | Interactive 3D globe rendered on HTML Canvas with Fibonacci sphere positioning, drag-to-rotate, and category filtering. |
| `SkillsMobile` | Accordion-style collapsible categories optimized for small screens. |

---

## Data Management

All portfolio content is centralized in `src/data/portfolio.ts`:

- **`skillCategories`** — Technical skills grouped into 6 categories with icon URLs
- **`experiences`** — Work history with titles, companies, date ranges, and highlights
- **`projects`** — Featured projects with descriptions, tech stacks, and key highlights
- **`certifications`** — Professional certifications (Microsoft PL-900, PL-400)
- **`contactInfo`** — Email, phone, LinkedIn, and GitHub links

The guestbook uses a file-based JSON store at `data/notes.json`, managed by the API route at `/api/notes`.

---

## Styling

### Theme

The site uses a **Netflix-inspired dark theme** defined in `src/app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--netflix-red` | `#E50914` | Primary accent — buttons, highlights, active states |
| `--netflix-bg` | `#141414` | Page background |
| `--netflix-card` | `#181818` | Card backgrounds |
| `--netflix-border` | `#333333` | Subtle borders |

### Key Design Patterns

- **Glassmorphism** — Transparent borders with backdrop blur on cards and navbar
- **Gradient orbs** — Animated pulsing shapes in the hero background
- **Hover scaling** — Cards scale up with shadow on hover (`netflix-card` utility)
- **Custom scrollbars** — Hidden scrollbars for Netflix-style horizontal rows
- **Selection styling** — Text selection uses the red accent color

### Responsive Breakpoints

The layout is mobile-first using Tailwind's default breakpoints (`sm`, `md`, `lg`). Key adaptations:

- **Mobile**: Single column, hamburger nav, stacked project cards
- **Tablet** (`md`): Two-column grids, side-by-side timeline
- **Desktop** (`lg`): Full multi-column layouts, hover interactions

---

## Deployment

The project is configured for deployment on **Vercel**:

1. Connect the GitHub repository to [Vercel](https://vercel.com)
2. The `CNAME` file maps to the custom domain `pingchunlui.ca`
3. Vercel auto-detects the Next.js framework and applies optimal build settings

No environment variables are required — the guestbook uses local file storage.

---

## License

This project is private and not licensed for redistribution. All rights reserved by Ping Chun Lui.
