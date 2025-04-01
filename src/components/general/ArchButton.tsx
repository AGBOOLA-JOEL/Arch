"use client";

type BtnProp = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "white" | "primary" | "cancel";
};

const ArchButton = ({ name, onClick, variant }: BtnProp) => {
  return (
    <button className={`arch_button ${variant}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default ArchButton;
