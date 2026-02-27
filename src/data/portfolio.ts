const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

export interface TechItem {
  name: string;
  icon: string | null;
  abbr: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  items: TechItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    color: "#3b82f6",
    items: [
      { name: "Java", icon: `${DI}/java/java-original.svg`, abbr: "Ja" },
      { name: "Python", icon: `${DI}/python/python-original.svg`, abbr: "Py" },
      { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg`, abbr: "JS" },
      { name: "C#", icon: `${DI}/csharp/csharp-original.svg`, abbr: "C#" },
      { name: "SQL", icon: `${SI}/mysql/4479A1`, abbr: "SQL" },
      { name: "Swift", icon: `${DI}/swift/swift-original.svg`, abbr: "Sw" },
    ],
  },
  {
    name: "Frameworks",
    color: "#8b5cf6",
    items: [
      { name: "React.js", icon: `${DI}/react/react-original.svg`, abbr: "Re" },
      { name: "Angular", icon: `${DI}/angularjs/angularjs-original.svg`, abbr: "Ng" },
      { name: "Flask", icon: `${SI}/flask/ffffff`, abbr: "Fl" },
      { name: "Firebase", icon: `${DI}/firebase/firebase-original.svg`, abbr: "FB" },
    ],
  },
  {
    name: "Cloud & AI",
    color: "#10b981",
    items: [
      { name: "Azure", icon: `${DI}/azure/azure-original.svg`, abbr: "Az" },
      { name: "Azure Functions", icon: `${SI}/azurefunctions/0062AD`, abbr: "AF" },
      { name: "Copilot Studio", icon: `${SI}/microsoft/ffffff`, abbr: "CS" },
      { name: "Power Automate", icon: `${SI}/powerautomate/0066FF`, abbr: "PA" },
      { name: "AWS SDK", icon: `${SI}/amazonwebservices/FF9900`, abbr: "SDK" },
      { name: "AWS CDK", icon: `${SI}/amazonwebservices/FF9900`, abbr: "CDK" },
    ],
  },
  {
    name: "Tools",
    color: "#f59e0b",
    items: [
      { name: "VS Code", icon: `${SI}/visualstudiocode/007ACC`, abbr: "VS" },
      { name: "GitHub", icon: `${SI}/github/ffffff`, abbr: "GH" },
      { name: "Docker", icon: `${SI}/docker/2496ED`, abbr: "Dk" },
      { name: "Linux", icon: `${SI}/linux/FCC624`, abbr: "Lx" },
      { name: "Postman", icon: `${SI}/postman/FF6C37`, abbr: "Pm" },
      { name: "Jupyter", icon: `${SI}/jupyter/F37626`, abbr: "Jp" },
      { name: "Tableau", icon: `${SI}/tableau/E97627`, abbr: "Tb" },
    ],
  },
  {
    name: "Databases",
    color: "#ef4444",
    items: [
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg`, abbr: "Mg" },
      { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg`, abbr: "Pg" },
      { name: "SQL Server", icon: `${DI}/microsoftsqlserver/microsoftsqlserver-original.svg`, abbr: "MS" },
      { name: "Oracle", icon: `${DI}/oracle/oracle-original.svg`, abbr: "Or" },
    ],
  },
  {
    name: "Enterprise",
    color: "#ec4899",
    items: [
      { name: "Dynamics 365", icon: `${SI}/dynamics365/0B53CE`, abbr: "D365" },
      { name: "Business Central", icon: `${SI}/dynamics365/0B53CE`, abbr: "BC" },
      { name: "Dataverse", icon: `${SI}/dataverse/0B53CE`, abbr: "DV" },
      { name: "Power Apps", icon: `${SI}/powerapps/A239CA`, abbr: "PA" },
      { name: "SharePoint", icon: `${SI}/microsoftsharepoint/0078D4`, abbr: "SP" },
      { name: "ZOHO CRM", icon: `${SI}/zoho/C8202B`, abbr: "ZO" },
    ],
  },
];

export const experiences = [
  {
    title: "Software Developer",
    company: "Vffice",
    period: "May 2025 - Present",
    highlights: [
      "Leading the full lifecycle of proprietary AI Agents built on Java-based LLMs, from design through deployment and iteration",
      "Architected an AI Copilot for automated code reviews, demoed and showcased at Microsoft HQ",
      "Engineered a Quality Management System (QMS) with automated CI/CD validation pipelines",
      "Mentoring interns on workflow automation best practices and agile development processes",
    ],
  },
  {
    title: "Cloud Developer Intern",
    company: "Paul Tech Inc.",
    period: "Jun 2024 - Apr 2025",
    highlights: [
      "Built a digital patient registration system for CHUM hospital, streamlining intake workflows",
      "Designed and managed Azure DevOps release pipelines for continuous delivery",
      "Scaled enterprise systems from on-premise to cloud-based CRM on Microsoft Dataverse",
    ],
  },
];

export const projects = [
  {
    title: "RELAY",
    period: "Oct 2025 - Nov 2025",
    description:
      "Recruitment app for career fairs with real-time state updates and event management.",
    tech: ["Firebase", "Xcode", "SwiftUI"],
    highlight: "Real-time state sync and end-to-end event logic",
  },
  {
    title: "MOODIFY",
    period: "Jan 2024 - May 2024",
    description:
      "AI-powered meeting app with real-time sentiment and emotion analysis during video calls.",
    tech: ["Agora", "AWS", "GPT-4", "React.js"],
    highlight: "Sentiment pipeline using AWS Rekognition",
  },
  {
    title: "Blitz",
    period: "2024",
    description:
      "Biometric login system using image analysis for secure authentication and file management.",
    tech: ["React", "Google Vision API"],
    highlight: "Biometric auth via Google Vision API",
  },
  {
    title: "TutorVerse",
    period: "2024",
    description:
      "Android app connecting students and tutors with scheduling, messaging, and ratings.",
    tech: ["Java", "Firebase"],
    highlight: "Scheduling, real-time messaging, and rating system",
  },
];

export const certifications = [
  {
    title: "PL-900",
    subtitle: "Microsoft Power Platform Fundamentals",
    issuer: "Microsoft",
  },
  {
    title: "PL-400",
    subtitle: "Microsoft Power Platform Developer Associate",
    issuer: "Microsoft",
  },
];

export const contactInfo = {
  phone: "514-443-9889",
  email: "kevinlui415@gmail.com",
  linkedin: "https://linkedin.com/in/ping-chun-lui",
  github: "https://github.com/KR0N11",
};
