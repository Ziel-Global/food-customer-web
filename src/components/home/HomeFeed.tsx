import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DealRail } from "@/components/home/DealRail";
import { DishCard } from "@/components/home/DishCard";
import { DishRail } from "@/components/home/DishRail";
import { Hero } from "@/components/home/Hero";
import { RestaurantCard } from "@/components/home/RestaurantCard";
import { RestaurantRail } from "@/components/home/RestaurantRail";
import { TrustRow } from "@/components/home/TrustRow";
import { SectionHead } from "@/components/ui/SectionHead";
import { menuItems, restaurants as allRestaurants } from "@/lib/data";
import type { MenuItem, Restaurant } from "@/lib/types";

type HomeFeedProps = {
  category: string;
  query: string;
  restaurants: Restaurant[];
  dishes: MenuItem[];
  favorites: string[];
  onCategory: (category: string) => void;
  onSelectRestaurant: (id: string) => void;
  onFavorite: (id: string) => void;
  onAdd: (item: MenuItem) => void;
};

function feeValue(fee: string) {
  return Number(fee.replace("$", "")) || 0;
}

function timeStart(time: string) {
  return Number(time.split("–")[0]) || 99;
}

export function HomeFeed({
  category,
  query,
  restaurants,
  dishes,
  favorites,
  onCategory,
  onSelectRestaurant,
  onFavorite,
  onAdd,
}: HomeFeedProps) {
  const browsing = !query && category === "All";

  const fastDelivery = [...allRestaurants].sort((a, b) => timeStart(a.time) - timeStart(b.time)).slice(0, 6);
  const topRated = [...allRestaurants].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 6);
  const freeDelivery = allRestaurants.filter((r) => feeValue(r.fee) <= 0.99).slice(0, 6);
  const newOnCrave = allRestaurants.filter((r) => /new|15%|12%/i.test(r.discount)).slice(0, 6);
  const healthyPicks = allRestaurants.filter((r) => /healthy|vegan|bowl/i.test(r.cuisine)).slice(0, 6);
  const popularDishes = menuItems.slice(0, 8);

  if (!browsing) {
    const title = query ? `Results for “${query}”` : `${category} around you`;
    return (
      <>
        <CategoryGrid active={category} onSelect={onCategory} />
        <SectionHead
          className="restaurant-heading"
          id="restaurants"
          eyebrow="MATCHES NEAR YOU"
          title={title}
          actionLabel="Clear filters"
          onAction={() => onCategory("All")}
        />
        <div className="restaurant-grid">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              favorite={favorites.includes(r.id)}
              onSelect={onSelectRestaurant}
              onFavorite={onFavorite}
            />
          ))}
        </div>
        {query ? (
          <>
            <SectionHead className="dishes-head" eyebrow="STRAIGHT TO THE GOOD STUFF" title="Dishes that hit the spot" />
            <div className="dish-grid">
              {dishes.map((item) => (
                <DishCard key={item.id} item={item} onAdd={onAdd} />
              ))}
            </div>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      <Hero />
      <TrustRow />
      <CategoryGrid active={category} onSelect={onCategory} />
      <DealRail onSelectRestaurant={onSelectRestaurant} />

      <section className="feed-section" id="restaurants">
        <SectionHead
          className="restaurant-heading"
          eyebrow="GOOD THINGS NEARBY"
          title="Restaurants you'll love"
          actionLabel="View all"
          onAction={() => onCategory("All")}
        />
        <div className="restaurant-grid">
          {restaurants.slice(0, 4).map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              favorite={favorites.includes(r.id)}
              onSelect={onSelectRestaurant}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      </section>

      <RestaurantRail
        eyebrow="IN A HURRY"
        title="Fast delivery"
        restaurants={fastDelivery}
        favorites={favorites}
        onSelect={onSelectRestaurant}
        onFavorite={onFavorite}
      />

      <RestaurantRail
        eyebrow="CROWD FAVORITES"
        title="Top rated near you"
        restaurants={topRated}
        favorites={favorites}
        onSelect={onSelectRestaurant}
        onFavorite={onFavorite}
      />

      <DishRail
        eyebrow="PICKS"
        title="Popular dishes"
        dishes={popularDishes}
        onAdd={onAdd}
        actionLabel="Browse"
        onAction={() => onCategory("All")}
      />

      <RestaurantRail
        eyebrow="WALLET FRIENDLY"
        title="Free & low delivery"
        restaurants={freeDelivery}
        favorites={favorites}
        onSelect={onSelectRestaurant}
        onFavorite={onFavorite}
      />

      <RestaurantRail
        eyebrow="FRESH FINDS"
        title="New on Crave"
        restaurants={newOnCrave}
        favorites={favorites}
        onSelect={onSelectRestaurant}
        onFavorite={onFavorite}
      />

      <RestaurantRail
        eyebrow="EAT WELL"
        title="Healthy picks"
        restaurants={healthyPicks}
        favorites={favorites}
        onSelect={onSelectRestaurant}
        onFavorite={onFavorite}
      />

      <div className="end-note">
        <span>✳</span>
        <p>Life’s too short for boring lunch.</p>
        <b>Find something good.</b>
      </div>
    </>
  );
}
