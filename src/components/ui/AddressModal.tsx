"use client";

import { useEffect, useState } from "react";

const SUGGESTIONS = [
  { id: "home", label: "Home", detail: "24 Cedar Street" },
  { id: "work", label: "Work", detail: "118 Market Avenue" },
  { id: "friend", label: "Friend", detail: "9 Willow Court" },
];

type AddressModalProps = {
  open: boolean;
  address: string;
  onClose: () => void;
  onSave: (next: string) => void;
};

export function AddressModal({ open, address, onClose, onSave }: AddressModalProps) {
  const [value, setValue] = useState(address);

  useEffect(() => {
    if (open) setValue(address);
  }, [open, address]);

  if (!open) return null;

  function save(next = value) {
    const trimmed = next.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  }

  return (
    <div className="scrim scrim-center" onClick={onClose}>
      <div className="address-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="address-modal-title">
        <div className="drawer-head">
          <div>
            <p className="eyebrow">DELIVERY LOCATION</p>
            <h2 id="address-modal-title">Where should we deliver?</h2>
          </div>
          <button className="close-button" onClick={onClose} type="button" aria-label="Close">
            ×
          </button>
        </div>

        <label className="checkout-field">
          ADDRESS
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
            }}
            placeholder="Street, building, apartment"
          />
        </label>

        <p className="address-suggest-label">Saved places</p>
        <div className="address-suggestions">
          {SUGGESTIONS.map((place) => (
            <button
              key={place.id}
              type="button"
              className={`address-chip ${value === place.detail ? "selected" : ""}`}
              onClick={() => setValue(place.detail)}
            >
              <span className="address-chip-pin">⌖</span>
              <span>
                <b>{place.label}</b>
                <small>{place.detail}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="address-actions">
          <button className="address-cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="address-save" type="button" onClick={() => save()} disabled={!value.trim()}>
            Deliver here
          </button>
        </div>
      </div>
    </div>
  );
}
