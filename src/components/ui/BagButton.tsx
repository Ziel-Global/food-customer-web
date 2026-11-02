type BagButtonProps = {
  count: number;
  onClick: () => void;
};

export function BagButton({ count, onClick }: BagButtonProps) {
  return (
    <button className="cart-button" onClick={onClick} aria-label={`Bag, ${count} items`} type="button">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 8.25V7.1a4 4 0 0 1 8 0v1.15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M6.4 8.25h11.2l.85 10.7a1.5 1.5 0 0 1-1.5 1.7H7.05a1.5 1.5 0 0 1-1.5-1.7L6.4 8.25Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
      {count > 0 ? <span className="cart-count">{count}</span> : null}
    </button>
  );
}
