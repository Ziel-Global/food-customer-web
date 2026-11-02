import type { MenuItem } from "@/lib/types";

type DishCardProps = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  variant?: "grid" | "rail";
};

export function DishCard({ item, onAdd, variant = "grid" }: DishCardProps) {
  return (
    <article className={`dish-card ${variant === "rail" ? "dish-card-rail" : ""}`}>
      <div className="dish-image" style={{ backgroundImage: `url(${item.image})` }}>
        <span>{item.emoji}</span>
      </div>
      <div className="dish-copy">
        <b>{item.name}</b>
        <p>{item.description}</p>
        <strong>${item.price.toFixed(2)}</strong>
      </div>
      <button className="add-dish" onClick={() => onAdd(item)} type="button">
        ＋
      </button>
    </article>
  );
}
