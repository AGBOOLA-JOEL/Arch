type BtnProp = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const FormButton = ({ name, onClick, disabled }: BtnProp) => {
  return (
    <button className="form_btn" onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
};

export default FormButton;
