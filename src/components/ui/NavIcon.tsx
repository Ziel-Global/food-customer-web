import type { ReactNode } from "react";
import type { NavItem } from "@/lib/types";

const paths: Record<NavItem, ReactNode> = {
  Home: (
    <>
      <path d="M4 10.5 12 3.5l8 7" />
      <path d="M6.5 9.5V19a1 1 0 0 0 1 1H10v-5h4v5h2.5a1 1 0 0 0 1-1V9.5" />
    </>
  ),
  Orders: (
    <>
      <path d="M8 7h8M8 12h8M8 17h5" />
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
    </>
  ),
  Favorites: <path d="M12 19.2 5.7 13.4a3.6 3.6 0 0 1 5.1-5.1l1.2 1.2 1.2-1.2a3.6 3.6 0 1 1 5.1 5.1L12 19.2Z" />,
  Account: (
    <>
      <circle cx="12" cy="9" r="3.2" />
      <path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" />
    </>
  ),
};

export function NavIcon({ name }: { name: NavItem }) {
  return (
    <span aria-hidden="true" className="nav-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}
