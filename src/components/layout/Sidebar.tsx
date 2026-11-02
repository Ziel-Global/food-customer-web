import { NavIcon } from "@/components/ui/NavIcon";
import type { NavItem } from "@/lib/types";

const NAV: NavItem[] = ["Home", "Orders", "Favorites", "Account"];

type SidebarProps = {
  active: NavItem;
  hasNewOrder: boolean;
  onNavigate: (name: NavItem) => void;
  onExplore: () => void;
};

export function Sidebar({ active, hasNewOrder, onNavigate, onExplore }: SidebarProps) {
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
        <span className="online-dot" /> Delivering near you <b>·</b> Central City
      </div>
    </aside>
  );
}
