import { navmobile } from "@/app/db/components/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";

const NavMoblink = () => {
  return (
    <div className="navlink_container">
      {navmobile.map((data) => {
        return (
          <div key={data.name} className="navlink_map">
            <div className="navlink_icon">
              <Image src={data.img} alt={data.name} width={0} height={0} />
              <Link href={data.to}>{data.name}</Link>
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
