"use client";

import { FormEvent, useEffect, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Lead = {
  name: string;
  phone: string;
  email: string;
};

type ChatLanguage = "roman-urdu" | "english";

const starterMessage =
  "Assalam o Alaikum! Whimbrel Solution mein khushamdeed! Main Whimbrel AI hun — aapka personal tech consultant! Apna project idea batao — Website, App, AI Agent, System, ya Store. Main FORAN dunga: Complete features list, Exact timeline, Budget estimate. Batao — kya banana chahte ho?";

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage>("roman-urdu");
  const [lead, setLead] = useState<Lead>({ name: "", phone: "", email: "" });
  const [leadSaved, setLeadSaved] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: starterMessage },
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("whimbrel-agent-lead");
      if (!saved) return;
      const parsed = JSON.parse(saved) as Lead;
      if (parsed?.name && parsed?.phone) {
        setLead(parsed);
        setLeadSaved(true);
      }
    } catch {
      // Ignore malformed storage
    }
  }, []);

  const saveLead = (event: FormEvent) => {
    event.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim()) return;
    localStorage.setItem("whimbrel-agent-lead", JSON.stringify(lead));
    setLeadSaved(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `✅ Shukriya ${lead.name}! Hamari team 24 ghante mein aapse contact karegi. Hum aapke project par kaam karne ke liye excited hain! Ab aap apna project idea bata sakte hain — main aapko timeline aur budget estimate de dunga.`,
      },
    ]);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-8),
          language,
          lead: leadSaved ? lead : undefined,
        }),
      });

      const data = (await response.json()) as { reply?: string };
      const reply =
        data.reply ??
        "Sorry, AI assistant iss waqt available nahi hai. Aap WhatsApp par contact kar lein: +92 334 0007247";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue aa gaya. Please dobara try karein ya WhatsApp par message karein: +92 334 0007247",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-24 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-teal/70 bg-navy-2 text-teal shadow-[0_0_30px_rgba(59,191,176,0.35)] transition hover:scale-105 md:bottom-28 md:right-8"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        data-magnetic="true"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <section className="fixed bottom-40 right-5 z-40 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-navy-4 bg-navy shadow-[0_24px_80px_rgba(0,0,0,0.5)] md:right-8">
          <header className="flex items-center gap-3 border-b border-navy-4 bg-navy-2 px-4 py-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal/20 text-teal">
              <Bot size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">Whimbrel AI Agent</p>
              <p className="text-xs text-text-muted">Online</p>
            </div>
            <div className="inline-flex rounded-lg border border-navy-4 bg-navy p-1 text-xs">
              <button
                type="button"
                onClick={() => setLanguage("roman-urdu")}
                className={`rounded px-2 py-1 ${
                  language === "roman-urdu" ? "bg-teal text-navy" : "text-text-muted"
                }`}
              >
                Urdu
              </button>
              <button
                type="button"
                onClick={() => setLanguage("english")}
                className={`rounded px-2 py-1 ${
                  language === "english" ? "bg-teal text-navy" : "text-text-muted"
                }`}
              >
                EN
              </button>
            </div>
          </header>

          <div className="max-h-[340px] space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-teal text-navy"
                    : "border border-navy-4 bg-navy-2 text-text"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[86%] rounded-2xl border border-navy-4 bg-navy-2 px-3 py-2 text-sm text-text-muted">
                Typing...
              </div>
            )}
          </div>

          {!leadSaved ? (
            <form onSubmit={saveLead} className="space-y-2 border-t border-navy-4 p-3">
              <p className="text-xs text-text-muted">
                Start karne se pehle details share karein (required: name, phone).
              </p>
              <input
                value={lead.name}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Your name *"
                className="h-10 w-full rounded-lg border border-navy-4 bg-navy-2 px-3 text-sm text-text outline-none placeholder:text-text-muted"
                required
              />
              <input
                value={lead.phone}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, phone: event.target.value }))
                }
                placeholder="Phone / WhatsApp *"
                className="h-10 w-full rounded-lg border border-navy-4 bg-navy-2 px-3 text-sm text-text outline-none placeholder:text-text-muted"
                required
              />
              <input
                value={lead.email}
                onChange={(event) =>
                  setLead((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Email (optional)"
                className="h-10 w-full rounded-lg border border-navy-4 bg-navy-2 px-3 text-sm text-text outline-none placeholder:text-text-muted"
              />
              <button
                type="submit"
                className="h-10 w-full rounded-lg bg-teal text-sm font-semibold text-navy transition hover:bg-teal-light"
              >
                Continue to Chat
              </button>
            </form>
          ) : (
            <form onSubmit={submit} className="border-t border-navy-4 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-navy-4 bg-navy-2 px-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about services, budget, timeline..."
                  className="h-11 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-navy transition hover:bg-teal-light disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </section>
      )}
    </>
  );
}
