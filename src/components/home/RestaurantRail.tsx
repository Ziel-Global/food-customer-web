import { RestaurantCard } from "@/components/home/RestaurantCard";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Restaurant } from "@/lib/types";

type RestaurantRailProps = {
  eyebrow: string;
  title: string;
  restaurants: Restaurant[];
  favorites: string[];
  actionLabel?: string;
  onAction?: () => void;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
};

export function RestaurantRail({
  eyebrow,
  title,
  restaurants,
  favorites,
  actionLabel = "See all",
  onAction,
  onSelect,
  onFavorite,
}: RestaurantRailProps) {
  if (!restaurants.length) return null;

  return (
    <section className="feed-section">
      <SectionHead eyebrow={eyebrow} title={title} actionLabel={actionLabel} onAction={onAction} />
      <div className="rail restaurant-rail">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            favorite={favorites.includes(restaurant.id)}
            onSelect={onSelect}
            onFavorite={onFavorite}
            variant="rail"
          />
        ))}
      </div>
    </section>
  );
}
