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
        // onClick={() => {
        //   closeDropdown();

        //   navigator("/");
        // }}
      />
    </div>
  );
};

export default NavLogo;
