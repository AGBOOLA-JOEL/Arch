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
//add error pop up if requirement is not met
