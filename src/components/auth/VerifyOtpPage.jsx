"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef([]);

  // Redirect if email missing
  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  // Restore timer from sessionStorage
  useEffect(() => {
    const expiryTime = sessionStorage.getItem("otpExpiryTime");

    if (!expiryTime) {
      setCountdown(0);
      return;
    }

    const remainingSeconds = Math.max(
      0,
      Math.floor((Number(expiryTime) - Date.now()) / 1000)
    );

    setCountdown(remainingSeconds);
  }, []);

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    if (name.length <= 2) {
      return `${name[0]}***@${domain}`;
    }

    return `${name.slice(0, 2)}***@${domain}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedValue.length === 6) {
      const digits = pastedValue.split("");

      setOtp(digits);

      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);

    //   const response = await fetch("/api/auth/verify-otp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       otp: finalOtp,
    //     }),
    //   });

    //   const result = await response.json();

    //   if (!response.ok) {
    //     toast.error(result.message || "OTP verification failed");
    //     return;
    //   }

      toast.success("OTP verified successfully");

      router.push("/reset-password");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);

      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to resend OTP");
        return;
      }

      const expiryTime = Date.now() + 60 * 1000;

      sessionStorage.setItem(
        "otpExpiryTime",
        expiryTime.toString()
      );

      setCountdown(60);

      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100">
                <ShieldCheck className="h-7 w-7 text-cyan-700" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Verify OTP
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                We've sent a 6-digit code to
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {maskEmail(email)}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* OTP Inputs */}
              <div className="mb-6 flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    onPaste={handlePaste}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    className="h-12 w-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  otp.join("").length !== 6
                }
                className="w-full cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              {/* Resend OTP */}
              <div className="mt-5 text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-slate-500">
                    Resend OTP in{" "}
                    <span className="font-medium">
                      00:{String(countdown).padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    disabled={isResending}
                    onClick={handleResendOtp}
                    className="p-0 text-cyan-700"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}