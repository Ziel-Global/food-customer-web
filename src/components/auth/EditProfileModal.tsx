"use client";

import { FormEvent, useEffect, useState } from "react";
import type { AuthUser } from "@/lib/auth";
import { userInitials } from "@/lib/auth";

type EditProfileModalProps = {
  open: boolean;
  user: AuthUser;
  onClose: () => void;
  onSave: (next: AuthUser) => void;
};

export function EditProfileModal({ open, user, onClose, onSave }: EditProfileModalProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setError("");
  }, [open, user]);

  if (!open) return null;

  function submit(event: FormEvent) {
    event.preventDefault();
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanFirst || !cleanLast) {
      setError("Add your first and last name.");
      return;
    }
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Enter a valid email address.");
      return;
    }

    onSave({
      ...user,
      firstName: cleanFirst,
      lastName: cleanLast,
      email: cleanEmail,
    });
    onClose();
  }

  const preview: AuthUser = {
    ...user,
    firstName: firstName.trim() || user.firstName,
    lastName: lastName.trim() || user.lastName,
    email: email.trim() || user.email,
  };

  return (
    <div className="scrim scrim-center" onClick={onClose}>
      <div
        className="address-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="drawer-head">
          <div>
            <p className="eyebrow">YOUR PROFILE</p>
            <h2 id="edit-profile-title">Edit profile</h2>
          </div>
          <button className="close-button" onClick={onClose} type="button" aria-label="Close">
            ×
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            padding: "12px 14px",
            borderRadius: 16,
            background: "#f3f4ef",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#d6f34c",
              color: "#20231c",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {userInitials(preview)}
          </div>
          <div style={{ minWidth: 0 }}>
            <b style={{ display: "block", fontSize: 15, color: "#20231c" }}>
              {preview.firstName} {preview.lastName}
            </b>
            <small style={{ display: "block", marginTop: 3, color: "#77796f", fontSize: 12 }}>
              Member since {user.memberSince}
            </small>
          </div>
        </div>

        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <label className="checkout-field">
              FIRST NAME
              <input
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                autoComplete="given-name"
              />
            </label>
            <label className="checkout-field">
              LAST NAME
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Mercer"
                autoComplete="family-name"
              />
            </label>
          </div>

          <label className="checkout-field">
            EMAIL
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>

          {error ? (
            <p style={{ margin: "10px 0 0", color: "#b42318", fontSize: 13, fontWeight: 600 }}>{error}</p>
          ) : null}

          <div className="address-actions" style={{ marginTop: 20 }}>
            <button className="address-cancel" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="address-save" type="submit">
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
