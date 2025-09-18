"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

function InputItem({ type }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const isSource = type === "source";

  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);
  useEffect(() => {
  if (query.length < 3) {
    setSuggestions([]);
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        "https://api.geoapify.com/v1/geocode/autocomplete",
        {
          params: {
            text: query,
            apiKey: GEOAPIFY_API_KEY,
          },
          signal: controller.signal,
        }
      );
      setSuggestions(res.data.features || []);
    } catch (err) {
      if (!axios.isCancel(err)) console.error("❌ Autocomplete Error:", err);
    }
  }, 400);

  return () => {
    clearTimeout(timeout);
    controller.abort();
  };
}, [query]);


  const handleSelect = (place) => {
    setQuery(place.properties.formatted);
    setSuggestions([]);

    const lat = place.geometry.coordinates[1];
    const lng = place.geometry.coordinates[0];

    const selectedPlace = {
      lat,
      lng,
      name: place.properties.formatted,
    };

    if (isSource) {
      setSource(selectedPlace);
    } else {
      setDestination(selectedPlace);
    }
  };
  const highlightMatch = (text) => {
  if (!query) return text;
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safeQuery})`, "gi");
  return text.replace(regex, "<b>$1</b>");
};
  return (
    <div className="relative w-full mb-4">
      <div
        className={`flex items-center gap-3 bg-white p-3.5 rounded-lg border-2 transition-all duration-200 ${
          isFocused
            ? "border-blue-400 shadow-input-focused"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div
          className={`flex-shrink-0 p-2.5 rounded-full ${
            isSource ? "bg-blue-50" : "bg-purple-50"
          }`}
        >
          <Image
            src={isSource ? "/source.png" : "/desk.png"}
            width={18}
            height={18}
            alt={isSource ? "Pickup Icon" : "Dropoff Icon"}
            className="opacity-80"
          />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={
            isSource ? "Enter pickup location" : "Enter dropoff location"
          }
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm font-normal"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-dropdown overflow-hidden z-30 border border-gray-200 animate-fadeIn">
          <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
            {suggestions.map((place) => (
              <li
                key={place.properties.place_id}
                onClick={() => handleSelect(place)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              >
                <p
                  className="text-sm font-medium text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(place.properties.formatted),
                  }}
                />
                {place.properties.address_line2 && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {place.properties.address_line2}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
        .shadow-input-focused {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }
        .shadow-dropdown {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        b {
          color: #2563eb; /* 🔥 Highlight color */
        }
      `}</style>
    </div>
  );
}

export default InputItem;
