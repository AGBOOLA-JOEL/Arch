type TermProp = {
  name: string;
  register: any;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ArchTerms = ({ name, register }: TermProp) => {
  return (
    <div className="arch_terms">
      <input
        type="checkbox"
        name={name}
        // onChange={onChange}
        {...register(name)}
      />

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
