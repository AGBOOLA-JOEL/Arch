import React from "react";
type RuleProp = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleTermsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
};

const RegisterRule = ({ handleInputChange, register }: RuleProp) => {
  return (
    <div className="reg_rule">
      <div className="reg_ruleinput">
        <input
          type="checkbox"
          name="letter"
          onChange={handleInputChange}
          {...register("letter")}
        />
        <p>Subscribe to our newsletter</p>
      </div>
      <div className="reg_ruleinput">
        <input
          type="checkbox"
          name="terms"
          onChange={handleInputChange}
          {...register("terms")}
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
    </div>
  );
};

export default RegisterRule;
