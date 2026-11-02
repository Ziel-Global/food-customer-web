import type { ReactNode } from "react";

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHead({ eyebrow, title, actionLabel, onAction, id, className = "" }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`.trim()} id={id}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {actionLabel && onAction ? (
        <button className="arrow-button" onClick={onAction} type="button">
          {actionLabel} <span>→</span>
        </button>
      ) : null}
    </div>
  );
}
