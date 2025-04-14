type BtnProp = {
  name: string;
};

const SubmitButton = ({ name }: BtnProp) => {
  return (
    <div className="submit_btn">
      <button className="submit_btn" type={"submit"}>
        {name}
      </button>
    </div>
  );
};

export default SubmitButton;
