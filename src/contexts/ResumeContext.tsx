"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { RESUME_DATA } from "@/data/resume-data";

type ResumeContextType = typeof RESUME_DATA;

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  return (
    <ResumeContext.Provider value={RESUME_DATA}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}

// Helper function to get structured data for AI chatbot
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
  };
}
