import React from "react";

import { Users, Shield, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = ({ users }) => {
    console.log("users in dashboard component :", users);
  // DYNAMIC COUNTS
  const totalUsers = users.length;

  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  const totalNormalUsers = users.filter((user) => user.role === "USER").length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Manage platform users and activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* TOTAL USERS */}
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Total Users</p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {totalUsers}
              </h2>
            </div>

            <div className="rounded-2xl bg-indigo-100 p-4">
              <Users className="h-7 w-7 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        {/* ADMINS */}
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Admins</p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {totalAdmins}
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <Shield className="h-7 w-7 text-red-600" />
            </div>
          </CardContent>
        </Card>

        {/* NORMAL USERS */}
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Normal Users</p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {totalNormalUsers}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">
              <UserCheck className="h-7 w-7 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* USERS TABLE */}
      <Card className="mt-8 rounded-3xl border-0 shadow-md overflow-hidden">
        {/* HEADER */}
        <div className="border-b bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Registered Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            All registered platform users
          </p>
        </div>

        {/* TABLE */}
        <CardContent className="p-0">
          {/* TABLE HEADER */}
          <div className="hidden grid-cols-3 bg-slate-100 px-6 py-4 text-sm font-semibold text-slate-600 md:grid">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
          </div>

          {/* USERS */}
          {users.map((user) => (
            <div
              key={user.id}
              className="grid gap-4 border-t bg-white px-6 py-5 transition hover:bg-slate-50 md:grid-cols-3"
            >
              {/* NAME */}
              <div className="flex items-center gap-3">
               <Avatar
  className={`h-11 w-11 border shadow-md ${
    user.role === "ADMIN"
      ? "border-red-200 bg-linear-to-br from-red-500 to-orange-500"
      : "border-indigo-200 bg-linear-to-br from-indigo-500 to-violet-600"
  }`}
>
  <AvatarFallback className="bg-transparent font-semibold text-white">
    {user.fullName
      ?.split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()}
  </AvatarFallback>
</Avatar>

                <div>
                  <p className="font-semibold text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="text-xs text-slate-500">Platform Member</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-center text-slate-600">
                {user.email}
              </div>

              {/* ROLE */}
              <div className="flex items-center">
                <span
                  className={`rounded-full px-4 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Created AT */}
           
              <div className="flex items-center text-slate-600">
               {format(user.createdAt, "dd MMM yyyy, hh:mm a")}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
