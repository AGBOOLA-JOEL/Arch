import { navmobile } from "@/data/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { useDetectClickOutside } from "react-detect-click-outside";
import { FaAngleDown } from "react-icons/fa6";
type LinksProp = {
  setLinks: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavMoblink = ({ setLinks }: LinksProp) => {
  const closeLinks = () => {
    setLinks(false);
  };
  // const linksref = useDetectClickOutside({ onTriggered: closeLinks });
  return (
    <div className="navlink_container">
      {navmobile.map((data) => {
        return (
          <div key={data.name} className="navlink_map">
            <div className="navlink_icon">
              <Image
                src={data.img}
                alt={data.name}
                width={0}
                height={0}
                priority
              />
              <Link href={data.to} onClick={closeLinks}>
                {data.name}
              </Link>
              {data.drop && <FaAngleDown />}
            </div>

            {data.drop && (
              <div className="navlink_drop">
                {data.drop.map((sub) => {
                  return <p key={sub.name}>{sub.name}</p>;
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavMoblink;
