import {
  contactmoreschema,
  forgotschema,
  passwordschema,
  postnewsschema,
  reportformschema,
  submitschema,
  updateuserschema,
  upgradepaymentschema,
} from "@/_utils/validation/forms";
import { projectuploadschema } from "@/_utils/validation/projectupload";
import { InferType } from "yup";

export type FormInputProp = {
  isPassword: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};

export type FormTextareaProp = {
  name: string;
  placeholder: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};
export type SubmitInputProp = {
  isRequired: boolean;
  type: string;
  name: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};

export type JoinData = {
  username: string;
  email: string;
  institution: string;
  password: string;
  confirmPassword: string;
  rank: string;
  terms: boolean;
  letter?: boolean | null;
};

export type ReportData = InferType<typeof reportformschema>;

export type UpdateuserData = InferType<typeof updateuserschema>;

export type PostNewsData = InferType<typeof postnewsschema>;

export type ContactMoreData = InferType<typeof contactmoreschema>;

export type DashUploadData = InferType<ReturnType<typeof projectuploadschema>>;
// type SubmitData = {
//   name: string;
//   username: string;
//   email: string;
//   agency?: string | null;
//   web?: string | null;

//   country?: string | null;
//   projectCategory?: string | null;

//   googleDriveLink: string;
//   built: boolean;

//   client?: string | null;
//   location?: string | null;

//   //for buillt
//   consult?: string | null;
//   constructionYear?: number | null;

//   // for unbuilt
//   softwares: string[];

//   size: number;
//   terms?: boolean | null;
// };
export type SubmitData = InferType<typeof submitschema>;

export type LoginData = {
  username: string;
  password: string;
};

export type ForgotData = InferType<typeof forgotschema>;
export type PasswordData = InferType<typeof passwordschema>;

export type UpgradePaymentData = InferType<typeof upgradepaymentschema>;
