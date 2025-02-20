"use client";
import { IoArchiveOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { navsecondary } from "@/app/db/components/navbar";

import Link from "next/link";
import { useGenstore } from "@/app/lib/store/general-store";
import NavInput from "./component/NavInput";

const NavSecondary = () => {
  const toggle = useGenstore((state) => state.toggle);

  return (
    <nav className="nav_sec">
      {toggle === false &&
        navsecondary.map((nav) => {
          if (nav.drop) {
            return (
              <div className="nav_secarch" key={nav.name}>
                <div className="nav_secarrow">
                  <p>{nav.name}</p>

                  <FaAngleDown />
                  {/* <img src={dropdown} alt="" onClick={toggleDropdown} /> */}
                </div>

                <div className="nav_secdrop">
                  {nav.drop.map((data) => {
                    return (
                      <div className="nav_secdroptext" key={data.name}>
                        <button>{data.name}</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <Link className="nav_seclink" href={nav.to} key={nav.name}>
                <div
                // style={{ color: seclinkColor(nav.linkstyle) }}
                // onClick={() => {
                //   // closeDropdown();
                // }}
                >
                  <p> {nav.name}</p>
                </div>
              </Link>
            );
          }
        })}
      <div className="nav_secinput">
        <NavInput />
      </div>

      {/* {isAuthenticated ? ( */}
      <Link href="/user/userArchive" className="nav_seccart">
        {/* {cartLength.length === 0 ? (
            <></>
          ) : (
            <span className="cart_span">{cartLength.length}</span>
          )} */}
        <span> 1</span>
        <IoArchiveOutline size={26} />
      </Link>
      {/* ) : (
        <></>
      )} */}
    </nav>
  );
};

export default NavSecondary;
