import { BagButton } from "@/components/ui/BagButton";
import { BrandLogo } from "@/components/ui/BrandLogo";

type TopbarProps = {
  address: string;
  query: string;
  cartCount: number;
  onHome: () => void;
  onEditAddress: () => void;
  onQueryChange: (value: string) => void;
  onHelp: () => void;
  onCartOpen: () => void;
};

export function Topbar({
  address,
  query,
  cartCount,
  onHome,
  onEditAddress,
  onQueryChange,
  onHelp,
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
        <button className="avatar" onClick={onHelp} type="button">
          A
        </button>
        <BagButton count={cartCount} onClick={onCartOpen} />
      </div>
    </header>
  );
}
