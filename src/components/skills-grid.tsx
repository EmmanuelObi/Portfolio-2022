import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RESUME_DATA } from "@/data/resume-data";

function categorize(skills: readonly string[]) {
  const categories: Record<string, string[]> = {
    Frontend: [],
    Backend: [],
    AI_ML: [],
    Cloud_Infrastructure: [],
    Data_Stores: [],
    Tools_DevOps: [],
    Other: [],
  };

  skills.forEach(s => {
    const k = s.toLowerCase();
    if (/react|angular|typescript|javascript|next|tailwind/.test(k)) categories.Frontend.push(s);
    else if (/node|express|python|django|go|api/.test(k)) categories.Backend.push(s);
    else if (/ai|ml|openai|vertex|langchain|llm/.test(k)) categories.AI_ML.push(s);
    else if (/aws|kafka|redis|docker|kubernetes|serverless/.test(k)) categories.Cloud_Infrastructure.push(s);
    else if (/mongo|dynamo|postgres|mysql|elastic|neo4j|redis/.test(k)) categories.Data_Stores.push(s);
    else if (/git|jira|github|testing|jest|cypress|storybook/.test(k)) categories.Tools_DevOps.push(s);
    else categories.Other.push(s);
  });
  return categories;
}

export function SkillsGrid() {
  const categories = categorize(RESUME_DATA.skills as readonly string[]);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(categories).map(([name, list]) => (
        list.length > 0 && (
          <Card key={name} className="p-4 glass">
            <h3 className="mb-2 text-label text-primary/80">
              {name.replace(/_/g, " ")}
            </h3>
            <div className="flex flex-wrap gap-1">
              {list.map(skill => (
                <Badge key={skill} className="text-xs px-2 py-0.5">{skill}</Badge>
              ))}
            </div>
          </Card>
        )
      ))}
    </div>
  );
}
