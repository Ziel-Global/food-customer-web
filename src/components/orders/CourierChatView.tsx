"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getDemoChatSeed, riderImageForVehicle } from "@/lib/tracking";

type ChatMessage = {
  id: string;
  from: "courier" | "you";
  text: string;
  at: string;
};

type CourierChatViewProps = {
  orderId: string;
  onClose: () => void;
};

const QUICK_REPLIES = [
  "I'm at the lobby",
  "Please leave at the door",
  "Call me when you arrive",
  "I'll come downstairs",
];

export function CourierChatView({ orderId, onClose }: CourierChatViewProps) {
  const [mounted, setMounted] = useState(false);
  const seed = useMemo(() => getDemoChatSeed(orderId), [orderId]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => seed.messages);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const idSeq = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMessages(seed.messages);
    setDraft("");
  }, [seed]);

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
          id: nextId("courier"),
          from: "courier",
          text: "Got it — thanks! See you soon.",
          at: "Just now",
        },
      ]);
    }, 1200);
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
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={riderImageForVehicle(seed.vehicle)}
            alt=""
            style={{ width: 34, height: 26, objectFit: "contain" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{seed.courierName}</div>
          <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12, marginTop: 2 }}>
            Courier · Order #{seed.orderId}
          </div>
        </div>
        <a href={`tel:${seed.courierPhone}`} style={callBtn} aria-label="Call courier">
          ☎
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
            Chat with your courier about delivery for {seed.restaurantName}. Phone number stays private.
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
          placeholder="Message courier…"
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

const callBtn: CSSProperties = {
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
