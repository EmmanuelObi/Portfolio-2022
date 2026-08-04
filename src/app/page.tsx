import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { Hero } from "@/components/hero";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectsList } from "@/components/project-card";
import { SkillsGrid } from "@/components/skills-grid";
import {
  EducationList,
  ResearchSection,
  CertificatesList,
  AwardsList,
  PublicationsList,
} from "@/components/credentials-lists";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto px-4 py-10 print:p-12 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-4xl space-y-16 print:space-y-8">
        <Hero />

        <Section>
          <h2 className="text-heading">Experience</h2>
          <ExperienceTimeline />
        </Section>

        <Section>
          <h2 className="text-heading">Projects</h2>
          <ProjectsList />
        </Section>

        <Section>
          <h2 className="text-heading">About</h2>
          <p className="max-w-2xl text-pretty text-body text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>

        <Section>
          <h2 className="text-heading">Research</h2>
          <ResearchSection />
        </Section>

        <Section>
          <h2 className="text-heading">Skills</h2>
          <SkillsGrid />
        </Section>

        <Section>
          <h2 className="text-heading">Education</h2>
          <EducationList />
        </Section>

        <Section>
          <h2 className="text-heading">Awards</h2>
          <AwardsList />
        </Section>

        <Section>
          <h2 className="text-heading">Publications</h2>
          <PublicationsList />
        </Section>

        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-heading">Certificates</h2>
          <CertificatesList />
        </Section>
      </div>

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
