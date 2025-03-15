export type ArchSelectProp = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
};

export type ArchSelectFilter = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type ArchTagProp = {
  title: string;
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
};
