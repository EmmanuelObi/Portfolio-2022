import { RESUME_DATA } from "@/data/resume-data";

export function EducationList() {
  return (
    <div>
      {RESUME_DATA.education.map((education) => (
        <article
          key={education.school}
          className="grid gap-2 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8"
        >
          <div className="text-mono-xs text-muted-foreground">
            {education.start} – {education.end}
          </div>
          <div className="space-y-1.5">
            <h3 className="text-subheading text-foreground">{education.school}</h3>
            <p className="text-body-sm text-primary">{education.degree}</p>
            {"gpa" in education && education.gpa && (
              <p className="text-body-sm text-muted-foreground">{education.gpa}</p>
            )}
            {"additionalInfo" in education && education.additionalInfo && (
              <p className="text-body-sm text-muted-foreground">
                {education.additionalInfo}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ResearchSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-label">Interests</h3>
        <p className="text-body-sm text-foreground/85">
          {RESUME_DATA.researchInterests.join(" · ")}
        </p>
      </div>

      {RESUME_DATA.researchProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-label">Projects</h3>
          {RESUME_DATA.researchProjects.map((proj) => (
            <article
              key={proj.title}
              className="space-y-2 border-b border-border pb-5 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-body font-medium text-foreground">
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline"
                    >
                      {proj.title}
                    </a>
                  ) : (
                    proj.title
                  )}
                </h4>
                <span className="text-mono-xs text-muted-foreground">
                  {proj.year}
                </span>
              </div>
              <p className="text-mono-xs text-muted-foreground">
                {proj.tech.join(" · ")}
              </p>
              <ul className="space-y-1.5 pt-1">
                {proj.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-body-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function CertificatesList() {
  return (
    <div>
      {RESUME_DATA.certificates.map((cert) => (
        <article
          key={cert.title}
          className="grid gap-2 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8"
        >
          <div className="text-mono-xs text-muted-foreground">{cert.date}</div>
          <div className="space-y-1.5">
            <h3 className="text-body font-medium text-foreground">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {cert.title}
              </a>
            </h3>
            <p className="text-body-sm text-muted-foreground">{cert.issuer}</p>
            <p className="text-mono-xs text-muted-foreground">
              {cert.skills.join(" · ")}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AwardsList() {
  return (
    <div>
      {RESUME_DATA.awards.map((award, index) => (
        <article
          key={index}
          className="grid gap-2 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8"
        >
          <div className="text-mono-xs text-muted-foreground">{award.year}</div>
          <div className="space-y-1">
            <h3 className="text-body font-medium text-foreground">
              {award.title}
            </h3>
            <p className="text-body-sm text-muted-foreground">{award.company}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PublicationsList() {
  return (
    <div>
      {RESUME_DATA.publications.map((pub) => (
        <article
          key={pub.title}
          className="grid gap-2 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8"
        >
          <div className="text-mono-xs text-muted-foreground">{pub.year}</div>
          <div className="space-y-1.5">
            <h3 className="text-body font-medium text-foreground leading-snug">
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                {pub.title}
              </a>
            </h3>
            <p className="text-body-sm text-muted-foreground">{pub.authors}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
