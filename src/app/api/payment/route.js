// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";

// export async function POST(req) {
//   const session = await getServerSession();

//   if (!session) {
//     return Response.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   await prisma.user.update({
//     where: {
//       email: session.user.email,
//     },
//     data: {
//       hasPaid: true,
//     },
//   });

//   return Response.json({
//     success: true,
//   });
// }

// pay

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id } = body;
    console.log("Payment details received:", {
      razorpay_order_id,
      razorpay_payment_id,
    });

    const order = await prisma.payment.create({
      data: {
        amount: 10,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
