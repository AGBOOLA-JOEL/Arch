"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckMail = () => {
  const params = useParams();
  const route = (params?.slug as string[])?.[0];
  const navigate = useRouter();
  const [name, setName] = useState("");
  useEffect(() => {
    if (route === "register") {
      setName("verification");
      setTimeout(() => {
        navigate.push("/login");
      }, 5000);
    } else if (route === "forgot") {
      setName("password reset");
      setTimeout(() => {
        navigate.push("/");
      }, 5000);
    }
  }, [navigate, name, route]);
  return (
    <div className="info_verifyemail">
      <div className="info_verifyemail__container">
        <div className="info_verifyemail__content">
          <h1 className="info_verifyemail__title">
            Check your mail for {name} link
          </h1>
          <div className="info_verifyemail__image-wrapper">
            <Image
              priority
              src={"/assets/images/Checkmail.jpg"}
              alt={"mailimage"}
              width={20}
              height={20}
              sizes={"100vw"}
              className="info_verifyemail__image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
