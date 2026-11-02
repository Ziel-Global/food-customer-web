import type { menuItems, restaurants } from "@/lib/data";

export type MenuItem = (typeof menuItems)[number];
export type Restaurant = (typeof restaurants)[number];
export type CartLine = { item: MenuItem; quantity: number };
export type NavItem = "Home" | "Orders" | "Favorites" | "Account";
