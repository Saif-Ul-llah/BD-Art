"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({ children }) {
  let bgCheck =
    window.location.href.includes("dashboard") ||
    window.location.href.includes("Adminproduct") ||
    window.location.href.includes("Promo_Codes") ||
    window.location.href.includes("AdminPreMadeArt");
  return (
    <html lang="en">
      <body
        className={`select-none ${
          bgCheck ? "bg-transparent" : "bg-[#170D18]"
        } `}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
