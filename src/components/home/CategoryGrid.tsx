import { categories } from "@/lib/data";
import { SectionHead } from "@/components/ui/SectionHead";

type CategoryGridProps = {
  active: string;
  onSelect: (category: string) => void;
};

export function CategoryGrid({ active, onSelect }: CategoryGridProps) {
  return (
    <div className="category-section">
      <SectionHead
        eyebrow="WHAT SOUNDS GOOD?"
        title="Find your craving"
        actionLabel="All categories"
        onAction={() => onSelect("All")}
      />
      <div className="category-row">
        <button
          className={`category-tile ${active === "All" ? "category-active" : ""}`}
          onClick={() => onSelect("All")}
          type="button"
        >
          <span className="category-art all-art">✳</span>
          <b>Everything</b>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`category-tile ${active.toLowerCase() === c.id ? "category-active" : ""}`}
            onClick={() => onSelect(c.id)}
            type="button"
          >
            <span className={`category-art art-${c.id}`}>
              <img src={c.icon} alt="" />
            </span>
            <b>{c.label}</b>
          </button>
        ))}
      </div>
    </div>
  );
}
