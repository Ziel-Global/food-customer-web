import { RestaurantCard } from "@/components/home/RestaurantCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { Restaurant } from "@/lib/types";

type FavoritesViewProps = {
  restaurants: Restaurant[];
  favorites: string[];
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  onExplore: () => void;
};

export function FavoritesView({ restaurants, favorites, onSelect, onFavorite, onExplore }: FavoritesViewProps) {
  const saved = restaurants.filter((r) => favorites.includes(r.id));

  return (
    <>
      <div className="heading-row">
        <div>
          <p className="eyebrow">SAVED FOR LATER</p>
          <h1>Your favorites</h1>
          <p className="subheading">All the good stuff, just a tap away.</p>
        </div>
      </div>
      {saved.length ? (
        <div className="restaurant-grid">
          {saved.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              favorite={favorites.includes(r.id)}
              onSelect={onSelect}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <span>♡</span>
          <h2>Nothing saved just yet</h2>
          <p>Tap the heart on a restaurant to keep it close.</p>
          <PrimaryButton onClick={onExplore}>
            Find your favorites <span>→</span>
          </PrimaryButton>
        </div>
      )}
    </>
  );
}
