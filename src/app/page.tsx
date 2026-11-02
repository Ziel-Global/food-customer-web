"use client";

import { useMemo, useState } from "react";
import {
  AccountView,
  AddressModal,
  CartDrawer,
  CheckoutModal,
  FavoritesView,
  HomeFeed,
  OrdersView,
  PromoBar,
  RestaurantView,
  Sidebar,
  SiteFooter,
  Toast,
  Topbar,
} from "@/components";
import { menuItems, restaurants } from "@/lib/data";
import type { CartLine, MenuItem, NavItem } from "@/lib/types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<NavItem>("Home");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState("24 Cedar Street");
  const [addressOpen, setAddressOpen] = useState(false);
  const [toast, setToast] = useState("");

  const restaurant = restaurants.find((r) => r.id === selectedRestaurant);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  const shownRestaurants = useMemo(
    () =>
      restaurants.filter((r) => {
        const matchingCategory =
          category === "All" ||
          r.cuisine.toLowerCase().includes(category.toLowerCase()) ||
          menuItems.some((m) => m.restaurantId === r.id && m.categoryIds.includes(category.toLowerCase()));
        return matchingCategory && `${r.name} ${r.cuisine}`.toLowerCase().includes(query.toLowerCase());
      }),
    [category, query],
  );

  const searchedItems = menuItems.filter((item) =>
    `${item.name} ${item.description} ${item.categoryIds.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function add(item: MenuItem) {
    const existingRestaurant = cart[0]?.item.restaurantId;
    if (existingRestaurant && existingRestaurant !== item.restaurantId) {
      if (!window.confirm("Your cart has items from another restaurant. Clear it and add this item?")) return;
      setCart([]);
    }
    setCart((lines) => {
      const current = lines.find((line) => line.item.id === item.id);
      return current
        ? lines.map((line) => (line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line))
        : [...lines, { item, quantity: 1 }];
    });
    showToast(`${item.name} added to your bag`);
  }

  function changeQty(id: string, delta: number) {
    setCart((lines) =>
      lines
        .map((line) => (line.item.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function placeOrder() {
    setCart([]);
    setCheckout(false);
    setCartOpen(false);
    setPlaced(true);
    setActive("Orders");
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]));
  }

  function goHome() {
    setActive("Home");
    setSelectedRestaurant(null);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActive(value ? "Home" : "Home");
    if (value) setSelectedRestaurant(null);
  }

  function renderContent() {
    if (selectedRestaurant && restaurant) {
      return (
        <RestaurantView
          restaurant={restaurant}
          cartCount={count}
          onBack={() => setSelectedRestaurant(null)}
          onAdd={add}
          onCart={() => setCartOpen(true)}
        />
      );
    }

    if (active === "Orders") {
      return (
        <OrdersView
          placed={placed}
          onExplore={() => {
            goHome();
            setPlaced(false);
          }}
        />
      );
    }

    if (active === "Favorites") {
      return (
        <FavoritesView
          restaurants={restaurants}
          favorites={favorites}
          onSelect={setSelectedRestaurant}
          onFavorite={toggleFavorite}
          onExplore={goHome}
        />
      );
    }

    if (active === "Account") {
      return <AccountView address={address} onEditAddress={() => setAddressOpen(true)} onToast={showToast} />;
    }

    return (
      <HomeFeed
        category={category}
        query={query}
        restaurants={shownRestaurants}
        dishes={searchedItems}
        favorites={favorites}
        onCategory={setCategory}
        onSelectRestaurant={setSelectedRestaurant}
        onFavorite={toggleFavorite}
        onAdd={add}
      />
    );
  }

  return (
    <main>
      <PromoBar onCopy={() => showToast("Code copied — CRAVEFIRST")} />
      <Topbar
        address={address}
        query={query}
        cartCount={count}
        onHome={goHome}
        onEditAddress={() => setAddressOpen(true)}
        onQueryChange={handleQueryChange}
        onHelp={() => setActive("Account")}
        onCartOpen={() => setCartOpen(true)}
      />
      <div className="layout">
        <Sidebar
          active={active}
          hasNewOrder={placed}
          onNavigate={(name) => {
            setActive(name);
            setSelectedRestaurant(null);
          }}
          onExplore={() => {
            goHome();
            setCategory("All");
          }}
        />
        <section className="content">{renderContent()}</section>
      </div>
      <SiteFooter />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        address={address}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onCheckout={() => {
          setCartOpen(false);
          setCheckout(true);
        }}
      />
      <CheckoutModal
        open={checkout}
        address={address}
        count={count}
        subtotal={subtotal}
        onAddressChange={setAddress}
        onClose={() => setCheckout(false)}
        onPlaceOrder={placeOrder}
      />
      <AddressModal
        open={addressOpen}
        address={address}
        onClose={() => setAddressOpen(false)}
        onSave={(next) => {
          setAddress(next);
          showToast(`Delivering to ${next}`);
        }}
      />
      <Toast message={toast} />
    </main>
  );
}
