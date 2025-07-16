import type { Metadata } from "next";
import { Nunito, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keep My Money",
  description: "Sistema para controle de gastos",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${nunito.variable} ${outfit.variable} antialiased`}>
        <>
          {children}
          <Toaster richColors position="top-right" />
        </>
      </body>
    </html>
  );
}
