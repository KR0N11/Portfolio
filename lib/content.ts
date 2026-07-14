/*
  All site copy lives here - edit this one file to change the site.
  Populated from the real CV (2026-07). Anything still fabricated is
  tagged [INVENTED]; search for that string to review it.
*/

export const identity = {
  name: "Ping Chun Lui",
  role: "Software Developer",
  tagline: "Building AI agents and enterprise tools that actually ship.",
  subline: "Currently software developer intern @ Genetec, Montréal. Aiming higher.",
  location: "Montréal, QC",
};

export const nav = [
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "beyond", index: "05", label: "Beyond" },
  { id: "contact", index: "06", label: "Contact" },
] as const;

export const about = {
  heading: "I don't ship black boxes.",
  paragraphs: [
    "Early-career software developer out of LaSalle College's co-op program, now studying Computer Science at Concordia, with a few years of runway left, and moving fast.",
    "Third internship in, currently at Genetec in Montréal, where I own the observability roadmap for an enterprise CRM platform. I'm strongest in the Microsoft Power Platform ecosystem (PL-400 certified) and in building AI agents, with solid Java and C# underneath and Python sharpening by the week.",
    "The rule I build by: if I can't explain every layer of what I shipped, it isn't done. I'd rather ship something simple I fully understand, then iterate it to polish, than hand over a black box.",
  ],
  stats: [
    { value: "2 min", label: "Outage detection, down from hours" },
    { value: "40%", label: "Manual triage time cut by my routing service" },
    { value: "1,500+", label: "Production workflows under monitoring" },
  ],
};

export const experience = [
  {
    year: "2026",
    company: "Genetec",
    role: "Software Developer Intern",
    points: [
      "Sole owner of the final four phases of the Digital Operations observability roadmap for an enterprise CRM platform running 1,500+ production workflows.",
      "Cut outage detection from hours to under 2 minutes with synthetic availability tests across 2 Azure regions and heartbeats on 6 production systems.",
      "Wrote a Java service that classifies Azure DevOps tickets by component and severity and routes them automatically, cutting manual triage time 40%.",
      "Deployed 30+ Azure Monitor alert rules as Bicep IaC and built auto-remediation runbooks with full audit trails and Teams escalation.",
    ],
  },
  {
    year: "2025",
    company: "Vffice",
    role: "Software Developer, R&D",
    points: [
      "Hired as intern, retained part-time in R&D. Built and maintained 100+ production workflow integrations across Dynamics 365, Business Central, and Dataverse.",
      "Owned the internal AI initiative: designed and delivered 2 production LLM agents using GPT-4 function calling with RAG over REST APIs and SQL data.",
      "Built a Python AI code-review copilot adopted internally and demoed at Microsoft Canada headquarters in Toronto.",
    ],
  },
  {
    year: "2024",
    company: "Paul Tech",
    role: "Cloud Developer Intern",
    points: [
      "Cut patient onboarding time 30% at CHUM Hospital with a digital registration platform built on Dataverse and Power Apps.",
      "Migrated on-premises SQL Server databases to a cloud CRM architecture, redesigning schemas for API-driven integrations.",
    ],
  },
];

/* All four are public repos on my GitHub; cards link straight to them. */
export const projects = [
  {
    title: "Moodify",
    description:
      "A business video chat app with live transcription, emotion detection, and an integrated assistant that handles on-call notes and follow-ups, so teams can focus on the conversation instead of the paperwork.",
    tags: ["React", "GPT-4", "AWS Rekognition", "Firebase"],
    href: "https://github.com/KR0N11/Moodify_",
    size: "large" as const,
  },
  {
    title: "Blitz",
    description:
      "A secure document management system with Face ID authentication and encrypted file sharing, built for teams that handle sensitive data.",
    tags: ["React", "Firebase", "Face ID"],
    href: "https://github.com/KR0N11/Blitz-app",
    size: "medium" as const,
  },
  {
    title: "Campus Library",
    description:
      "An iOS resource management app built for Collège LaSalle: book inventory, loan tracking, member records, and local data persistence.",
    tags: ["Swift", "iOS", "Persistence"],
    href: "https://github.com/KR0N11/Campus_Library",
    size: "medium" as const,
  },
  {
    title: "Inventory Manager",
    description:
      "A web-based Java inventory system covering products, suppliers, order workflows, and downloadable stock reports.",
    tags: ["Java", "JSP", "Web"],
    href: "https://github.com/KR0N11/inventory-manager",
    size: "small" as const,
  },
];

export const skills = {
  groups: [
    {
      label: "Languages",
      items: ["Java", "Python", "C#", "TypeScript / JavaScript", "SQL", "Swift"],
    },
    {
      label: "Platforms",
      items: [
        "Power Apps",
        "Power Automate",
        "Azure",
        "Dynamics 365",
        "Azure DevOps",
      ],
      highlight: "PL-400 Certified · Power Platform",
    },
    {
      label: "Focus",
      items: [
        "AI agents & RAG",
        "Observability",
        "Enterprise automation",
      ],
    },
  ],
};

export const beyond = [
  {
    title: "Gym",
    note: "Consistency over motivation.",
  },
  {
    title: "Cooking",
    note: "A precision hobby. Same energy as debugging.",
  },
  {
    // [INVENTED] swap this one if it's not you
    title: "Coffee",
    note: "Yes, the grind size matters.",
  },
  {
    title: "Gaming",
    note: "Emerald in R6. Destiny. The occasional Roblox. Never League.",
  },
  {
    title: "Travel",
    note: "Camera always packed. Every trip gets photographed and vlogged.",
  },
];

/* Rotates daily on the site; add or cut freely. */
export const quotes = [
  {
    text: "Give a man a fish and you feed him for a day. Teach a man to fish and you feed him for a lifetime.",
    by: "Proverb",
  },
  {
    text: "Throughout heaven and earth, I alone am the honored one.",
    by: "Satoru Gojo, Jujutsu Kaisen",
  },
  {
    text: "Stand proud. You are strong.",
    by: "Sukuna, Jujutsu Kaisen",
  },
  {
    text: "From here on, it's overtime.",
    by: "Kento Nanami, Jujutsu Kaisen",
  },
  {
    text: "Don't worry. I'm the strongest.",
    by: "Satoru Gojo, Jujutsu Kaisen",
  },
  {
    text: "Job's not finished.",
    by: "Kobe Bryant",
  },
  {
    text: "Slow is smooth. Smooth is fast.",
    by: "Unknown",
  },
  {
    text: "The best time to plant a tree was twenty years ago. The second best time is now.",
    by: "Proverb",
  },
  {
    text: "Amateurs talk strategy. Professionals talk logistics.",
    by: "Omar Bradley",
  },
];

export const contact = {
  heading: "Let's build something.",
  sub: "Open to conversations, internships, and hard problems.",
  email: "kevinlui415@gmail.com",
  github: "https://github.com/KR0N11",
  linkedin: "https://www.linkedin.com/in/ping-chun-lui",
  footer: "Built from scratch. Like everything else I ship.",
};
