/*
  All site copy lives here. No dates, no timeline, on purpose.
  Project facts come from each repo's README and source as of 2026-10.
*/

export const person = {
  name: "Ping Chun Lui",
  role: "Software developer",
  pitch: "Computer Science at Concordia · Montréal",
  home: "Montréal",
  email: "kevinlui415@gmail.com",
  github: "https://github.com/KR0N11",
  linkedin: "https://www.linkedin.com/in/ping-chun-lui",
};

/*
  Profile photos are picked up from folders at build time, no code changes:
    public/profile/portrait.webp       (optional, shown in the opening frame)
    public/profile/<company slug>/*    (genetec, vffice, paultech)
    public/profile/<pastime slug>/*    (photography, gym, travel, games)
*/
export const profile = {
  intro:
    "Hi, I'm Ping! I want to build things that make people's day a little easier, and I'm just getting started.",
  quote: "A fool in motion will go further than a genius sitting still.",
  served: [
    {
      slug: "genetec",
      name: "Genetec",
      title: "Software Developer Intern",
      logo: "/profile/logos/genetec-white.svg",
      body: "I work on Digital Twin, an internal React app that shows how our systems depend on each other, and the alerts that go off when something breaks.",
    },
    {
      slug: "vffice",
      name: "Vffice",
      title: "R&D Software Developer Intern",
      logo: "/profile/logos/vffice-wordmark-white.png",
      body: "I built two AI agents in Python. One writes first drafts of sales proposals, the other sets up access for new employees.",
    },
    {
      slug: "paultech",
      name: "Paul Tech",
      title: "Cloud Developer Intern",
      logo: "/profile/logos/paultech-wordmark-white.png",
      body: "My first internship. I built a proof of concept for CHUM hospital that put the nurses' Excel sheets into one system.",
    },
  ],
  schools: [
    { name: "Concordia University", field: "Computer Science", logo: "/profile/logos/concordia-white.svg" },
    { name: "LaSalle College", field: "Computer Science", logo: "/profile/logos/lasalle-white.svg" },
  ],
  /* Skills by group: [name, icon file in public/skills]. */
  skills: [
    { group: "Languages", items: [["Python", "python"], ["JavaScript", "javascript"], ["Java", "java"], ["C#", "csharp"], ["TypeScript", "typescript"], ["Swift", "swift"]] },
    { group: "Frontend", items: [["React", "react"], ["HTML", "html5"], ["CSS", "css3"], ["Next.js", "nextjs"]] },
    { group: "Backend & Cloud", items: [["Azure", "azure"], [".NET", "dotnetcore"], ["Node.js", "nodejs"], ["PostgreSQL", "postgresql"], ["AWS", "amazonwebservices"], ["Docker", "docker"]] },
    { group: "Other", items: [["Git", "git"], ["GitHub", "github"], ["Azure DevOps", "azuredevops"], ["PyTorch", "pytorch"]] },
  ] as { group: string; items: [string, string][] }[],
  pastimes: [
    {
      slug: "photography",
      alts: ["Ping taking a mirror photo with a compact camera"],
      name: "Photography",
      body: "Small camera, always in the bag. Mostly friends, streets, and that light right before sunset.",
      companion: {
        src: "/profile/hachiware-camera.png",
        alt: "Hachiware from Chiikawa holding a camera",
        caption: "Hachiware worked part-time jobs to save up for his camera, then photographed everything his friends did. Relatable.",
      },
    },
    {
      slug: "gym",
      alts: ["Weight plates and dumbbells at home"],
      name: "Gym",
      body: "The bar doesn't care how my week went. The weight either went up or it didn't (some months it didn't). Hachiware is the mood: fail, yell “make it work!”, go again.",
    },
    {
      slug: "travel",
      alts: ["Mount Fuji behind a field of blue nemophila flowers", "A hillside staircase in Japan at golden hour"],
      name: "Travel",
      body: "Japan, mostly. Fuji over a field of blue flowers, a hillside staircase at golden hour. Every trip gets photographed and vlogged.",
    },
    {
      slug: "games",
      alts: ["Rainbow Six Siege clip, aiming down a hallway"],
      name: "Games",
      line: "Emerald in R6. Destiny. The occasional Roblox. Never League.",
    },
    {
      slug: "anime",
      alts: ["Jujutsu Kaisen panel: Yuji yelling about a special grade larper"],
      name: "Manga & Anime",
      line: "Top three, in order:",
      list: ["Frieren: Beyond Journey's End", "KonoSuba", "Jujutsu Kaisen"],
      also: "Also: the Fate series and Rampart of Ice.",
      body: "Frieren for the quiet, KonoSuba for the laughs, Jujutsu Kaisen for the fights (and panels like this one).",
    },
  ] as {
    slug: string;
    /** alt text for each photo, in file order */
    alts?: string[];
    name: string;
    line?: string;
    body?: string;
    list?: string[];
    also?: string;
    quote?: string;
    companion?: { src: string; alt: string; caption: string };
  }[],
};

export type Work = {
  slug: string;
  name: string;
  kind: string;
  what: string[];
  stack: string[];
  repo: string;
  /** what the clip shows, one line under the video */
  recording: string;
  /** how the recording was made, when that needs saying; a footnote after the bullets */
  note?: string;
  hasVideo: boolean;
  /** width / height of the recording, when it isn't 16:10 */
  aspect?: number;
  /** a light-mode recording, dimmed so it doesn't glare on the dark page */
  bright?: boolean;
};

export const works: Work[] = [
  {
    slug: "pixelring",
    name: "PixelRing",
    kind: "Distributed systems · C#",
    what: [
      "Every pixel is a key in a five-node store modeled on Amazon's Dynamo and written from scratch in C#: a hash ring, three copies of each key, and writes that need two replies.",
      "Kill a node or cut the network and writes keep landing. Hinted handoff, read repair and Merkle-tree anti-entropy bring the missing copies back once it returns.",
      "Merkle trees are kept per key range, not per node, because two replicas only share some ranges. 59 tests cover a node killed mid-write, partitions, crash recovery and anti-entropy.",
    ],
    stack: ["C#", ".NET 10", "ASP.NET Core", "React", "TypeScript", "Canvas"],
    repo: "https://github.com/KR0N11/pixelring",
    recording: "Live run · canvas painted through the API; node-b killed and revived; a partition leaves two versions of the same pixels",
    hasVideo: true,
    aspect: 1600 / 1300,
  },
  {
    slug: "archlens",
    name: "ArchLens",
    kind: "Static analysis · C#",
    what: [
      "Paste a public C# repo and it draws an ArchiMate-style diagram: projects, services, HTTP entry points, data entities, outside systems, and the calls between them.",
      "Roslyn walks every method body. Each arrow stores the file and line that proves it, and from every HTTP entry point it traces a call flow you can click through.",
      "The analysis is static and deterministic. An optional LLM step may only relabel boxes the rules were unsure about; it can never add, remove or move an arrow. On dotnet/eShop it maps 19 projects, 1,064 boxes and 613 arrows in 2.9 s.",
    ],
    stack: ["C#", ".NET 10", "Roslyn", "ASP.NET Core", "React", "React Flow"],
    repo: "https://github.com/KR0N11/archlens",
    recording: "Live run · dotnet/eShop from a fresh clone, then the call flow for POST api/orders/draft with the file and line behind each arrow",
    note: "The clip starts as the analysis finishes.",
    hasVideo: true,
  },
  {
    slug: "waypoint",
    name: "Waypoint",
    kind: "Maps and pathfinding · TypeScript",
    what: [
      "Draws Montréal's roads, water, parks and about 14k building footprints on a canvas from raw OpenStreetMap data, with its own Web Mercator projection. No maps, tile or routing API.",
      "Click two points: a quadtree snaps each click to the nearest road, and A* finds the path over about 58k intersections, with walk, bike and drive times.",
      "A visualizer runs Dijkstra and A* side by side. Across 300 test routes A* explored about 80% fewer nodes at the median, and that benchmark caught a real bug: rounding edges to 0.1 m let the heuristic overestimate, so 2 routes came back 0.1 m too long. Edges are now clamped and a smoke test guards it.",
    ],
    stack: ["TypeScript", "React", "Canvas 2D", "Vite", "OpenStreetMap"],
    repo: "https://github.com/KR0N11/waypoint",
    recording: "Live run · a 1.06 km route with walk, bike and drive times; A* racing Dijkstra; a 10-minute walk isochrone",
    note: "The race speed is raised on screen with the visualizer's own slider.",
    hasVideo: true,
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    kind: "AI on-call copilot · Python",
    what: [
      "When an alert fires, it folds related alerts into one incident, works out which other services are about to be hit, and builds one timeline of logs, deploys and feature flag changes.",
      "It ranks likely root causes with a fixed scoring formula, so the ranking can be tested, and shows the runbook and evidence behind each one.",
      "Read-only checks run on their own; any change waits for a person to approve it. On 28 generated, labelled incident recordings it ranked the right root cause first 92.9% of the time, and ran no change without approval.",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "HTMX", "LlamaIndex", "Terraform"],
    repo: "https://github.com/KR0N11/sentinel",
    recording: "Live run · triage of incident inc-001 in offline replay mode, then a scroll back through the output",
    note: "`--yes` approves the change at the prompt. The LLM is a deterministic stub here, so the call and cost line is the stub's own count.",
    hasVideo: true,
  },
  {
    slug: "sisyphus",
    name: "Sisyphus",
    kind: "Reinforcement learning · Python",
    what: [
      "A small neural network learns World 1-1 of Super Mario Bros from scratch, trained with PPO on many copies of the NES emulator at once. It sees only stacked gray frames and picks one of 7 button combos.",
      "A wall of emulators races a see-through ghost Mario; borders turn green when a Mario is ahead and red when behind. The ghost comes from jump timings tuned inside the emulator, because frame-perfect speedrun inputs drift out of sync between emulators.",
    ],
    stack: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "OpenCV"],
    repo: "https://github.com/KR0N11/sisyphus",
    recording: "Live run · trained model on 10 emulators · real time",
    hasVideo: true,
    aspect: 1280 / 600,
  },
  {
    slug: "loom",
    name: "Loom",
    kind: "Multi-agent analysis · Python",
    what: [
      "Ask a question about messy tables in plain English. Five agents are built to plan the analysis, find the right tables and columns, run SQL in a sandbox, check the numbers, and write a short memo with charts.",
      "The verifier works out each key number a second way and checks units, sample sizes, nulls, duplicates and truncation. A failed check forces the headline to say UNVERIFIED.",
      "Built and tested so far: ingest, semantic retrieval, the DuckDB sandbox and a 172-question benchmark with answers checked against the real data. The full run with the LLM hasn't happened yet.",
    ],
    stack: ["Python", "LangGraph", "Pydantic", "DuckDB", "Streamlit", "FastAPI"],
    repo: "https://github.com/KR0N11/loom",
    recording: "Semantic retrieval with Loom's HybridSearch, then a DuckDB query · no LLM step",
    note: "Retrieval runs from a short demo script, and the SQL is written by hand and run directly in DuckDB. The ingest shows when the terminal scrolls back.",
    hasVideo: true,
  },
  {
    slug: "recap",
    name: "Re:Cap",
    kind: "Developer tool · Python",
    what: [
      "Turns a git diff, a ref range, or a GitHub pull request into release notes, a changelog entry, or a PR description.",
      "It reads the actual code changes and flags breaking ones from the diff itself: removed APIs, changed signatures, dropped CLI flags.",
      "Large diffs are split into chunks and summarized first. A GitHub Action posts the notes as one PR comment that updates on every push.",
    ],
    stack: ["Python", "Click", "httpx", "Anthropic API", "GitHub Actions"],
    repo: "https://github.com/KR0N11/recap",
    recording: "Saved output · the httpx 0.26.0 diff and the notes Re:Cap wrote for it",
    hasVideo: true,
  },
  {
    slug: "mactype",
    name: "mactype",
    kind: "Typing trainer · JavaScript",
    what: [
      "A touch typing trainer for Mac users that counts how often you look down: a long pause inside a word is scored as a look-down.",
      "There is no text box, so macOS smart quotes, substitutions and the accent popup can't change what you type. It reads key presses straight off the page.",
      "Eleven lessons from the home row to symbols and code. Best scores, a day streak and your most-missed keys stay in the browser, with no account and no server.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "localStorage", "Vitest"],
    repo: "https://github.com/KR0N11/mactype",
    recording: "Live run · a 10-word lesson typed with real keypresses, then the results",
    hasVideo: true,
  },
];
