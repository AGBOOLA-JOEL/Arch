export type RegInputProp = {
  isPassword: boolean;
  toggle: boolean;
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
