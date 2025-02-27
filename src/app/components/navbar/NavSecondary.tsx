"use client";
import { IoArchiveOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { navsecondary } from "@/app/db/components/navbar";

import Link from "next/link";
import { useGenselectors, useGenstore } from "@/app/lib/store/general-store";
import NavInput from "./component/NavInput";

const NavSecondary = () => {
  const toggle = useGenselectors.use.toggle();

  return (
    <nav className="nav_sec">
      {toggle === false &&
        navsecondary.map((nav) => {
          return (
            <div className="nav_secarch" key={nav.name}>
              <div className="nav_secarrow">
                <Link href={nav.to}>{nav.name}</Link>
                {nav.drop && <FaAngleDown />}
              </div>
              {/* {nav.drop && (
                <div className="nav_secdrop">
                  {nav.drop.map((data) => {
                    return (
                      <div className="nav_secdroptext" key={data.name}>
                        <button>{data.name}</button>
                      </div>
                    );
                  })}
                </div>
              )} */}
            </div>
          );
        })}
      <div className="nav_secinput">
        <NavInput />
      </div>

      <Link href="/user/userArchive" className="nav_seccart">
        <span> 1</span>
        <IoArchiveOutline size={26} />
      </Link>
    </nav>
  );
};

export default NavSecondary;
