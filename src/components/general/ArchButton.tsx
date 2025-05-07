"use client";

type BtnProp = {
  name: string;
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "white" | "primary" | "cancel" | "disabled";
  type: "submit" | "reset" | "button" | undefined;
};

const ArchButton = ({ name, variant, type }: BtnProp) => {
  return (
    <button
      className={`arch_button ${variant}`}
      type={type}
      disabled={variant === "disabled"}
    >
      {name}
    </button>
  );
};

export default ArchButton;
