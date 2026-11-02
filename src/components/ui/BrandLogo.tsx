type BrandLogoProps = {
  onClick?: () => void;
  className?: string;
};

export function BrandLogo({ onClick, className = "brand" }: BrandLogoProps) {
  return (
    <button className={className} onClick={onClick} aria-label="Crave home" type="button">
      <img className="brand-logo" src="/brand/crave-logo-black.png" alt="Crave" width={140} height={34} />
    </button>
  );
}
