type BtnProp = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FormButton = ({ name, onClick }: BtnProp) => {
  return (
    <button className="form_btn" onClick={onClick}>
      {name}
    </button>
  );
};

export default FormButton;
