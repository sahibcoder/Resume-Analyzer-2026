"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    )
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Reset Password :", values);

    try {
      //   const response = await fetch(
      //     "/api/auth/reset-password",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         password: values.password,
      //       }),
      //     }
      //   );

      //   const result = await response.json();

      //   if (!response.ok) {
      //     toast.error(
      //       result.message || "Failed to reset password"
      //     );
      //     return;
      //   }

      toast.success("Password reset successfully");

      // redirect to login
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
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
                <Lock className="h-7 w-7 text-cyan-700" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Create New Password
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Enter your new password below.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-5">
                  {/* New Password */}
                  <div>
                    <Label htmlFor="password" className="mb-2 block">
                      New Password
                    </Label>

                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="mb-2 block">
                      Confirm Password
                    </Label>

                    <div className="relative">
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </button>
                    </div>

                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  {/* Password Rules */}
                  <div className="rounded-lg border bg-slate-50 p-4">
                    <p className="mb-2 text-sm font-medium">
                      Password Requirements
                    </p>

                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Minimum 8 characters
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        One uppercase letter
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        One lowercase letter
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        One number
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        One special character
                      </li>
                    </ul>
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
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}