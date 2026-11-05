import { BagButton } from "@/components/ui/BagButton";
import { BrandLogo } from "@/components/ui/BrandLogo";

type TopbarProps = {
  address: string;
  query: string;
  cartCount: number;
  initials: string;
  onHome: () => void;
  onEditAddress: () => void;
  onQueryChange: (value: string) => void;
  onHelp: () => void;
  onAccount: () => void;
  onCartOpen: () => void;
};

export function Topbar({
  address,
  query,
  cartCount,
  initials,
  onHome,
  onEditAddress,
  onQueryChange,
  onHelp,
  onAccount,
  onCartOpen,
}: TopbarProps) {
  return (
    <header className="topbar">
      <BrandLogo onClick={onHome} />
      <button className="delivery-address" type="button" onClick={onEditAddress}>
        <span className="pin">⌖</span>
        <span>
          <small>Deliver to</small>
          <b>{address}</b>
        </span>
        <span className="chevron">⌄</span>
      </button>
      <label className="search">
        <span>⌕</span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Dishes, restaurants, cuisines"
        />
        <kbd>⌘ K</kbd>
      </label>
      <div className="topbar-actions">
        <button className="help-button" onClick={onHelp} type="button">
          Help
        </button>
        <button className="avatar" onClick={onAccount} type="button" aria-label="Open account">
          {initials}
        </button>
        <BagButton count={cartCount} onClick={onCartOpen} />
      </div>
    </header>
  );
}
