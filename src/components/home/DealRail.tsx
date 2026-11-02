import { deals, getRestaurant } from "@/lib/data";
import { SectionHead } from "@/components/ui/SectionHead";

type DealRailProps = {
  onSelectRestaurant: (id: string) => void;
};

export function DealRail({ onSelectRestaurant }: DealRailProps) {
  return (
    <section className="feed-section">
      <SectionHead eyebrow="TODAY" title="Hot deals" />
      <div className="rail">
        {deals.map((deal) => {
          const restaurant = getRestaurant(deal.restaurantId);
          return (
            <button
              key={deal.id}
              className="deal-card"
              type="button"
              onClick={() => onSelectRestaurant(deal.restaurantId)}
              style={{ backgroundImage: `url(${restaurant.image})` }}
            >
              <span className={`deal-badge ${deal.tone === "lime" ? "lime-badge" : ""}`}>{deal.badge}</span>
              <span className="deal-copy">
                <b>{deal.title}</b>
                <small>{deal.subtitle}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
