"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AccountView,
  AddressModal,
  CartDrawer,
  CheckoutModal,
  CustomizeItemModal,
  FavoritesView,
  HomeFeed,
  LoginScreen,
  CourierChatView,
  EditProfileModal,
  SupportChatView,
  OrderSuccessModal,
  OrdersView,
  OrderTrackingView,
  PromoBar,
  RestaurantView,
  Sidebar,
  SiteFooter,
  Toast,
  Topbar,
} from "@/components";
import { clearStoredUser, getStoredUser, storeUser, userInitials, type AuthUser } from "@/lib/auth";
import { menuItems, restaurants } from "@/lib/data";
import { getOrderTracking, listActiveOrders } from "@/lib/tracking";
import type { CartLine, MenuItem, NavItem } from "@/lib/types";

const DEMO_FAVORITE_RESTAURANTS = ["crave", "harbor-kitchen", "sugar-cloud", "little-olive"];
const DEMO_FAVORITE_DISHES = ["quinoa-bowl", "asparagus", "peach-bowl", "classic-burger"];

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
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<NavItem>("Home");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>(DEMO_FAVORITE_RESTAURANTS);
  const [favoriteDishes, setFavoriteDishes] = useState<string[]>(DEMO_FAVORITE_DISHES);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);
  const [lastOrderId, setLastOrderId] = useState("CR-2084");
  const [address, setAddress] = useState("24 Cedar Street");
  const [addressOpen, setAddressOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [chatOrderId, setChatOrderId] = useState<string | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    setAuthReady(true);
  }, []);

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

  function toggleFavoriteDish(id: string) {
    setFavoriteDishes((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  }

  const activeOrderCount = listActiveOrders(placed ? lastOrderId : null).length;

  function goHome() {
    setActive("Home");
    setSelectedRestaurant(null);
  }

  function openOrderTracking(orderId: string) {
    setTrackingOrderId(orderId);
  }

  function reorderFromOrder(orderId: string) {
    const snapshot = getOrderTracking(orderId, lastOrderId);
    const items = snapshot.reorderItemIds
      .map((id) => menuItems.find((item) => item.id === id))
      .filter((item): item is MenuItem => Boolean(item));

    if (!items.length) {
      showToast("Nothing to reorder from this order");
      return;
    }

    const restaurantId = items[0].restaurantId;
    const existingRestaurant = cart[0]?.item.restaurantId;
    if (existingRestaurant && existingRestaurant !== restaurantId) {
      if (!window.confirm("Your cart has items from another restaurant. Clear it and reorder?")) return;
    }

    const lines: CartLine[] = items.map((item) => ({
      id: `${item.id}-reorder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      item,
      quantity: 1,
      addons: [],
      note: "",
    }));

    setCart((current) => {
      if (current[0] && current[0].item.restaurantId !== restaurantId) return lines;
      return [...current, ...lines];
    });
    setTrackingOrderId(null);
    setCartOpen(true);
    setActive("Orders");
    showToast(`Reordered from ${snapshot.restaurantName}`);
  }

  function handleLogin(next: AuthUser) {
    storeUser(next);
    setUser(next);
    setActive("Home");
    showToast(`Welcome back, ${next.firstName}`);
  }

  function handleLogout() {
    clearStoredUser();
    setUser(null);
    setCart([]);
    setFavorites(DEMO_FAVORITE_RESTAURANTS);
    setFavoriteDishes(DEMO_FAVORITE_DISHES);
    setSelectedRestaurant(null);
    setCartOpen(false);
    setCheckout(false);
    setOrderSuccess(false);
    setPlaced(false);
    setTrackingOrderId(null);
    setChatOrderId(null);
    setProfileOpen(false);
    setSupportOpen(false);
    setActive("Home");
    setQuery("");
    setCategory("All");
    showToast("You’ve been logged out");
  }

  function saveProfile(next: AuthUser) {
    storeUser(next);
    setUser(next);
    showToast("Profile updated");
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
          onToast={showToast}
          onOpenOrder={openOrderTracking}
          onReorder={reorderFromOrder}
          onChat={setChatOrderId}
        />
      );
    }

    if (active === "Favorites") {
      return (
        <FavoritesView
          restaurants={restaurants}
          dishes={menuItems}
          favorites={favorites}
          favoriteDishes={favoriteDishes}
          onSelect={setSelectedRestaurant}
          onFavorite={toggleFavorite}
          onToggleDish={toggleFavoriteDish}
          onAdd={openCustomize}
          onExplore={goHome}
        />
      );
    }

    if (active === "Account" && user) {
      return (
        <AccountView
          user={user}
          address={address}
          favoritesCount={favorites.length + favoriteDishes.length}
          hasOrders={activeOrderCount > 0}
          activeOrderCount={activeOrderCount}
          onEditAddress={() => setAddressOpen(true)}
          onEditProfile={() => setProfileOpen(true)}
          onOpenSupport={() => setSupportOpen(true)}
          onToast={showToast}
          onOpenFavorites={() => setActive("Favorites")}
          onOpenOrders={() => setActive("Orders")}
          onLogout={handleLogout}
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

  if (!authReady) {
    return <main className="login-screen" style={{ placeItems: "center" }} />;
  }

  if (!user) {
    return (
      <main>
        <LoginScreen onLogin={handleLogin} />
        <Toast message={toast} />
      </main>
    );
  }

  return (
    <main>
      <PromoBar onCopy={() => showToast("Code copied — CRAVEFIRST")} />
      <Topbar
        address={address}
        query={query}
        cartCount={count}
        initials={userInitials(user)}
        onHome={goHome}
        onEditAddress={() => setAddressOpen(true)}
        onQueryChange={handleQueryChange}
        onHelp={() => setSupportOpen(true)}
        onAccount={() => setActive("Account")}
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
          onLogout={handleLogout}
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
          setTrackingOrderId(lastOrderId);
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
      {user ? (
        <EditProfileModal
          open={profileOpen}
          user={user}
          onClose={() => setProfileOpen(false)}
          onSave={saveProfile}
        />
      ) : null}
      {supportOpen ? <SupportChatView onClose={() => setSupportOpen(false)} /> : null}
      <CustomizeItemModal
        key={customizing?.id ?? "closed"}
        item={customizing}
        onClose={() => setCustomizing(null)}
        onConfirm={confirmCustomize}
      />
      {trackingOrderId ? (
        <OrderTrackingView
          orderId={trackingOrderId}
          placedOrderId={placed ? lastOrderId : null}
          onClose={() => setTrackingOrderId(null)}
          onReorder={reorderFromOrder}
          onChat={setChatOrderId}
          onSelectOrder={setTrackingOrderId}
          onSupport={() => setSupportOpen(true)}
        />
      ) : null}
      {chatOrderId ? (
        <CourierChatView orderId={chatOrderId} onClose={() => setChatOrderId(null)} />
      ) : null}
      <Toast message={toast} />
    </main>
  );
}
