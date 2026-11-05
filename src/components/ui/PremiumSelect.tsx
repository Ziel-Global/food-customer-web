"use client";

import { useEffect, useId, useRef, useState } from "react";

export type PremiumSelectOption = {
  value: string;
  label: string;
  hint?: string;
};

type PremiumSelectProps = {
  value: string;
  options: PremiumSelectOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  compact?: boolean;
};

export function PremiumSelect({ value, options, onChange, ariaLabel, compact = false }: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`premium-select ${open ? "is-open" : ""}`}
      style={{ position: "relative", width: "100%", fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <button
        type="button"
        className="premium-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
        style={{
          width: "100%",
          minHeight: compact ? 44 : 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          border: open ? "1px solid #c8df6a" : "1px solid #e9e9e1",
          borderRadius: 12,
          background: "#fff",
          padding: compact ? "8px 10px 8px 12px" : "11px 12px 11px 14px",
          textAlign: "left",
          color: "#20231c",
          boxShadow: open ? "0 0 0 3px rgba(214,243,76,.28)" : "none",
          cursor: "pointer",
          letterSpacing: 0,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <span style={{ display: "grid", gap: compact ? 1 : 3, minWidth: 0, flex: 1 }}>
          <b
            style={{
              fontSize: compact ? 13 : 14,
              fontWeight: 700,
              color: "#2b2d25",
              letterSpacing: 0,
              fontFamily: "Arial, Helvetica, sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selected?.label}
          </b>
          {selected?.hint ? (
            <small
              style={{
                fontSize: compact ? 11 : 12,
                fontWeight: 600,
                color: "#8a8d82",
                letterSpacing: 0,
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              {selected.hint}
            </small>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: compact ? 26 : 30,
            height: compact ? 26 : 30,
            borderRadius: "50%",
            background: open ? "#d6f34c" : "#f0f4e3",
            color: "#20231c",
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            flex: compact ? "0 0 26px" : "0 0 30px",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s, background .15s",
          }}
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul
          className="premium-select-menu"
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          style={{
            position: "absolute",
            zIndex: 30,
            left: 0,
            right: 0,
            top: "calc(100% + 8px)",
            margin: 0,
            padding: 8,
            listStyle: "none",
            background: "#fff",
            border: "1px solid #e9e9e1",
            borderRadius: 16,
            boxShadow: "0 18px 40px rgba(32,35,28,.16)",
            display: "grid",
            gap: 4,
          }}
        >
          {options.map((option) => {
            const active = option.value === selected?.value;
            return (
              <li key={option.value} role="presentation" style={{ margin: 0, padding: 0 }}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    border: 0,
                    borderRadius: 12,
                    background: active ? "#f4f9e4" : "transparent",
                    padding: "12px 12px",
                    textAlign: "left",
                    color: "#20231c",
                    cursor: "pointer",
                    letterSpacing: 0,
                  }}
                >
                  <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
                    <b
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#2b2d25",
                        letterSpacing: 0,
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      {option.label}
                    </b>
                    {option.hint ? (
                      <small
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#8a8d82",
                          letterSpacing: 0,
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        {option.hint}
                      </small>
                    ) : null}
                  </span>
                  {active ? (
                    <em
                      style={{
                        fontStyle: "normal",
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#d6f34c",
                        color: "#20231c",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        flex: "0 0 22px",
                      }}
                    >
                      ✓
                    </em>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
