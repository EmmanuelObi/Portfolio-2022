/**
 * Query Processor - Analyzes user input to understand intent and extract relevant information
 */

export interface ProcessedQuery {
  intent: QueryIntent;
  keywords: string[];
  entities: string[];
  isQuestion: boolean;
  originalQuery: string;
  confidence: number;
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

// Common words to filter out (stop words)
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
]);

// Intent patterns for classification
const INTENT_PATTERNS: Partial<Record<QueryIntent, RegExp[]>> = {
  [QueryIntent.GREETING]: [
    /\b(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))\b/i,
  ],
  [QueryIntent.EXPERIENCE]: [
    /\b(work|job|experience|worked|position|role|company|companies|career|employment)\b/i,
    /\b(vertofx|roadpreppers|atlens|lara)\b/i,
    /\b(what\s+(did|have)\s+you\s+(do|done|work))\b/i,
  ],
  [QueryIntent.SKILLS]: [
    /\b(skill|skills|technology|technologies|tech\s+stack|programming|language|framework|tool)\b/i,
    /\b(typescript|react|angular|node|python|aws|django)\b/i,
    /\b(know|proficient|familiar|good\s+at)\b/i,
  ],
  [QueryIntent.PROJECTS]: [
    /\b(project|projects|built|build|created|developed|application|app)\b/i,
    /\b(portfolio|work\s+on|side\s+project)\b/i,
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
    /\b(research|researcher|study|studies|academic|under\s+review|paper|computer\s+vision|trustworthy\s+ai|ml\s+systems|machine\s+learning)\b/i,
    /\b(opencv|plate\s+number|apnr|recognition|vehicle\s+detection|counting)\b/i,
  ],
  [QueryIntent.CONTACT]: [
    /\b(contact|email|phone|reach|linkedin|github|social|connect|hire)\b/i,
    /\b(get\s+in\s+touch|talk\s+to|message|call)\b/i,
  ],
  [QueryIntent.GENERAL]: [
    /\b(tell\s+me\s+about\s+yourself|who\s+are\s+you|introduce|background|summary)\b/i,
    /\b(what\s+do\s+you\s+do|your\s+role)\b/i,
  ],
};

// Company/project entity patterns
const ENTITY_PATTERNS = {
  companies:
    /\b(vertofx|vert\s*fx|roadpreppers|road\s*preppers|atlens|yc\s+2019)\b/gi,
  projects: /\b(lara|wiremoney|wire\s*money|opencv|plate\s+recognition)\b/gi,
  technologies:
    /\b(typescript|javascript|react|angular|node\.?js|python|django|aws|openai|vertexai|kafka|redis|mongodb|dynamodb|express)\b/gi,
  skills:
    /\b(microservice|api|frontend|backend|fullstack|full[- ]stack|ai|ml|machine\s+learning)\b/gi,
};

/**
 * Process user query to extract intent, keywords, and entities
 */
export function processQuery(query: string): ProcessedQuery {
  const normalized = query.toLowerCase().trim();
  const isQuestion =
    /\?$/.test(query) ||
    /^(what|where|when|why|how|who|can|do|does|is|are)/i.test(query);

  // Extract keywords (non-stop words)
  const words = normalized
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

  // Extract entities
  const entities: string[] = [];
  Object.values(ENTITY_PATTERNS).forEach((pattern) => {
    const matches = query.match(pattern);
    if (matches) {
      entities.push(...matches.map((m) => m.toLowerCase()));
    }
  });

  // Detect intent
  let maxConfidence = 0;
  let detectedIntent = QueryIntent.UNKNOWN;

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        const confidence = calculateConfidence(normalized, pattern);
        if (confidence > maxConfidence) {
          maxConfidence = confidence;
          detectedIntent = intent as QueryIntent;
        }
      }
    }
  }

  // If no specific intent found but has relevant keywords, classify as general
  if (detectedIntent === QueryIntent.UNKNOWN && words.length > 0) {
    detectedIntent = QueryIntent.GENERAL;
    maxConfidence = 0.3;
  }

  return {
    intent: detectedIntent,
    keywords: Array.from(new Set(words)), // Remove duplicates
    entities: Array.from(new Set(entities)), // Remove duplicates
    isQuestion,
    originalQuery: query,
    confidence: maxConfidence,
  };
}

/**
 * Calculate confidence score for pattern match
 */
function calculateConfidence(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  if (!matches) return 0;

  // Base confidence
  let confidence = 0.5;

  // Boost confidence for multiple matches
  if (matches.length > 1) {
    confidence += 0.1 * Math.min(matches.length - 1, 3);
  }

  // Boost for specific entity mentions
  if (ENTITY_PATTERNS.companies.test(text)) confidence += 0.1;
  if (ENTITY_PATTERNS.projects.test(text)) confidence += 0.1;
  if (ENTITY_PATTERNS.technologies.test(text)) confidence += 0.1;

  return Math.min(confidence, 1.0);
}

/**
 * Extract specific information requests from query
 */
export function extractInfoRequests(query: ProcessedQuery): string[] {
  const requests: string[] = [];
  const text = query.originalQuery.toLowerCase();

  // Specific information patterns
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
  if (/\b(best|top|greatest|most\s+proud)\b/i.test(text)) {
    requests.push("highlight");
  }
  if (
    /\b(achieve|achievement|accomplish|success|result|impact)\b/i.test(text)
  ) {
    requests.push("achievements");
  }

  return requests;
}
