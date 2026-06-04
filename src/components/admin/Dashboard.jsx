"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Users, Shield, UserCheck, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard({ users }) {
  const [userList, setUserList] = useState(users);

  const totalUsers = userList.length;

  const totalAdmins = userList.filter((user) => user.role === "ADMIN").length;

  const totalNormalUsers = userList.filter(
    (user) => user.role === "USER",
  ).length;

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserList((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role } : user)),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId) => {
    // const confirmed = window.confirm(
    //   "Delete this user?"
    // );

    // if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      //   console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserList((prev) => prev.filter((user) => user.id !== userId));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-slate-500">Manage platform users</p>
      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p>Total Users</p>

              <h2 className="text-4xl font-bold">{totalUsers}</h2>
            </div>

            <Users />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p>Admins</p>

              <h2 className="text-4xl font-bold">{totalAdmins}</h2>
            </div>

            <Shield />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p>Users</p>

              <h2 className="text-4xl font-bold">{totalNormalUsers}</h2>
            </div>

            <UserCheck />
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}

      <Card className="mt-8">
        <CardContent className="p-0">
          <div className="hidden md:grid md:grid-cols-5 bg-slate-100 p-4 font-semibold">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>Created</p>
            <p>Action</p>
          </div>

          {userList.map((user) => (
            <div
              key={user.id}
              className="grid gap-4 border-t p-4 md:grid-cols-5"
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

                <span>{user.fullName}</span>
              </div>

              {/* EMAIL */}

              <div className="flex items-center">{user.email}</div>

              {/* ROLE */}

              <div>
                <Select
                  value={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger
                    className={`w-full font-semibold cursor-pointer ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-600 border-red-200"
                        : "bg-indigo-100 text-indigo-600 border-indigo-200"
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">Admin</SelectItem>

                      <SelectItem value="USER">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* DATE */}

              <div className="flex items-center">
                {format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")}
              </div>

              {/* DELETE */}

              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User?</AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete
                        <span className="font-semibold"> {user.fullName}</span>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction onClick={() => handleDelete(user.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}