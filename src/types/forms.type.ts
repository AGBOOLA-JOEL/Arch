export type FormInputProp = {
  isPassword: boolean;
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
