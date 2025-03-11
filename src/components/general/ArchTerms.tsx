type TermProp = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ArchTerms = ({ onChange }: TermProp) => {
  return (
    <div className="arch_terms">
      <input type="checkbox" name="terms" onChange={onChange} />

      <p>
        I agree to the{" "}
        <span
        // onClick={() => {
        //   navigator("/policy/terms-of-use");
        // }}
        >
          {" "}
          Terms of use
        </span>{" "}
        and
        <span
        // onClick={() => {
        //   navigator("/policy/privacy");
        // }}
        >
          {" "}
          Privacy policy
        </span>
      </p>
    </div>
  );
};

export default ArchTerms;
