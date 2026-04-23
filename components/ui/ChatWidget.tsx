"use client";

import { useState, useRef, useEffect } from "react";
import { RiMessage3Line, RiCloseLine, RiSendPlaneLine } from "react-icons/ri";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  "hello": "Hi there! 👋 Welcome to Marvel Group. How can I help you today?",
  "hi": "Hello! 👋 How can we assist you today?",
  "services": "We offer: Medical Creative Services, Digital Health Platforms, Medical Education, AI Solutions, and Medical Writing. Which one interests you?",
  "products": "Our products include: AREEP (AI Training), MAHER (Assessment Platform), DynaSync (CMS), and WaselMail. Want to learn more about any of them?",
  "contact": "You can reach us at info@marvelgroup.com or call our offices in Egypt (+20 100 000 0000), UAE (+971 50 000 0000), or KSA (+966 50 000 0000).",
  "price": "Our pricing varies based on project scope. Please contact us at info@marvelgroup.com for a custom quote.",
  "work": "You can view our portfolio at /work. We've worked with 100+ pharma clients across MENA!",
  "default": "Thanks for your message! For detailed assistance, please contact us at info@marvelgroup.com or visit our Contact page. Our team typically responds within 24 hours."
};

function getBotResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMsg.includes(key)) {
      return response;
    }
  }
  return botResponses.default;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 How can we help you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-90"
            : "bg-primary-500 hover:bg-primary-600"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <RiCloseLine size={24} className="text-white" />
        ) : (
          <RiMessage3Line size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 left-6 z-50 w-80 h-96 glass-dark rounded-2xl shadow-2xl border border-border-dark overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-primary-500 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <RiMessage3Line size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Marvel Support</h4>
              <p className="text-white/70 text-xs">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-dark/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-primary-500 text-white rounded-br-md"
                      : "bg-surface-dark border border-border-dark text-text-dark rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-dark border border-border-dark text-muted-dark px-3 py-2 rounded-2xl rounded-bl-md text-sm">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-surface-dark/50 border-t border-border-dark flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <RiSendPlaneLine size={18} className="text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
