import * as yup from "yup";

export const regschema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  institution: yup.string().required(),
  // age: yup.number().positive().integer().min(18).required(),
  password: yup.string().min(4).max(10).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password don't match")
    .required(),
});

export const loginschema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(4).max(10).required(),
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

//add error pop up if requirement is not met
