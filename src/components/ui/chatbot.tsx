import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  RotateCcw,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isError?: boolean;
}

const N8N_WEBHOOK_URL =
  "https://zakir1223.app.n8n.cloud/webhook/zakir";

const INITIAL_GREETING: Message = {
  id: "greeting",
  sender: "bot",
  text: "Hi! Welcome to SILTOS AI. I'm your AI workflow partner. I can help you automate repetitive tasks, streamline business processes, and answer your questions. How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

const SUGGESTED_PROMPTS = [
  "How can AI automate my workflows?",
  "What automation services do you offer?",
  "How do I integrate SILTOS with my tools?",
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Generate or retrieve persistent session ID for conversation memory
  const sessionIdRef = useRef<string>("");
  if (!sessionIdRef.current) {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("siltos_chat_session_id");
      if (stored) {
        sessionIdRef.current = stored;
      } else {
        const generated = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem("siltos_chat_session_id", generated);
        sessionIdRef.current = generated;
      }
    }
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      // Autofocus input on open (desktop)
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages, isLoading]);

  const parseWebhookResponse = (data: unknown): string => {
    if (typeof data === "string") {
      return data;
    }
    if (Array.isArray(data) && data.length > 0) {
      return parseWebhookResponse(data[0]);
    }
    if (typeof data === "object" && data !== null) {
      const obj = data as Record<string, unknown>;
      // Look for standard n8n output keys in priority order
      if (typeof obj.output === "string") return obj.output;
      if (typeof obj.response === "string") return obj.response;
      if (typeof obj.text === "string") return obj.text;
      if (typeof obj.message === "string" && !obj.code) return obj.message;
      if (typeof obj.reply === "string") return obj.reply;
      if (typeof obj.content === "string") return obj.content;
      if (obj.data) return parseWebhookResponse(obj.data);

      // Check if any property value is a non-empty string
      for (const val of Object.values(obj)) {
        if (typeof val === "string" && val.trim().length > 0) {
          return val;
        }
      }
      return JSON.stringify(obj);
    }
    return String(data);
  };

  const sendMessageToWebhook = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to actual n8n webhook with expected payload structure
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify({
          message: trimmed,
          chatInput: trimmed,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        let errorDetails = "";
        try {
          const errData = await response.json();
          if (errData && typeof errData.message === "string") {
            errorDetails = errData.message;
          }
        } catch {
          // If response is not JSON
        }

        console.error("n8n Webhook Error:", response.status, errorDetails);

        const errorMessage: Message = {
          id: `bot_err_${Date.now()}`,
          sender: "bot",
          text:
            "I'm having trouble connecting to the automation workflow right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        const contentType = response.headers.get("content-type") || "";
        let botReply = "";

        if (contentType.includes("application/json")) {
          const jsonData = await response.json();
          botReply = parseWebhookResponse(jsonData);
        } else {
          const textData = await response.text();
          botReply = textData;
        }

        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: botReply || "I received your message successfully.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error("Network or execution error communicating with webhook:", err);
      const errorMessage: Message = {
        id: `bot_err_${Date.now()}`,
        sender: "bot",
        text:
          "Unable to reach the server. Please check your internet connection or try again later.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      if (!isOpen) {
        setHasUnread(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToWebhook(input);
    }
  };

  const handleResetChat = () => {
    const newSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("siltos_chat_session_id", newSession);
    sessionIdRef.current = newSession;
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `greeting_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleRetryLastMessage = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUserMsg) {
      sendMessageToWebhook(lastUserMsg.text);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Bottom-Right: only central SILTOS logo at 36-40px with transparent background) */}
      <motion.button
        id="siltos-chat-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer outline-none focus:outline-none group select-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close AI chat" : "Open SILTOS AI chat"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950 text-white shadow-xl border border-white/10 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-100" />
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="relative flex items-center justify-center w-10 h-10"
            >
              <img
                src="/images/siltos-logo-transparent.png"
                alt="SILTOS AI Logo"
                className="w-[38px] h-[38px] object-contain select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                loading="eager"
              />
              {/* Online live indicator badge */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white shadow-xs" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread indicator pulse if closed */}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -left-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Floating Modern Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="siltos-chat-window"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-22 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 z-[60] sm:w-[410px] h-[590px] max-h-[calc(100dvh-120px)] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden font-sans border border-zinc-200/90"
          >
            {/* Window Header */}
            <header className="bg-[#121619] text-white px-4 py-3.5 flex items-center justify-between border-b border-white/[0.08] shrink-0">
              <div className="flex items-center space-x-3">
                {/* Official SILTOS Logo Avatar */}
                <div className="w-9 h-9 rounded-xl bg-zinc-900/90 border border-emerald-500/30 flex items-center justify-center p-1 shadow-inner shrink-0">
                  <img
                    src="/images/siltos-logo-transparent.png"
                    alt="SILTOS AI Logo"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold tracking-wide text-zinc-100">
                      SILTOS AI
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-[11.5px] text-zinc-400 font-normal">
                    Your AI Workflow Partner
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFAFA]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {msg.sender === "user" ? (
                    /* User Message Bubble */
                    <div className="flex flex-col items-end max-w-[85%]">
                      <div className="bg-zinc-900 text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm border border-zinc-800">
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ) : (
                    /* AI Bot Message Bubble */
                    <div className="flex items-start space-x-2.5 max-w-[88%]">
                      <div className="w-6 h-6 rounded-lg bg-[#121619] border border-emerald-500/30 flex items-center justify-center p-0.5 mt-0.5 shrink-0 shadow-xs">
                        <img
                          src="/images/siltos-logo-transparent.png"
                          alt="SILTOS AI"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <div
                          className={`w-full px-4 py-2.5 text-[13.5px] leading-relaxed rounded-2xl rounded-tl-xs shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${
                            msg.isError
                              ? "bg-red-50 text-red-900 border border-red-200"
                              : "bg-white text-zinc-900 border border-zinc-200/90"
                          }`}
                        >
                          {msg.isError && (
                            <div className="flex items-center space-x-1.5 text-red-600 font-medium text-xs mb-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Connection Notice</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                          {msg.isError && (
                            <button
                              onClick={handleRetryLastMessage}
                              className="mt-2.5 flex items-center space-x-1.5 text-xs text-red-700 hover:text-red-900 font-medium underline underline-offset-2 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Try sending again</span>
                            </button>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2.5 max-w-[88%]"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#121619] border border-emerald-500/30 flex items-center justify-center p-0.5 mt-0.5 shrink-0 shadow-xs">
                    <img
                      src="/images/siltos-logo-transparent.png"
                      alt="SILTOS AI"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white border border-zinc-200/90 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center space-x-2.5 text-zinc-600">
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium tracking-wide">
                      SILTOS AI is thinking...
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Starter Prompt Chips (only shown if only initial greeting is present) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-semibold text-zinc-400 px-1 uppercase tracking-wider">
                    Suggested topics
                  </p>
                  <div className="flex flex-col space-y-1.5">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessageToWebhook(prompt)}
                        className="text-left text-xs bg-white hover:bg-zinc-50 hover:border-emerald-500/40 text-zinc-700 hover:text-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 shadow-xs transition-all duration-150 cursor-pointer flex items-center justify-between group"
                      >
                        <span className="font-medium">{prompt}</span>
                        <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Area (Fixed at bottom, technical footer completely removed) */}
            <div className="p-3 bg-white border-t border-zinc-200/90 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessageToWebhook(input);
                }}
                className="flex items-center space-x-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    id="siltos-chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask SILTOS AI a question..."
                    disabled={isLoading}
                    autoComplete="off"
                    className="w-full bg-zinc-50 hover:bg-zinc-100/70 focus:bg-white text-zinc-900 placeholder:text-zinc-400 text-sm rounded-xl px-4 py-2.5 border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-emerald-500/15 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  id="siltos-chat-send-btn"
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-xl bg-[#121619] text-white flex items-center justify-center hover:bg-zinc-800 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 border border-white/10 shadow-sm"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  ) : (
                    <Send className="w-4 h-4 text-zinc-100" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
