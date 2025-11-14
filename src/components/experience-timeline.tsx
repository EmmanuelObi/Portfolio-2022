"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RESUME_DATA } from "@/data/resume-data";

interface TimelineItemProps {
  company: string;
  title: string;
  duration: string;
  description: string;
  badges: readonly string[];
}

function TimelineItem({ company, title, duration, description, badges }: TimelineItemProps) {
  return (
    <div className="relative pl-8 group">
      <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background shadow-md"></span>
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="p-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-body font-semibold flex items-center gap-2">
              <span className="hover:underline/60 transition-colors">{company}</span>
              <span className="flex gap-1">
                {badges.map(b => (
                  <Badge key={b} variant="secondary" className="text-[10px] py-0 px-1">{b}</Badge>
                ))}
              </span>
            </h3>
            <div className="text-mono-xs text-muted-foreground tabular-nums">{duration}</div>
          </div>
          <p className="mt-1 text-body-sm text-primary/80 font-medium">{title}</p>
        </CardHeader>
  <CardContent className="p-0 pt-2 text-body-sm text-muted-foreground">
          {description}
        </CardContent>
      </Card>
      <div className="absolute left-[6px] top-6 w-[2px] bg-gradient-to-b from-primary/60 to-transparent h-full" />
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {RESUME_DATA.work.map(work => (
        <TimelineItem
          key={work.company}
          company={work.company}
          title={work.title}
          duration={`${work.start} - ${work.end}`}
          description={work.description}
          badges={work.badges}
        />
      ))}
    </div>
  );
}
