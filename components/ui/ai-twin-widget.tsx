/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, X, Send, AlertCircle } from "lucide-react";

export function AITwinWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // @ai-sdk/react@4 — useChat exposes: messages, sendMessage, status, error
  // input / handleInputChange / handleSubmit / isLoading do NOT exist in this version
  const { messages, sendMessage, status, error } = useChat();

  // Compatible loading check — works across SDK v3/v4/v5
  const isThinking =
    status === "submitted" || status === "streaming";

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Listen for the command-palette "Chat with AI Twin" action
  useEffect(() => {
    const handleOpenAITwin = () => setIsOpen(true);
    window.addEventListener("portfolio:open-ai-twin", handleOpenAITwin);
    return () => window.removeEventListener("portfolio:open-ai-twin", handleOpenAITwin);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setInput("");
    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: trimmed }],
    });
  };

  // Safely extract display text from both v3/v4 (m.content string)
  // and v5 (m.parts array) message shapes
  const getMessageText = (m: any): string => {
    if (typeof m.content === "string" && m.content) return m.content;
    if (Array.isArray(m.parts)) {
      return m.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text as string)
        .join("");
    }
    return "";
  };

  // Lightweight markdown renderer: bold, bullets, numbered lists
  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Render inline **bold**
      const renderBold = (raw: string) => {
        const parts = raw.split(/(\*\*[^*]+\*\*)/);
        return parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>
            : <span key={j}>{part}</span>
        );
      };

      // Bullet line: starts with - , • , or *
      if (/^[\-•\*] /.test(line)) {
        return (
          <div key={i} className="flex gap-2 mt-1">
            <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
            <span>{renderBold(line.replace(/^[\-•\*] /, ""))}</span>
          </div>
        );
      }
      // Numbered line: starts with 1. 2. etc.
      if (/^\d+\.\s/.test(line)) {
        const [num, ...rest] = line.split(/\.\s/);
        return (
          <div key={i} className="flex gap-2 mt-1">
            <span className="text-cyan-400 shrink-0 font-medium">{num}.</span>
            <span>{renderBold(rest.join(". "))}</span>
          </div>
        );
      }
      // Empty line → small gap
      if (line.trim() === "") return <div key={i} className="mt-1" />;
      // Normal line
      return <div key={i} className={i > 0 ? "mt-1" : ""}>{renderBold(line)}</div>;
    });
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Twin chat"
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-cyan-500/20 p-4 text-cyan-300 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-500/30 hover:scale-110 ${
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-200">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div>
              <h3 className="font-medium text-white">Sabarish Twin</h3>
              <p className="text-xs text-neutral-400">
                Ask me anything about my work
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="mb-4 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm text-neutral-200">
                Hi! I&apos;m Sabarish&apos;s digital twin. Ask me about his
                projects, skills, or experience!
              </div>
            )}

            {messages.map((m: any) => {
              const text = getMessageText(m);
              if (!text) return null;
              return (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-cyan-500/20 text-cyan-100 whitespace-pre-wrap"
                        : "bg-white/10 text-neutral-200 leading-relaxed"
                    }`}
                  >
                    {m.role === "assistant" ? renderMarkdown(text) : text}
                  </div>
                </div>
              );
            })}

            {/* Thinking pulse */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-neutral-200 rounded-2xl px-4 py-2 text-sm animate-pulse">
                  Thinking...
                </div>
              </div>
            )}

            {/* Error boundary — shows if the stream fails */}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-500/20 text-red-200 border border-red-500/30 rounded-2xl px-4 py-2 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Connection dropped. Please try again.</span>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form
            onSubmit={handleFormSubmit}
            className="border-t border-white/10 p-3 flex gap-2 bg-neutral-950/50"
          >
            <input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isThinking}
              autoComplete="off"
              className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-cyan-500/50 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="flex items-center justify-center rounded-xl bg-cyan-500/20 p-2 text-cyan-300 disabled:opacity-50 transition-all hover:bg-cyan-500/30 shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
