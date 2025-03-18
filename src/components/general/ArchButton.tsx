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
};

const ArchButton = ({ name, onClick }: BtnProp) => {
  return (
    <button className="arch_button" onClick={onClick}>
      {name}
    </button>
  );
};

export default ArchButton;
