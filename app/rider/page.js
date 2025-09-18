"use client";

import React, { useState } from "react";

export default function RiderPage() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const requestRide = async () => {
    if (!pickup || !drop) {
      alert("Please enter pickup & drop locations");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, drop }),
      });

      if (!res.ok) throw new Error("Failed to create ride");
      const data = await res.json();
      setSuccess(`Ride Requested! ID: ${data._id}`);
      setPickup("");
      setDrop("");
    } catch (err) {
      alert("Error requesting ride");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">🚖 Request a Ride</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Pickup Location</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Enter pickup"
          className="mt-1 block w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Drop Location</label>
        <input
          type="text"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          placeholder="Enter drop"
          className="mt-1 block w-full p-2 border rounded-lg"
        />
      </div>

      <button
        onClick={requestRide}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Requesting..." : "Request Ride"}
      </button>

      {success && (
        <p className="mt-4 text-green-600 text-center font-medium">{success}</p>
      )}
    </div>
  );
}
