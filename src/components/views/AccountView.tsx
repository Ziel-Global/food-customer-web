import { displayName, userInitials, type AuthUser } from "@/lib/auth";

type AccountViewProps = {
  user: AuthUser;
  address: string;
  favoritesCount: number;
  hasOrders: boolean;
  activeOrderCount?: number;
  onEditAddress: () => void;
  onToast: (message: string) => void;
  onOpenFavorites: () => void;
  onOpenOrders: () => void;
  onLogout: () => void;
};

export function AccountView({
  user,
  address,
  favoritesCount,
  hasOrders,
  activeOrderCount = 0,
  onEditAddress,
  onToast,
  onOpenFavorites,
  onOpenOrders,
  onLogout,
}: AccountViewProps) {
  function handleLogout() {
    if (window.confirm("Sign out of Crave? You’ll need to log in again to order.")) {
      onLogout();
    }
  }

  return (
    <div className="account-page">
      <section className="account-hero">
        <div className="account-hero-main">
          <div className="account-avatar" aria-hidden="true">
            {userInitials(user)}
          </div>
          <div className="account-hero-copy">
            <p className="eyebrow">YOUR ACCOUNT</p>
            <h1>{displayName(user)}</h1>
            <p className="account-email">{user.email}</p>
            <div className="account-badges">
              <span className="account-badge">Crave Member</span>
              <span className="account-badge soft">Since {user.memberSince}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="account-edit-profile"
          onClick={() => onToast("Profile editing is coming soon")}
        >
          Edit profile
        </button>
      </section>

      <section className="account-summary" aria-label="Account summary">
        <button type="button" className="account-summary-card" onClick={onOpenOrders}>
          <small>Orders</small>
          <b>{hasOrders ? `${activeOrderCount} active` : "None yet"}</b>
          <span>{hasOrders ? "Track your latest order" : "Start something delicious"}</span>
        </button>
        <button type="button" className="account-summary-card" onClick={onOpenFavorites}>
          <small>Saved</small>
          <b>
            {favoritesCount} item{favoritesCount === 1 ? "" : "s"}
          </b>
          <span>{favoritesCount ? "Jump back into favorites" : "Heart spots you love"}</span>
        </button>
        <div className="account-summary-card static">
          <small>Delivery</small>
          <b>{address}</b>
          <span>Current drop-off spot</span>
        </div>
      </section>

      <section className="account-section">
        <div className="account-section-head">
          <p className="eyebrow">SETTINGS</p>
          <h2>Account details</h2>
        </div>
        <div className="account-panel">
          <button type="button" className="account-row" onClick={onEditAddress}>
            <span className="account-row-icon">⌖</span>
            <span className="account-row-copy">
              <b>Delivery addresses</b>
              <small>{address}</small>
            </span>
            <i>→</i>
          </button>
          <button type="button" className="account-row" onClick={() => onToast("Payment methods are ready to manage")}>
            <span className="account-row-icon">▣</span>
            <span className="account-row-copy">
              <b>Payment methods</b>
              <small>Visa ending in 2048</small>
            </span>
            <i>→</i>
          </button>
          <button
            type="button"
            className="account-row"
            onClick={() => onToast("Notification preferences saved for later")}
          >
            <span className="account-row-icon">◎</span>
            <span className="account-row-copy">
              <b>Notifications</b>
              <small>Order updates & offers on</small>
            </span>
            <i>→</i>
          </button>
          <button type="button" className="account-row" onClick={() => onToast("Dietary preferences coming soon")}>
            <span className="account-row-icon">✿</span>
            <span className="account-row-copy">
              <b>Dietary preferences</b>
              <small>Vegan · No peanuts</small>
            </span>
            <i>→</i>
          </button>
        </div>
      </section>

      <section className="account-section">
        <div className="account-section-head">
          <p className="eyebrow">SUPPORT</p>
          <h2>Need a hand?</h2>
        </div>
        <div className="account-panel">
          <button
            type="button"
            className="account-row"
            onClick={() => onToast("Support is here to help — support@crave.example")}
          >
            <span className="account-row-icon">?</span>
            <span className="account-row-copy">
              <b>Get help</b>
              <small>Chat, email, or browse FAQs</small>
            </span>
            <i>→</i>
          </button>
          <button type="button" className="account-row" onClick={() => onToast("Privacy settings coming soon")}>
            <span className="account-row-icon">◈</span>
            <span className="account-row-copy">
              <b>Privacy & data</b>
              <small>Manage what Crave remembers</small>
            </span>
            <i>→</i>
          </button>
        </div>
      </section>

      <div className="account-footer-actions">
        <button type="button" className="account-signout" onClick={handleLogout}>
          Log out
        </button>
        <p>
          Signed in as {user.email}
        </p>
      </div>
    </div>
  );
}
