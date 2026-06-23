import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const OTP_EXPIRY_MINUTES = 2;
const SALT_ROUNDS = 10;

export async function POST(request) {
  try {
    const body = await request.json();

    const resetToken = body?.resetToken;

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token is required",
        },
        { status: 400 }
      );
    }

    // =========================
    // Find Reset Request
    // =========================

    const record = await prisma.passwordResetOtp.findFirst({
      where: {
        resetToken,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    console.log("Record check :", record)

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset session expired.",
        },
        { status: 400 }
      );
    }

    // =========================
    // Generate New OTP
    // =========================

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpHash = await bcrypt.hash(
      otp,
      SALT_ROUNDS
    );

    const expiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    // =========================
    // Update Existing Record
    // =========================

    await prisma.passwordResetOtp.update({
      where: {
        id: record.id,
      },
      data: {
        otpHash,
        attempts: 0,
        expiresAt,
      },
    });

    // =========================
    // Send Email
    // =========================

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: record.user.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP will expire in
          ${OTP_EXPIRY_MINUTES} minutes.
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "OTP resent successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}