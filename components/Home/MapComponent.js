"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { RouteContext } from "@/context/RouteContext";

const SmoothGeoMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const sourceMarker = useRef(null);
  const destinationMarker = useRef(null);
  const { setRouteDistance } = useContext(RouteContext);

  const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [mapHeight, setMapHeight] = useState(
    typeof window !== "undefined" ? window.innerWidth * 0.45 : 300
  );
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    const handleResize = () => setMapHeight(window.innerWidth * 0.45);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_API_KEY}`,
        center: [80.9462, 26.8467],
        zoom: 12,
        attributionControl: false,
      });

      map.current.on("zoom", () => {
        const zoom = map.current.getZoom();
        const size = Math.max(30, Math.min(50, zoom * 3));
        document.querySelectorAll(".custom-marker").forEach((el) => {
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
        });
      });
    }
  }, [GEOAPIFY_API_KEY]);

  const createCustomMarker = (imgPath) => {
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.backgroundImage = `url(${imgPath})`;
    el.style.width = "40px";
    el.style.height = "40px";
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.pointerEvents = "auto";
    el.style.position = "absolute";
    el.style.transform = "translate(-50%, -100%)";
    return el;
  };

  const drawRoute = async () => {
    if (!source?.lat || !destination?.lat || !map.current) return;

    try {
      const response = await axios.get("https://api.geoapify.com/v1/routing", {
        params: {
          waypoints: `${source.lat},${source.lng}|${destination.lat},${destination.lng}`,
          mode: "drive",
          apiKey: GEOAPIFY_API_KEY,
        },
      });

      const route = response.data?.features?.[0];
      if (!route) return;

      const { distance, time } = route.properties;
      const distanceKm = distance / 1000;

      setRouteInfo({
        distance: distanceKm.toFixed(2),
        duration: Math.round(time / 60),
      });

      setRouteDistance(distanceKm);

      if (map.current.getSource("route")) {
        if (map.current.getLayer("route")) map.current.removeLayer("route");
        map.current.removeSource("route");
      }

      map.current.addSource("route", { type: "geojson", data: route });
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#007bff", "line-width": 5 },
      });

      const bounds = new maplibregl.LngLatBounds();
      route.geometry.coordinates.forEach(([lng, lat]) =>
        bounds.extend([lng, lat])
      );
      map.current.fitBounds(bounds, { padding: 60, maxZoom: 14 });
    } catch (error) {
      console.error("Routing Error:", error);
    }
  };

  useEffect(() => {
    if (!map.current) return;

    if (sourceMarker.current) sourceMarker.current.remove();
    if (destinationMarker.current) destinationMarker.current.remove();

    if (source?.lat && source?.lng) {
      sourceMarker.current = new maplibregl.Marker({
        element: createCustomMarker("/green.png"),
        anchor: "bottom",
      })
        .setLngLat([source.lng, source.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<b>📍 Pickup: ${source.name}</b>`
          )
        )
        .addTo(map.current);
    }

    if (destination?.lat && destination?.lng) {
      destinationMarker.current = new maplibregl.Marker({
        element: createCustomMarker("/red.png"),
        anchor: "bottom",
      })
        .setLngLat([destination.lng, destination.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<b>📍 Dropoff: ${destination.name}</b>`
          )
        )
        .addTo(map.current);
    }

    if (source?.lat && destination?.lat) drawRoute();
  }, [source, destination]);

  return (
    <div className="relative mt-16"> 
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: `${mapHeight}px`,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
      {routeInfo && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          🚗 {routeInfo.distance} km • ⏱ {routeInfo.duration} min
        </div>
      )}
    </div>
  );
};

export default SmoothGeoMap;
