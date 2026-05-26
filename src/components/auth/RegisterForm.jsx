"use client";

"use client";


import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/auth.schema";
import {  Loader, Save, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = registerSchema;

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const body = { ...values };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      // console.log("data message :", data)

      if (!res.ok) {
        toast.error(data.error || "Failed to create user.");
      } else {
        toast.success(data.message || "User Register successfully.");
        resetForm();
        router.push('/login');
      }
    } catch (error) {
      toast.error("Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex  flex-col gap-3">
            {/* Register*/}
            <div className="sm:col-span-2">
              <h3 className="text-lg font-semibold text-slate-700">Register</h3>
            </div>
            {/* Full Name */}
            <div>
              <Label htmlFor="name" className="mb-2 text-slate-700">
                Full Name<span className="text-rose-500">*</span>
              </Label>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Enter full name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 text-slate-700">
                Email<span className="text-rose-500">*</span>
              </Label>
              <Field
                as={Input}
                id="email"
                name="email"
                placeholder="email@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2 text-slate-700">
                Password<span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-4 text-right mt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 flex gap-2 items-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Register...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Register
                  </>
                )}
              </Button>
            </div>
               {/* Login Link */}
            <p className="text-sm text-gray-600 mt-4 text-center">
             Already have an account? {" "}
              <Link href="/login" className="text-cyan-700 hover:underline">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;