import {
  Users,
  Shield,
  UserCheck,
  Activity,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export const metadata = {
  title: "Admin | Dashboard",
};

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            
            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                1,248
              </h2>
            </div>

            <div className="rounded-2xl bg-indigo-100 p-4">
              <Users className="h-7 w-7 text-indigo-600" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            
            <div>
              <p className="text-sm text-slate-500">
                Admins
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                4
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <Shield className="h-7 w-7 text-red-600" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            
            <div>
              <p className="text-sm text-slate-500">
                Active Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                932
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">
              <UserCheck className="h-7 w-7 text-emerald-600" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            
            <div>
              <p className="text-sm text-slate-500">
                Activity
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                89%
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-100 p-4">
              <Activity className="h-7 w-7 text-orange-600" />
            </div>

          </CardContent>
        </Card>

      </div>

      {/* USERS TABLE */}
      <Card className="mt-8 rounded-3xl border-0 shadow-md">
        
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently registered users
          </p>
        </div>

        <CardContent className="p-0">

          {/* TABLE HEADER */}
          <div className="hidden grid-cols-3 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600 md:grid">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
          </div>

          {/* USERS */}
          {[
            {
              name: "Sahib",
              email: "sahib@gmail.com",
              role: "ADMIN",
            },
            {
              name: "Rahul",
              email: "rahul@gmail.com",
              role: "USER",
            },
            {
              name: "Aman",
              email: "aman@gmail.com",
              role: "USER",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="grid gap-4 border-t px-6 py-5 md:grid-cols-3"
            >

              <div className="font-semibold text-slate-900">
                {user.name}
              </div>

              <div className="text-slate-600">
                {user.email}
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>

            </div>
          ))}

        </CardContent>
      </Card>
    </div>
  );
};

export default Page;