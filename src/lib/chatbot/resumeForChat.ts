import { RESUME_DATA } from "@/data/resume-data";

export function getStructuredResumeData() {
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
      start: job.start,
      end: job.end,
      duration: `${job.start} - ${job.end}`,
      description: job.description,
      location: job.badges.join(", "),
    })),
    education: RESUME_DATA.education.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      duration: `${edu.start} - ${edu.end}`,
      gpa: "gpa" in edu ? edu.gpa : undefined,
      additionalInfo:
        "additionalInfo" in edu ? edu.additionalInfo : undefined,
    })),
    skills: [...RESUME_DATA.skills],
    projects: RESUME_DATA.projects.map((project) => ({
      title: project.title,
      description: project.description,
      technologies: [...project.techStack],
      link: "link" in project ? project.link.href : undefined,
    })),
    certificates: [...RESUME_DATA.certificates],
    publications: [...RESUME_DATA.publications],
    awards: [...RESUME_DATA.awards],
    researchInterests: [...RESUME_DATA.researchInterests],
    researchProjects: RESUME_DATA.researchProjects.map((p) => ({
      title: p.title,
      year: p.year,
      tech: [...p.tech],
      link: p.link,
      highlights: [...p.highlights],
    })),
  };
}

export type StructuredResumeData = ReturnType<typeof getStructuredResumeData>;

/** Escape a string for safe use inside a RegExp character class / pattern. */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build searchable tokens from a company/project name
 * e.g. "VertoFx (YC 2019)" → ["vertofx", "yc 2019"]
 */
export function nameTokens(name: string): string[] {
  const cleaned = name
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = new Set<string>([cleaned]);
  // Add first significant word (min 3 chars)
  cleaned.split(/[\s\-_/]+/).forEach((part) => {
    if (part.length >= 3) tokens.add(part);
  });
  return Array.from(tokens);
}
