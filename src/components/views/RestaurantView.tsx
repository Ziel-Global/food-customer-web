"use client";

import { useState } from "react";
import { DishCard } from "@/components/home/DishCard";
import { menuItems } from "@/lib/data";
import type { MenuItem, Restaurant } from "@/lib/types";

type RestaurantViewProps = {
  restaurant: Restaurant;
  cartCount: number;
  onBack: () => void;
  onAdd: (item: MenuItem) => void;
  onCart: () => void;
};

export function RestaurantView({ restaurant, cartCount, onBack, onAdd, onCart }: RestaurantViewProps) {
  const items = menuItems.filter((item) => item.restaurantId === restaurant.id);
  const [tab, setTab] = useState("Popular");

  return (
    <div className="restaurant-page">
      <button className="back-link" onClick={onBack} type="button">
        ← &nbsp;Back to restaurants
      </button>
      <div className="restaurant-hero" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <span className="offer-badge">{restaurant.discount}</span>
      </div>
      <div className="restaurant-intro">
        <div>
          <p className="eyebrow">{restaurant.cuisine}</p>
          <h1>
            {restaurant.name} <span>{restaurant.emoji}</span>
          </h1>
          <p>Good food made with the good stuff. Made fresh, just for you.</p>
          <div className="restaurant-details">
            <span>★ {restaurant.rating}</span>
            <i>·</i>
            <span>◷ {restaurant.time}</span>
            <i>·</i>
            <span>Delivery ${restaurant.fee.replace("$", "")}</span>
          </div>
        </div>
        <div className="min-order">
          <small>MINIMUM ORDER</small>
          <b>$12.00</b>
        </div>
      </div>
      <div className="menu-tabs">
        {["Popular", "All items", "About"].map((name) => (
          <button key={name} className={tab === name ? "tab-active" : ""} onClick={() => setTab(name)} type="button">
            {name}
          </button>
        ))}
      </div>
      {tab === "About" ? (
        <div className="about-card">
          <h2>A little about us</h2>
          <p>Made with care, served with a smile. We source fresh ingredients and make every order when you ask for it.</p>
          <p>⌖ &nbsp;Central City · Open today until 10 pm</p>
        </div>
      ) : (
        <>
          <p className="eyebrow menu-eyebrow">{tab === "Popular" ? "THE CROWD PLEASERS" : "MADE FRESH FOR YOU"}</p>
          <h2 className="menu-title">{tab === "Popular" ? "Bestsellers" : "Our menu"}</h2>
          <div className="dish-grid restaurant-menu">
            {(tab === "Popular" ? items.slice(0, 4) : items).map((item) => (
              <DishCard key={item.id} item={item} onAdd={onAdd} />
            ))}
          </div>
        </>
      )}
      {cartCount > 0 ? (
        <button className="floating-cart" onClick={onCart} type="button">
          View your bag <span>{cartCount} items →</span>
        </button>
      ) : null}
    </div>
  );
}
