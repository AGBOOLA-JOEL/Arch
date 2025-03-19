"use client";
import React from "react";
import { navprimary } from "@/data/navbar";
import Link from "next/link";
import ArchLogo from "../general/ArchLogo";
import { usePathname } from "next/navigation";

const NavPrimary = ({}) => {
  const pathname = usePathname();
  const linkColor = (name: string) => {
    return pathname.split("/")[1] === name ? "linkcolor" : "";
  };
  return (
    <nav className="nav_primary">
      <div className="nav_logo">
        <ArchLogo type={"/assets/svg/ArchCache.svg"} />
      </div>

      <ul>
        {navprimary.map((data) => {
          return (
            <li
              key={data.name}
              className={`nav_primarylink ${linkColor(data.linkstyle)}`}
            >
              <Link href={data.to} className={linkColor(data.linkstyle)}>
                {data.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="nav_primaryform">
        <div className="nav_primaryformbtn">
          {/* {isAuthenticated ? (
            <button
              onClick={() => {
                closeDropdown();

                if (role === "USER") {
                  navigator("/user/userDashboard");
                } else if (role === "ADMIN") {
                  navigator("/admin/adminDashboard");
                } else {
                  navigator("/naverror");
                }
              }}
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => {
                navigator("/form/login");

                closeDropdown();
              }}
            >
              sign in
            </button>
          )} */}
          {/* {isAuthenticated ? ( */}
          <button
            // style={{ color: "rgba(20, 74, 116, 1)", cursor: "pointer" }}
            // onClick={signOut}
            className="nav_primaryout"
          >
            Sign Out
          </button>
          {/* ) : ( */}
          <button
            // onClick={() => {
            //   navigator("/form/join");
            //   closeDropdown();
            // }}
            className="nav_primaryjoin"
          >
            join
          </button>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};

export default NavPrimary;
