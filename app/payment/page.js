
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Home/CheckoutForm"; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const ride = searchParams.get("ride") || "Unknown";
  const fare = parseFloat(searchParams.get("fare") || "0");

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!fare || fare <= 0) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: fare }), 
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("Non-OK response from API:", res.status, text);
          throw new Error("Payment intent creation failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.clientSecret) setClientSecret(data.clientSecret);
        else console.error("No clientSecret in response:", data);
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
      });
  }, [fare]);

  const options = clientSecret ? { clientSecret, appearance: { theme: "stripe" } } : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        <div className="mb-4 p-3 border rounded bg-gray-50">
          <p className="text-sm text-gray-600">Ride</p>
          <p className="text-lg font-semibold">{ride}</p>
          <p className="text-sm text-gray-700 mt-1">Amount: ₹{fare.toFixed(2)}</p>
        </div>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={fare} />
          </Elements>
        ) : (
          <p className="text-center text-gray-600">Loading payment form...</p>
        )}
      </div>
    </div>
  );
}
