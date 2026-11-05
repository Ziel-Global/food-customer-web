type AccountViewProps = {
  address: string;
  favoritesCount: number;
  hasOrders: boolean;
  onEditAddress: () => void;
  onToast: (message: string) => void;
  onOpenFavorites: () => void;
  onOpenOrders: () => void;
};

export function AccountView({
  address,
  favoritesCount,
  hasOrders,
  onEditAddress,
  onToast,
  onOpenFavorites,
  onOpenOrders,
}: AccountViewProps) {
  return (
    <div className="account-page">
      <section className="account-hero">
        <div className="account-hero-main">
          <div className="account-avatar" aria-hidden="true">
            A
          </div>
          <div className="account-hero-copy">
            <p className="eyebrow">YOUR ACCOUNT</p>
            <h1>Alex Mercer</h1>
            <p className="account-email">alex@crave.example</p>
            <div className="account-badges">
              <span className="account-badge">Crave Member</span>
              <span className="account-badge soft">Since 2024</span>
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
          <b>{hasOrders ? "1 active" : "None yet"}</b>
          <span>{hasOrders ? "Track your latest order" : "Start something delicious"}</span>
        </button>
        <button type="button" className="account-summary-card" onClick={onOpenFavorites}>
          <small>Saved</small>
          <b>
            {favoritesCount} place{favoritesCount === 1 ? "" : "s"}
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
        <button type="button" className="account-signout" onClick={() => onToast("You’re signed out of this demo")}>
          Sign out
        </button>
        <p>Crave demo account · alex@crave.example</p>
      </div>
    </div>
  );
}
