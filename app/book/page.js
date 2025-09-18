"use client";
import GoogleMapsSection from "@/components/Home/GoogleMapsSection";
import SearchSection from "@/components/Home/SearchSection";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function BookPage() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 min-h-screen">
          <div className="order-2 md:order-1">
            <SearchSection />
          </div>
          <div className="col-span-2 order-1 md:order-2 rounded-2xl overflow-hidden shadow-lg">
            <GoogleMapsSection />
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
