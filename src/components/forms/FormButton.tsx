type BtnProp = {
  name: string;
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const FormButton = ({ name, disabled }: BtnProp) => {
  return (
    <button className="form_btn" disabled={disabled} type="submit">
      {name}
    </button>
  );
};

export default FormButton;
