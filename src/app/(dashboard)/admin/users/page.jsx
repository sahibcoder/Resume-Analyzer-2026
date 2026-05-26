import { prisma}  from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";

export const metadata = {
  title: "Admin | Users",
};


export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <UsersTable users={users} />
  );
}