import { PrimaryButton } from "@/components/ui/PrimaryButton";

type OrdersViewProps = {
  placed: boolean;
  onExplore: () => void;
};

export function OrdersView({ placed, onExplore }: OrdersViewProps) {
  return (
    <div className="page-state">
      <span className="state-icon">{placed ? "✓" : "▤"}</span>
      <p className="eyebrow">YOUR ORDERS</p>
      <h1>{placed ? "Order placed. Nice choice." : "Your next favorite is one order away."}</h1>
      <p>
        {placed
          ? "We’ve sent your order to the restaurant. Track it as it moves from the kitchen to your door."
          : "Once you order, you can follow every step right here."}
      </p>
      {placed ? (
        <div className="order-card">
          <div>
            <b>Order #CR-2084</b>
            <span className="status">● Confirmed · Preparing</span>
          </div>
          <p>
            Estimated arrival <b>28–35 min</b>
          </p>
          <div className="progress">
            <span />
            <span />
            <span />
            <span />
          </div>
          <small>Restaurant is preparing your order</small>
        </div>
      ) : null}
      <PrimaryButton onClick={onExplore}>
        Explore restaurants <span>→</span>
      </PrimaryButton>
    </div>
  );
}
