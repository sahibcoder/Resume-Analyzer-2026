import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    // console.log("Reset password body :", body);

    const resetToken = body?.resetToken;
    const password = body?.password;

    // =========================
    // 1. VALIDATION
    // =========================
    if (!resetToken || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token and password are required",
        },
        { status: 400 }
      );
    }

    // =========================
    // 2. FIND VALID OTP RECORD
    // =========================
    const record = await prisma.passwordResetOtp.findFirst({
      where: {
        resetToken,            // 🔥 KEY FIX
        isUsed: true,          // OTP must be verified
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset session",
        },
        { status: 400 }
      );
    }

    // =========================
    // 3. HASH NEW PASSWORD
    // =========================
    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // 4. UPDATE USER PASSWORD
    // =========================
    await prisma.user.update({
      where: { id: record.userId }, // 🔥 no email
      data: {
        password: hashedPassword,
      },
    });

    // =========================
    // 5. CLEAN UP TOKEN (ONE TIME USE)
    // =========================
    await prisma.passwordResetOtp.delete({
      where: { id: record.id },
    });

    // =========================
    // 6. SUCCESS RESPONSE
    // =========================
    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}