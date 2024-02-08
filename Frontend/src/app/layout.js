"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [bgCheck, setBgCheck] = useState(false);

  useEffect(() => {
    setBgCheck(
      window.location.href.includes("dashboard") ||
      window.location.href.includes("Adminproduct") ||
      window.location.href.includes("Promo_Codes") ||
      window.location.href.includes("AdminPreMadeArt")
    );
  }, []); 
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
