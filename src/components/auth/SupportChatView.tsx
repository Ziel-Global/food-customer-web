"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ChatMessage = {
  id: string;
  from: "support" | "you";
  text: string;
  at: string;
};

type SupportChatViewProps = {
  onClose: () => void;
};

const QUICK_REPLIES = [
  "Where is my order?",
  "Wrong or missing item",
  "Change delivery address",
  "Refund help",
];

const SUPPORT_REPLIES: Record<string, string> = {
  "Where is my order?":
    "Open Orders to track your courier live — you’ll see ETA, map, and call/chat options there.",
  "Wrong or missing item":
    "Sorry about that. Tell me the order number and what’s missing, and I’ll get a refund or redelivery started.",
  "Change delivery address":
    "You can update your drop-off from Account → Delivery addresses, or from the address picker in the top bar.",
  "Refund help":
    "We can review refunds for missing items, quality issues, or late deliveries. Share a few details and I’ll help.",
};

const SEED: ChatMessage[] = [
  {
    id: "s1",
    from: "support",
    text: "Hi! I’m Maya from Crave Support. How can I help today?",
    at: "Just now",
  },
  {
    id: "s2",
    from: "support",
    text: "You can tap a quick reply below, or type your own message.",
    at: "Just now",
  },
];

export function SupportChatView({ onClose }: SupportChatViewProps) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(SEED);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const idSeq = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function nextId(prefix: string) {
    idSeq.current += 1;
    return `${prefix}-${idSeq.current}`;
  }

  function replyFor(text: string) {
    return (
      SUPPORT_REPLIES[text] ??
      "Got it — thanks for the details. A specialist will follow up here shortly. You can also email support@crave.example."
    );
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: nextId("you"), from: "you", text: trimmed, at: "Just now" },
    ]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId("support"),
          from: "support",
          text: replyFor(trimmed),
          at: "Just now",
        },
      ]);
    }, 900);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(draft);
  }

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        background: "#f3f4ef",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          background: "#20231c",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          padding: "14px 16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button type="button" onClick={onClose} style={iconBtn} aria-label="Back">
          ←
        </button>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: "#d6f34c",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: 16,
            color: "#20231c",
            flexShrink: 0,
          }}
        >
          ?
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>Crave Support</div>
          <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12, marginTop: 2 }}>
            Usually replies in a few minutes
          </div>
        </div>
        <a href="mailto:support@crave.example" style={mailBtn} aria-label="Email support">
          ✉
        </a>
      </header>

      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            background: "#f0f7d8",
            borderRadius: 16,
            padding: 12,
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1.2 }} aria-hidden="true">
            🛡
          </span>
          <p style={{ margin: 0, flex: 1, color: "#20231c", fontSize: 12, lineHeight: 1.45, fontWeight: 500 }}>
            Chat with Crave Support about orders, refunds, or account help. Your phone number stays private.
          </p>
        </div>

        {messages.map((item) => {
          const mine = item.from === "you";
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: mine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  borderRadius: 18,
                  borderBottomLeftRadius: mine ? 18 : 6,
                  borderBottomRightRadius: mine ? 6 : 18,
                  padding: "10px 14px",
                  background: mine ? "#20231c" : "#fff",
                  boxShadow: mine ? "none" : "0 1px 0 rgba(0,0,0,.04)",
                }}
              >
                <div style={{ color: mine ? "#fff" : "#20231c", fontSize: 15, lineHeight: 1.4 }}>{item.text}</div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 10,
                    color: mine ? "rgba(255,255,255,.45)" : "#9a9b91",
                  }}
                >
                  {item.at}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          padding: "0 16px 10px",
          flexShrink: 0,
        }}
      >
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            type="button"
            onClick={() => send(reply)}
            style={{
              border: "1px solid #e4e5dc",
              borderRadius: 999,
              background: "#fff",
              color: "#20231c",
              fontSize: 12,
              fontWeight: 600,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            {reply}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          background: "#fff",
          borderTop: "1px solid #e9e9e1",
          padding: "10px 14px 14px",
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message support…"
          maxLength={400}
          rows={1}
          style={{
            flex: 1,
            minHeight: 42,
            maxHeight: 110,
            resize: "none",
            border: 0,
            borderRadius: 18,
            background: "#f3f4ef",
            padding: "11px 14px",
            fontSize: 15,
            color: "#20231c",
            fontFamily: "inherit",
            outline: "none",
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(draft);
            }
          }}
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send"
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            border: 0,
            background: "#d6f34c",
            color: "#20231c",
            fontSize: 16,
            fontWeight: 800,
            cursor: draft.trim() ? "pointer" : "default",
            opacity: draft.trim() ? 1 : 0.4,
            flexShrink: 0,
          }}
        >
          ➤
        </button>
      </form>
    </div>,
    document.body,
  );
}

const iconBtn: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: 0,
  background: "rgba(255,255,255,.1)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  fontSize: 18,
  cursor: "pointer",
  flexShrink: 0,
};

const mailBtn: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: 0,
  background: "#d6f34c",
  color: "#20231c",
  display: "grid",
  placeItems: "center",
  fontSize: 16,
  textDecoration: "none",
  flexShrink: 0,
};
