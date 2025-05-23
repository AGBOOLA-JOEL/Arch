"use client";
import React from "react";
import { navprimary } from "@/data/navbar";
import Link from "next/link";
import ArchLogo from "../general/ArchLogo";
import { usePathname } from "next/navigation";

import useModalStore from "@/_lib/store/modal-store";
import { useUser } from "@/_hooks/useUser";
import { useSession } from "next-auth/react";
const NavPrimary = ({}) => {
  const { user } = useUser();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const linkColor = (name: string) => {
    return pathname.split("/")[1] === name ? "linkcolor" : "";
  };
  const roleroute = () => {
    if (session?.user.role === "ADMIN") {
      return "/admin";
    } else if (session?.user.role === "USER") {
      return "/dashboard";
    } else {
      return "/login";
    }
  };

  const { openModal } = useModalStore();
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
          {status === "authenticated" ? (
            <Link href={roleroute()} className="nav_primarydash">
              Dashboard
              {/* {user?.role} */}
            </Link>
          ) : (
            <Link href={"/login"} className="nav_primarydash">
              sign in
            </Link>
          )}

          {status === "authenticated" ? (
            <button
              className="nav_primaryout"
              onClick={() => {
                openModal("logout");
              }}
            >
              sign out
            </button>
          ) : (
            <Link href="/register" className="nav_primaryjoin">
              join
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavPrimary;
