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
  projectName: yup.string().required("project name is a required field"), //set
  name: yup.string().required("contact name is a required field"), //set
  email: yup.string().email().required(), //set
  institutionOrFirm: yup.string().required(), //set
  website: yup.string().nullable(), //set

  country: yup.string().nullable(),
  projectCategory: yup.string().required(),

  googleDriveLink: yup.string().required("google drive link is required"),
  // built: yup.string().required("project status is a required field"),\
  built: yup
    .mixed()
    .required("Project status is a required field")
    .transform((value: string) => value === "Built"),

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
  consultant: yup.string().nullable(),
  constructionYear: yup.string().when("built", {
    is: true,
    then: (schema) => schema.required("construction year is required "),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  softwares: yup
    .array()
    .of(yup.string())
    .min(1, "Please add at least one software")
    .nullable(),

  // size: yup.number().nullable(),
  size: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable(),

  terms: yup
    .boolean()
    .oneOf([true], "please accept the terms and conditions") // Enforces the checkbox must be true
    .required("Terms are required"),
});

export const postnewsschema = yup.object().shape({
  title: yup.string().required(),
  // type: yup.string().required(),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "Please add at least one tag")
    .nullable(),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "Please add at least one category")
    .nullable(),
  newsImage: yup.mixed().nullable(),

  // .test("fileType", "Only image files are allowed", (value) => {
  //   if (value) {
  //     return value instanceof File && value.type.startsWith("image/");
  //   }
  //   return true; // Allow no file to be selected initially
  // }),
  desc: yup.string().nullable(),
  newsBody: yup.mixed().nullable(),
});

export const messageformschema = yup.object().shape({
  title: yup.string().required(),
  receipient: yup.string().required(),
});

export const reportformschema = yup.object().shape({
  title: yup.string().required("Select a category"),
  desc: yup.string().nullable(),
});

export const updateuserschema = yup.object().shape({
  institution: yup.string().nullable(""),
  rank: yup.string().nullable(),
});

export const contactmoreschema = yup.object().shape({
  email: yup.string().email().required(),
  issue: yup.string().required("Select an account issue"),
  reportBody: yup.string().nullable(),
  image: yup.mixed().nullable(),
});

//add error pop up if requirement is not met
