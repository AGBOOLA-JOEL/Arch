// type ArchButtonProp = {
//   text: string;
//   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
// };
// const ArchButton = ({ text, onClick }: ArchButtonProp) => {
//   return (
//     <button className="arch_button" onClick={onClick}>
//       {text}
//     </button>
//   );
// };

"use client";
// export default ArchButton;
type BtnProp = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "white" | "primary";
};

const ArchButton = ({ name, onClick, variant }: BtnProp) => {
  return (
    <button className={`arch_button ${variant}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default ArchButton;
