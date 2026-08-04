import { NextRequest, NextResponse } from "next/server";
import { processQuery } from "@/lib/chatbot/queryProcessor";
import { generateResponse } from "@/lib/chatbot/responseGenerator";
import {
  addMessage,
  updateContext,
  getRecentContext,
} from "@/lib/chatbot/conversationManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 500;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      sessionId,
      recentTurns,
      lastIntent,
      lastEntities,
    }: {
      message?: unknown;
      sessionId?: string;
      recentTurns?: ChatTurn[];
      lastIntent?: string;
      lastEntities?: string[];
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const trimmed = message.trim();
    if (!trimmed) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
        { status: 400 }
      );
    }

    const session = sessionId || `session_${Date.now()}`;

    // Prefer client-supplied context (survives serverless); fall back to in-memory
    const cached = getRecentContext(session);
    const hints = {
      lastIntent: lastIntent || cached.lastIntent,
      lastEntities: lastEntities || cached.lastEntities,
    };

    const processedQuery = processQuery(trimmed, hints);
    const response = generateResponse(processedQuery, {
      ...hints,
      recentTurns: Array.isArray(recentTurns) ? recentTurns.slice(-8) : undefined,
    });

    addMessage(session, "user", trimmed);
    addMessage(session, "assistant", response.message);
    updateContext(session, processedQuery.intent, processedQuery.entities);

    const payload: Record<string, unknown> = {
      message: response.message,
      suggestions: response.suggestions,
      sessionId: session,
      lastIntent: processedQuery.intent,
      lastEntities: processedQuery.entities,
    };

    if (process.env.NODE_ENV === "development") {
      payload.debug = {
        intent: processedQuery.intent,
        confidence: processedQuery.confidence,
        keywords: processedQuery.keywords,
        entities: processedQuery.entities,
      };
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
