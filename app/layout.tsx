import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Quicksand } from "next/font/google";
// Logo
// import Logo from "@assets/logo.svg";
// CSS
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eironauts",
  description: "A game for learning about the air quality and pollution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className={`${quicksand.variable} font-quicksand max-w-[640px] w-full mx-auto flex flex-col justify-center items-center sm:max-w-none`}
        >
          {" "}
          {/* <Image className="w-24 h-24" src="/logo.svg" alt="Logo" /> */}
          {children}
        </main>
      </body>
    </html>
  );
}
