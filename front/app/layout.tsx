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
          <Header />
          {children}
          <Footer />
        </Recoil>
      </body>
    </html>
  );
}
