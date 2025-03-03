import React from "react";
import { navprimary } from "@/db/components/navbar";
import Link from "next/link";
import ArchLogo from "../general/ArchLogo";

const NavPrimary = ({}) => {
  return (
    <nav className="nav_primary">
      <div className="nav_logo">
        <ArchLogo type={"/assets/svg/ArchCache.svg"} />
      </div>

      <ul>
        {navprimary.map((data) => {
          return (
            <li key={data.name} className="nav_primarylink">
              <Link href={data.to}>{data.name}</Link>
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
