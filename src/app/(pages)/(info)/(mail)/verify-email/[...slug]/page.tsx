"use client";
import { useForms } from "@/_hooks/useForms";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyMail = () => {
  const navigate = useRouter();

  const params = useParams();
  const tokenid = (params?.slug as string[])?.[0];
  const userid = (params?.slug as string[])?.[1];

  const { verifymailMutation } = useForms();

  useEffect(() => {
    const verify = () => {
      verifymailMutation.mutate({ userid, tokenid });
    };

    verify();
  }, [tokenid, userid]);

  const status = () => {
    if (verifymailMutation.isSuccess) {
      return "Verified successfully";
    } else if (verifymailMutation.isError) {
      return "Error occurred while verifying account";
    } else {
      return "Awaiting confirmation";
    }
  };

  return (
    <div className="info_verifyemail">
      <div className="info_verifyemail__container">
        <div className="info_verifyemail__content">
          <h1 className="info_verifyemail__title">Email Verification</h1>
          <p
            className={`info_verifyemail__status ${
              verifymailMutation.isSuccess
                ? "info_verifyemail__status--success"
                : verifymailMutation.isError
                ? "info_verifyemail__status--error"
                : "info_verifyemail__status--pending"
            }`}
          >
            {status()}
          </p>
          <div className="info_verifyemail__image-wrapper">
            <Image
              priority
              src={"/assets/images/mailinfo.jpg"}
              alt={"Mail verification illustration"}
              width={0}
              height={0}
              sizes={"100vw"}
              className="info_verifyemail__image"
            />
          </div>
        </div>

        {verifymailMutation.isError && (
          <button
            className="info_verifyemail__button"
            onClick={() => {
              //ask for api to request new verification link
              //   navigate.push("/check-mail");
            }}
          >
            Request Verification Link
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyMail;
