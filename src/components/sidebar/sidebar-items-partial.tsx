"use client";
import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

interface SidebarItemPartialProps {
  title: string;
  url: string;
  icon: IconType;
}

export const SidebarItemPartial = (item: SidebarItemPartialProps) => {
  const pathname = usePathname();
  const path = pathname.replace("painel/", "");
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link
          href={`/painel${item.url}`}
          className={`${
            path.includes(item.url) ? "bg-primary" : ""
          } transition-colors flex gap-3 items-center`}
        >
          <item.icon className="h-32 w-32 text-gray-700" />
          <span className="font-semibold">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
