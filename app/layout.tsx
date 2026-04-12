import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const dmSans = DM_Sans({ subsets: ["latin"], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: "SriGaneshJewellers - Trusted Family Jeweller",
  description: "Timeless jewellery for every Indian celebration. Gold, Silver, Savings Schema & Loans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans ${geist.variable} ${dmSans.variable}`}>
      <body className={dmSans.className}>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
