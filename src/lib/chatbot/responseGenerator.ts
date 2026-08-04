/**
 * Response Generator - Creates responses from processed queries + resume data
 */

import {
  getStructuredResumeData,
  type StructuredResumeData,
} from "./resumeForChat";
import {
  ProcessedQuery,
  QueryIntent,
  extractInfoRequests,
  type ConversationHints,
} from "./queryProcessor";

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  data?: unknown;
}

export interface ResponseContext extends ConversationHints {
  recentTurns?: { role: "user" | "assistant"; content: string }[];
}

const DEFAULT_SUGGESTIONS = [
  "What's his experience at VertoFx?",
  "Tell me about Sorstain",
  "What technologies does he work with?",
  "Show me his projects",
];

function matchesEntity(haystack: string, entity: string): boolean {
  const h = haystack.toLowerCase();
  const e = entity.toLowerCase().trim();
  if (!e) return false;
  return h.includes(e) || e.includes(h.split(/[\s(]/)[0]);
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text.slice(0, 160).trim();
}

/**
 * Generate response based on processed query and optional conversation context
 */
export function generateResponse(
  query: ProcessedQuery,
  context?: ResponseContext
): ChatResponse {
  const resumeData = getStructuredResumeData();
  const infoRequests = extractInfoRequests(query);

  // Merge last entities from context when following up
  if (context?.lastEntities?.length && query.entities.length === 0) {
    query = { ...query, entities: [...context.lastEntities] };
  }

  switch (query.intent) {
    case QueryIntent.GREETING:
      return generateGreeting();
    case QueryIntent.EXPERIENCE:
      return generateExperienceResponse(query, resumeData, infoRequests);
    case QueryIntent.SKILLS:
      return generateSkillsResponse(query, resumeData);
    case QueryIntent.PROJECTS:
      return generateProjectsResponse(query, resumeData);
    case QueryIntent.EDUCATION:
      return generateEducationResponse(resumeData);
    case QueryIntent.CERTIFICATES:
      return generateCertificatesResponse(resumeData);
    case QueryIntent.AWARDS:
      return generateAwardsResponse(resumeData);
    case QueryIntent.PUBLICATIONS:
      return generatePublicationsResponse(resumeData);
    case QueryIntent.RESEARCH:
      return generateResearchResponse(resumeData);
    case QueryIntent.CONTACT:
      return generateContactResponse(resumeData);
    case QueryIntent.GENERAL:
      return generateGeneralResponse(resumeData);
    default:
      return generateFallbackResponse(query, resumeData);
  }
}

function generateGreeting(): ChatResponse {
  const greetings = [
    "Hi! I'm Emmanuel's AI assistant. I can help you learn about his experience, skills, projects, and more. What would you like to know?",
    "Hello! I'm here to answer questions about Emmanuel's background and expertise. How can I help you today?",
    "Hey there! Feel free to ask me anything about Emmanuel's work experience, technical skills, or projects.",
  ];

  return {
    message: greetings[Math.floor(Math.random() * greetings.length)],
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

function generateExperienceResponse(
  query: ProcessedQuery,
  resumeData: StructuredResumeData,
  infoRequests: string[]
): ChatResponse {
  const { experience } = resumeData;

  const mentionedCompany = query.entities.find((e) =>
    experience.some((exp) => matchesEntity(exp.company, e))
  );

  if (mentionedCompany) {
    const exp = experience.find((e) =>
      matchesEntity(e.company, mentionedCompany)
    );
    if (exp) {
      return {
        message: `At **${exp.company}**, Emmanuel worked as a ${exp.title} (${exp.duration}).\n\n${exp.description}`,
        suggestions: [
          "What were his biggest achievements?",
          "Tell me about Sorstain",
          "What technologies does he use?",
        ],
      };
    }
  }

  if (infoRequests.includes("current")) {
    const current = experience[0];
    return {
      message: `Emmanuel is currently a **${current.title}** at **${current.company}** (since ${current.start}).\n\n${current.description}`,
      suggestions: [
        "What technologies does he specialize in?",
        "Show me his side projects",
        "What about his previous companies?",
      ],
    };
  }

  if (infoRequests.includes("first")) {
    const first = experience[experience.length - 1];
    return {
      message: `Emmanuel started his career at **${first.company}** as a ${first.title} (${first.duration}).\n\n${first.description}`,
      suggestions: [
        "How has his career evolved since?",
        "What's his current role?",
        "Tell me about his technical skills",
      ],
    };
  }

  if (
    infoRequests.includes("achievements") ||
    query.keywords.includes("achieve") ||
    query.keywords.includes("impact") ||
    query.keywords.includes("achievement")
  ) {
    const bullets = experience
      .map((exp) => `• **${exp.company}**: ${firstSentence(exp.description)}`)
      .join("\n");

    return {
      message: `Emmanuel has delivered measurable impact across his roles:\n\n${bullets}`,
      suggestions: [
        "What technologies and tools does he use?",
        "Tell me about Sorstain",
        "What certifications has he earned?",
      ],
    };
  }

  const totalYears = calculateYearsOfExperience(experience);
  const companies = experience.map((e) => e.company).join(", ");

  return {
    message: `Emmanuel has ${totalYears}+ years of experience as a software engineer, having worked at ${companies}. He specializes in product growth, AI-powered features, and building scalable systems.\n\nHis most recent role at **${experience[0].company}** is **${experience[0].title}**.`,
    suggestions: [
      `What's his role at ${experience[0].company.split(" ")[0]}?`,
      "What are his biggest career achievements?",
      "Show me his technical stack",
    ],
    data: { experience },
  };
}

function generateSkillsResponse(
  query: ProcessedQuery,
  resumeData: StructuredResumeData
): ChatResponse {
  const { skills, projects } = resumeData;

  const mentionedTech = query.entities.find((e) =>
    skills.some((skill) => matchesEntity(skill, e))
  );

  if (mentionedTech) {
    const skill = skills.find((s) => matchesEntity(s, mentionedTech));
    const relatedProjects = projects
      .filter((p) =>
        p.technologies.some((t) => matchesEntity(t, mentionedTech))
      )
      .map((p) => p.title);

    const projectNote =
      relatedProjects.length > 0
        ? `\n\nYou'll also see it in projects like ${relatedProjects
            .slice(0, 3)
            .join(", ")}.`
        : "";

    return {
      message: `Yes — **${skill ?? mentionedTech}** is part of Emmanuel's core stack.${projectNote}`,
      suggestions: [
        "What other technologies is he proficient in?",
        "Show me his projects",
        "Tell me about his experience",
      ],
    };
  }

  const frontend = skills.filter((s) =>
    /react|angular|typescript|javascript|next/i.test(s)
  );
  const backend = skills.filter((s) =>
    /node|express|python|django/i.test(s)
  );
  const ai = skills.filter((s) => /openai|vertex|opencv|ai|ml/i.test(s));
  const cloud = skills.filter((s) =>
    /aws|redis|kafka|dynamodb|mongodb|mysql|sqs|lambda/i.test(s)
  );

  return {
    message: `Emmanuel is a full-stack engineer with expertise across multiple domains:

**Frontend:** ${frontend.join(", ") || "—"}
**Backend:** ${backend.join(", ") || "—"}
**AI/ML:** ${ai.join(", ") || "—"}
**Cloud & Data:** ${cloud.join(", ") || "—"}

He's particularly strong in building scalable systems, AI-powered features, and product growth initiatives.`,
    suggestions: [
      "Show me projects using these technologies",
      "Tell me about Sorstain",
      "What's his most impressive achievement?",
    ],
    data: { skills },
  };
}

function generateProjectsResponse(
  query: ProcessedQuery,
  resumeData: StructuredResumeData
): ChatResponse {
  const { projects } = resumeData;

  const mentionedProject = query.entities.find((e) =>
    projects.some((p) => matchesEntity(p.title, e))
  );

  if (mentionedProject) {
    const project = projects.find((p) =>
      matchesEntity(p.title, mentionedProject)
    );
    if (project) {
      return {
        message: `**${project.title}**: ${project.description}

Built with: ${project.technologies.join(", ")}${
          project.link ? `\n\nCheck it out: ${project.link}` : ""
        }`,
        suggestions: [
          "Show me his other projects",
          "What technologies does he specialize in?",
          "Tell me about his work experience",
        ],
      };
    }
  }

  const projectList = projects
    .map((p) => `• **${p.title}**: ${p.description}`)
    .join("\n\n");

  return {
    message: `Emmanuel has built several projects:\n\n${projectList}`,
    suggestions: [
      "Tell me about Sorstain",
      "Tell me about ObiChops",
      "What are his core technologies?",
    ],
    data: { projects },
  };
}

function generateEducationResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const edu = resumeData.education[0];

  return {
    message: `Emmanuel holds a ${edu.degree} from **${edu.school}** (${edu.duration}).

${edu.gpa ? `Academic standing: ${edu.gpa}.` : ""}${
      edu.additionalInfo ? ` During his time there, he served as a ${edu.additionalInfo}.` : ""
    }`,
    suggestions: [
      "What certifications has he earned?",
      "Tell me about his work experience",
      "What are his technical skills?",
    ],
    data: { education: resumeData.education },
  };
}

function generateCertificatesResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { certificates } = resumeData;

  const certList = certificates
    .map(
      (cert) =>
        `• **${cert.title}** (${cert.date}) — ${cert.skills
          .slice(0, 3)
          .join(", ")}${cert.skills.length > 3 ? "…" : ""}`
    )
    .join("\n");

  return {
    message: `Emmanuel has earned several professional certifications:\n\n${certList}`,
    suggestions: [
      "What are his core technical skills?",
      "Tell me about his work at VertoFx",
      "Show me his projects",
    ],
    data: { certificates },
  };
}

function generateAwardsResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { awards } = resumeData;

  const awardList = awards
    .map((award) => `• **${award.title}** at ${award.company} (${award.year})`)
    .join("\n");

  return {
    message: `Emmanuel has received notable recognition for his work:\n\n${awardList}`,
    suggestions: [
      "What are his biggest achievements at VertoFx?",
      "What technologies does he specialize in?",
      "Show me his projects",
    ],
    data: { awards },
  };
}

function generatePublicationsResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { publications } = resumeData;

  const pubList = publications
    .map((pub) => `• **${pub.title}** (${pub.year})`)
    .join("\n");

  return {
    message: `Emmanuel has shared his knowledge through several publications:\n\n${pubList}`,
    suggestions: [
      "What technologies is he expert in?",
      "Show me his projects",
      "What about his work experience?",
    ],
    data: { publications },
  };
}

function generateResearchResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { researchInterests, researchProjects } = resumeData;

  const interests = researchInterests.join(", ");

  const projectLines = researchProjects
    .map((p) => {
      const highlights = p.highlights.map((h) => `  • ${h}`).join("\n");
      return `• **${p.title}** (${p.year})\n${highlights}${
        p.link ? `\n  Link: ${p.link}` : ""
      }`;
    })
    .join("\n\n");

  return {
    message: `Emmanuel is active in applied AI research with interests spanning: ${interests}.

Recent research project(s):
${projectLines}`,
    suggestions: [
      "Show me his publications",
      "What technologies does he use?",
      "Tell me about his experience",
    ],
    data: { researchInterests, researchProjects },
  };
}

function generateContactResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { personalInfo } = resumeData;
  const { contact } = personalInfo;

  const linkedIn = contact.social.find((s) => s.name === "LinkedIn")?.url;
  const github = contact.social.find((s) => s.name === "GitHub")?.url;
  const x = contact.social.find((s) => s.name === "X")?.url;

  const lines = [
    `Email: ${contact.email}`,
    linkedIn ? `LinkedIn: ${linkedIn}` : null,
    github ? `GitHub: ${github}` : null,
    x ? `X: ${x}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    message: `You can reach Emmanuel through:

${lines}

He's currently based in ${personalInfo.location} and open to discussing exciting opportunities.`,
    suggestions: [
      "What's his experience at VertoFx?",
      "Tell me about Sorstain",
      "Show me his technical skills",
    ],
    data: { contact: { email: contact.email, social: contact.social } },
  };
}

function generateGeneralResponse(
  resumeData: StructuredResumeData
): ChatResponse {
  const { personalInfo, experience } = resumeData;
  const totalYears = calculateYearsOfExperience(experience);
  const companies = experience.map((e) => e.company).join(", ");

  return {
    message: `**Emmanuel Obi** is a ${personalInfo.title} based in ${personalInfo.location}.

${personalInfo.summary}

With ${totalYears}+ years of experience, he's worked at ${companies}, specializing in product growth, AI-powered features, and scalable system architecture.`,
    suggestions: [
      "What are his biggest career achievements?",
      "Tell me about Sorstain",
      "Show me his most impressive projects",
    ],
  };
}

function generateFallbackResponse(
  query: ProcessedQuery,
  resumeData: StructuredResumeData
): ChatResponse {
  // Best-effort: if we extracted entities, answer about them
  const company = resumeData.experience.find((exp) =>
    query.entities.some((e) => matchesEntity(exp.company, e))
  );
  if (company) {
    return generateExperienceResponse(
      { ...query, intent: QueryIntent.EXPERIENCE, entities: [company.company] },
      resumeData,
      []
    );
  }

  const project = resumeData.projects.find((p) =>
    query.entities.some((e) => matchesEntity(p.title, e))
  );
  if (project) {
    return generateProjectsResponse(
      { ...query, intent: QueryIntent.PROJECTS, entities: [project.title] },
      resumeData
    );
  }

  const skill = resumeData.skills.find((s) =>
    query.entities.some((e) => matchesEntity(s, e))
  );
  if (skill) {
    return generateSkillsResponse(
      { ...query, intent: QueryIntent.SKILLS, entities: [skill] },
      resumeData
    );
  }

  return {
    message:
      "I'm not quite sure how to answer that, but I can tell you about Emmanuel's work experience, technical skills, projects (including Sorstain and ObiChops), education, certifications, awards, and publications. What would you like to know?",
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

/**
 * Calculate years of experience from earliest start month/year to now
 */
function calculateYearsOfExperience(
  experience: StructuredResumeData["experience"]
): number {
  if (experience.length === 0) return 0;

  const monthMap: Record<string, number> = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
  };

  let earliest = Date.now();

  for (const job of experience) {
    const parts = job.start.trim().split(/\s+/);
    if (parts.length < 2) continue;
    const month = monthMap[parts[0].toLowerCase()];
    const year = parseInt(parts[1], 10);
    if (month === undefined || Number.isNaN(year)) continue;
    const startMs = new Date(year, month, 1).getTime();
    if (startMs < earliest) earliest = startMs;
  }

  const years = (Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(years));
}
