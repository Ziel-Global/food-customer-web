import type { menuItems, restaurants } from "@/lib/data";

export type MenuItem = (typeof menuItems)[number];
export type Restaurant = (typeof restaurants)[number];
export type { AddonGroup, AddonOption } from "@/lib/data";

export type CartAddon = {
  id: string;
  name: string;
  price: number;
  groupId: string;
  quantity: number;
};

export type CartLine = {
  id: string;
  item: MenuItem;
  quantity: number;
  addons: CartAddon[];
  note: string;
};

export type NavItem = "Home" | "Orders" | "Favorites" | "Account";
