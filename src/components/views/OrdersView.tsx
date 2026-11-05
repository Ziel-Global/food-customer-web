import { PrimaryButton } from "@/components/ui/PrimaryButton";

type OrdersViewProps = {
  placed: boolean;
  orderId?: string;
  onExplore: () => void;
};

export function OrdersView({ placed, orderId = "CR-2084", onExplore }: OrdersViewProps) {
  return (
    <div className="page-state">
      <span className="state-icon">{placed ? "✓" : "▤"}</span>
      <p className="eyebrow">{placed ? "LIVE ORDER" : "YOUR ORDERS"}</p>
      <h1>{placed ? "Order placed successfully" : "Your next favorite is one order away."}</h1>
      <p>
        {placed
          ? "We’ve sent your order to the restaurant. Track it as it moves from the kitchen to your door."
          : "Once you order, you can follow every step right here."}
      </p>
      {placed ? (
        <div className="order-card">
          <div>
            <b>{orderId}</b>
            <span className="status">● Preparing now</span>
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
          <small>Restaurant accepted your order and started preparing</small>
        </div>
      ) : null}
      <PrimaryButton onClick={onExplore}>
        {placed ? "Order something else" : "Explore restaurants"} <span>→</span>
      </PrimaryButton>
    </div>
  );
}
