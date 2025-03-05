type BtnProp = {
  name: string;
  width: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FormButton = ({ name, width, onClick }: BtnProp) => {
  return (
    <button
      className="form_btn"
      onClick={onClick}
      style={{ width: `${width}%` }}
    >
      {name}
    </button>
  );
};

export default FormButton;
