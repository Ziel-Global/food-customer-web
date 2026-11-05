import { NavIcon } from "@/components/ui/NavIcon";
import type { NavItem } from "@/lib/types";

const NAV: NavItem[] = ["Home", "Orders", "Favorites", "Account"];

type SidebarProps = {
  active: NavItem;
  hasNewOrder: boolean;
  onNavigate: (name: NavItem) => void;
  onExplore: () => void;
  onLogout: () => void;
};

function LogoutIcon() {
  return (
    <span aria-hidden="true" className="nav-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1" />
        <path d="M15 12H4" />
        <path d="m7 9-3 3 3 3" />
      </svg>
    </span>
  );
}

export function Sidebar({ active, hasNewOrder, onNavigate, onExplore, onLogout }: SidebarProps) {
  function handleLogout() {
    if (window.confirm("Sign out of Crave? You’ll need to log in again to order.")) {
      onLogout();
    }
  }

  return (
    <aside className="sidebar">
      <p className="side-label">YOUR CRAVE</p>
      <nav className="side-nav">
        {NAV.map((name) => (
          <button
            key={name}
            className={`side-link ${active === name ? "selected" : ""}`}
            onClick={() => onNavigate(name)}
            type="button"
          >
            <NavIcon name={name} />
            <span>{name}</span>
            {name === "Orders" && hasNewOrder ? <i className="new-dot" /> : null}
          </button>
        ))}
        <button type="button" className="side-link side-logout" onClick={handleLogout}>
          <LogoutIcon />
          <span>Log out</span>
        </button>
      </nav>
      <div className="side-promo">
        <div className="spark">✳</div>
        <b>
          Good things
          <br />
          come to those
          <br />
          who crave.
        </b>
        <p>Discover something delicious today.</p>
        <button onClick={onExplore} type="button">
          Explore food <span>→</span>
        </button>
        <div className="decor decor-a">✳</div>
        <div className="decor decor-b">✦</div>
      </div>
      <div className="side-bottom">
        <p className="side-bottom-note">
          <span className="online-dot" /> Delivering near you
        </p>
      </div>
    </aside>
  );
}
