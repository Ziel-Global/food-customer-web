"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PremiumSelect } from "@/components/ui/PremiumSelect";

type CheckoutModalProps = {
  open: boolean;
  address: string;
  count: number;
  subtotal: number;
  onAddressChange: (value: string) => void;
  onClose: () => void;
  onPlaceOrder: () => void;
};

const whenOptions = [
  { value: "asap", label: "As soon as possible", hint: "Usually 25–40 min" },
  { value: "later", label: "Schedule for later", hint: "Pick a delivery window" },
];

const paymentOptions = [
  { value: "visa", label: "Visa ···· 2048", hint: "Default card" },
  { value: "cash", label: "Cash on delivery", hint: "Pay the rider" },
  { value: "wallet", label: "Crave wallet", hint: "Balance available" },
];

const fieldLabel = {
  fontSize: 10,
  letterSpacing: "0.1em",
  fontWeight: 800,
  color: "#9a9b91",
} as const;

const inputStyle = {
  border: "1px solid #e9e9e1",
  borderRadius: 12,
  background: "#fbfbf8",
  padding: "11px 13px",
  fontSize: 14,
  fontWeight: 600,
  color: "#2b2d25",
  fontFamily: "Arial, Helvetica, sans-serif",
  width: "100%",
  boxSizing: "border-box" as const,
};

export function CheckoutModal({
  open,
  address,
  count,
  subtotal,
  onAddressChange,
  onClose,
  onPlaceOrder,
}: CheckoutModalProps) {
  const [mounted, setMounted] = useState(false);
  const [when, setWhen] = useState("asap");
  const [payment, setPayment] = useState("visa");

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

  const total = subtotal + 2.74;

  return createPortal(
    <div
      className="checkout-scrim"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(22, 24, 18, 0.55)",
      }}
    >
      <div
        className="checkout-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(480px, 100%)",
          maxHeight: "100%",
          overflow: "visible",
          background: "#fff",
          borderRadius: 20,
          padding: "20px 22px 16px",
          boxShadow: "0 24px 70px rgba(22,24,18,.28)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div className="drawer-head" style={{ marginBottom: 16, alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ padding: 0, margin: "0 0 4px", fontSize: 10 }}>
              ALMOST THERE
            </p>
            <h2 style={{ font: "600 26px Georgia, serif", letterSpacing: "-0.5px", margin: 0 }}>Checkout</h2>
          </div>
          <button className="close-button" onClick={onClose} type="button" style={{ width: 32, height: 32, fontSize: 18 }}>
            ×
          </button>
        </div>

        <label className="checkout-field" style={{ display: "grid", gap: 6, marginBottom: 12 }}>
          <span style={fieldLabel}>DELIVER TO</span>
          <input value={address} onChange={(e) => onAddressChange(e.target.value)} style={inputStyle} />
        </label>

        <div
          className="checkout-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 12,
            alignItems: "start",
          }}
        >
          <div className="checkout-field" style={{ display: "grid", gap: 6, margin: 0 }}>
            <span style={fieldLabel}>WHEN</span>
            <PremiumSelect
              compact
              ariaLabel="Delivery time"
              value={when}
              options={whenOptions}
              onChange={setWhen}
            />
          </div>
          <div className="checkout-field" style={{ display: "grid", gap: 6, margin: 0 }}>
            <span style={fieldLabel}>PAYMENT</span>
            <PremiumSelect
              compact
              ariaLabel="Payment method"
              value={payment}
              options={paymentOptions}
              onChange={setPayment}
            />
          </div>
        </div>

        <label className="checkout-field" style={{ display: "grid", gap: 6, marginBottom: 14 }}>
          <span style={fieldLabel}>PROMO CODE</span>
          <input placeholder="Add a promo code" style={inputStyle} />
        </label>

        <div style={{ borderTop: "1px solid #e9e9e1", paddingTop: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0",
              fontSize: 13,
              color: "#77796f",
              fontWeight: 500,
            }}
          >
            <span>Subtotal · {count} items</span>
            <b style={{ color: "#35372f" }}>${subtotal.toFixed(2)}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0",
              fontSize: 13,
              color: "#77796f",
              fontWeight: 500,
            }}
          >
            <span>Delivery + service</span>
            <b style={{ color: "#35372f" }}>$2.74</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #e9e9e1",
              marginTop: 4,
              paddingTop: 10,
              fontSize: 15,
              fontWeight: 700,
              color: "#272920",
            }}
          >
            <span>Total</span>
            <b style={{ fontSize: 18 }}>${total.toFixed(2)}</b>
          </div>
        </div>

        <button
          className="checkout-button"
          onClick={onPlaceOrder}
          type="button"
          style={{
            height: 46,
            border: 0,
            borderRadius: 11,
            background: "#24261f",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            marginTop: 12,
            width: "100%",
            cursor: "pointer",
          }}
        >
          Place order <span style={{ color: "#d6f34c" }}>${total.toFixed(2)} →</span>
        </button>
        <p style={{ textAlign: "center", color: "#999a92", fontSize: 11, fontWeight: 600, margin: "10px 0 0" }}>
          By placing your order, you agree to Crave’s terms.
        </p>
      </div>
    </div>,
    document.body,
  );
}
