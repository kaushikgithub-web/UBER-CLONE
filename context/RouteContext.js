// context/RouteContext.js
"use client";
import React, { createContext, useState } from "react";

export const RouteContext = createContext({
  routeDistance: 0,
  setRouteDistance: () => {},
});

export const RouteProvider = ({ children }) => {
  const [routeDistance, setRouteDistance] = useState(0);

  return (
    <RouteContext.Provider value={{ routeDistance, setRouteDistance }}>
      {children}
    </RouteContext.Provider>
  );
};
