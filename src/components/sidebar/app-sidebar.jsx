"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/config/dashboard-nav.js";
// import { dashboardNav } from "@/config/dashboard-nav";
// import { useLogout } from "../auth/LogoutButton";
import { useLogout } from "@/components/auth/LogoutButton";

import { LogOut } from "lucide-react";

export function AppSidebar({ session }) {
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  if (!session) return null;
  // console.log("session data :", session);
  const role = session?.user?.role;
  const navItems = dashboardNav[role?.toUpperCase()] ?? [];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1">
          <h2 className="text-lg font-semibold">Resume Analyzer</h2>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-800 text-white font-semibold">
              {session?.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-sm font-semibold leading-none">
              {session.user?.fullName || "User"}
            </h2>
            <span className="text-xs mt-1 text-muted-foreground break-all">
              {session.user?.email}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          size="sm"
          className="
    mt-4 w-full bg-gray-800 
    flex items-center gap-2 
    transition-all duration-300 ease-in-out
    hover:bg-gray-700  hover:shadow-md
    group cursor-pointer
  "
          onClick={handleLogout}
        >
          <LogOut
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            Logout
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
