"use client";

import { FormEvent, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { parseNameFromEmail, type AuthUser } from "@/lib/auth";

type LoginScreenProps = {
  onLogin: (user: AuthUser) => void;
};

type Mode = "signin" | "signup";

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [mode, setMode] = useState<Mode>("signin");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.trim().length < 4) {
      setError("Password needs at least 4 characters.");
      return;
    }

    if (mode === "signup") {
      if (!firstName.trim() || !lastName.trim()) {
        setError("Add your first and last name.");
        return;
      }
    }

    setLoading(true);
    window.setTimeout(() => {
      const names =
        mode === "signup"
          ? { firstName: firstName.trim(), lastName: lastName.trim() }
          : parseNameFromEmail(cleanEmail);

      onLogin({
        ...names,
        email: cleanEmail,
        memberSince: String(new Date().getFullYear()),
      });
      setLoading(false);
    }, 450);
  }

  function continueDemo() {
    onLogin({
      firstName: "Alex",
      lastName: "Mercer",
      email: "alex@crave.example",
      memberSince: "2024",
    });
  }

  return (
    <div className="login-screen">
      <div className="login-visual" aria-hidden="true">
        <div className="login-visual-scrim" />
        <div className="login-visual-copy">
          <BrandLogo onClick={() => undefined} />
          <p className="eyebrow">CRAVE</p>
          <h1>Good food, right here.</h1>
          <p>Sign in to order from nearby kitchens, save favorites, and track every delivery.</p>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-panel-inner">
          <div className="login-mobile-brand">
            <BrandLogo onClick={() => undefined} />
          </div>

          <p className="eyebrow">{mode === "signin" ? "WELCOME BACK" : "JOIN CRAVE"}</p>
          <h2>{mode === "signin" ? "Sign in to Crave" : "Create your account"}</h2>
          <p className="login-sub">
            {mode === "signin"
              ? "Use your email to pick up where you left off."
              : "A few details and you’re ready to order."}
          </p>

          <form className="login-form" onSubmit={submit}>
            {mode === "signup" ? (
              <div className="login-name-row">
                <label className="login-field">
                  <span>First name</span>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    autoComplete="given-name"
                  />
                </label>
                <label className="login-field">
                  <span>Last name</span>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Mercer"
                    autoComplete="family-name"
                  />
                </label>
              </div>
            ) : null}

            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>

            <label className="login-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </label>

            {error ? <p className="login-error">{error}</p> : null}

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              <span>→</span>
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button type="button" className="login-demo" onClick={continueDemo}>
            Continue with demo account
          </button>

          <p className="login-switch">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
