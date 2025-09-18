"use client";
import React, { useContext, useState } from "react";
import InputItem from "./InputItem";
import CarListOptions from "./CarListOptions";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { RouteContext } from "@/context/RouteContext";

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const { routeDistance, routeDuration } = useContext(RouteContext);

  const [fare, setFare] = useState(null);

  const calculateFare = () => {
    if (!source?.lat || !destination?.lat || !routeDistance) {
      alert("Please select both source and destination.");
      return;
    }
    const base_fare = 70;
    const distance_rate = 14;
    const time_rate = 2;
    const booking_fee = 12;
    const surge_multiplier = routeDistance > 5 ? 1.1 : 1;

    const estimated_time = routeDuration || routeDistance * 2;

    let upfront_fare =
      base_fare +
      routeDistance * distance_rate +
      estimated_time * time_rate +
      booking_fee;

    upfront_fare = upfront_fare * surge_multiplier;

    setFare(upfront_fare.toFixed(2));
  };

  return (
    <div className="space-y-5 pt-24 px-4 md:px-8">
      <div className="p-5 md:p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Plan Your Ride</h2>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          type="button"
          onClick={calculateFare}
          className="w-full mt-6 py-3 bg-black text-white text-sm font-medium rounded-xl 
                     hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
        >
          Find Rides
        </button>
        {routeDistance > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-900 text-sm">
            🚗 <b>{routeDistance.toFixed(2)} km</b>
            {fare && <> | 💰 <b>₹{fare}</b></>}
          </div>
        )}
      </div>

      {routeDistance > 0 && (
        <CarListOptions distance={routeDistance} fare={fare} />
      )}
    </div>
  );
}
export default SearchSection;
