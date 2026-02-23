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
    name: "Programming & Scripting",
    color: "#3b82f6",
    items: [
      { name: "Java", icon: `${DI}/java/java-original.svg`, abbr: "Ja" },
      { name: "Python", icon: `${DI}/python/python-original.svg`, abbr: "Py" },
      { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg`, abbr: "JS" },
      { name: "Angular", icon: `${DI}/angularjs/angularjs-original.svg`, abbr: "Ng" },
      { name: "C#", icon: `${DI}/csharp/csharp-original.svg`, abbr: "C#" },
      { name: "SQL", icon: `${SI}/mysql/4479A1`, abbr: "SQL" },
      { name: "Swift", icon: `${DI}/swift/swift-original.svg`, abbr: "Sw" },
      { name: "JSON", icon: `${DI}/json/json-original.svg`, abbr: "{}" },
    ],
  },
  {
    name: "AI & Automation",
    color: "#8b5cf6",
    items: [
      { name: "Azure", icon: `${DI}/azure/azure-original.svg`, abbr: "Az" },
      { name: "Azure Functions", icon: `${SI}/azurefunctions/0062AD`, abbr: "AF" },
      { name: "Copilot Studio", icon: `${SI}/microsoft/5E5E5E`, abbr: "CS" },
      { name: "Copilot Agent", icon: `${SI}/microsoft/5E5E5E`, abbr: "CA" },
      { name: "Power Automate", icon: `${SI}/powerautomate/0066FF`, abbr: "PA" },
      { name: "AWS SDK", icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, abbr: "SDK" },
      { name: "AWS CDK", icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, abbr: "CDK" },
    ],
  },
  {
    name: "CRM & ERP",
    color: "#f59e0b",
    items: [
      { name: "Dynamics 365", icon: "https://img.icons8.com/color/48/dynamics-365.png", abbr: "D365" },
      { name: "Business Central", icon: "https://img.icons8.com/color/48/microsoft-dynamics-365.png", abbr: "BC" },
      { name: "Dataverse", icon: "https://img.icons8.com/color/48/microsoft.png", abbr: "DV" },
      { name: "Power Apps", icon: "https://img.icons8.com/color/48/power-apps.png", abbr: "PA" },
      { name: "SharePoint", icon: "https://img.icons8.com/color/48/sharepoint.png", abbr: "SP" },
      { name: "ZOHO CRM", icon: `${SI}/zoho/C8202B`, abbr: "ZO" },
    ],
  },
  {
    name: "Tools & Frameworks",
    color: "#10b981",
    items: [
      { name: "VS Code", icon: `${DI}/vscode/vscode-original.svg`, abbr: "VS" },
      { name: "GitHub", icon: `${DI}/github/github-original.svg`, abbr: "GH" },
      { name: "Firebase", icon: `${DI}/firebase/firebase-original.svg`, abbr: "FB" },
      { name: "Flask", icon: `${DI}/flask/flask-original.svg`, abbr: "Fl" },
      { name: "React.js", icon: `${DI}/react/react-original.svg`, abbr: "Re" },
      { name: "Tableau", icon: `${SI}/tableau/E97627`, abbr: "Tb" },
      { name: "Oracle", icon: `${DI}/oracle/oracle-original.svg`, abbr: "Or" },
      { name: "Linux", icon: `${DI}/linux/linux-original.svg`, abbr: "Lx" },
      { name: "Jupyter", icon: `${DI}/jupyter/jupyter-original-wordmark.svg`, abbr: "Jp" },
      { name: "Docker", icon: `${DI}/docker/docker-original.svg`, abbr: "Dk" },
    ],
  },
  {
    name: "APIs & Databases",
    color: "#ef4444",
    items: [
      { name: "REST APIs", icon: `${SI}/fastapi/009688`, abbr: "API" },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg`, abbr: "Mg" },
      { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg`, abbr: "Pg" },
      { name: "SQL Server", icon: `${DI}/microsoftsqlserver/microsoftsqlserver-original.svg`, abbr: "MS" },
      { name: "Postman", icon: `${DI}/postman/postman-original.svg`, abbr: "Pm" },
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
      "A recruitment application designed for career fairs, enabling real-time state updates and end-to-end event management logic.",
    tech: ["Firebase", "Xcode", "SwiftUI"],
    highlight:
      "Real-time state updates and end-to-end event management logic",
    image: "/image/relay_1.png",
  },
  {
    title: "MOODIFY",
    period: "Jan 2024 - May 2024",
    description:
      "Live AI-powered meeting application providing real-time analysis of sentiment and emotions during video calls.",
    tech: ["Agora", "AWS", "GPT-4", "React.js"],
    highlight:
      "Real-time analysis pipeline for sentiment and emotion insights using AWS Rekognition",
    image: "/image/modifiy.png",
  },
  {
    title: "Blitz",
    period: "2024",
    description:
      "A biometric login and file management system leveraging advanced image analysis for secure authentication.",
    tech: ["React", "Google Vision API"],
    highlight:
      "Secure biometric authentication and streamlined file management",
    image: "/image/Blitz.png",
  },
  {
    title: "TutorVerse",
    period: "2024",
    description:
      "An Android application connecting students and tutors with integrated scheduling, real-time messaging, and comprehensive rating systems.",
    tech: ["Java", "Firebase"],
    highlight:
      "Integrated scheduling, booking, real-time messaging, and rating system",
    image: "/image/Tutorverse_1.png",
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
