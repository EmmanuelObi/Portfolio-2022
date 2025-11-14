"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

interface ChatResponse {
  message: string;
  suggestions?: string[];
  sessionId?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Emmanuel's AI assistant. I can answer questions about his experience, skills, projects, and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([
    "What's his experience at VertoFx?",
    "Tell me about his technical skills",
    "Show me his most impactful projects",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Simulate typing animation
  const animateTyping = (
    text: string,
    callback: (displayedText: string) => void
  ) => {
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

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
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setSuggestions([]);

    // Simulate thinking delay (500-1500ms based on query length)
    const thinkingDelay = Math.min(1500, 500 + messageText.length * 10);
    await new Promise((resolve) => setTimeout(resolve, thinkingDelay));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: ChatResponse = await response.json();

      // Update session ID if provided
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      // Add assistant message with typing animation
      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      // Animate the response text
      animateTyping(data.message, (displayedText) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: displayedText,
          };
          return newMessages;
        });
      });

      // Update suggestions after typing is done
      setTimeout(
        () => {
          if (data.suggestions && data.suggestions.length > 0) {
            setSuggestions(data.suggestions);
          }
        },
        data.message.length * 20 + 100
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or refresh the page.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all hover:scale-105 print:hidden bg-muted/80 hover:bg-muted border border-border backdrop-blur-sm flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="glass fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col shadow-2xl print:hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <MessageCircle className="h-6 w-6" />
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Ask about Emmanuel</h3>
                <p className="text-xs opacity-90">AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 backdrop-blur-sm ${
                    message.role === "user"
                      ? "bg-primary/90 text-primary-foreground"
                      : "bg-muted/70 text-muted-foreground ring-1 ring-border/40"
                  } animate-fade-in`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {isTyping && !isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && !isLoading && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground px-1">
                  Suggested questions:
                </p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent hover:border-accent-foreground/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-gradient-to-b from-background/40 to-background/80 backdrop-blur-sm rounded-b-lg">
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
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
