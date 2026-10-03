/*
  All site copy lives here. No dates, no timeline, on purpose.
  Project facts come from each repo's README and source as of 2026-10.
*/

export const person = {
  name: "Ping Chun Lui",
  role: "Software developer",
  pitch: "Computer Science at Concordia · Software developer intern at Genetec",
  home: "Montréal",
  email: "kevinlui415@gmail.com",
  github: "https://github.com/KR0N11",
  linkedin: "https://www.linkedin.com/in/ping-chun-lui",
};

/*
  Profile photos are picked up from folders at build time, no code changes:
    public/profile/portrait.jpg        (optional, shown in the opening frame)
    public/profile/<company slug>/*    (genetec, vffice, paultech)
    public/profile/<pastime slug>/*    (photography, gym, travel, games)
*/
export const profile = {
  intro:
    "At Genetec I build Digital Twin, a live map of which systems an outage hits, and the alerts that reach each owning team within two minutes. Before that I built AI agents on Azure at Vffice.",
  served: [
    {
      slug: "genetec",
      name: "Genetec",
      title: "Software Developer Intern",
      logo: "/profile/logos/genetec-white.svg",
      body: "I built Digital Twin, a React map of which systems an outage hits across a hybrid stack, fed by KQL and OData queries, and the outage monitoring behind it: synthetic tests in two Azure regions, API heartbeats and 30+ alert rules. A Java fallback I wrote for tickets our LLM triage agent couldn't classify raised the share solved without bouncing back from 81% to 99%.",
      stack: ["React", "JavaScript", "KQL", "Java", "Azure", "Bicep", "Grafana"],
    },
    {
      slug: "vffice",
      name: "Vffice",
      title: "R&D Software Developer Intern",
      logo: "/profile/logos/vffice-wordmark-white.png",
      body: "I owned a Python RAG agent on Azure AI Foundry that drafts sales RFPs from the company's own documents. It cut document review time by 53% and was demoed at a Microsoft partner session in Toronto. I was also tech lead on the QMS project: a custom SharePoint approval workflow that calls REST APIs to trigger the next steps.",
      stack: ["Python", "Azure AI Foundry", "Azure AI Search", "Copilot Studio", "SharePoint"],
    },
    {
      slug: "paultech",
      name: "Paul Tech",
      title: "Cloud Developer Intern",
      logo: "/profile/logos/paultech-wordmark-white.png",
      body: "For CHUM hospital I built a proof of concept that moves nurses' separate Excel sheets into one registration system, and demoed it to the client's system designers. It shipped to Azure through pull-request code review.",
      stack: ["Power Pages", "Dataverse", "Azure"],
    },
  ],
  schools: [
    { name: "Concordia University", field: "Computer Science" },
    { name: "LaSalle College", field: "Computer Science" },
  ],
  pastimes: [
    {
      slug: "photography",
      name: "Photography",
      body: "I carry a small camera almost everywhere and mostly shoot friends, streets and late-afternoon light.",
      companion: {
        src: "/profile/hachiware-camera.png",
        alt: "Hachiware from Chiikawa holding a camera",
        caption: "Hachiware worked part-time jobs to save up for his camera, then photographed everything his friends did. Relatable.",
      },
    },
    {
      slug: "gym",
      name: "Gym",
      body: "I like that lifting is easy to measure: the weight on the bar either went up this month or it didn't. Hachiware from Chiikawa is the mood. He works hard, fails sometimes, yells \"make it work!\" and goes again.",
      quote: "Until death, all defeats are psychological.",
    },
    {
      slug: "travel",
      name: "Travel",
      body: "Who doesn't love Japan? Fuji over a field of nemophila, golden hour on a hillside staircase. Every trip gets photographed and vlogged.",
    },
    {
      slug: "games",
      name: "Games",
      line: "Emerald in R6. Destiny. The occasional Roblox. Never League.",
      body: "Games are how I got into code: hacking mobile games led to taking apart Android apps to see how they worked.",
    },
    {
      slug: "anime",
      name: "Manga & Anime",
      line: "Top three, in order:",
      list: ["Frieren: Beyond Journey's End", "KonoSuba", "Jujutsu Kaisen"],
      also: "Also: the Fate series and Rampart of Ice.",
      body: "Frieren for the quiet, KonoSuba for the laughs, Jujutsu Kaisen for the fights (and panels like this one).",
    },
  ] as {
    slug: string;
    name: string;
    line?: string;
    body: string;
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
  /** how the clip was made, shown under the video */
  recording: string;
  hasVideo: boolean;
};

export const works: Work[] = [
  {
    slug: "pixelring",
    name: "PixelRing",
    kind: "Distributed systems · C#",
    what: [
      "Every pixel is a key in a five-node store modeled on Amazon's Dynamo and written from scratch in C#: a hash ring, three copies of each key, and writes that need two replies.",
      "Kill a node or cut the network and writes keep landing. Hinted handoff, read repair and Merkle-tree anti-entropy bring the missing copies back once it returns.",
      "Vector clocks decide which versions to keep, and a write-ahead log lets a crashed node recover. The dashboard has buttons to kill, revive, partition and heal.",
    ],
    stack: ["C#", ".NET 10", "ASP.NET Core", "React", "TypeScript", "Canvas"],
    repo: "https://github.com/KR0N11/pixelring",
    recording: "Live run · painting, then node-b killed and revived",
    hasVideo: true,
  },
  {
    slug: "archlens",
    name: "ArchLens",
    kind: "Static analysis · C#",
    what: [
      "Paste a public C# repo and it draws an ArchiMate-style diagram: projects, services, HTTP entry points, data entities, outside systems, and the calls between them.",
      "Roslyn walks every method body. Each arrow stores the file and line that proves it, and from every HTTP entry point it traces a call flow you can click through.",
      "The analysis is static and deterministic. An optional LLM step may only relabel boxes the rules were unsure about; it can never add, remove or move an arrow.",
    ],
    stack: ["C#", ".NET 10", "Roslyn", "ASP.NET Core", "React", "React Flow"],
    repo: "https://github.com/KR0N11/archlens",
    recording: "Live run · the SampleShop sample repo, overview to call flow",
    hasVideo: true,
  },
  {
    slug: "waypoint",
    name: "Waypoint",
    kind: "Maps and pathfinding · TypeScript",
    what: [
      "Draws Montréal's roads, water, parks and about 14k building footprints on a canvas from raw OpenStreetMap data, with its own Web Mercator projection. No maps, tile or routing API.",
      "Click two points: a quadtree snaps each click to the nearest road, and A* finds the path over about 58k intersections, with walk, bike and drive times.",
      "A visualizer runs Dijkstra and A* side by side with live node counts. Across 300 test routes, A* explored about 80% fewer nodes at the median.",
    ],
    stack: ["TypeScript", "React", "Canvas 2D", "Vite", "OpenStreetMap"],
    repo: "https://github.com/KR0N11/waypoint",
    recording: "Live run · route, Dijkstra vs A*, isochrone",
    hasVideo: true,
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    kind: "AI on-call copilot · Python",
    what: [
      "When an alert fires, it folds related alerts into one incident, works out which other services are about to be hit, and builds one timeline of logs, deploys and feature flag changes.",
      "It ranks likely root causes with a fixed scoring formula, so the ranking can be tested, and shows the runbook and evidence behind each one.",
      "Read-only checks run on their own. Any change waits at an approval step until a person says yes.",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "HTMX", "LlamaIndex", "Terraform"],
    repo: "https://github.com/KR0N11/sentinel",
    recording: "Live run · CLI triage of incident inc-001, offline replay mode",
    hasVideo: true,
  },
  {
    slug: "sisyphus",
    name: "Sisyphus",
    kind: "Reinforcement learning · Python",
    what: [
      "A small neural network learns World 1-1 of Super Mario Bros from scratch. It sees only stacked gray frames and picks one of 7 button combos.",
      "It is trained with PPO on many copies of the NES emulator at once.",
      "A wall of emulators races a see-through ghost Mario from a run tuned in the emulator. Borders turn green when a Mario is ahead of the ghost and red when behind.",
    ],
    stack: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "OpenCV"],
    repo: "https://github.com/KR0N11/sisyphus",
    recording: "Live run · trained model on 10 emulators · real time",
    hasVideo: true,
  },
  {
    slug: "loom",
    name: "Loom",
    kind: "Multi-agent analysis · Python",
    what: [
      "Ask a question about messy tables in plain English. Five agents plan the analysis, find the right tables and columns, run SQL in a sandbox, check the numbers, and write a short memo with charts.",
      "The verifier works out each key number a second way and checks units, sample sizes, nulls, duplicates and truncation. A failed check forces the headline to say UNVERIFIED.",
      "Every memo ends with an audit appendix listing each query that ran.",
    ],
    stack: ["Python", "LangGraph", "Pydantic", "DuckDB", "Streamlit", "FastAPI"],
    repo: "https://github.com/KR0N11/loom",
    recording: "Ingest, semantic retrieval and the DuckDB query · no LLM step",
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
    recording: "Live run · a 10-word lesson",
    hasVideo: true,
  },
];
