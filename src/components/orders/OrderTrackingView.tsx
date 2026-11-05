"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { OrderTrackingMap } from "@/components/orders/OrderTrackingMap";
import {
  TRACKING_STEPS,
  coordinateAtProgress,
  formatArrivalClock,
  formatTrackingCountdown,
  getOrderTracking,
  listActiveOrders,
  riderImageForVehicle,
} from "@/lib/tracking";

type OrderTrackingViewProps = {
  orderId: string;
  placedOrderId?: string | null;
  onClose: () => void;
  onReorder: (orderId: string) => void;
  onChat: (orderId: string) => void;
  onSelectOrder: (orderId: string) => void;
  onSupport?: () => void;
};

export function OrderTrackingView({
  orderId,
  placedOrderId,
  onClose,
  onReorder,
  onChat,
  onSelectOrder,
  onSupport,
}: OrderTrackingViewProps) {
  const [mounted, setMounted] = useState(false);
  const tracking = useMemo(
    () => getOrderTracking(orderId, placedOrderId),
    [orderId, placedOrderId],
  );
  const activeOrders = useMemo(() => listActiveOrders(placedOrderId), [placedOrderId]);

  const [progress, setProgress] = useState(
    tracking.isLive ? tracking.riderProgressMin : tracking.riderProgressMax,
  );
  const [secondsLeft, setSecondsLeft] = useState(tracking.etaSecondsInitial);

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
    setProgress(tracking.isLive ? tracking.riderProgressMin : tracking.riderProgressMax);
    setSecondsLeft(tracking.etaSecondsInitial);
  }, [tracking]);

  useEffect(() => {
    if (!tracking.isLive) return;
    let frame = 0;
    let direction = 1;
    const min = tracking.riderProgressMin;
    const max = tracking.riderProgressMax;
    const id = window.setInterval(() => {
      frame += 1;
      const t = (frame % 240) / 240;
      const eased = t < 0.5 ? t * 2 : (1 - t) * 2;
      const next = min + (max - min) * (direction > 0 ? eased : 1 - eased);
      if (frame % 240 === 0) direction *= -1;
      setProgress(next);
    }, 200);
    return () => window.clearInterval(id);
  }, [tracking]);

  useEffect(() => {
    if (!tracking.isLive) return;
    const tick = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(tick);
  }, [tracking.isLive, tracking.id]);

  const riderCoordinate = useMemo(
    () => coordinateAtProgress(tracking.routeCoordinates, progress),
    [tracking.routeCoordinates, progress],
  );

  const etaMinutes = secondsLeft > 0 ? Math.max(1, Math.ceil(secondsLeft / 60)) : 0;

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        background: "#111",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <OrderTrackingMap tracking={tracking} riderCoordinate={riderCoordinate} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,.28), transparent 22%, transparent 55%, rgba(0,0,0,.18))",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          zIndex: 2,
        }}
      >
        <button type="button" onClick={onClose} style={chromeBtn} aria-label="Back to orders">
          ←
        </button>
        <div
          style={{
            background: "#fff",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 13,
            fontWeight: 800,
            color: "#20231c",
            boxShadow: "0 10px 30px rgba(0,0,0,.16)",
          }}
        >
          #{tracking.id}
        </div>
        <button
          type="button"
          style={chromeBtn}
          aria-label="Get help"
          onClick={() => onSupport?.()}
        >
          ?
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "min(520px, 100%)",
            background: "#fff",
            borderRadius: 28,
            padding: "12px 18px 18px",
            boxShadow: "0 24px 60px rgba(0,0,0,.28)",
          }}
        >
          <div
            style={{
              width: 42,
              height: 5,
              borderRadius: 999,
              background: "#e4e5dc",
              margin: "0 auto 14px",
            }}
          />

          {tracking.isLive && activeOrders.length > 1 ? (
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                marginBottom: 14,
                paddingBottom: 2,
              }}
            >
              {activeOrders.map((order) => {
                const selected = order.id === tracking.id;
                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => {
                      if (!selected) onSelectOrder(order.id);
                    }}
                    style={{
                      minWidth: 128,
                      borderRadius: 16,
                      border: selected ? "1px solid #20231c" : "1px solid #e8e8e8",
                      background: selected ? "#20231c" : "#f7f7f7",
                      padding: "9px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: selected ? "#fff" : "#20231c",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 140,
                      }}
                    >
                      {order.restaurantName}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 11,
                        color: selected ? "rgba(255,255,255,.5)" : "#77796f",
                      }}
                    >
                      #{order.id}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          {tracking.isLive ? (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#d6f34c",
                      boxShadow: "0 0 0 4px rgba(214,243,76,.28)",
                    }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#687c35" }}>{tracking.statusLabel}</span>
                </div>
                <h2 style={{ margin: 0, font: '700 28px/1 Georgia, "Times New Roman", serif', color: "#20231c" }}>
                  {etaMinutes > 0 ? `${etaMinutes} min` : "Almost there"}
                </h2>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#77796f", fontWeight: 500 }}>
                  {secondsLeft > 0
                    ? `Arriving by ${formatArrivalClock(secondsLeft)}`
                    : "Your courier is arriving"}
                </p>
              </div>
              <div
                style={{
                  minWidth: 78,
                  borderRadius: 18,
                  background: "#20231c",
                  color: "#fff",
                  padding: "10px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 800, color: "#d6f34c", letterSpacing: "0.08em" }}>ETA</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
                  {formatTrackingCountdown(secondsLeft)}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "#d6f34c",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#20231c",
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#687c35" }}>Delivered</div>
                <h2 style={{ margin: "4px 0 0", font: '700 24px/1.1 Georgia, "Times New Roman", serif', color: "#20231c" }}>
                  Enjoy your meal
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#77796f", fontWeight: 500 }}>
                  {tracking.restaurantName} · #{tracking.id}
                </p>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
            {TRACKING_STEPS.map((step, index) => {
              const done = index <= tracking.activeStepIndex;
              const current = index === tracking.activeStepIndex;
              const last = index === TRACKING_STEPS.length - 1;
              return (
                <div key={step.key} style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: done ? "#d6f34c" : "#eceee6",
                        color: "#20231c",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 11,
                        fontWeight: 800,
                        flexShrink: 0,
                        boxShadow: current ? "0 0 0 4px rgba(214,243,76,.25)" : "none",
                      }}
                    >
                      {done ? (last && !tracking.isLive ? "✓" : index + 1) : ""}
                    </div>
                    {!last ? (
                      <div
                        style={{
                          flex: 1,
                          height: 3,
                          margin: "0 4px",
                          borderRadius: 99,
                          background: index < tracking.activeStepIndex ? "#d6f34c" : "#eceee6",
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      fontWeight: current ? 800 : 600,
                      color: done ? "#20231c" : "#9a9b91",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              padding: "14px 0",
              borderTop: "1px solid #e9e9e1",
              borderBottom: "1px solid #e9e9e1",
              marginBottom: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9a9b91", letterSpacing: "0.08em" }}>FROM</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 800, color: "#20231c" }}>
                {tracking.restaurantName}
              </div>
              <div style={{ marginTop: 2, fontSize: 12, color: "#77796f", fontWeight: 500 }}>
                {tracking.restaurantAddress}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9a9b91", letterSpacing: "0.08em" }}>TO</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 800, color: "#20231c" }}>Your place</div>
              <div style={{ marginTop: 2, fontSize: 12, color: "#77796f", fontWeight: 500 }}>
                {tracking.deliveryAddress}
              </div>
            </div>
          </div>

          {tracking.isLive ? null : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14,
                padding: "0 2px",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#20231c" }}>{tracking.itemSummary}</div>
                <div style={{ marginTop: 2, fontSize: 12, color: "#77796f", fontWeight: 500 }}>Order total</div>
              </div>
              <strong style={{ fontSize: 16, fontWeight: 800, color: "#20231c", flexShrink: 0 }}>
                ${tracking.total.toFixed(2)}
              </strong>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#f7f7f7",
              borderRadius: 18,
              padding: "10px 12px 10px 10px",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "#d6f34c",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={riderImageForVehicle(tracking.vehicle)}
                alt=""
                style={{ width: 40, height: 30, objectFit: "contain" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#20231c" }}>{tracking.courierName}</div>
              <div style={{ marginTop: 2, fontSize: 12, color: "#77796f", fontWeight: 500 }}>
                {tracking.courierRole} · {tracking.courierRating.toFixed(1)}★
              </div>
            </div>
            {tracking.isLive ? (
              <>
                <a href={`tel:${tracking.courierPhone}`} style={roundAction} aria-label="Call courier">
                  ☎
                </a>
                <button type="button" style={roundAction} aria-label="Chat courier" onClick={() => onChat(tracking.id)}>
                  💬
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => onReorder(tracking.id)}
                style={{
                  border: 0,
                  borderRadius: 999,
                  background: "#20231c",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 800,
                  padding: "11px 16px",
                  cursor: "pointer",
                }}
              >
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const chromeBtn: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 22,
  border: 0,
  background: "#fff",
  color: "#20231c",
  display: "grid",
  placeItems: "center",
  fontSize: 18,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,.16)",
  cursor: "pointer",
};

const roundAction: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: "1px solid #ececec",
  background: "#fff",
  color: "#20231c",
  display: "grid",
  placeItems: "center",
  fontSize: 15,
  textDecoration: "none",
  cursor: "pointer",
  flexShrink: 0,
};
