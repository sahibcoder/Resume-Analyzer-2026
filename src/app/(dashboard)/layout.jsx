import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  // console.log("Session in DashboardLayout:", session);

  if (!session) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar session={session} />

      <SidebarInset>
        {/* Top Bar */}
        <header className="h-14 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full hover:bg-muted transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 text-slate-700" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarFallback className="bg-gray-800 text-white font-semibold">
                {session?.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
