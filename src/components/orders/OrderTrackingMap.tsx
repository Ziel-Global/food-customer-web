"use client";

import { useMemo } from "react";
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from "@react-google-maps/api";
import type { LatLng, OrderTrackingSnapshot } from "@/lib/tracking";
import { riderMarkerImage } from "@/lib/tracking";

type OrderTrackingMapProps = {
  tracking: OrderTrackingSnapshot;
  riderCoordinate: LatLng;
};

const mapContainerStyle = { width: "100%", height: "100%" };

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: "greedy",
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { elementType: "geometry", stylers: [{ color: "#f2f3ee" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#6f7368" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#d7e4ef" }] },
  ],
};

export function OrderTrackingMap({ tracking, riderCoordinate }: OrderTrackingMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "crave-google-maps",
    googleMapsApiKey: apiKey,
  });

  const path = useMemo(
    () => tracking.routeCoordinates.map((point) => ({ lat: point.lat, lng: point.lng })),
    [tracking.routeCoordinates],
  );

  const start = path[0];
  const end = path[path.length - 1];

  if (!apiKey) {
    return <MapFallback title="Add a Google Maps key" body="Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local" />;
  }

  if (loadError) {
    return <MapFallback title="Map unavailable" body="Couldn’t load Google Maps. Check the API key and billing." />;
  }

  if (!isLoaded) {
    return <MapFallback title="Loading map…" body="Finding your courier on the route." />;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={tracking.mapCenter}
      zoom={tracking.mapZoom}
      options={mapOptions}
    >
      {path.length > 1 ? (
        <PolylineF
          path={path}
          options={{
            strokeColor: "#20231c",
            strokeOpacity: 0.85,
            strokeWeight: 4,
          }}
        />
      ) : null}

      {start ? (
        <MarkerF
          position={start}
          label={{ text: "R", color: "#20231c", fontWeight: "700" }}
          title={tracking.restaurantName}
        />
      ) : null}

      {end ? (
        <MarkerF
          position={end}
          label={{ text: "H", color: "#20231c", fontWeight: "700" }}
          title="Delivery"
        />
      ) : null}

      <MarkerF
        position={riderCoordinate}
        icon={{
          url: riderMarkerImage(tracking.vehicle),
          scaledSize: new google.maps.Size(52, 40),
          anchor: new google.maps.Point(26, 20),
        }}
        title={tracking.courierName}
      />
    </GoogleMap>
  );
}

function MapFallback({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(160deg, #e8ebe6, #dfe6d4)",
        padding: 32,
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div>
        <div style={{ fontSize: 34, marginBottom: 10 }}>🗺️</div>
        <b style={{ display: "block", fontSize: 18, color: "#20231c", marginBottom: 6 }}>{title}</b>
        <p style={{ margin: 0, fontSize: 14, color: "#77796f", lineHeight: 1.45 }}>{body}</p>
      </div>
    </div>
  );
}
