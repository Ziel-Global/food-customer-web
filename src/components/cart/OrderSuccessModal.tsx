"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type OrderSuccessModalProps = {
  open: boolean;
  address: string;
  total: number;
  orderId: string;
  onTrack: () => void;
  onHome: () => void;
};

export function OrderSuccessModal({
  open,
  address,
  total,
  orderId,
  onTrack,
  onHome,
}: OrderSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(22, 24, 18, 0.58)",
      }}
      onClick={onHome}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order placed successfully"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(440px, 100%)",
          background: "#fff",
          borderRadius: 22,
          padding: "28px 26px 22px",
          boxShadow: "0 24px 70px rgba(22,24,18,.28)",
          textAlign: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            margin: "0 auto 18px",
            background: "linear-gradient(145deg, #edf3db, #d6f34c)",
            color: "#20231c",
            display: "grid",
            placeItems: "center",
            fontSize: 34,
            fontWeight: 800,
            boxShadow: "0 0 0 8px rgba(214,243,76,.22)",
          }}
          aria-hidden="true"
        >
          ✓
        </div>

        <p
          className="eyebrow"
          style={{ padding: 0, margin: "0 0 8px", color: "#687c35", letterSpacing: "0.14em" }}
        >
          SUCCESS
        </p>
        <h2
          style={{
            font: "600 30px Georgia, serif",
            letterSpacing: "-0.6px",
            margin: "0 0 8px",
            color: "#20231c",
          }}
        >
          Order placed successfully
        </h2>
        <p style={{ margin: "0 0 22px", fontSize: 14, lineHeight: 1.5, color: "#77796f", fontWeight: 500 }}>
          Your order is confirmed and on its way to the kitchen. We’ll keep you posted until it arrives.
        </p>

        <div
          style={{
            textAlign: "left",
            border: "1px solid #e9e9e1",
            background: "#fbfbf8",
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 18,
            display: "grid",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13 }}>
            <span style={{ color: "#8a8d82", fontWeight: 600 }}>Order</span>
            <b style={{ color: "#20231c", fontWeight: 800 }}>{orderId}</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13 }}>
            <span style={{ color: "#8a8d82", fontWeight: 600 }}>Total paid</span>
            <b style={{ color: "#20231c", fontWeight: 800 }}>${total.toFixed(2)}</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13 }}>
            <span style={{ color: "#8a8d82", fontWeight: 600 }}>ETA</span>
            <b style={{ color: "#20231c", fontWeight: 800 }}>28–35 min</b>
          </div>
          <div
            style={{
              borderTop: "1px solid #e9e9e1",
              paddingTop: 10,
              display: "grid",
              gap: 4,
            }}
          >
            <span style={{ color: "#8a8d82", fontWeight: 600, fontSize: 12 }}>Delivering to</span>
            <b style={{ color: "#20231c", fontWeight: 700, fontSize: 14 }}>⌖ {address}</b>
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <button
            type="button"
            onClick={onTrack}
            style={{
              height: 48,
              border: 0,
              borderRadius: 12,
              background: "#20231c",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            Track your order <span style={{ color: "#d6f34c" }}>→</span>
          </button>
          <button
            type="button"
            onClick={onHome}
            style={{
              height: 44,
              border: "1px solid #e9e9e1",
              borderRadius: 12,
              background: "#fff",
              color: "#5f6358",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Keep browsing
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
