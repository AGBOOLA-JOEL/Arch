import React from "react";
type RuleProp = {
  handleNewsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTermsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterRule = ({ handleNewsChange, handleTermsChange }: RuleProp) => {
  return (
    <div className="reg_rule">
      <div className="reg_ruleinput">
        <input type="checkbox" name="news" onChange={handleNewsChange} />
        <p>Subscribe to our newsletter</p>
      </div>
      <div className="reg_ruleinput">
        <input type="checkbox" name="terms" onChange={handleTermsChange} />

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
