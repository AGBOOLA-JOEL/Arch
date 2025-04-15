export type ArchSelectProp = {
  // title: string;
  // value?: string | null;
  // setValue: React.Dispatch<React.SetStateAction<string>>;
  // options: string[];
  title: string;
  value?: string | null; // current value from the form
  onChange: (value: string) => void; // handle change from RHF
  options: string[];
};

export type ArchSelectFilter = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type ArchTagProp = {
  // title: string;
  // tag: string[];
  // setTag: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  tag: string[];
  setTag: (value: string[]) => void;
};

export type ArchTextareaProp = {
  textarea: string;
  setTextarea: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  maxword: number;

  label: string;
};
