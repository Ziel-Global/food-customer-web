export type LatLng = { lat: number; lng: number };

export type OrderTrackingSnapshot = {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryAddress: string;
  itemSummary: string;
  statusLabel: string;
  activeStepIndex: number;
  isLive: boolean;
  etaSecondsInitial: number;
  courierName: string;
  courierRole: string;
  courierRating: number;
  courierPhone: string;
  restaurantPhone: string;
  routeCoordinates: LatLng[];
  mapCenter: LatLng;
  mapZoom: number;
  riderProgressMin: number;
  riderProgressMax: number;
  vehicle: "bicycle" | "scooter" | "car";
  reorderItemIds: string[];
  restaurantId: string;
  total: number;
  image: string;
};

export const TRACKING_STEPS = [
  { key: "received", label: "Confirmed" },
  { key: "cooking", label: "Preparing" },
  { key: "delivery", label: "On the way" },
  { key: "done", label: "Delivered" },
] as const;

const SF_ROUTE: LatLng[] = [
  { lat: 37.75972, lng: -122.42108 },
  { lat: 37.75894, lng: -122.41902 },
  { lat: 37.75785, lng: -122.41744 },
  { lat: 37.75662, lng: -122.41588 },
  { lat: 37.75541, lng: -122.41436 },
  { lat: 37.75418, lng: -122.41294 },
];

const LIVE_ORDERS: Record<string, OrderTrackingSnapshot> = {
  "CR-2048": {
    id: "CR-2048",
    restaurantName: "Crave",
    restaurantAddress: "742 Valencia St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Quinoa Bowl · 2 items",
    statusLabel: "Courier nearby",
    activeStepIndex: 2,
    isLive: true,
    etaSecondsInitial: 12 * 60 + 34,
    courierName: "Sheri Turner Jr.",
    courierRole: "Bicycle courier",
    courierRating: 4.9,
    courierPhone: "+14155550198",
    restaurantPhone: "+14155550110",
    routeCoordinates: SF_ROUTE,
    mapCenter: { lat: 37.75695, lng: -122.41701 },
    mapZoom: 15,
    riderProgressMin: 0.28,
    riderProgressMax: 0.88,
    vehicle: "bicycle",
    reorderItemIds: ["quinoa-bowl", "asparagus"],
    restaurantId: "crave",
    total: 38,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  "CR-2051": {
    id: "CR-2051",
    restaurantName: "Harbor Kitchen",
    restaurantAddress: "2101 Mission St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Classic Burger · fries",
    statusLabel: "Being prepared",
    activeStepIndex: 1,
    isLive: true,
    etaSecondsInitial: 28 * 60,
    courierName: "Maya Chen",
    courierRole: "Scooter courier",
    courierRating: 4.8,
    courierPhone: "+14155550244",
    restaurantPhone: "+14155550122",
    routeCoordinates: SF_ROUTE.map((p) => ({ lat: p.lat + 0.004, lng: p.lng - 0.003 })),
    mapCenter: { lat: 37.7605, lng: -122.4195 },
    mapZoom: 14.5,
    riderProgressMin: 0.08,
    riderProgressMax: 0.35,
    vehicle: "scooter",
    reorderItemIds: ["classic-burger", "truffle-fries"],
    restaurantId: "harbor-kitchen",
    total: 24.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
};

const PAST_ORDERS: Record<string, OrderTrackingSnapshot> = {
  "CR-2039": {
    id: "CR-2039",
    restaurantName: "Crave",
    restaurantAddress: "742 Valencia St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Quinoa Bowl · Asparagus",
    statusLabel: "Delivered",
    activeStepIndex: 3,
    isLive: false,
    etaSecondsInitial: 0,
    courierName: "Sheri Turner Jr.",
    courierRole: "Bicycle courier",
    courierRating: 4.9,
    courierPhone: "+14155550198",
    restaurantPhone: "+14155550110",
    routeCoordinates: SF_ROUTE,
    mapCenter: { lat: 37.75695, lng: -122.41701 },
    mapZoom: 15,
    riderProgressMin: 1,
    riderProgressMax: 1,
    vehicle: "bicycle",
    reorderItemIds: ["quinoa-bowl", "asparagus"],
    restaurantId: "crave",
    total: 38,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  "CR-2031": {
    id: "CR-2031",
    restaurantName: "Crave",
    restaurantAddress: "742 Valencia St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Peach Bowl",
    statusLabel: "Delivered",
    activeStepIndex: 3,
    isLive: false,
    etaSecondsInitial: 0,
    courierName: "Jordan Lee",
    courierRole: "Scooter courier",
    courierRating: 4.7,
    courierPhone: "+14155550311",
    restaurantPhone: "+14155550110",
    routeCoordinates: SF_ROUTE,
    mapCenter: { lat: 37.75695, lng: -122.41701 },
    mapZoom: 15,
    riderProgressMin: 1,
    riderProgressMax: 1,
    vehicle: "scooter",
    reorderItemIds: ["peach-bowl"],
    restaurantId: "crave",
    total: 16,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
  },
  "CR-2024": {
    id: "CR-2024",
    restaurantName: "Harbor Kitchen",
    restaurantAddress: "2101 Mission St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Classic Burger · Fries",
    statusLabel: "Delivered",
    activeStepIndex: 3,
    isLive: false,
    etaSecondsInitial: 0,
    courierName: "Maya Chen",
    courierRole: "Scooter courier",
    courierRating: 4.8,
    courierPhone: "+14155550244",
    restaurantPhone: "+14155550122",
    routeCoordinates: SF_ROUTE.map((p) => ({ lat: p.lat + 0.004, lng: p.lng - 0.003 })),
    mapCenter: { lat: 37.7605, lng: -122.4195 },
    mapZoom: 14.5,
    riderProgressMin: 1,
    riderProgressMax: 1,
    vehicle: "scooter",
    reorderItemIds: ["classic-burger", "truffle-fries"],
    restaurantId: "harbor-kitchen",
    total: 24.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
  "CR-2018": {
    id: "CR-2018",
    restaurantName: "Sugar Cloud",
    restaurantAddress: "88 Folsom St",
    deliveryAddress: "24 Cedar Street",
    itemSummary: "Assorted desserts",
    statusLabel: "Delivered",
    activeStepIndex: 3,
    isLive: false,
    etaSecondsInitial: 0,
    courierName: "Alex Rivera",
    courierRole: "Car courier",
    courierRating: 4.9,
    courierPhone: "+14155550420",
    restaurantPhone: "+14155550880",
    routeCoordinates: SF_ROUTE,
    mapCenter: { lat: 37.75695, lng: -122.41701 },
    mapZoom: 15,
    riderProgressMin: 1,
    riderProgressMax: 1,
    vehicle: "car",
    reorderItemIds: ["peach-bowl"],
    restaurantId: "sugar-cloud",
    total: 19.75,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  },
};

export function getOrderTracking(orderId?: string | null, placedOrderId?: string | null): OrderTrackingSnapshot {
  const id = orderId?.trim() || placedOrderId || "CR-2048";
  if (LIVE_ORDERS[id]) return LIVE_ORDERS[id];
  if (PAST_ORDERS[id]) return PAST_ORDERS[id];

  if (placedOrderId && id === placedOrderId) {
    return {
      ...LIVE_ORDERS["CR-2051"],
      id: placedOrderId,
      statusLabel: "Preparing now",
      activeStepIndex: 1,
      isLive: true,
      etaSecondsInitial: 28 * 60,
      itemSummary: "Your latest Crave order",
    };
  }

  return {
    ...PAST_ORDERS["CR-2039"],
    id,
  };
}

export function listPastOrderSummaries() {
  return Object.values(PAST_ORDERS);
}

/** Always-available demo actives + any id the user just placed. */
export function listActiveOrders(placedOrderId?: string | null) {
  const ids = new Set(Object.keys(LIVE_ORDERS));
  if (placedOrderId) ids.add(placedOrderId);
  return [...ids].map((id) => {
    const order = getOrderTracking(id, placedOrderId);
    return {
      id: order.id,
      restaurantName: order.restaurantName,
      itemSummary: order.itemSummary,
      statusLabel: order.statusLabel,
      activeStepIndex: order.activeStepIndex,
      etaSecondsInitial: order.etaSecondsInitial,
      courierName: order.courierName,
      courierPhone: order.courierPhone,
      vehicle: order.vehicle,
      image: order.image,
    };
  });
}

export function getDemoChatSeed(orderId?: string | null) {
  const tracking = getOrderTracking(orderId);
  return {
    orderId: tracking.id,
    courierName: tracking.courierName,
    courierPhone: tracking.courierPhone,
    restaurantName: tracking.restaurantName,
    vehicle: tracking.vehicle,
    messages: [
      {
        id: "m1",
        from: "courier" as const,
        text: `Hey! I'm ${tracking.courierName.split(" ")[0]} — on my way with your ${tracking.restaurantName} order.`,
        at: "2 min ago",
      },
      {
        id: "m2",
        from: "courier" as const,
        text: "Traffic is light. I'll text when I'm downstairs.",
        at: "1 min ago",
      },
    ],
  };
}

export function coordinateAtProgress(route: LatLng[], progress: number): LatLng {
  if (!route.length) return { lat: 0, lng: 0 };
  if (route.length === 1) return route[0];
  const t = Math.max(0, Math.min(1, progress));
  const scaled = t * (route.length - 1);
  const index = Math.floor(scaled);
  const next = Math.min(route.length - 1, index + 1);
  const local = scaled - index;
  return {
    lat: route[index].lat + (route[next].lat - route[index].lat) * local,
    lng: route[index].lng + (route[next].lng - route[index].lng) * local,
  };
}

export function formatTrackingCountdown(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds);
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatArrivalClock(secondsFromNow: number) {
  const d = new Date(Date.now() + secondsFromNow * 1000);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function riderImageForVehicle(vehicle: OrderTrackingSnapshot["vehicle"]) {
  if (vehicle === "scooter") return "/riders/lime-scooter-delivery.png";
  if (vehicle === "car") return "/riders/lime-hatchback-delivery.png";
  return "/riders/lime-delivery-cyclist.png";
}

export function riderMarkerImage(vehicle: OrderTrackingSnapshot["vehicle"]) {
  if (vehicle === "scooter") return "/riders/black-scooter-rider.png";
  if (vehicle === "car") return "/riders/lime-hatchback-delivery.png";
  return "/riders/minimal-delivery-cyclist.png";
}
