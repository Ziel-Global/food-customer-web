import type { Restaurant } from "@/lib/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
  favorite: boolean;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  variant?: "grid" | "rail";
};

export function RestaurantCard({
  restaurant,
  favorite,
  onSelect,
  onFavorite,
  variant = "grid",
}: RestaurantCardProps) {
  return (
    <article className={`restaurant-card ${variant === "rail" ? "restaurant-card-rail" : ""}`}>
      <button
        className="card-image"
        onClick={() => onSelect(restaurant.id)}
        style={{ backgroundImage: `url(${restaurant.image})` }}
        type="button"
      >
        <span className={`offer-badge ${restaurant.discountTone === "lime" ? "lime-badge" : ""}`}>
          {restaurant.discount}
        </span>
        <span className="photo-count">✦ 4 photos</span>
      </button>
      <button
        className={`heart ${favorite ? "heart-on" : ""}`}
        onClick={() => onFavorite(restaurant.id)}
        aria-label="Save restaurant"
        type="button"
      >
        {favorite ? "♥" : "♡"}
      </button>
      <button className="restaurant-title" onClick={() => onSelect(restaurant.id)} type="button">
        {restaurant.name}
        <span className="rating">★ {restaurant.rating}</span>
      </button>
      <p className="restaurant-meta">{restaurant.cuisine}</p>
      <div className="restaurant-details">
        <span>◷ {restaurant.time}</span>
        <i>·</i>
        <span>Delivery ${restaurant.fee.replace("$", "")}</span>
        <i>·</i>
        <span className="open-now">Open</span>
      </div>
    </article>
  );
}
