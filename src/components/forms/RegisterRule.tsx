import Link from "next/link";
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
          <Link
            href="/policy/terms"
            // onClick={() => {
            //   navigator("/policy/terms-of-use");
            // }}
          >
            Terms of use
          </Link>{" "}
          and
          <Link
            href="/policy/privacy"
            // onClick={() => {
            //   navigator("/policy/privacy");
            // }}
          >
            {" "}
            Privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterRule;
