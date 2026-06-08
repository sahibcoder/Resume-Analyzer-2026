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

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { dashboardNav } from "@/config/dashboard-nav.js";

import { useLogout } from "@/components/auth/LogoutButton";

import {
  LogOut,
  Sparkles,
} from "lucide-react";

export function AppSidebar2({ session }) {
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  if (!session) return null;

  const role = session?.user?.role;

  const navItems =
    dashboardNav[role?.toUpperCase()] ?? [];

  // Dynamic Gender Theme
  const isMale =
    session?.user?.gender === "Male";

  const theme = isMale
    ? {
        sidebar:
          "bg-gradient-to-b from-blue-700 via-blue-600 to-cyan-500 text-white border-r border-blue-400",

        active:
          "bg-white text-blue-700 shadow-lg shadow-blue-900/20 scale-[1.02]",

        hover:
          "hover:bg-white/15 hover:translate-x-1",

        card:
          "bg-white/10 backdrop-blur-xl border border-white/20",

        avatar:
          "bg-white text-blue-700",

        logout:
          "bg-white text-blue-700 hover:bg-blue-100",

        label:
          "text-blue-100/90",

        glow:
          "shadow-blue-500/30",
      }
    : {
        sidebar:
          "bg-gradient-to-b from-pink-600 via-fuchsia-500 to-purple-500 text-white border-r border-pink-300",

        active:
          "bg-white text-pink-700 shadow-lg shadow-pink-900/20 scale-[1.02]",

        hover:
          "hover:bg-white/15 hover:translate-x-1",

        card:
          "bg-white/10 backdrop-blur-xl border border-white/20",

        avatar:
          "bg-white text-pink-700",

        logout:
          "bg-white text-pink-700 hover:bg-pink-100",

        label:
          "text-pink-100/90",

        glow:
          "shadow-pink-500/30",
      };

  return (
    <Sidebar
      className={`${theme.sidebar} backdrop-blur-xl`}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-white/15">
        <div className="px-4 py-5">
          <div className="flex items-center gap-2">
            <div
              className={`
                h-10 w-10 rounded-xl
                bg-white/15
                flex items-center justify-center
                backdrop-blur-md
                shadow-lg ${theme.glow}
              `}
            >
              <Sparkles size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-wide">
                Resume Analyzer
              </h2>

              <p className="text-xs text-white/80 mt-1">
                AI Powered Dashboard
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`uppercase tracking-[0.2em] text-[11px] mb-3 ${theme.label}`}
          >
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.url;

                return (
                  <SidebarMenuItem
                    key={item.url}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        h-12 rounded-2xl px-4
                        transition-all duration-300
                        ${
                          isActive
                            ? theme.active
                            : `text-white ${theme.hover}`
                        }
                      `}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3"
                      >
                        <item.icon size={19} />

                        <span className="font-medium text-[15px]">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/15 p-4">
        {/* User Card */}
        <div
          className={`
            rounded-3xl p-4
            ${theme.card}
            shadow-xl ${theme.glow}
          `}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Avatar className="h-12 w-12 shadow-lg">
              <AvatarFallback
                className={`font-bold text-lg ${theme.avatar}`}
              >
                {session?.user?.fullName
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex flex-col overflow-hidden">
              <h2 className="text-sm font-semibold truncate">
                {session.user?.fullName ||
                  "User"}
              </h2>

              <span className="text-xs text-white/75 truncate">
                {session.user?.email}
              </span>
            </div>
          </div>

          {/* Logout */}
          <Button
            size="sm"
            onClick={handleLogout}
            className={`
              mt-4 w-full h-11 rounded-2xl
              flex items-center justify-center gap-2
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-xl
              font-semibold
              group
              ${theme.logout}
            `}
          >
            <LogOut
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

            <span>
              Logout
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}