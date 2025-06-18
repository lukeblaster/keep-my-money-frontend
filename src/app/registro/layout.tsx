import type { Metadata } from "next";
import "../globals.css";
import { ReactQueryProvider } from "../providers";

export const metadata: Metadata = {
  title: "Login - Controle de Gastos",
  description: "Sistema para controle de gastos",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
