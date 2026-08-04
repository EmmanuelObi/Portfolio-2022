"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

interface ChatResponse {
  message: string;
  suggestions?: string[];
  sessionId?: string;
  lastIntent?: string;
  lastEntities?: string[];
}

const STORAGE_KEY = "portfolio-chat-v1";
const DEFAULT_SUGGESTIONS = [
  "What's his experience at VertoFx?",
  "Tell me about Sorstain",
  "What technologies does he work with?",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Emmanuel's AI assistant. I can answer questions about his experience, skills, projects, and more. What would you like to know?",
};

interface StoredChat {
  sessionId: string;
  messages: Message[];
  lastIntent?: string;
  lastEntities?: string[];
  suggestions?: string[];
}

function loadStoredChat(): StoredChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredChat;
  } catch {
    return null;
  }
}

function saveStoredChat(data: StoredChat) {
  try {
    const trimmed: StoredChat = {
      ...data,
      messages: data.messages.slice(-20).map(({ role, content }) => ({
        role,
        content,
      })),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore quota errors
  }
}

/** Lightweight markdown: **bold**, line breaks, bullet lines */
function renderMessageContent(text: string): ReactNode {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts: ReactNode[] = [];
    const boldRe = /\*\*(.+?)\*\*/g;
    let last = 0;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = boldRe.exec(line)) !== null) {
      if (match.index > last) {
        parts.push(line.slice(last, match.index));
      }
      parts.push(<strong key={`${lineIdx}-b-${key++}`}>{match[1]}</strong>);
      last = match.index + match[0].length;
    }
    if (last < line.length) {
      parts.push(line.slice(last));
    }
    if (parts.length === 0) parts.push(line || "\u00A0");

    return (
      <span key={lineIdx} className="block">
        {parts}
      </span>
    );
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [lastIntent, setLastIntent] = useState<string | undefined>();
  const [lastEntities, setLastEntities] = useState<string[] | undefined>();
  const [suggestions, setSuggestions] =
    useState<string[]>(DEFAULT_SUGGESTIONS);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(
    null
  );
  const [hydrated, setHydrated] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const stored = loadStoredChat();
    if (stored?.messages?.length) {
      setMessages(stored.messages);
      setSessionId(stored.sessionId || "");
      setLastIntent(stored.lastIntent);
      setLastEntities(stored.lastEntities);
      if (stored.suggestions?.length) {
        setSuggestions(stored.suggestions);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStoredChat({
      sessionId,
      messages,
      lastIntent,
      lastEntities,
      suggestions,
    });
  }, [hydrated, sessionId, messages, lastIntent, lastEntities, suggestions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const animateTyping = useCallback(
    (text: string, callback: (displayedText: string) => void) => {
      let currentIndex = 0;
      const typingSpeed = 12;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          callback(text.slice(0, currentIndex));
          typingTimeoutRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };

      setIsTyping(true);
      typeNextChar();
    },
    []
  );

  const sendMessage = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    setLastFailedMessage(null);
    const userMessage: Message = { role: "user", content: messageText };
    const historyForRequest = [...messages, userMessage];
    setMessages(historyForRequest);
    setInput("");
    setIsLoading(true);
    setSuggestions([]);

    const thinkingDelay = Math.min(900, 350 + messageText.length * 8);
    await new Promise((resolve) => setTimeout(resolve, thinkingDelay));

    const recentTurns = historyForRequest
      .filter((m) => !m.isTyping)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          sessionId,
          recentTurns,
          lastIntent,
          lastEntities,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatResponse = await response.json();

      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
      if (data.lastIntent) {
        setLastIntent(data.lastIntent);
      }
      if (data.lastEntities) {
        setLastEntities(data.lastEntities);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      animateTyping(data.message, (displayedText) => {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: displayedText,
            isTyping: displayedText.length < data.message.length,
          };
          return next;
        });
      });

      setTimeout(
        () => {
          setSuggestions(
            data.suggestions?.length ? data.suggestions : DEFAULT_SUGGESTIONS
          );
        },
        data.message.length * 12 + 80
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setLastFailedMessage(messageText);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into an error. You can retry your last question.",
        },
      ]);
      setSuggestions(DEFAULT_SUGGESTIONS);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-foreground print:hidden"
          aria-label="Open chat"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-md border border-border bg-background shadow-lg print:hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ height: "min(560px, calc(100dvh - 6rem))" }}
          role="dialog"
          aria-label="Ask about Emmanuel"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h3 className="font-display text-base font-medium">
                Ask about Emmanuel
              </h3>
              <p className="text-mono-xs text-muted-foreground">AI assistant</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-muted-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted/40 text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Thinking…
                  </span>
                </div>
              </div>
            )}

            {isTyping && !isLoading && (
              <div className="sr-only">Assistant is typing</div>
            )}

            {lastFailedMessage && !isLoading && (
              <button
                type="button"
                onClick={() => sendMessage(lastFailedMessage)}
                className="inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                Retry last message
              </button>
            )}

            {suggestions.length > 0 && !isLoading && !isTyping && (
              <div className="flex flex-col gap-2">
                <p className="text-label px-0.5">Suggested</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                disabled={isLoading}
                maxLength={500}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
