import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { restaurants } from "@/lib/data";
import type { CartLine } from "@/lib/types";

type CartDrawerProps = {
  open: boolean;
  cart: CartLine[];
  address: string;
  onClose: () => void;
  onChangeQty: (id: string, delta: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({ open, cart, address, onClose, onChangeQty, onCheckout }: CartDrawerProps) {
  if (!open) return null;

  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const total = subtotal + 2.74;
  const restaurant = cart.length ? restaurants.find((r) => r.id === cart[0].item.restaurantId) : null;

  return (
    <div className="scrim" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">YOUR ORDER</p>
            <h2>
              Your bag <span>({count})</span>
            </h2>
          </div>
          <button className="close-button" onClick={onClose} type="button">
            ×
          </button>
        </div>

        {cart.length ? (
          <>
            <div className="cart-restaurant">
              {restaurant?.emoji} <b>{restaurant?.name}</b>
              <span>⌖ {address}</span>
            </div>
            <div className="cart-lines">
              {cart.map(({ item, quantity }) => (
                <div className="cart-line" key={item.id}>
                  <div className="cart-thumb" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="cart-info">
                    <b>{item.name}</b>
                    <small>${item.price.toFixed(2)}</small>
                    <div className="quantity">
                      <button onClick={() => onChangeQty(item.id, -1)} type="button">
                        −
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => onChangeQty(item.id, 1)} type="button">
                        +
                      </button>
                    </div>
                  </div>
                  <strong>${(item.price * quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <button className="add-more" onClick={onClose} type="button">
              ＋ Add more items
            </button>
            <div className="bill">
              <div>
                <span>Subtotal</span>
                <b>${subtotal.toFixed(2)}</b>
              </div>
              <div>
                <span>Delivery fee</span>
                <b>$1.49</b>
              </div>
              <div>
                <span>Service fee</span>
                <b>$1.25</b>
              </div>
              <div className="total">
                <span>Total</span>
                <b>${total.toFixed(2)}</b>
              </div>
            </div>
            <button className="checkout-button" onClick={onCheckout} type="button">
              Go to checkout <span>${total.toFixed(2)} →</span>
            </button>
            <p className="secure-note">⌑ Secure checkout · Free cancellation before restaurant accepts</p>
          </>
        ) : (
          <div className="empty-cart">
            <span>⌑</span>
            <h3>Your bag is taking a breather</h3>
            <p>Let’s find something delicious to fill it.</p>
            <PrimaryButton onClick={onClose}>
              Explore food <span>→</span>
            </PrimaryButton>
          </div>
        )}
      </aside>
    </div>
  );
}
