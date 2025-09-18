"use client";
import React, { useEffect, useState } from "react";
import socket from "@/lib/socket";

function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    fetch("/api/rides?status=requested")
      .then(res => res.json())
      .then(data => setRides(data));

    socket.emit("join-driver");

    socket.on("new-ride", (ride) => {
      setRides(prev => [...prev, ride]);
    });

    socket.on("ride-update", (updatedRide) => {
      setRides(prev =>
        prev.map(r => (r._id === updatedRide._id ? updatedRide : r))
      );
    });

    return () => {
      socket.off("new-ride");
      socket.off("ride-update");
    };
  }, []);

  const acceptRide = async (id) => {
    const res = await fetch(`/api/rides/${id}/accept`, { method: "POST" });
    const ride = await res.json();
    setSelectedRide(ride);
    socket.emit("ride-status", ride);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      {!selectedRide ? (
        rides.length ? (
          <ul className="space-y-4">
            {rides.map((ride) => (
              <li key={ride._id} className="border p-4 rounded shadow-md">
                <p><b>Pickup:</b> {ride.pickup}</p>
                <p><b>Drop:</b> {ride.drop}</p>
                <button
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => acceptRide(ride._id)}
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rides available 🚖</p>
        )
      ) : (
        <div className="border p-4 rounded">
          <p><b>Pickup:</b> {selectedRide.pickup}</p>
          <p><b>Drop:</b> {selectedRide.drop}</p>
          <p><b>Status:</b> {selectedRide.status}</p>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;
