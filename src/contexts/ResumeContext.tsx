import React, { createContext, useContext, ReactNode } from "react";
import { RESUME_DATA } from "@/data/resume-data";

export { getStructuredResumeData } from "@/lib/chatbot/resumeForChat";

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
