import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video.mov"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Cabzy 🚖
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Book rides easily, pay securely, and travel smoothly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
