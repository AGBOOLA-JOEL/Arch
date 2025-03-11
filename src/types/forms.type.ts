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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};
export type SubmitInputProp = {
  isRequired: boolean;
  type: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
};

export type SubmitData = {
  name: string;
  agency: string;
  web: string;
  size: number;
  email: string;
  drive: string;
  consult: string;
  client: string;
  username: string;
  location: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type ForgotData = {
  email: string;
};
export type PasswordData = {
  password: string;
  confirmPassword: string;
};
