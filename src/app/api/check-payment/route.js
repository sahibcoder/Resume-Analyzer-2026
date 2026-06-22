import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return Response.json({
    hasPaid: user.hasPaid,
  });
}