import { Inter, Baloo_2 } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TheHeader from "@/src/components/block/TheHeader";

import { CartProvider } from "../context/ProvideContext";

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
          <main>
            {children}
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
