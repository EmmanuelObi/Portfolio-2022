import { NextRequest, NextResponse } from "next/server";
import { processQuery } from "@/lib/chatbot/queryProcessor";
import { generateResponse } from "@/lib/chatbot/responseGenerator";
import {
  addMessage,
  updateContext,
  getRecentContext,
} from "@/lib/chatbot/conversationManager";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Use sessionId or create one
    const session = sessionId || `session_${Date.now()}`;

    // Get recent conversation context for better responses
    const context = getRecentContext(session);

    // Process the user's query
    const processedQuery = processQuery(message);

    // Generate intelligent response
    const response = generateResponse(processedQuery);

    // Save messages to conversation history
    addMessage(session, "user", message);
    addMessage(session, "assistant", response.message);

    // Update conversation context
    updateContext(session, processedQuery.intent, processedQuery.entities);

    return NextResponse.json({
      message: response.message,
      suggestions: response.suggestions,
      sessionId: session,
      debug: {
        intent: processedQuery.intent,
        confidence: processedQuery.confidence,
        keywords: processedQuery.keywords,
        entities: processedQuery.entities,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
