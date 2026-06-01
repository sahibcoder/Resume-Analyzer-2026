import { prisma}  from "@/lib/prisma";
import Dashboard from "@/components/admin/Dashboard";


export const metadata = {
  title: "Admin | Dashboard",
};


export default async function AdminPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Dashboard users={users} />
  );
}