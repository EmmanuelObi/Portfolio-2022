/**
 * Response Generator - Creates natural language responses based on query analysis and resume data
 */

import { RESUME_DATA } from "@/data/resume-data";
import {
  ProcessedQuery,
  QueryIntent,
  extractInfoRequests,
} from "./queryProcessor";

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  data?: any;
}

// Helper function to get structured data for chatbot (server-side compatible)
function getStructuredResumeData() {
  return {
    personalInfo: {
      name: RESUME_DATA.name,
      title: RESUME_DATA.about,
      location: RESUME_DATA.location,
      summary: RESUME_DATA.summary,
      contact: RESUME_DATA.contact,
    },
    experience: RESUME_DATA.work.map((job) => ({
      company: job.company,
      title: job.title,
      duration: `${job.start} - ${job.end}`,
      description: job.description,
      location: job.badges.join(", "),
    })),
    education: RESUME_DATA.education.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      duration: `${edu.start} - ${edu.end}`,
      gpa: "gpa" in edu ? edu.gpa : undefined,
      additionalInfo: "additionalInfo" in edu ? edu.additionalInfo : undefined,
    })),
    skills: RESUME_DATA.skills,
    projects: RESUME_DATA.projects.map((project) => ({
      title: project.title,
      description: project.description,
      technologies: project.techStack,
      link: "link" in project ? project.link.href : undefined,
    })),
    certificates: "certificates" in RESUME_DATA ? RESUME_DATA.certificates : [],
    publications: "publications" in RESUME_DATA ? RESUME_DATA.publications : [],
    awards: "awards" in RESUME_DATA ? RESUME_DATA.awards : [],
    researchInterests:
      "researchInterests" in RESUME_DATA ? RESUME_DATA.researchInterests : [],
    researchProjects:
      "researchProjects" in RESUME_DATA ? RESUME_DATA.researchProjects : [],
  };
}

/**
 * Generate response based on processed query
 */
export function generateResponse(query: ProcessedQuery): ChatResponse {
  const resumeData = getStructuredResumeData();
  const infoRequests = extractInfoRequests(query);

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
      return generateFallbackResponse(query);
  }
}

/**
 * Greeting responses
 */
function generateGreeting(): ChatResponse {
  const greetings = [
    "Hi! I'm Emmanuel's AI assistant. I can help you learn about his experience, skills, projects, and more. What would you like to know?",
    "Hello! I'm here to answer questions about Emmanuel's background and expertise. How can I help you today?",
    "Hey there! Feel free to ask me anything about Emmanuel's work experience, technical skills, or projects.",
  ];

  return {
    message: greetings[Math.floor(Math.random() * greetings.length)],
    suggestions: [
      "What's his experience at VertoFx?",
      "Tell me about his technical skills",
      "Show me his most impactful projects",
      "What achievements has he earned?",
    ],
  };
}

/**
 * Experience responses
 */
function generateExperienceResponse(
  query: ProcessedQuery,
  resumeData: ReturnType<typeof getStructuredResumeData>,
  infoRequests: string[]
): ChatResponse {
  const { experience } = resumeData;

  // Check for specific company mentions
  const mentionedCompany = query.entities.find((e) =>
    experience.some((exp) => exp.company.toLowerCase().includes(e))
  );

  if (mentionedCompany) {
    const exp = experience.find((e) =>
      e.company.toLowerCase().includes(mentionedCompany)
    );
    if (exp) {
      return {
        message: `At ${exp.company}, Emmanuel worked as a ${exp.title} (${exp.duration}). ${exp.description}`,
        suggestions: [
          "What were his biggest achievements there?",
          "What technologies did he use?",
          "Tell me about his other roles",
        ],
      };
    }
  }

  // Current/recent experience
  if (infoRequests.includes("current")) {
    const current = experience[0];
    return {
      message: `Emmanuel is currently a ${current.title} at ${
        current.company
      }, where he's been since ${
        current.duration.split(" - ")[0]
      }. He led the design and implementation of an AI-powered onboarding flow that increased user activation by 60% and reduced onboarding time from 2 weeks to just 1 day. He also built retention workflows that recovered over $2M in revenue within 48 hours!`,
      suggestions: [
        "What technologies does he specialize in?",
        "Show me his side projects",
        "What about his previous companies?",
      ],
    };
  }

  // First/early experience
  if (infoRequests.includes("first")) {
    const first = experience[experience.length - 1];
    return {
      message: `Emmanuel started his career at ${first.company} as a ${
        first.title
      } (${first.duration}). ${first.description.substring(0, 200)}...`,
      suggestions: [
        "How has his career evolved since?",
        "What's his current role?",
        "Tell me about his technical skills",
      ],
    };
  }

  // Achievements focus
  if (
    infoRequests.includes("achievements") ||
    query.keywords.includes("achieve") ||
    query.keywords.includes("impact")
  ) {
    return {
      message: `Emmanuel has achieved remarkable results throughout his career:

• At VertoFx: Led AI-powered onboarding that achieved 60% activation increase and recovered $2M+ in revenue within 48 hours
• At RoadPreppers: Built features supporting 10x user growth, reduced development time by 50%
• At Atlens: Improved code efficiency by 15%+ and contributed to 20% increase in customer acquisition

He specializes in product growth, onboarding optimization, and building scalable systems.`,
      suggestions: [
        "What technologies and tools does he use?",
        "Show me his most impressive projects",
        "What certifications has he earned?",
      ],
    };
  }

  // General experience overview
  const totalYears = calculateYearsOfExperience(experience);
  const companies = experience.map((e) => e.company).join(", ");

  return {
    message: `Emmanuel has ${totalYears}+ years of experience as a software engineer, having worked at ${companies}. He specializes in product growth, AI-powered features, and building scalable systems. His most recent role at VertoFx (YC 2019) focuses on implementing AI-driven onboarding and retention strategies that have delivered exceptional results.`,
    suggestions: [
      "What's his role at VertoFx?",
      "What are his biggest career achievements?",
      "Show me his technical stack",
    ],
    data: { experience },
  };
}

/**
 * Skills responses
 */
function generateSkillsResponse(
  query: ProcessedQuery,
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { skills } = resumeData;

  // Check for specific technology mentions
  const mentionedTech = query.entities.find((e) =>
    skills.some((skill) => skill.toLowerCase().includes(e))
  );

  if (mentionedTech) {
    const hasSkill = skills.some((s) =>
      s.toLowerCase().includes(mentionedTech.toLowerCase())
    );
    if (hasSkill) {
      return {
        message: `Yes, Emmanuel has extensive experience with ${mentionedTech}! It's part of his core tech stack. He's used it across multiple projects including VertoFx, LARA, and WireMoney.`,
        suggestions: [
          "What other technologies is he proficient in?",
          "Show me projects where he used this",
          "Tell me about his experience",
        ],
      };
    }
  }

  // Categorize skills
  const frontend = skills.filter((s) =>
    /react|angular|typescript|javascript/i.test(s)
  );
  const backend = skills.filter((s) => /node|express|python|django/i.test(s));
  const ai = skills.filter((s) => /openai|vertexai|ai|ml/i.test(s));
  const cloud = skills.filter((s) =>
    /aws|redis|kafka|dynamodb|mongodb/i.test(s)
  );

  return {
    message: `Emmanuel is a full-stack engineer with expertise across multiple domains:

**Frontend:** ${frontend.join(", ")}
**Backend:** ${backend.join(", ")}
**AI/ML:** ${ai.join(", ")}
**Cloud & Infrastructure:** ${cloud.join(", ")}

He's particularly strong in building scalable systems, AI-powered features, and product growth initiatives.`,
    suggestions: [
      "Show me projects using these technologies",
      "What's his most impressive achievement?",
      "Tell me about his AI/ML work",
    ],
    data: { skills },
  };
}

/**
 * Projects responses
 */
function generateProjectsResponse(
  query: ProcessedQuery,
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { projects } = resumeData;

  // Check for specific project mentions
  const mentionedProject = query.entities.find((e) =>
    projects.some((p) => p.title.toLowerCase().includes(e))
  );

  if (mentionedProject) {
    const project = projects.find((p) =>
      p.title.toLowerCase().includes(mentionedProject)
    );
    if (project) {
      const techStack = project.technologies.join(", ");
      return {
        message: `**${project.title}**: ${project.description}

Built with: ${techStack}${
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

  // General projects overview
  const projectList = projects
    .map((p) => `• **${p.title}**: ${p.description}`)
    .join("\n\n");

  return {
    message: `Emmanuel has built several impressive projects:

${projectList}

Each project demonstrates his ability to build scalable, user-focused applications.`,
    suggestions: [
      "What's his role at VertoFx?",
      "What are his core technologies?",
      "Tell me about his achievements",
    ],
    data: { projects },
  };
}

/**
 * Education responses
 */
function generateEducationResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const edu = resumeData.education[0];

  return {
    message: `Emmanuel holds a ${edu.degree} from ${edu.school} (${edu.duration}).

He graduated with an impressive ${edu.gpa}, placing him in the top 1% of his class. During his time there, he served as a ${edu.additionalInfo}.`,
    suggestions: [
      "What certifications has he earned?",
      "Tell me about his work experience",
      "What are his technical skills?",
    ],
    data: { education: resumeData.education },
  };
}

/**
 * Certificates responses
 */
function generateCertificatesResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { certificates } = resumeData;

  const certList = certificates
    .map(
      (cert) =>
        `• **${cert.title}** (${cert.date}) - ${cert.skills
          .slice(0, 3)
          .join(", ")}${cert.skills.length > 3 ? "..." : ""}`
    )
    .join("\n");

  return {
    message: `Emmanuel has earned several professional certifications:

${certList}

These certifications demonstrate his commitment to continuous learning and expertise in secure coding, system architecture, and microservices.`,
    suggestions: [
      "What are his core technical skills?",
      "Tell me about his work at VertoFx",
      "Show me his projects",
    ],
    data: { certificates },
  };
}

/**
 * Awards responses
 */
function generateAwardsResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { awards } = resumeData;

  const awardList = awards
    .map((award) => `• **${award.title}** at ${award.company} (${award.year})`)
    .join("\n");

  return {
    message: `Emmanuel has received notable recognition for his work:

${awardList}

These awards reflect his exceptional performance and impact at VertoFx, where he's driving significant product growth and innovation.`,
    suggestions: [
      "What are his biggest achievements at VertoFx?",
      "What technologies does he specialize in?",
      "Show me his projects",
    ],
    data: { awards },
  };
}

/**
 * Publications responses
 */
function generatePublicationsResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { publications } = resumeData;

  const pubList = publications
    .map((pub) => `• **${pub.title}** (${pub.year})`)
    .join("\n");

  return {
    message: `Emmanuel has shared his knowledge through several publications:

${pubList}

He's passionate about sharing technical insights and helping other developers improve their skills.`,
    suggestions: [
      "What technologies is he expert in?",
      "Show me his impressive projects",
      "What about his work experience?",
    ],
    data: { publications },
  };
}

/**
 * Research responses
 */
function generateResearchResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { researchInterests, researchProjects } = resumeData as any;

  const interests =
    researchInterests && researchInterests.length
      ? researchInterests.join(", ")
      : "Computer Vision, Machine Learning";

  const projectLines = (researchProjects || [])
    .map((p: any) => {
      const highlights = p.highlights
        ? p.highlights.map((h: string) => `  • ${h}`).join("\n")
        : "";
      return `• ${p.title} (${p.year})\n${highlights}${
        p.link ? `\n    Link: ${p.link}` : ""
      }`;
    })
    .join("\n\n");

  const message = `Emmanuel is active in applied AI research with interests spanning: ${interests}.

Recent research project(s):
${
  projectLines ||
  "• Automatic Plate Number Recognition using OpenCV (>77% accuracy)"
}

He focuses on reliable ML systems that drive measurable product growth impact.`;

  return {
    message,
    suggestions: [
      "Show me his publications",
      "What technologies does he use?",
      "Tell me about his experience",
    ],
    data: { researchInterests, researchProjects },
  };
}

/**
 * Contact responses
 */
function generateContactResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { personalInfo } = resumeData;
  const { contact } = personalInfo;

  return {
    message: `You can reach Emmanuel through:

📧 Email: ${contact.email}
📱 Phone: ${contact.tel}
💼 LinkedIn: ${contact.social.find((s) => s.name === "GitHub")?.url}
🐙 GitHub: ${contact.social.find((s) => s.name === "GitHub")?.url}

He's currently based in ${
      personalInfo.location
    } and open to discussing exciting opportunities!`,
    suggestions: [
      "What's his experience at VertoFx?",
      "Show me his technical skills",
      "Tell me about his projects",
    ],
    data: { contact },
  };
}

/**
 * General overview responses
 */
function generateGeneralResponse(
  resumeData: ReturnType<typeof getStructuredResumeData>
): ChatResponse {
  const { personalInfo, experience } = resumeData;
  const totalYears = calculateYearsOfExperience(experience);

  return {
    message: `Emmanuel Obi is a ${personalInfo.title} based in ${personalInfo.location}.

${personalInfo.summary}

With ${totalYears}+ years of experience, he's worked at companies like VertoFx (YC 2019), RoadPreppers Technologies, and Atlens Limited, specializing in product growth, AI-powered features, and scalable system architecture.`,
    suggestions: [
      "What are his biggest career achievements?",
      "What technologies does he specialize in?",
      "Show me his most impressive projects",
    ],
  };
}

/**
 * Fallback response for unknown queries
 */
function generateFallbackResponse(query: ProcessedQuery): ChatResponse {
  const suggestions = [
    "What's Emmanuel's role at VertoFx?",
    "What technologies does he work with?",
    "Show me his career achievements",
    "Tell me about his education",
  ];

  if (query.keywords.length > 0) {
    return {
      message: `I'm not quite sure how to answer that, but I'd love to help! I can tell you about Emmanuel's work experience, technical skills, projects, education, certifications, awards, and publications. What would you like to know?`,
      suggestions,
    };
  }

  return {
    message:
      "I'm here to answer questions about Emmanuel's professional background. What would you like to know?",
    suggestions,
  };
}

/**
 * Calculate years of experience
 */
function calculateYearsOfExperience(
  experience: ReturnType<typeof getStructuredResumeData>["experience"]
): number {
  if (experience.length === 0) return 0;

  // Get the earliest job (last in array)
  const first = experience[experience.length - 1];

  // Duration format is "Mon YYYY - Mon YYYY" or "Mon YYYY - Present"
  // Extract the start date
  const startDateStr = first.duration.split(" - ")[0]; // e.g., "Apr 2021"
  const startYear = parseInt(startDateStr.split(" ")[1]); // Extract year

  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  return yearsOfExperience;
}
