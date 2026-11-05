export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
};

const STORAGE_KEY = "crave-auth-user";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.email || !parsed?.firstName) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function displayName(user: AuthUser) {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function userInitials(user: AuthUser) {
  const first = user.firstName.trim().charAt(0);
  const last = user.lastName.trim().charAt(0);
  return `${first}${last}`.toUpperCase() || user.email.charAt(0).toUpperCase();
}

export function parseNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "Guest";
  const parts = local.replace(/[._-]+/g, " ").trim().split(/\s+/);
  const firstName = capitalize(parts[0] || "Crave");
  const lastName = capitalize(parts[1] || "Member");
  return { firstName, lastName };
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
