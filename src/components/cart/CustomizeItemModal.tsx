"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getAddonGroupsForItem, getRestaurant } from "@/lib/data";
import type { AddonGroup, AddonOption, CartAddon, CartLine, MenuItem } from "@/lib/types";

type CustomizeItemModalProps = {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (line: Omit<CartLine, "id">) => void;
};

/** groupId -> optionId -> count */
type AddonCounts = Record<string, Record<string, number>>;

function optionKey(groupId: string, optionId: string) {
  return `${groupId}:${optionId}`;
}

function groupTotal(counts: Record<string, number> | undefined) {
  return Object.values(counts ?? {}).reduce((sum, value) => sum + value, 0);
}

export function CustomizeItemModal({ item, onClose, onConfirm }: CustomizeItemModalProps) {
  const [mounted, setMounted] = useState(false);
  const groups = useMemo(() => (item ? getAddonGroupsForItem(item) : []), [item]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [counts, setCounts] = useState<AddonCounts>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  const selectedAddons: CartAddon[] = groups.flatMap((group) => {
    const groupCounts = counts[group.id] ?? {};
    return group.options
      .filter((option) => (groupCounts[option.id] ?? 0) > 0)
      .map((option) => ({
        id: option.id,
        name: option.name,
        price: option.price,
        groupId: group.id,
        quantity: groupCounts[option.id] ?? 0,
      }));
  });

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price * addon.quantity, 0);
  const unitPrice = (item?.price ?? 0) + addonsTotal;
  const total = unitPrice * quantity;

  const missingRequired = groups.some((group) => group.required && groupTotal(counts[group.id]) < 1);

  function setOptionCount(group: AddonGroup, option: AddonOption, next: number) {
    const optionMax = option.price === 0 && group.quantity ? 1 : (group.optionMax ?? group.max ?? 99);
    const groupMax = group.max ?? 99;
    const safe = Math.max(0, Math.min(optionMax, next));

    setCounts((current) => {
      const existing = { ...(current[group.id] ?? {}) };
      const previous = existing[option.id] ?? 0;
      const others = groupTotal(existing) - previous;

      if (group.quantity) {
        const allowed = Math.min(safe, Math.max(0, groupMax - others));
        if (allowed <= 0) {
          delete existing[option.id];
        } else {
          existing[option.id] = allowed;
        }
        return { ...current, [group.id]: existing };
      }

      // Single-select groups (milk, sweetness)
      if ((group.max ?? 99) === 1) {
        return { ...current, [group.id]: safe > 0 ? { [option.id]: 1 } : {} };
      }

      // Multi toggle without quantities
      if (safe > 0) {
        if (!existing[option.id] && others >= groupMax) return current;
        existing[option.id] = 1;
      } else {
        delete existing[option.id];
      }
      return { ...current, [group.id]: existing };
    });
  }

  function handleConfirm() {
    if (!item || missingRequired) return;
    onConfirm({
      item,
      quantity,
      addons: selectedAddons,
      note: note.trim(),
    });
    setQuantity(1);
    setNote("");
    setCounts({});
  }

  if (!item || !mounted) return null;

  const restaurant = getRestaurant(item.restaurantId);

  return createPortal(
    <div
      className="customize-scrim"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        background: "rgba(22, 24, 18, 0.55)",
      }}
      onClick={onClose}
    >
      <div
        className="customize-sheet"
        style={{
          position: "relative",
          width: "min(560px, 100%)",
          maxHeight: "min(92vh, 860px)",
          background: "#fff",
          borderRadius: 22,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(22, 24, 18, 0.28)",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Customize ${item.name}`}
      >
        <div className="customize-hero" style={{ backgroundImage: `url(${item.image})` }}>
          <button className="customize-close" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
          <div className="customize-hero-copy">
            <p className="eyebrow">{restaurant.name}</p>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        </div>

        <div className="customize-body">
          <div className="customize-price-row">
            <strong>${item.price.toFixed(2)}</strong>
            <span>{item.weight}</span>
          </div>

          {groups.map((group) => {
            const groupCounts = counts[group.id] ?? {};
            const chosenTotal = groupTotal(groupCounts);
            return (
              <section key={group.id} className="customize-group">
                <div className="customize-group-head">
                  <div>
                    <h3>
                      {group.title}
                      {group.required ? <em>Required</em> : null}
                    </h3>
                    {group.subtitle ? <p>{group.subtitle}</p> : null}
                  </div>
                  {group.max ? (
                    <span>
                      {chosenTotal}/{group.max}
                    </span>
                  ) : null}
                </div>
                <div className="customize-options">
                  {group.options.map((option) => {
                    const count = groupCounts[option.id] ?? 0;
                    const active = count > 0;
                    const single = !group.quantity && (group.max ?? 99) === 1;
                    const optionMax = group.optionMax ?? group.max ?? 99;
                    const atGroupMax = chosenTotal >= (group.max ?? 99);
                    const canIncrease = count < optionMax && (!atGroupMax || count > 0);

                    if (group.quantity) {
                      return (
                        <div
                          key={optionKey(group.id, option.id)}
                          className={`customize-option customize-option-qty ${active ? "selected" : ""}`}
                        >
                          <span className="customize-option-copy">
                            <b>{option.name}</b>
                            {option.description ? <small>{option.description}</small> : null}
                          </span>
                          <strong>
                            {option.price > 0
                              ? count > 1
                                ? `+$${(option.price * count).toFixed(2)}`
                                : `+$${option.price.toFixed(2)}`
                              : "Free"}
                          </strong>
                          <div className="addon-qty">
                            <button
                              type="button"
                              disabled={count <= 0}
                              onClick={() => setOptionCount(group, option, count - 1)}
                              aria-label={`Remove ${option.name}`}
                            >
                              −
                            </button>
                            <span>{count}</span>
                            <button
                              type="button"
                              disabled={!canIncrease}
                              onClick={() => setOptionCount(group, option, count + 1)}
                              aria-label={`Add ${option.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={optionKey(group.id, option.id)}
                        type="button"
                        className={`customize-option ${active ? "selected" : ""}`}
                        onClick={() => setOptionCount(group, option, active ? 0 : 1)}
                      >
                        <span className={`customize-check ${single ? "radio" : ""}`} aria-hidden="true">
                          {active ? (single ? "●" : "✓") : ""}
                        </span>
                        <span className="customize-option-copy">
                          <b>{option.name}</b>
                          {option.description ? <small>{option.description}</small> : null}
                        </span>
                        <strong>{option.price > 0 ? `+$${option.price.toFixed(2)}` : "Free"}</strong>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <section className="customize-group">
            <div className="customize-group-head">
              <div>
                <h3>Special instructions</h3>
                <p>Allergies, spice level, leave at door…</p>
              </div>
            </div>
            <textarea
              className="customize-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for the restaurant"
              rows={3}
            />
          </section>
        </div>

        <div className="customize-footer">
          <div className="customize-qty">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
          <button type="button" className="customize-add" disabled={missingRequired} onClick={handleConfirm}>
            Add to bag <span>${total.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
