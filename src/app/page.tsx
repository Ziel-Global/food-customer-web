"use client";

import { useMemo, useState } from "react";
import {
  AccountView,
  AddressModal,
  CartDrawer,
  CheckoutModal,
  CustomizeItemModal,
  FavoritesView,
  HomeFeed,
  OrderSuccessModal,
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

function lineUnitPrice(line: CartLine) {
  return line.item.price + line.addons.reduce((sum, addon) => sum + addon.price * addon.quantity, 0);
}

function sameCustomization(a: CartLine, b: Omit<CartLine, "id" | "quantity">) {
  if (a.item.id !== b.item.id || a.note !== b.note || a.addons.length !== b.addons.length) return false;
  const aKeys = a.addons.map((addon) => `${addon.groupId}:${addon.id}x${addon.quantity}`).sort().join("|");
  const bKeys = b.addons.map((addon) => `${addon.groupId}:${addon.id}x${addon.quantity}`).sort().join("|");
  return aKeys === bKeys;
}

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
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);
  const [lastOrderId, setLastOrderId] = useState("CR-2084");
  const [address, setAddress] = useState("24 Cedar Street");
  const [addressOpen, setAddressOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);

  const restaurant = restaurants.find((r) => r.id === selectedRestaurant);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + lineUnitPrice(line) * line.quantity, 0);

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

  function openCustomize(item: MenuItem) {
    const existingRestaurant = cart[0]?.item.restaurantId;
    if (existingRestaurant && existingRestaurant !== item.restaurantId) {
      if (!window.confirm("Your cart has items from another restaurant. Clear it and add this item?")) return;
      setCart([]);
    }
    setCustomizing(item);
  }

  function confirmCustomize(draft: Omit<CartLine, "id">) {
    setCart((lines) => {
      const match = lines.find((line) => sameCustomization(line, draft));
      if (match) {
        return lines.map((line) =>
          line.id === match.id ? { ...line, quantity: line.quantity + draft.quantity } : line,
        );
      }
      return [
        ...lines,
        {
          ...draft,
          id: `${draft.item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        },
      ];
    });
    setCustomizing(null);
    showToast(`${draft.item.name} added to your bag`);
  }

  function changeQty(id: string, delta: number) {
    setCart((lines) =>
      lines
        .map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function placeOrder() {
    const orderTotal = subtotal + 2.74;
    const orderId = `CR-${2000 + Math.floor(Math.random() * 8000)}`;
    setLastOrderTotal(orderTotal);
    setLastOrderId(orderId);
    setCart([]);
    setCheckout(false);
    setCartOpen(false);
    setSelectedRestaurant(null);
    setPlaced(true);
    setOrderSuccess(true);
    showToast("Order placed successfully");
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
          onAdd={openCustomize}
          onCart={() => setCartOpen(true)}
        />
      );
    }

    if (active === "Orders") {
      return (
        <OrdersView
          placed={placed}
          orderId={lastOrderId}
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
      return (
        <AccountView
          address={address}
          favoritesCount={favorites.length}
          hasOrders={placed}
          onEditAddress={() => setAddressOpen(true)}
          onToast={showToast}
          onOpenFavorites={() => setActive("Favorites")}
          onOpenOrders={() => setActive("Orders")}
        />
      );
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
        onAdd={openCustomize}
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
      <OrderSuccessModal
        open={orderSuccess}
        address={address}
        total={lastOrderTotal}
        orderId={lastOrderId}
        onTrack={() => {
          setOrderSuccess(false);
          setActive("Orders");
        }}
        onHome={() => {
          setOrderSuccess(false);
          goHome();
        }}
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
      <CustomizeItemModal
        key={customizing?.id ?? "closed"}
        item={customizing}
        onClose={() => setCustomizing(null)}
        onConfirm={confirmCustomize}
      />
      <Toast message={toast} />
    </main>
  );
}
