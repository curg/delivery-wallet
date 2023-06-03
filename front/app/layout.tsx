"use client"
import Recoil from "@/components/Recoil";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Recoil>
          <div className="flex flex-col justify-between h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </Recoil>
      </body>
    </html>
  );
}
