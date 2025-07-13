import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { ReactQueryProvider } from "../providers";
import { AuthValidate } from "@/components/auth/auth-validate";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Painel - Keep My Money",
  description: "Sistema para controle de gastos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");

  let defaultOpen = true;
  if (sidebarState) {
    defaultOpen = sidebarState.value === "true";
  }
  return (
    <ReactQueryProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <AuthValidate />
        <main className="w-full rounded-lg my-2 px-8 py-3">
          <SidebarTrigger className="mb-3" />
          {children}
        </main>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
