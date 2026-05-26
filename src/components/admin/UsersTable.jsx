"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";


export default function UsersTable({ users }) {
    // console.log("users in table component :", users);
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {user.fullName}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <span className="rounded-md border px-2 py-1 text-xs">
                    {user.role}
                  </span>
                </TableCell>

                <TableCell>
                   {format(user.createdAt, "dd MMM yyyy, hh:mm a")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}