/**
 * Conversation Manager - Best-effort in-memory cache (not reliable on serverless).
 * Primary context for follow-ups comes from the client via recentTurns / lastIntent.
 */

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ConversationContext {
  messages: Message[];
  lastIntent?: string;
  lastEntities?: string[];
  sessionId: string;
}

const conversations = new Map<string, ConversationContext>();

export function getConversation(sessionId: string): ConversationContext {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, {
      messages: [],
      sessionId,
    });
  }
  return conversations.get(sessionId)!;
}

export function addMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
): void {
  const conversation = getConversation(sessionId);
  conversation.messages.push({
    id: generateMessageId(),
    role,
    content,
    timestamp: Date.now(),
  });

  if (conversation.messages.length > 20) {
    conversation.messages = conversation.messages.slice(-20);
  }
}

export function updateContext(
  sessionId: string,
  intent?: string,
  entities?: string[]
): void {
  const conversation = getConversation(sessionId);
  if (intent) conversation.lastIntent = intent;
  if (entities) conversation.lastEntities = entities;
}

export function clearConversation(sessionId: string): void {
  conversations.delete(sessionId);
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export function getRecentContext(sessionId: string): {
  lastIntent?: string;
  lastEntities?: string[];
  recentMessages: Message[];
} {
  const conversation = getConversation(sessionId);
  return {
    lastIntent: conversation.lastIntent,
    lastEntities: conversation.lastEntities,
    recentMessages: conversation.messages.slice(-5),
  };
}
