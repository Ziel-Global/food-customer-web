import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function PrimaryButton({ children, className = "primary-button", ...props }: PrimaryButtonProps) {
  return (
    <button className={className} type="button" {...props}>
      {children}
    </button>
  );
}
