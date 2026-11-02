type AccountViewProps = {
  address: string;
  onEditAddress: () => void;
  onToast: (message: string) => void;
};

export function AccountView({ address, onEditAddress, onToast }: AccountViewProps) {
  return (
    <div className="page-state">
      <span className="state-icon">◉</span>
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1>Hey there, Alex.</h1>
      <p>Manage your Crave account and delivery details.</p>
      <div className="account-list">
        <button type="button" onClick={onEditAddress}>
          ⌖{" "}
          <span>
            <b>Delivery addresses</b>
            <small>{address}</small>
          </span>
          <i>→</i>
        </button>
        <button type="button" onClick={() => onToast("Payment methods are ready to manage")}>
          ▣{" "}
          <span>
            <b>Payment methods</b>
            <small>Visa ending in 2048</small>
          </span>
          <i>→</i>
        </button>
        <button type="button" onClick={() => onToast("Support is here to help — support@crave.example")}>
          ?{" "}
          <span>
            <b>Get help</b>
            <small>We’re here for you, every day</small>
          </span>
          <i>→</i>
        </button>
      </div>
    </div>
  );
}
