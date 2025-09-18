"use client";
import React from "react";
import Link from "next/link";

export default function PackagesPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video.mov"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          We’re working hard to bring you amazing package delivery features. 🚚
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
