import { RESUME_DATA } from "@/data/resume-data";
import { LogoMark } from "@/components/logo-mark";

type Project = (typeof RESUME_DATA.projects)[number];

interface ProjectRowProps {
  project: Project;
}

export function ProjectRow({ project }: ProjectRowProps) {
  const href = "link" in project ? project.link.href : undefined;

  const title = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-subheading text-foreground underline-offset-4 hover:text-primary hover:underline"
    >
      {project.title}
      <span className="ml-1.5 text-muted-foreground no-underline" aria-hidden>
        ↗
      </span>
    </a>
  ) : (
    <span className="text-subheading text-foreground">{project.title}</span>
  );

  return (
    <article className="group flex gap-4 border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0 md:gap-6">
      {"logo" in project && project.logo && (
        <LogoMark logo={project.logo} alt={project.title} className="h-10 w-10" />
      )}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {title}
          {href && (
            <span className="hidden text-mono-xs text-muted-foreground print:inline">
              {href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          )}
        </div>
        <p className="text-body-sm text-muted-foreground">{project.description}</p>
        <p className="text-mono-xs text-muted-foreground">
          {project.techStack.join(" · ")}
        </p>
      </div>
    </article>
  );
}

export function ProjectsList() {
  return (
    <div>
      {RESUME_DATA.projects.map((project) => (
        <ProjectRow key={project.title} project={project} />
      ))}
    </div>
  );
}

/** @deprecated Prefer ProjectsList / ProjectRow for editorial layout */
export function ProjectCard({
  title,
  description,
  tags,
  link,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}) {
  return (
    <article className="border-b border-border py-4">
      <h3 className="text-subheading">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
      <p className="mt-2 text-mono-xs text-muted-foreground">{tags.join(" · ")}</p>
    </article>
  );
}
