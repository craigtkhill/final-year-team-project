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
  title: "Final Year Team Project in Psychology and Computing",
  description: "Final Year Team Project in Psychology and Computing",
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
          className={`${quicksand.variable} font-quicksand max-w-[640px] w-full mx-auto flex flex-col items-center`}
        >
          <Image className="w-24 h-24" src="/logo.svg" alt="Logo" />
          {children}
        </main>
      </body>
    </html>
  );
}
