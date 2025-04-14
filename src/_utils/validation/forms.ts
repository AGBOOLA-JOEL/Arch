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
  name: yup.string().required("project name is a required field"), //set
  username: yup.string().required("contact name is a required field"), //set
  email: yup.string().email().required(), //set
  agency: yup.string().nullable(), //set
  web: yup.string().nullable(), //set

  country: yup.string().nullable(),
  projectCategory: yup.string().nullable(),

  googleDriveLink: yup.string().required("google drive link is required"),
  built: yup.boolean().required("project status is a required field"),

  // client: yup.string().required(),
  // location: yup.string().required(),
  client: yup.string().when("built", {
    is: true,
    then: (schema) => schema.required("Client field is required "),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  location: yup.string().when("built", {
    is: false,
    then: (schema) => schema.required("Location field is required"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  // validation for built
  consult: yup.string().nullable(),
  constructionYear: yup.number().when("built", {
    is: true,
    then: (schema) => schema.required("construction year is required "),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  // validation for unbuilt
  softwares: yup.array().required(),

  size: yup.number().required("size in sqft is required"),
  terms: yup.boolean().nullable(),
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
