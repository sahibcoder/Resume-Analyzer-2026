import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .nullable()
    .notRequired()
    .test("is-valid-e164", "Enter a valid phone number", function (value) {
      if (!value) return true;
      return /^\+\d{8,15}$/.test(value);
    }),
});


export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});