import * as yup from "yup";

export const regschema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  institution: yup.string().required(),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters long")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "password must contain at least one special character"
    )
    .matches(/\d/, "password must contain at least one number")
    .required("password is required"),

  confirmPassword: yup
    .string()
    .test("password-match", "your passwords do not match", function (value) {
      const { password } = this.parent; // Get parent values
      return password && value === password;
    })
    .required("confirm your password"),
  rank: yup
    .string()
    .required("Rank is required")
    .transform((value) => (Array.isArray(value) ? value.join(",") : value)), // Convert array to string if needed
  terms: yup
    .boolean()
    .oneOf([true], "please accept the terms and conditions") // Enforces the checkbox must be true
    .required("Terms are required"),
  letter: yup.boolean().nullable(),
});

export const loginschema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(4).required(),
});

export const forgotschema = yup.object().shape({
  email: yup.string().email().required(),
});

export const passwordschema = yup.object().shape({
  password: yup.string().min(4).max(10).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password don't match")
    .required(),
});
export const submitschema = yup.object().shape({
  name: yup.string().required(),
  agency: yup.string().required(),
  web: yup.string().required(),
  country: yup.string().required(),
  email: yup.string().email().required(),
  drive: yup.string().required(),
  client: yup.string().required(),
  location: yup.string().required(),
  username: yup.string().required(),
  size: yup.number().required(),
});

export const postformschema = yup.object().shape({
  title: yup.string().required(),
  type: yup.string().required(),
});

export const messageformschema = yup.object().shape({
  title: yup.string().required(),
  receipient: yup.string().required(),
});
//add error pop up if requirement is not met
