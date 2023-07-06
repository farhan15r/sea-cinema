import Providers from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEA Cinema",
  description: "A SEA cinema booking app",
  themeColor: "#000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
