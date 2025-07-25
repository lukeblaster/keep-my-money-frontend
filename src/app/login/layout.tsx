import type { Metadata } from "next";
import "../globals.css";
import { ReactQueryProvider } from "../providers";

export const metadata: Metadata = {
  title: "Login - Keep My Money",
  description: "Sistema para controle de gastos",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
