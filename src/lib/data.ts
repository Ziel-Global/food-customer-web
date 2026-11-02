
export const brandName = "Crave";

export const categories = [
  {
    id: "vegan",
    label: "Vegan",
    emoji: "🌿",
    icon: "/explore-food-icons/vegan.png",
    tint: "#1A1A1A",
  },
  {
    id: "coffee",
    label: "Coffee",
    emoji: "☕",
    icon: "/explore-food-icons/coffee.png",
    tint: "#1A1A1A",
  },
  {
    id: "donuts",
    label: "Donuts",
    emoji: "🍩",
    icon: "/explore-food-icons/donuts.png",
    tint: "#1A1A1A",
  },
  {
    id: "bowls",
    label: "Bowls",
    emoji: "🥗",
    icon: "/explore-food-icons/bowls.png",
    tint: "#1A1A1A",
  },
  {
    id: "healthy",
    label: "Healthy",
    emoji: "🥑",
    icon: "/explore-food-icons/healthy.png",
    tint: "#1A1A1A",
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    icon: "/explore-food-icons/burgers.png",
    tint: "#1A1A1A",
  },
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    icon: "/explore-food-icons/pizza.png",
    tint: "#1A1A1A",
  },
];

export const cuisines = [
  "All",
  "Vegan",
  "Healthy",
  "Coffee",
  "Donuts",
  "Bowls",
  "Burgers",
  "Pizza",
];

export const restaurants = [
  {
    id: "crave",
    name: "Crave",
    cuisine: "Healthy · Bowls · Coffee",
    rating: "4.9",
    time: "20–30 min",
    fee: "$0.99",
    emoji: "🥗",
    color: "#E8F0E4",
    offer: "Free delivery",
    discount: "Free delivery",
    discountTone: "lime" as const,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80",
  },
  {
    id: "harbor-kitchen",
    name: "Harbor Kitchen",
    cuisine: "Modern comfort food",
    rating: "4.8",
    time: "20–30 min",
    fee: "$1.99",
    emoji: "🍔",
    color: "#F8D9B8",
    offer: "20% off",
    discount: "20% OFF",
    discountTone: "orange" as const,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
  },
  {
    id: "little-olive",
    name: "Little Olive",
    cuisine: "Mediterranean · Bowls",
    rating: "4.9",
    time: "25–35 min",
    fee: "$0.99",
    emoji: "🫒",
    color: "#D9E8CF",
    offer: "Buy 1 get 1",
    discount: "BOGO bowls",
    discountTone: "lime" as const,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
  },
  {
    id: "sugar-cloud",
    name: "Sugar Cloud",
    cuisine: "Bakery · Desserts",
    rating: "4.8",
    time: "15–25 min",
    fee: "$1.49",
    emoji: "🍰",
    color: "#E7D7F0",
    offer: "New",
    discount: "15% OFF",
    discountTone: "orange" as const,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80",
  },
  {
    id: "neon-slice",
    name: "Neon Slice",
    cuisine: "Pizza · Italian",
    rating: "4.7",
    time: "25–35 min",
    fee: "$1.99",
    emoji: "🍕",
    color: "#F6E7C8",
    offer: "Buy 1 get 1",
    discount: "BOGO slices",
    discountTone: "orange" as const,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
  },
  {
    id: "green-lane",
    name: "Green Lane",
    cuisine: "Vegan · Healthy",
    rating: "4.9",
    time: "20–30 min",
    fee: "$0.00",
    emoji: "🌿",
    color: "#E4F0D9",
    offer: "Free delivery",
    discount: "Free delivery",
    discountTone: "lime" as const,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&sat=-20",
  },
  {
    id: "bean-counter",
    name: "Bean Counter",
    cuisine: "Coffee · Breakfast",
    rating: "4.6",
    time: "10–20 min",
    fee: "$0.99",
    emoji: "☕",
    color: "#EFE4D8",
    offer: "New",
    discount: "New",
    discountTone: "lime" as const,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
  },
  {
    id: "smash-yard",
    name: "Smash Yard",
    cuisine: "Burgers · Fries",
    rating: "4.8",
    time: "15–25 min",
    fee: "$1.49",
    emoji: "🍔",
    color: "#F5D9C5",
    offer: "20% off",
    discount: "20% OFF",
    discountTone: "orange" as const,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80&sat=10",
  },
  {
    id: "donut-lab",
    name: "Donut Lab",
    cuisine: "Donuts · Sweets",
    rating: "4.7",
    time: "15–20 min",
    fee: "$0.99",
    emoji: "🍩",
    color: "#F3E0F0",
    offer: "New",
    discount: "12% OFF",
    discountTone: "orange" as const,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80",
  },
  {
    id: "bowl-house",
    name: "Bowl House",
    cuisine: "Bowls · Healthy",
    rating: "4.8",
    time: "20–30 min",
    fee: "$0.00",
    emoji: "🥗",
    color: "#E8F2E2",
    offer: "Free delivery",
    discount: "Free delivery",
    discountTone: "lime" as const,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80&sat=-10",
  },
];

export const deals = [
  {
    id: "d1",
    title: "20% off comfort food",
    subtitle: "Harbor Kitchen · Today only",
    restaurantId: "harbor-kitchen",
    badge: "20% OFF",
    tone: "orange" as const,
  },
  {
    id: "d2",
    title: "Free delivery on bowls",
    subtitle: "Crave · Orders $15+",
    restaurantId: "crave",
    badge: "FREE DELIVERY",
    tone: "lime" as const,
  },
  {
    id: "d3",
    title: "Sweet deal desserts",
    subtitle: "Sugar Cloud · 15% off",
    restaurantId: "sugar-cloud",
    badge: "15% OFF",
    tone: "orange" as const,
  },
  {
    id: "d4",
    title: "Smash lunch special",
    subtitle: "Smash Yard · Limited time",
    restaurantId: "smash-yard",
    badge: "20% OFF",
    tone: "orange" as const,
  },
  {
    id: "d5",
    title: "Green week free delivery",
    subtitle: "Green Lane · All day",
    restaurantId: "green-lane",
    badge: "FREE DELIVERY",
    tone: "lime" as const,
  },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  weight: string;
  image: string;
  tags: { label: string; tone: "vegan" | "calories" | "hot" | "new" }[];
  nutrition: { kcal: number; proteins: number; fats: number; carbohydrates: number };
  ingredients: string;
  storage: string;
  categoryIds: string[];
  restaurantId: string;
  color: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "quinoa-bowl",
    name: "Crave Quinoa",
    description: "Bright quinoa bowl with peaches, peas, and citrus dressing",
    price: 20,
    emoji: "🥗",
    weight: "240 g",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    tags: [
      { label: "Vegan", tone: "vegan" },
      { label: "Few Calories", tone: "calories" },
    ],
    nutrition: { kcal: 198, proteins: 13.1, fats: 13.4, carbohydrates: 5.8 },
    ingredients:
      "Quinoa, fresh peaches, shelled peas, avocado, baby spinach, roasted almonds, lemon olive oil, sea salt.",
    storage: "Keep refrigerated at 0–4°C. Best within 24 hours of delivery.",
    categoryIds: ["vegan", "bowls", "healthy"],
    restaurantId: "crave",
    color: "#E7F2DF",
  },
  {
    id: "asparagus",
    name: "Crave Asparagus",
    description: "Charred asparagus with soft herbs and lemon zest",
    price: 18,
    emoji: "🥬",
    weight: "310 g",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80",
    tags: [
      { label: "Vegan", tone: "vegan" },
      { label: "Few Calories", tone: "calories" },
    ],
    nutrition: { kcal: 142, proteins: 8.4, fats: 9.2, carbohydrates: 7.1 },
    ingredients:
      "Green asparagus, olive oil, lemon zest, garlic, parsley, cracked pepper, sea salt.",
    storage: "Keep refrigerated. Consume within 24 hours.",
    categoryIds: ["vegan", "healthy"],
    restaurantId: "crave",
    color: "#EAF4E6",
  },
  {
    id: "peach-bowl",
    name: "Crave Peach Bowl",
    description: "Seasonal peach bowl with yogurt cream and granola",
    price: 16,
    emoji: "🍑",
    weight: "280 g",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    tags: [{ label: "New", tone: "new" }],
    nutrition: { kcal: 260, proteins: 9.2, fats: 11.0, carbohydrates: 32.4 },
    ingredients: "Peaches, Greek yogurt, oats, honey, almonds, mint.",
    storage: "Keep chilled. Best the same day.",
    categoryIds: ["healthy", "bowls"],
    restaurantId: "crave",
    color: "#F8E8D8",
  },
  {
    id: "house-coffee",
    name: "Crave Coffee",
    description: "Single-origin pour over, bright and clean",
    price: 6,
    emoji: "☕",
    weight: "250 ml",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    tags: [{ label: "Hot", tone: "hot" }],
    nutrition: { kcal: 5, proteins: 0.3, fats: 0, carbohydrates: 0 },
    ingredients: "Freshly ground coffee, filtered water.",
    storage: "Serve immediately.",
    categoryIds: ["coffee"],
    restaurantId: "crave",
    color: "#F0E6DC",
  },
  {
    id: "classic-burger",
    name: "The Classic Burger",
    description: "Grilled beef, aged cheddar, pickles, house sauce",
    price: 12.5,
    emoji: "🍔",
    weight: "320 g",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    tags: [{ label: "Popular", tone: "hot" }],
    nutrition: { kcal: 540, proteins: 28, fats: 31, carbohydrates: 38 },
    ingredients: "Beef patty, cheddar, pickles, brioche, house sauce.",
    storage: "Best hot. Consume immediately.",
    categoryIds: ["healthy"],
    restaurantId: "harbor-kitchen",
    color: "#F8D9B8",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    description: "Buttermilk fried chicken, slaw, spicy honey",
    price: 13.25,
    emoji: "🍗",
    weight: "340 g",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80",
    tags: [{ label: "Hot", tone: "hot" }],
    nutrition: { kcal: 610, proteins: 34, fats: 29, carbohydrates: 48 },
    ingredients: "Chicken thigh, buttermilk, slaw, spicy honey.",
    storage: "Best hot. Consume immediately.",
    categoryIds: ["healthy"],
    restaurantId: "harbor-kitchen",
    color: "#F2D0CA",
  },
  {
    id: "truffle-fries",
    name: "Truffle Parmesan Fries",
    description: "Crispy fries, parmesan, fresh herbs",
    price: 6.5,
    emoji: "🍟",
    weight: "220 g",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    tags: [{ label: "Share", tone: "new" }],
    nutrition: { kcal: 420, proteins: 8, fats: 22, carbohydrates: 48 },
    ingredients: "Potato fries, truffle oil, parmesan, herbs.",
    storage: "Best hot. Consume immediately.",
    categoryIds: ["donuts"],
    restaurantId: "harbor-kitchen",
    color: "#F7E8C8",
  },
];

export function getMenuItem(id?: string) {
  return menuItems.find((item) => item.id === id) ?? menuItems[0];
}

export function getRestaurant(id?: string) {
  return restaurants.find((item) => item.id === id) ?? restaurants[0];
}
