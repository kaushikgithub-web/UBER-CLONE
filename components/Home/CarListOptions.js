import React, { useState } from "react";
import CarListData from "@/utils/CarListData";
import { useRouter } from "next/navigation"; 

function CarListOptions({ distance, fare }) {
  const [selectedRide, setSelectedRide] = useState(null);
  const router = useRouter();

  if (!distance || isNaN(distance)) distance = 0;

  const economyFare = fare ? parseFloat(fare) : 70 + distance * 4;
  const selectedRideData = CarListData.find((item) => item.id === selectedRide);

  const handlePayment = () => {
    if (!selectedRideData) return;
    const totalFare = (economyFare * selectedRideData.multiplier).toFixed(2);
    router.push(`/payment?ride=${selectedRideData.name}&fare=${totalFare}`);
  };

  return (
    <div className="mt-5">
      <h2 className="text-[22px] font-bold mb-4">Recommended</h2>

      {CarListData.map((item) => {
        const price = (economyFare * item.multiplier).toFixed(2);
        const isSelected = selectedRide === item.id;

        return (
          <div
            key={item.id}
            onClick={() => setSelectedRide(item.id)}
            className={`flex items-center justify-between p-3 mt-3 bg-white border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
              isSelected ? "border-2 border-black shadow-md" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-14 h-14" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{price}</p>
              <p className="text-xs text-gray-500">{item.seat} seats</p>
            </div>
          </div>
        );
      })}
      {selectedRide && (
        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-full py-3 bg-gradient-to-r from-black to-gray-900 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300"
          >
            💳 Make Payment for ₹
            {(economyFare * selectedRideData.multiplier).toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;
