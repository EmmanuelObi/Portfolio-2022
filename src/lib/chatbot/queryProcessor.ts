/**
 * Query Processor - Analyzes user input to understand intent and extract entities
 * Entity patterns are derived from RESUME_DATA so new projects/jobs stay in sync.
 */

import { RESUME_DATA } from "@/data/resume-data";
import { escapeRegExp, nameTokens } from "./resumeForChat";

export interface ProcessedQuery {
  intent: QueryIntent;
  keywords: string[];
  entities: string[];
  isQuestion: boolean;
  originalQuery: string;
  confidence: number;
}

export interface ConversationHints {
  lastIntent?: string;
  lastEntities?: string[];
}

export enum QueryIntent {
  GREETING = "greeting",
  EXPERIENCE = "experience",
  SKILLS = "skills",
  PROJECTS = "projects",
  EDUCATION = "education",
  CERTIFICATES = "certificates",
  AWARDS = "awards",
  PUBLICATIONS = "publications",
  RESEARCH = "research",
  CONTACT = "contact",
  GENERAL = "general",
  UNKNOWN = "unknown",
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "should",
  "could",
  "may",
  "might",
  "can",
  "about",
  "tell",
  "me",
  "what",
  "where",
  "when",
  "why",
  "how",
  "who",
  "which",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "their",
  "your",
  "my",
  "his",
  "her",
]);

const COMPANY_SYNONYMS: Record<string, string[]> = {
  vertofx: ["verto", "vert fx", "vertfx"],
  roadpreppers: ["road preppers", "lara"],
  atlens: ["wiremoney", "wire money"],
};

const PROJECT_SYNONYMS: Record<string, string[]> = {
  sorstain: [],
  obichops: ["obi chops", "chopspace"],
  lara: ["directions assistant"],
  "verto platform": ["verto"],
};

function buildAlternation(terms: string[]): string {
  const unique = Array.from(
    new Set(terms.filter(Boolean).map((t) => t.trim().toLowerCase()))
  ).sort((a, b) => b.length - a.length);
  return unique.map((t) => escapeRegExp(t).replace(/\s+/g, "\\s*")).join("|");
}

function buildCompanyTerms(): string[] {
  const terms: string[] = [];
  RESUME_DATA.work.forEach((job) => {
    nameTokens(job.company).forEach((t) => terms.push(t));
    const key = job.company.toLowerCase().replace(/[^a-z0-9]/g, "");
    Object.entries(COMPANY_SYNONYMS).forEach(([canon, syns]) => {
      if (key.includes(canon)) terms.push(...syns, canon);
    });
  });
  return terms;
}

function buildProjectTerms(): string[] {
  const terms: string[] = [];
  RESUME_DATA.projects.forEach((project) => {
    nameTokens(project.title).forEach((t) => terms.push(t));
    const key = project.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    Object.entries(PROJECT_SYNONYMS).forEach(([canon, syns]) => {
      if (key.includes(canon.replace(/\s+/g, ""))) {
        terms.push(...syns, canon);
      }
    });
  });
  return terms;
}

function buildSkillTerms(): string[] {
  return RESUME_DATA.skills.map((s) => s.toLowerCase());
}

const companyAlt = buildAlternation(buildCompanyTerms());
const projectAlt = buildAlternation(buildProjectTerms());
const skillAlt = buildAlternation([
  ...buildSkillTerms(),
  "microservice",
  "microservices",
  "frontend",
  "backend",
  "fullstack",
  "full stack",
  "machine learning",
  "lambda",
]);

const ENTITY_PATTERNS = {
  companies: new RegExp(`\\b(?:${companyAlt})\\b`, "gi"),
  projects: new RegExp(`\\b(?:${projectAlt})\\b`, "gi"),
  technologies: new RegExp(`\\b(?:${skillAlt})\\b`, "gi"),
};

const INTENT_PATTERNS: Partial<Record<QueryIntent, RegExp[]>> = {
  [QueryIntent.GREETING]: [
    /\b(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))\b/i,
  ],
  [QueryIntent.EXPERIENCE]: [
    /\b(work|job|experience|worked|position|role|company|companies|career|employment)\b/i,
    new RegExp(`\\b(?:${companyAlt})\\b`, "i"),
    /\b(what\s+(did|have)\s+(you|he)\s+(do|done|work))\b/i,
  ],
  [QueryIntent.SKILLS]: [
    /\b(skill|skills|technology|technologies|tech\s+stack|programming|language|framework|tool)\b/i,
    new RegExp(`\\b(?:${skillAlt})\\b`, "i"),
    /\b(know|proficient|familiar|good\s+at)\b/i,
  ],
  [QueryIntent.PROJECTS]: [
    /\b(project|projects|built|build|created|developed|application|app)\b/i,
    /\b(portfolio|work\s+on|side\s+project)\b/i,
    new RegExp(`\\b(?:${projectAlt})\\b`, "i"),
  ],
  [QueryIntent.EDUCATION]: [
    /\b(education|degree|university|college|study|studied|graduated|school|academic)\b/i,
    /\b(olabisi|onabanjo|electrical|electronics|engineering)\b/i,
  ],
  [QueryIntent.CERTIFICATES]: [
    /\b(certificate|certification|certified|course|training|credential)\b/i,
    /\b(udemy|learning|secure\s+coding|microservice)\b/i,
  ],
  [QueryIntent.AWARDS]: [
    /\b(award|awards|recognition|achievement|honor|prize|won)\b/i,
    /\b(employee\s+of\s+the\s+year|rising\s+star)\b/i,
  ],
  [QueryIntent.PUBLICATIONS]: [
    /\b(publication|published|wrote|article|paper|blog|post|writing)\b/i,
    /\b(hashnode|opencv|hoisting|react\s+mistake)\b/i,
  ],
  [QueryIntent.RESEARCH]: [
    /\b(research|researcher|computer\s+vision|trustworthy\s+ai|ml\s+systems|machine\s+learning)\b/i,
    /\b(opencv|plate\s+number|apnr|recognition|vehicle\s+detection|counting)\b/i,
  ],
  [QueryIntent.CONTACT]: [
    /\b(contact|email|reach|linkedin|github|social|connect|hire)\b/i,
    /\b(get\s+in\s+touch|talk\s+to|message)\b/i,
  ],
  [QueryIntent.GENERAL]: [
    /\b(tell\s+me\s+about\s+(yourself|him|emmanuel)|who\s+(are\s+you|is\s+he)|introduce|background|summary)\b/i,
    /\b(what\s+do\s+(you|he)\s+do|your\s+role)\b/i,
  ],
};

const FOLLOW_UP_PATTERN =
  /^(tell\s+me\s+more|more(\s+details)?|what\s+about\s+(that|it|them)|and(\s+\w+){0,4}\??|continue|go\s+on|elaborate)$/i;

/**
 * Process user query to extract intent, keywords, and entities
 */
export function processQuery(
  query: string,
  hints?: ConversationHints
): ProcessedQuery {
  const normalized = query.toLowerCase().trim();
  const isQuestion =
    /\?$/.test(query) ||
    /^(what|where|when|why|how|who|can|do|does|is|are)/i.test(query);

  const words = normalized
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

  const entities: string[] = [];
  Object.values(ENTITY_PATTERNS).forEach((pattern) => {
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0;
    const matches = query.match(pattern);
    if (matches) {
      entities.push(...matches.map((m) => m.toLowerCase()));
    }
  });

  let maxConfidence = 0;
  let detectedIntent = QueryIntent.UNKNOWN;

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      if (pattern.test(normalized)) {
        const confidence = calculateConfidence(normalized, pattern);
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
          detectedIntent = intent as QueryIntent;
        }
      }
    }
  }

  // Follow-up: reuse last intent when the message is a short continuation
  const isFollowUp =
    FOLLOW_UP_PATTERN.test(normalized) ||
    (words.length <= 4 &&
      /\b(more|that|those|them|also|and)\b/i.test(normalized) &&
      !!hints?.lastIntent);

  if (
    isFollowUp &&
    hints?.lastIntent &&
    hints.lastIntent !== QueryIntent.UNKNOWN &&
    hints.lastIntent !== QueryIntent.GREETING
  ) {
    detectedIntent = hints.lastIntent as QueryIntent;
    maxConfidence = Math.max(maxConfidence, 0.75);
    if (hints.lastEntities?.length) {
      entities.push(...hints.lastEntities);
    }
  }

  if (detectedIntent === QueryIntent.UNKNOWN && words.length > 0) {
    detectedIntent = QueryIntent.GENERAL;
    maxConfidence = 0.3;
  }

  return {
    intent: detectedIntent,
    keywords: Array.from(new Set(words)),
    entities: Array.from(new Set(entities)),
    isQuestion,
    originalQuery: query,
    confidence: maxConfidence,
  };
}

function calculateConfidence(text: string, pattern: RegExp): number {
  pattern.lastIndex = 0;
  const matches = text.match(pattern);
  if (!matches) return 0;

  let confidence = 0.5;
  if (matches.length > 1) {
    confidence += 0.1 * Math.min(matches.length - 1, 3);
  }

  ENTITY_PATTERNS.companies.lastIndex = 0;
  ENTITY_PATTERNS.projects.lastIndex = 0;
  ENTITY_PATTERNS.technologies.lastIndex = 0;
  if (ENTITY_PATTERNS.companies.test(text)) confidence += 0.1;
  if (ENTITY_PATTERNS.projects.test(text)) confidence += 0.1;
  if (ENTITY_PATTERNS.technologies.test(text)) confidence += 0.1;

  return Math.min(confidence, 1.0);
}

export function extractInfoRequests(query: ProcessedQuery): string[] {
  const requests: string[] = [];
  const text = query.originalQuery.toLowerCase();

  if (/\b(how\s+long|duration|years?\s+of\s+experience)\b/i.test(text)) {
    requests.push("duration");
  }
  if (/\b(where|location|based|live|living)\b/i.test(text)) {
    requests.push("location");
  }
  if (/\b(recent|current|latest|now|present)\b/i.test(text)) {
    requests.push("current");
  }
  if (/\b(first|started|beginning|initial)\b/i.test(text)) {
    requests.push("first");
  }
  if (/\b(best|top|greatest|most\s+proud|more)\b/i.test(text)) {
    requests.push("highlight");
  }
  if (
    /\b(achieve|achievement|accomplish|success|result|impact)\b/i.test(text)
  ) {
    requests.push("achievements");
  }

  return requests;
}
