import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";


const MAX_ATTEMPTS = 5;

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Verify Body Check :", body);

    // const hashedToken = crypto
    //   .createHash("sha256")
    //   .update(resetToken)
    //   .digest("hex");

    const resetToken = body?.resetToken;
    const otp = body?.otp?.trim();

    // =========================
    // 1. VALIDATION
    // =========================
    if (!resetToken || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "ResetToken and OTP are required",
        },
        { status: 400 },
      );
    }

    // =========================
    // 2. FIND OTP RECORD USING TOKEN
    // =========================
    const activeOtp = await prisma.passwordResetOtp.findFirst({
      where: {
        resetToken, // 🔥 KEY FIX
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true, // optional (if relation exists)
      },
    });

    if (!activeOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired request. Please try again.",
        },
        { status: 400 },
      );
    }

    // =========================
    // 3. CHECK ATTEMPTS
    // =========================
    if (activeOtp.attempts >= MAX_ATTEMPTS) {
      await prisma.passwordResetOtp.delete({
        where: { id: activeOtp.id },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Too many failed attempts. Request new OTP.",
        },
        { status: 429 },
      );
    }

    // =========================
    // 4. COMPARE OTP
    // =========================
    const isValid = await bcrypt.compare(otp, activeOtp.otpHash);

    if (!isValid) {
      await prisma.passwordResetOtp.update({
        where: { id: activeOtp.id },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        { status: 400 },
      );
    }

    // =========================
    // 5. MARK USED
    // =========================
    await prisma.passwordResetOtp.update({
      where: { id: activeOtp.id },
      data: {
        isUsed: true,
      },
    });

    // =========================
    // 6. SUCCESS RESPONSE (RETURN TOKEN)
    // =========================
    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        resetToken: activeOtp.resetToken,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("VERIFY_OTP_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}