type PromoBarProps = {
  onCopy: () => void;
};

export function PromoBar({ onCopy }: PromoBarProps) {
  return (
    <div className="promo">
      <span>✦</span> Your first order? Get <b>free delivery</b> with code <b>CRAVEFIRST</b>
      <button onClick={onCopy} type="button">Copy code</button>
    </div>
  );
}
