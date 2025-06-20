"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { LuArrowUpDown, LuLandmark, LuPiggyBank, LuTags } from "react-icons/lu";
import { SidebarItemPartial } from "./sidebar-items-partial";
import { MenuButton } from "./menu-button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transações",
    url: "/transacoes",
    icon: LuArrowUpDown,
  },
  {
    title: "Bancos",
    url: "/bancos",
    icon: LuLandmark,
  },
  {
    title: "Categorias",
    url: "/categorias",
    icon: LuTags,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-[#2d2a2a]">
      <SidebarHeader>
        <SidebarMenuButton size="lg" className="bg-sidebar!">
          <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-foreground text-sidebar-primary-foreground">
            💸
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-semibold">Keep My Money</span>
            <span className="text-xs text-gray-600">v1.0.1</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex">
            <SidebarGroupLabel>Gestão de contas</SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(SidebarItemPartial)}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex gap-3 items-center" disabled>
                  <LuPiggyBank className="h-32 w-32" />
                  <span>Caixinhas (Em breve...)</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <MenuButton />
      </SidebarContent>
    </Sidebar>
  );
}
