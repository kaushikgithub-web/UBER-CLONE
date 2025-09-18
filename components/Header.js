"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X, MapPin, Phone } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerMenu = [
    { id: 1, name: "Ride", icon: "/taxi.png", link: "/book" },
    { id: 2, name: "Package", icon: "/box.png", link: "/packages" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      } border-b border-gray-200/60`}
    >
      <div className="flex items-center justify-between px-4 sm:px-4 lg:px-8 py-1">
       <Link
  href="/book"
  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
>
  <Image
    src="/car.png"
    width={48}
    height={48}
    alt="Cabzy Logo"
    className="rounded-full"
  />
  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
    Cabzy
  </h1>
</Link>

        <nav className="hidden md:flex items-center gap-6">
          {headerMenu.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.id}
                href={item.link}
                className={`group flex flex-col items-center transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-all ${
                    isActive ? "bg-blue-50" : "group-hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={item.icon}
                    width={26}
                    height={26}
                    alt={item.name}
                    className="mb-1 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-sm mt-1">{item.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1"></div>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm text-black-600 mr-2">
            <Phone size={16} className="text-blue-500" />
            <span>1-800-CABZY</span>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link
                href="/payment"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors flex items-center gap-1"
              >
                Payments
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 border-2 border-white shadow-sm",
                    userButtonAvatarBox: "rounded-full",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm bg-black text-white rounded-lg shadow hover:bg-gray-900 transition-all hover:shadow-md"
              >
                Login
              </Link>
            </SignedOut>
          </div>
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/60 shadow-lg">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-blue-500" />
            <span>Current location</span>
          </div>
          <nav className="flex flex-col p-4">
            {headerMenu.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center gap-4 py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <Image src={item.icon} width={24} height={24} alt={item.name} />
                <span className="text-base font-medium">{item.name}</span>
              </Link>
            ))}
            <SignedIn>
              <Link
                href="/payment"
                className="flex items-center gap-4 py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="5"
                      width="20"
                      height="14"
                      rx="2"
                    ></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <span className="text-base font-medium">Payments</span>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="flex items-center gap-4 py-3 px-2 text-white bg-black rounded-lg hover:bg-gray-900 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-base font-medium">Login</span>
              </Link>
            </SignedOut>
            <div className="flex items-center gap-4 py-3 px-2 text-gray-700 mt-2 border-t border-gray-100 pt-4">
              <Phone size={20} className="text-blue-500" />
              <span className="text-base font-medium">1-800-CABZY</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
