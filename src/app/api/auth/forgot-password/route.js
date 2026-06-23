import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

const OTP_EXPIRY_MINUTES = 2;
const SALT_ROUNDS = 10;

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body?.email?.trim()?.toLowerCase();
    // console.log("forget password email check :", email);

    //  const resetToken = crypto.randomBytes(32).toString("hex");
    const resetToken = crypto.randomBytes(32).toString("hex");

    // const resetTokenHash = crypto
    //   .createHash("sha256")
    //   .update(resetToken)
    //   .digest("hex");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // console.log("User found :", user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email.",
        },
        {
          status: 404,
        },
      );
    }

    const activeOtp = await prisma.passwordResetOtp.findFirst({
      where: {
        userId: user.id,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    // console.log("Active OTP :",activeOtp)

    if (activeOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP already sent. Please wait before requesting a new one.",
        },
        {
          status: 429,
        },
      );
    }

    /**
     * Generate OTP
     */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP Send :", otp);

    const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    /**
     * Remove Old OTPs
     */
    await prisma.passwordResetOtp.deleteMany({
      where: {
        userId: user.id,
      },
    });

    /**
     * Save OTP
     */
    await prisma.passwordResetOtp.create({
      data: {
        userId: user.id,
        otpHash,
        resetToken,
        expiresAt,
      },
    });

    /**
     * Send Email
     */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div
          style="
            max-width:600px;
            margin:auto;
            padding:20px;
            font-family:Arial,sans-serif;
          "
        >
          <h2>Password Reset Request</h2>

          <p>
            Use the OTP below to reset your password.
          </p>

          <div
            style="
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              margin:25px 0;
            "
          >
            ${otp}
          </div>

          <p>
            This OTP will expire in
            ${OTP_EXPIRY_MINUTES} minutes.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully to your email.",
        resetToken,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}