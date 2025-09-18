
"use client";

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-900"
        }`}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>

      {message && <p className="text-sm mt-2 text-red-600">{message}</p>}
    </form>
  );
}
