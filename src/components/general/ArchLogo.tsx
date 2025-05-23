import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoType = {
  type: string;
};
const ArchLogo = ({ type }: LogoType) => {
  return (
    <Link href={"/"} className="arch_logo">
      <Image
        width={0}
        height={0}
        src={"/assets/svg/Archlogo.svg"}
        alt={"logo"}
        priority

        // onClick={() => {
        //   navigator("/");

        //   closeDropdown();
        // }}
      />

      <Image
        width={0}
        height={0}
        src={type}
        alt={"Archcache"}
        priority
        // onClick={() => {
        //   closeDropdown();

        //   navigator("/");
        // }}
      />
    </Link>
  );
};

export default ArchLogo;
