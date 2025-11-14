/**
 * Conversation Manager - Tracks conversation history and context for multi-turn conversations
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

/**
 * Create or get conversation context
 */
export function getConversation(sessionId: string): ConversationContext {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, {
      messages: [],
      sessionId,
    });
  }
  return conversations.get(sessionId)!;
}

/**
 * Add message to conversation
 */
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
  
  // Keep only last 20 messages for memory efficiency
  if (conversation.messages.length > 20) {
    conversation.messages = conversation.messages.slice(-20);
  }
}

/**
 * Update conversation context
 */
export function updateContext(
  sessionId: string,
  intent?: string,
  entities?: string[]
): void {
  const conversation = getConversation(sessionId);
  if (intent) conversation.lastIntent = intent;
  if (entities) conversation.lastEntities = entities;
}

/**
 * Clear conversation
 */
export function clearConversation(sessionId: string): void {
  conversations.delete(sessionId);
}

/**
 * Generate unique message ID
 */
function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get recent context for follow-up questions
 */
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
