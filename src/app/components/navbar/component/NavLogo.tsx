import Image from "next/image";
import React from "react";

const NavLogo = () => {
  return (
    <div className="nav_logo">
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
        src={"/assets/svg/ArchCache.svg"}
        alt={"Archcache"}
        priority
        // onClick={() => {
        //   closeDropdown();

        //   navigator("/");
        // }}
      />
    </div>
  );
};

export default NavLogo;
