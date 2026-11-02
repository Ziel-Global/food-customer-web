type CheckoutModalProps = {
  open: boolean;
  address: string;
  count: number;
  subtotal: number;
  onAddressChange: (value: string) => void;
  onClose: () => void;
  onPlaceOrder: () => void;
};

export function CheckoutModal({
  open,
  address,
  count,
  subtotal,
  onAddressChange,
  onClose,
  onPlaceOrder,
}: CheckoutModalProps) {
  if (!open) return null;

  const total = subtotal + 2.74;

  return (
    <div className="scrim" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">ALMOST THERE</p>
            <h2>Checkout</h2>
          </div>
          <button className="close-button" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <label className="checkout-field">
          DELIVER TO
          <input value={address} onChange={(e) => onAddressChange(e.target.value)} />
        </label>
        <div className="checkout-split">
          <label className="checkout-field">
            WHEN
            <select>
              <option>As soon as possible</option>
              <option>Schedule for later</option>
            </select>
          </label>
          <label className="checkout-field">
            PAYMENT
            <select>
              <option>Visa ···· 2048</option>
              <option>Cash on delivery</option>
              <option>Crave wallet</option>
            </select>
          </label>
        </div>
        <label className="checkout-field">
          PROMO CODE
          <input placeholder="Add a promo code" />
        </label>
        <div className="bill">
          <div>
            <span>Subtotal · {count} items</span>
            <b>${subtotal.toFixed(2)}</b>
          </div>
          <div>
            <span>Delivery + service</span>
            <b>$2.74</b>
          </div>
          <div className="total">
            <span>Total</span>
            <b>${total.toFixed(2)}</b>
          </div>
        </div>
        <button className="checkout-button" onClick={onPlaceOrder} type="button">
          Place order <span>${total.toFixed(2)} →</span>
        </button>
        <p className="secure-note">By placing your order, you agree to Crave’s terms.</p>
      </div>
    </div>
  );
}
