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

  skills.forEach((s) => {
    const k = s.toLowerCase();
    if (/react|angular|typescript|javascript|next|tailwind/.test(k))
      categories.Frontend.push(s);
    else if (/node|express|python|django|go|api/.test(k))
      categories.Backend.push(s);
    else if (/ai|ml|openai|vertex|langchain|llm|opencv/.test(k))
      categories.AI_ML.push(s);
    else if (/aws|kafka|redis|docker|kubernetes|serverless|sqs/.test(k))
      categories.Cloud_Infrastructure.push(s);
    else if (/mongo|dynamo|postgres|mysql|elastic|neo4j/.test(k))
      categories.Data_Stores.push(s);
    else if (/git|jira|github|testing|jest|cypress|storybook/.test(k))
      categories.Tools_DevOps.push(s);
    else categories.Other.push(s);
  });
  return categories;
}

export function SkillsGrid() {
  const categories = categorize(RESUME_DATA.skills as readonly string[]);

  return (
    <div className="space-y-5">
      {Object.entries(categories).map(
        ([name, list]) =>
          list.length > 0 && (
            <div
              key={name}
              className="grid gap-2 border-b border-border pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <h3 className="text-label pt-0.5">{name.replace(/_/g, " ")}</h3>
              <p className="text-body-sm text-foreground/85">
                {list.join(" · ")}
              </p>
            </div>
          )
      )}
    </div>
  );
}
