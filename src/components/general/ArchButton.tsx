"use client";

type BtnProp = {
  name: string;
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "white" | "primary" | "cancel" | "disabled";
  type: "submit" | "reset" | "button" | undefined;
  onClick?: (value: any) => void;
};

const ArchButton = ({ name, variant, type, onClick }: BtnProp) => {
  return (
    <>
      {type === "submit" ? (
        <button
          className={`arch_button ${variant}`}
          type={type}
          disabled={variant === "disabled"}
        >
          {name}
        </button>
      ) : (
        <button
          className={`arch_button ${variant}`}
          type={type}
          disabled={variant === "disabled"}
          onClick={onClick}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default ArchButton;
