import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { RouteProvider } from "@/context/RouteContext";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Cabzy - Ride Hailing",
  description: "Book your ride with Cabzy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
  <html lang="en">
    <body className={inter.className}>
      <RouteProvider>
        <Header />
        {children}
      </RouteProvider>
    </body>
  </html>
</ClerkProvider>

  );
}
