import React, { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: `${import.meta.env.VITE_API_KEY_GROK}`,
  dangerouslyAllowBrowser: true, // Brauzerda ishlashi uchun shart
});

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Assalomu alaykum! TATU Engineering School AI yordamchisiman. Savollaringiz bormi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Siz TATU Engineering School assistentisiz.",
          },
          ...messages,
          userMsg,
        ],
        model: "llama-3.3-70b-versatile",
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatCompletion.choices[0]?.message?.content,
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Xatolik yuz berdi." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[99999]">
      {/* CHAT OYNASI */}
      {isOpen && (
        <div className="fixed inset-0 sm:absolute sm:inset-auto sm:bottom-20 sm:right-0 w-full h-full sm:w-[380px] sm:h-[600px] bg-[var(--bg-dark-section)] sm:rounded-2xl shadow-2xl border-none sm:border sm:border-white/10 flex flex-col overflow-hidden transition-all duration-300">
          {/* TOP HEADER - MOBILDA HAM KO'RINADI */}
          <div className="bg-black/20 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--bg-dark-section)] font-bold shadow-lg shadow-[var(--color-primary)]/20">
                AI
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  Engineering Bot
                </h4>
                <p className="text-[10px] text-[var(--color-primary)] font-medium uppercase tracking-wider">
                  Online
                </p>
              </div>
            </div>

            {/* YOPISH TUGMASI - ENDI ANIQ KO'RINADI */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all active:scale-90"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* CHAT MAYDONI */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-dark-section)]"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--color-primary)] text-[var(--bg-dark-section)] font-medium rounded-tr-none"
                      : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1.5 p-2 items-center">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* INPUT QISMI - DOIMO PASTDA QOTIB TURADI */}
          <div className="p-4 bg-black/20 border-t border-white/10 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Savol yozing..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--color-primary)] hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASOSIY DUMALOQ TUGMA */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--color-primary)] rounded-full shadow-[0_10px_40px_rgba(61,224,130,0.4)] flex items-center justify-center text-[var(--bg-dark-section)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? (
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
