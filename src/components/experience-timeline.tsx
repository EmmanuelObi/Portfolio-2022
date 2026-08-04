"use client";

import React from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { LogoMark } from "@/components/logo-mark";

type WorkItem = (typeof RESUME_DATA.work)[number];

function TimelineItem({ work }: { work: WorkItem }) {
  return (
    <article className="group relative grid gap-3 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8">
      <div className="text-mono-xs text-muted-foreground md:pt-1">
        {work.start} – {work.end}
      </div>

      <div className="min-w-0 space-y-3">
        <div className="flex items-start gap-3">
          {"logo" in work && work.logo && (
            <LogoMark logo={work.logo} alt={work.company} />
          )}
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subheading text-foreground hover:text-primary"
              >
                {work.company}
              </a>
              <span className="text-body-sm text-muted-foreground">
                {work.badges.join(" · ")}
              </span>
            </div>
            <p className="text-body-sm font-medium text-primary">{work.title}</p>
          </div>
        </div>

        <p className="text-body-sm leading-relaxed text-muted-foreground">
          {work.description}
        </p>
      </div>
    </article>
  );
}

export function ExperienceTimeline() {
  return (
    <div>
      {RESUME_DATA.work.map((work) => (
        <TimelineItem key={work.company} work={work} />
      ))}
    </div>
  );
}
