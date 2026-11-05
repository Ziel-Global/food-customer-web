"use client";

import { CSSProperties, useMemo, useState } from "react";
import {
  formatArrivalClock,
  listActiveOrders,
  listPastOrderSummaries,
  riderImageForVehicle,
} from "@/lib/tracking";

type OrdersViewProps = {
  placed: boolean;
  orderId?: string;
  onExplore: () => void;
  onToast?: (message: string) => void;
  onOpenOrder: (orderId: string) => void;
  onReorder: (orderId: string) => void;
  onChat: (orderId: string) => void;
};

type TabKey = "all" | "active" | "past";

const STEPS = ["Confirmed", "Preparing", "On the way", "Done"] as const;

export function OrdersView({
  placed,
  orderId,
  onExplore,
  onToast,
  onOpenOrder,
  onReorder,
  onChat,
}: OrdersViewProps) {
  const [tab, setTab] = useState<TabKey>("all");
  const pastOrders = useMemo(() => listPastOrderSummaries(), []);
  const activeOrders = useMemo(
    () => listActiveOrders(placed ? orderId : null),
    [placed, orderId],
  );

  const showActive = tab === "all" || tab === "active";
  const showPast = tab === "all" || tab === "past";

  return (
    <div style={page}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={eyebrow}>YOUR ORDERS</p>
          <h1
            style={{
              font: '600 34px/1.05 Georgia, "Times New Roman", serif',
              letterSpacing: "-0.8px",
              margin: "0 0 8px",
              color: "#20231c",
            }}
          >
            Your orders
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#77796f", fontWeight: 500, lineHeight: 1.45 }}>
            {activeOrders.length} active · track, call, or chat
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="tablist" aria-label="Order filters">
          {(
            [
              { key: "all", label: "All" },
              { key: "active", label: "Active" },
              { key: "past", label: "Past" },
            ] as const
          ).map((entry) => {
            const on = tab === entry.key;
            return (
              <button
                key={entry.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(entry.key)}
                style={{
                  border: 0,
                  borderRadius: 999,
                  padding: "9px 16px",
                  background: on ? "#20231c" : "#eceee6",
                  color: on ? "#fff" : "#6f7368",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      </header>

      {showActive ? (
        <section style={{ margin: "0 0 30px", display: "grid", gap: 14 }}>
          <p style={{ ...eyebrow, marginBottom: 0 }}>ACTIVE ORDERS</p>
          {activeOrders.length ? (
            activeOrders.map((order) => (
              <article
                key={order.id}
                style={{
                  background: "#20231c",
                  color: "#f7f8f2",
                  borderRadius: 28,
                  padding: 18,
                  display: "grid",
                  gap: 12,
                  boxShadow: "0 18px 40px rgba(32,35,28,.16)",
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpenOrder(order.id)}
                  style={{ all: "unset", cursor: "pointer", display: "grid", gap: 12 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        background: "#d6f34c",
                        color: "#20231c",
                        borderRadius: 999,
                        padding: "6px 11px",
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                      }}
                    >
                      <i
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#20231c",
                          display: "block",
                        }}
                      />
                      LIVE
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.55)" }}>
                      ETA {formatArrivalClock(order.etaSecondsInitial)}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                    <div style={{ minWidth: 0 }}>
                      <h2
                        style={{
                          margin: 0,
                          font: '700 20px/1.15 Georgia, "Times New Roman", serif',
                          letterSpacing: "-0.4px",
                          color: "#fff",
                        }}
                      >
                        {order.restaurantName}
                      </h2>
                      <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>
                        #{order.id} · {order.itemSummary}
                      </p>
                      <strong
                        style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 700, color: "#d6f34c" }}
                      >
                        {order.statusLabel}
                      </strong>
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        width: 76,
                        height: 60,
                        borderRadius: 16,
                        background: "#d6f34c",
                        display: "grid",
                        placeItems: "center",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={riderImageForVehicle(order.vehicle)}
                        alt=""
                        style={{ width: 62, height: 44, objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
                    {STEPS.map((label, index) => (
                      <div key={label} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: index <= order.activeStepIndex ? "#d6f34c" : "rgba(255,255,255,.15)",
                            flexShrink: 0,
                          }}
                        />
                        {index < STEPS.length - 1 ? (
                          <i
                            style={{
                              display: "block",
                              flex: 1,
                              height: 2,
                              margin: "0 4px",
                              background: index < order.activeStepIndex ? "#d6f34c" : "rgba(255,255,255,.12)",
                            }}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(255,255,255,.06)",
                    borderRadius: 16,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "#d6f34c",
                      display: "grid",
                      placeItems: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={riderImageForVehicle(order.vehicle)}
                      alt=""
                      style={{ width: 32, height: 24, objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{order.courierName}</div>
                    <div style={{ marginTop: 2, fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>
                      Your courier · tap chat anytime
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => onOpenOrder(order.id)}
                    style={{
                      flex: 1.2,
                      minWidth: 110,
                      height: 42,
                      border: 0,
                      borderRadius: 999,
                      background: "#d6f34c",
                      color: "#20231c",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Track
                  </button>
                  <a href={`tel:${order.courierPhone}`} style={ghostAction}>
                    Call
                  </a>
                  <button type="button" onClick={() => onChat(order.id)} style={ghostAction}>
                    Chat
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 18px",
                border: "1px solid #e9e9e1",
                background: "#fff",
                borderRadius: 20,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: "#d6f34c",
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/riders/minimal-delivery-cyclist.png"
                  alt=""
                  style={{ width: 42, height: 32, objectFit: "contain" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ display: "block", fontSize: 15, fontWeight: 800, color: "#20231c" }}>No active orders</b>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7a7d72", fontWeight: 500, lineHeight: 1.4 }}>
                  When you place an order, live tracking shows up here.
                </p>
              </div>
              <button
                type="button"
                onClick={onExplore}
                style={{
                  border: 0,
                  borderRadius: 999,
                  background: "#d6f34c",
                  color: "#20231c",
                  fontSize: 13,
                  fontWeight: 800,
                  padding: "10px 14px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Browse
              </button>
            </div>
          )}
        </section>
      ) : null}

      {showPast ? (
        <section style={{ margin: "0 0 30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <p style={{ ...eyebrow, margin: 0 }}>PREVIOUS ORDERS</p>
            <button
              type="button"
              onClick={() => onToast?.("Thanks — rating helps kitchens improve")}
              style={{
                border: 0,
                background: "none",
                color: "#20231c",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Rate a delivery
            </button>
          </div>

          <div
            style={{
              border: "1px solid #e9e9e1",
              background: "#fff",
              borderRadius: 22,
              overflow: "hidden",
            }}
          >
            {pastOrders.map((order, index) => (
              <article
                key={order.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 16,
                  borderBottom: index < pastOrders.length - 1 ? "1px solid #e9e9e1" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpenOrder(order.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#f3f4ef",
                    }}
                  >
                    <img
                      src={order.image}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ display: "block", fontSize: 15, fontWeight: 800, color: "#20231c" }}>
                      {order.restaurantName}
                    </b>
                    <p style={{ margin: "3px 0 0", fontSize: 12, color: "#8a8d82", fontWeight: 600 }}>
                      #{order.id} · {order.itemSummary}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: 999,
                          background: "#edf3db",
                          color: "#5f7a2e",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 9px",
                        }}
                      >
                        {order.statusLabel}
                      </span>
                      <strong style={{ fontSize: 13, fontWeight: 800, color: "#20231c" }}>
                        ${order.total.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  aria-label={`Reorder ${order.restaurantName}`}
                  onClick={() => onReorder(order.id)}
                  style={{
                    width: 40,
                    height: 40,
                    border: 0,
                    borderRadius: 14,
                    background: "#f3f4ef",
                    color: "#20231c",
                    fontSize: 18,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  ↻
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

const page: CSSProperties = {
  maxWidth: 860,
  margin: "0 auto",
  padding: "4px 0 40px",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const eyebrow: CSSProperties = {
  margin: "0 0 8px",
  padding: 0,
  fontSize: 11,
  letterSpacing: "0.14em",
  fontWeight: 800,
  color: "#9a9b91",
};

const ghostAction: CSSProperties = {
  flex: 1,
  minWidth: 90,
  height: 42,
  border: 0,
  borderRadius: 999,
  background: "rgba(255,255,255,.1)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  boxSizing: "border-box",
};
