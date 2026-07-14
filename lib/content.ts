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

export const projects = [
  {
    title: "Digital Twin Monitoring App",
    description:
      "Full observability stack for an enterprise CRM platform, built from scratch at Genetec: synthetic availability tests, 30+ alert rules as Bicep IaC, auto-remediation runbooks, and a Grafana SLA dashboard tracking uptime against 99.5% bands.",
    tags: ["Azure Monitor", "Bicep", "Grafana", "KQL"],
    size: "large" as const,
  },
  {
    title: "AI Triage Agent",
    description:
      "A Java service that reads incident tickets, reasons over 10K+ records to classify component and severity, and routes each ticket to the right engineer. Cut manual triage time 40%.",
    tags: ["Java", "AI agents", "Azure DevOps"],
    size: "medium" as const,
  },
  {
    title: "RELAY",
    description:
      "Real-time iOS recruiting app for live interview scheduling. Firestore data model, security rules, and listener architecture, load-tested with 1,000+ simulated concurrent users.",
    tags: ["SwiftUI", "Firebase", "iOS"],
    size: "medium" as const,
  },
  {
    title: "Intern Monitor",
    description:
      "A job-alert bot that watches Montréal and Toronto internship postings and pings me on Discord every 30 minutes.",
    tags: ["Python", "Discord API", "Automation"],
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
    // [INVENTED] swap any of these three if they're not you
    title: "Coffee",
    note: "Yes, the grind size matters.",
  },
  {
    // [INVENTED]
    title: "Keyboards",
    note: "Mechanical, obviously. Currently chasing the perfect switch.",
  },
  {
    // [INVENTED]
    title: "F1",
    note: "Weekends are for race strategy and armchair engineering.",
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
