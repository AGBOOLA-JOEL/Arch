type BtnProp = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SubmitButton = ({ name, onClick }: BtnProp) => {
  return (
    <div className="submit_btn">
      <button className="submit_btn" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default SubmitButton;
