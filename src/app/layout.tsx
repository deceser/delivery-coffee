import { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";

import Toastify from "./Toastify";
import TheHeader from "@/src/components/block/TheHeader";

import { CartProvider } from "@/src/context/ProvideContext";

import "@/src/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const baloo = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Delivery",
  description: "Coffee Delivery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>

      <body className={baloo.className}>
        <CartProvider>
          <TheHeader />
          <Toastify />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
