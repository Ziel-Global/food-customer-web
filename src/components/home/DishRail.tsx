import { DishCard } from "@/components/home/DishCard";
import { SectionHead } from "@/components/ui/SectionHead";
import type { MenuItem } from "@/lib/types";

type DishRailProps = {
  eyebrow: string;
  title: string;
  dishes: MenuItem[];
  onAdd: (item: MenuItem) => void;
  actionLabel?: string;
  onAction?: () => void;
};

export function DishRail({ eyebrow, title, dishes, onAdd, actionLabel, onAction }: DishRailProps) {
  if (!dishes.length) return null;

  return (
    <section className="feed-section">
      <SectionHead eyebrow={eyebrow} title={title} actionLabel={actionLabel} onAction={onAction} />
      <div className="rail dish-rail">
        {dishes.map((item) => (
          <DishCard key={item.id} item={item} onAdd={onAdd} variant="rail" />
        ))}
      </div>
    </section>
  );
}
