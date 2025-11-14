import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillsGrid } from "@/components/skills-grid";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-3xl space-y-12 print:space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-border glass p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="order-2 md:order-1 flex-1 space-y-4">
            <h1 className="title-gradient text-display-1 tracking-tight">
              {RESUME_DATA.name}
            </h1>
            <p className="text-body text-muted-foreground max-w-prose leading-relaxed">
              {RESUME_DATA.about}
            </p>
            <p className="text-label text-muted-foreground flex items-center gap-1">
              <GlobeIcon className="h-3 w-3" />
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
              >
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-body-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email && (
                <Button variant="secondary" size="sm" asChild>
                  <a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    className="flex items-center gap-1"
                  >
                    <MailIcon className="h-4 w-4" /> Email
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.tel && (
                <Button variant="secondary" size="sm" asChild>
                  <a
                    href={`tel:${RESUME_DATA.contact.tel}`}
                    className="flex items-center gap-1"
                  >
                    <PhoneIcon className="h-4 w-4" /> Call
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-1"
                >
                  <a href={social.url}>
                    <social.icon className="h-4 w-4" /> {social.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Avatar className="h-32 w-32 ring-4 ring-primary/20 shadow-xl">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.3),transparent_60%)]" />
        </div>
        <Section>
          <h2 className="text-heading">About</h2>
          <p className="text-pretty text-body text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-heading">Work Experience</h2>
          <ExperienceTimeline />
        </Section>
        <Section>
          <h2 className="text-heading">Education</h2>
          <div className="space-y-6">
            {RESUME_DATA.education.map((education) => (
              <Card
                key={education.school}
                className="relative glass border border-border/50 shadow-md p-5 md:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent" />
                <CardHeader className="space-y-3 pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-subheading tracking-tight">
                      {education.school}
                    </h3>
                    <span className="text-mono-xs tabular-nums text-muted-foreground whitespace-nowrap">
                      {education.start} – {education.end}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-label font-medium italic text-primary/90">
                      {education.degree}
                    </span>
                    {"gpa" in education && education.gpa && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 font-medium"
                      >
                        {education.gpa.split(" ")[0]} GPA
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-3 text-body-sm">
                  <div className="space-y-2">
                    {"gpa" in education && education.gpa && (
                      <p className="text-body-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold">
                          Academic Standing:
                        </span>{" "}
                        {education.gpa}
                      </p>
                    )}
                    {"additionalInfo" in education &&
                      education.additionalInfo && (
                        <p className="text-body-sm text-muted-foreground leading-relaxed flex items-start gap-1">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary/70" />
                          {education.additionalInfo}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        {"researchInterests" in RESUME_DATA && (
          <Section>
            <h2 className="text-heading">Research</h2>
            <Card className="glass p-5 md:p-6 space-y-4">
              <div>
                <h3 className="text-label font-semibold uppercase tracking-wide text-primary/80 mb-2">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-1">
                  {RESUME_DATA.researchInterests.map((ri) => (
                    <Badge
                      key={ri}
                      className="text-xs px-2 py-0.5"
                      variant="secondary"
                    >
                      {ri}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-label font-semibold uppercase tracking-wide text-primary/80">
                  Projects
                </h3>
                {RESUME_DATA.researchProjects?.map((proj) => (
                  <Card
                    key={proj.title}
                    className="bg-transparent border border-border/40 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-body-sm font-medium">{proj.title}</h4>
                      <span className="text-mono-xs text-muted-foreground">
                        {proj.year}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[10px] px-2 py-0.5"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <ul className="list-none space-y-1.5 mt-2 text-body-sm">
                      {proj.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-body-sm text-muted-foreground flex gap-2"
                        >
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-label text-primary hover:underline"
                      >
                        View Document ↗
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </Section>
        )}
        <Section>
          <h2 className="text-heading">Skills</h2>
          <SkillsGrid />
        </Section>

        {"certificates" in RESUME_DATA && RESUME_DATA.certificates && (
          <Section>
            <h2 className="text-heading">Certificates</h2>
            {RESUME_DATA.certificates.map((cert) => {
              return (
                <Card key={cert.title}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                        <a
                          className="hover:underline"
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cert.title}
                        </a>
                      </h3>
                      <div className="text-sm tabular-nums text-gray-500">
                        {cert.date}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </div>
                  </CardHeader>
                  <CardContent className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Section>
        )}

        {"awards" in RESUME_DATA &&
          RESUME_DATA.awards &&
          RESUME_DATA.awards.length > 0 && (
            <Section>
              <h2 className="text-heading">Awards & Recognition</h2>
              <div className="space-y-3">
                {RESUME_DATA.awards.map((award, index) => {
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between gap-x-2 text-base">
                          <h3 className="font-semibold leading-none">
                            {award.title}
                          </h3>
                          <div className="text-sm tabular-nums text-gray-500">
                            {award.year}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {award.company}
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </Section>
          )}

        {"publications" in RESUME_DATA &&
          RESUME_DATA.publications &&
          RESUME_DATA.publications.length > 0 && (
            <Section>
              <h2 className="text-heading">Publications</h2>
              {RESUME_DATA.publications.map((pub) => {
                return (
                  <Card key={pub.title}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-x-2 text-base">
                        <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-snug">
                          <a
                            className="hover:underline"
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {pub.title}
                          </a>
                        </h3>
                        <div className="text-sm tabular-nums text-gray-500">
                          {pub.year}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-2 text-xs text-muted-foreground">
                      {pub.authors}
                    </CardContent>
                  </Card>
                );
              })}
            </Section>
          )}

        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-heading">Projects</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>
      </section>

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
