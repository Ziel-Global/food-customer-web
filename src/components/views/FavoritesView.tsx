"use client";

import { CSSProperties } from "react";
import { RestaurantCard } from "@/components/home/RestaurantCard";
import type { MenuItem, Restaurant } from "@/lib/types";

type FavoritesViewProps = {
  restaurants: Restaurant[];
  dishes: MenuItem[];
  favorites: string[];
  favoriteDishes: string[];
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  onToggleDish: (id: string) => void;
  onAdd: (item: MenuItem) => void;
  onExplore: () => void;
};

export function FavoritesView({
  restaurants,
  dishes,
  favorites,
  favoriteDishes,
  onSelect,
  onFavorite,
  onToggleDish,
  onAdd,
  onExplore,
}: FavoritesViewProps) {
  const savedRestaurants = restaurants.filter((r) => favorites.includes(r.id));
  const savedDishes = dishes.filter((d) => favoriteDishes.includes(d.id));
  const hasAnything = savedRestaurants.length > 0 || savedDishes.length > 0;

  return (
    <div style={page}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 16,
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={eyebrow}>SAVED FOR LATER</p>
          <h1
            style={{
              margin: "0 0 8px",
              font: '600 34px/1.05 Georgia, "Times New Roman", serif',
              letterSpacing: "-0.8px",
              color: "#20231c",
            }}
          >
            Your favorites
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#77796f", fontWeight: 500, lineHeight: 1.45 }}>
            {savedDishes.length} dishes · {savedRestaurants.length} places
          </p>
        </div>
        <div
          style={{
            minWidth: 44,
            height: 44,
            borderRadius: 14,
            background: "#d6f34c",
            display: "grid",
            placeItems: "center",
            padding: "0 12px",
            fontSize: 15,
            fontWeight: 800,
            color: "#20231c",
          }}
        >
          {savedDishes.length + savedRestaurants.length}
        </div>
      </header>

      {!hasAnything ? (
        <div style={emptyBox}>
          <span style={{ fontSize: 42, color: "#c5cbb8", lineHeight: 1 }}>♡</span>
          <h2 style={{ margin: "12px 0 6px", fontSize: 22, fontWeight: 800, color: "#20231c" }}>
            Nothing saved just yet
          </h2>
          <p style={{ margin: "0 0 18px", fontSize: 14, color: "#7a7d72", lineHeight: 1.45 }}>
            Tap the heart on a restaurant or dish to keep it close.
          </p>
          <button type="button" onClick={onExplore} style={exploreBtn}>
            Find your favorites →
          </button>
        </div>
      ) : null}

      {savedDishes.length ? (
        <section style={{ marginBottom: 30 }}>
          <p style={{ ...eyebrow, marginBottom: 12 }}>SAVED DISHES</p>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e9e9e1",
              borderRadius: 28,
              overflow: "hidden",
            }}
          >
            {savedDishes.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: index < savedDishes.length - 1 ? "1px solid #e9e9e1" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => onAdd(item)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      overflow: "hidden",
                      background: item.color,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ fontSize: 26 }}>{item.emoji}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ display: "block", fontSize: 15, fontWeight: 800, color: "#20231c" }}>
                      {item.name}
                    </b>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8a8d82", fontWeight: 600 }}>
                      {item.weight} · ${item.price.toFixed(2)}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag.label}
                          style={{
                            background: "#f4f4f4",
                            borderRadius: 999,
                            padding: "3px 8px",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#6f7368",
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${item.name} from favorites`}
                  onClick={() => onToggleDish(item.id)}
                  style={{
                    width: 36,
                    height: 36,
                    border: 0,
                    borderRadius: 12,
                    background: "#fff0f0",
                    color: "#d64545",
                    fontSize: 16,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {savedRestaurants.length ? (
        <section style={{ marginBottom: 30 }}>
          <p style={{ ...eyebrow, marginBottom: 12 }}>SAVED PLACES</p>
          <div className="restaurant-grid">
            {savedRestaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                favorite={favorites.includes(r.id)}
                onSelect={onSelect}
                onFavorite={onFavorite}
              />
            ))}
          </div>
        </section>
      ) : null}

      {hasAnything ? (
        <button type="button" onClick={onExplore} style={limeCard}>
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              background: "rgba(0,0,0,.08)",
              display: "grid",
              placeItems: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            ✦
          </span>
          <span style={{ flex: 1, textAlign: "left" }}>
            <b style={{ display: "block", fontSize: 15, fontWeight: 800, color: "#20231c" }}>
              Find more to love
            </b>
            <small style={{ display: "block", marginTop: 3, fontSize: 12, color: "rgba(0,0,0,.55)", lineHeight: 1.4 }}>
              Browse kitchens nearby and save your next craving.
            </small>
          </span>
          <span style={{ fontSize: 16, color: "#20231c" }}>→</span>
        </button>
      ) : null}
    </div>
  );
}

const page: CSSProperties = {
  maxWidth: 980,
  margin: "0 auto",
  padding: "4px 0 40px",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const eyebrow: CSSProperties = {
  margin: "0 0 8px",
  fontSize: 11,
  letterSpacing: "0.14em",
  fontWeight: 800,
  color: "#9a9b91",
};

const emptyBox: CSSProperties = {
  border: "1px dashed #d7dacd",
  borderRadius: 28,
  background: "#fafaf7",
  padding: "48px 24px",
  textAlign: "center",
  display: "grid",
  placeItems: "center",
};

const exploreBtn: CSSProperties = {
  border: 0,
  borderRadius: 999,
  background: "#20231c",
  color: "#fff",
  fontSize: 13,
  fontWeight: 800,
  padding: "12px 18px",
  cursor: "pointer",
};

const limeCard: CSSProperties = {
  width: "100%",
  border: 0,
  borderRadius: 28,
  background: "#d6f34c",
  padding: 16,
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
  fontFamily: "inherit",
};
