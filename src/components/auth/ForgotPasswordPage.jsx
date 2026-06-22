"use client";

import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function ForgotPasswordPage() {
  const router = useRouter();

  //   Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        email: values.email.trim().toLowerCase(),
      };

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Failed to send OTP.");
        return;
      }

      const expiryTime = Date.now() + 60 * 1000;

      sessionStorage.setItem("otpExpiryTime", expiryTime.toString());

      toast.success(data.message);

      router.push(`/verify-otp?email=${encodeURIComponent(payload.email)}`);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-cyan-700" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Forgot Password
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                Enter your registered email address. We'll send a 6-digit OTP to
                reset your password.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 block text-slate-700"
                    >
                      Email Address
                      <span className="text-red-500">*</span>
                    </Label>

                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="email@example.com"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-xs text-red-500 mt-1"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send OTP
                      </>
                    )}
                  </Button>

                  {/* Back */}
                  <div className="text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-sm text-cyan-700 hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}