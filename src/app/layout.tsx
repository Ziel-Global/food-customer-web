import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crave — good food, right here",
  description: "Order from the best local restaurants with Crave.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
