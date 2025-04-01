"use client";

import { Squash as HamburgerMenu } from "hamburger-react";
import ArchLogo from "../general/ArchLogo";
import { ImSearch } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import NavSearch from "./component/NavSearch";
import NavMoblink from "./component/NavMoblink";
import NavAccount from "./component/NavAccount";
import { useAuthselectors } from "@/_lib/store/auth-store";
import Link from "next/link";
import { useState } from "react";

const NavMobile = () => {
  const authenticated = useAuthselectors.use.loggedIn();
  const [account, setAccount] = useState(false);
  const [links, setLinks] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <nav className="nav_mobile">
      <div className="nav_mobham">
        <HamburgerMenu
          size={25}
          toggled={links}
          onToggle={(toggle) => {
            if (toggle) {
              setLinks(true);
              setAccount(false);
            } else {
              setLinks(false);
            }
          }}
        />

        <div className="nav_logo">
          <ArchLogo type={"/assets/svg/ArchCache.svg"} />
        </div>
      </div>

      <div className="nav_mobnavs">
        {authenticated ? (
          <div className="nav_mobtool">
            <button
              onClick={() => {
                setLinks(false);
                setSearch((prev) => !prev);
              }}
            >
              <ImSearch />
            </button>
            <Link href="/dashboard/archive">
              <span className="nav_mobcart">1</span>
              <BsCart3 />
            </Link>
            <button
              onClick={() => {
                setLinks(false);
                setAccount((prev) => !prev);
              }}
            >
              <RxAvatar />
            </button>
          </div>
        ) : (
          <div className="nav_mobform">
            <Link href={"/login"}>SIGN IN</Link>
            <Link href={"/register"}>JOIN</Link>
          </div>
        )}
      </div>

      {search && (
        <div className="nav_mobsearch">
          <NavSearch setSearch={setSearch} />
        </div>
      )}

      {links && (
        <div className="nav_moblinks">
          <NavMoblink setLinks={setLinks} />
        </div>
      )}

      {account && (
        <div className="nav_mobaccount">
          <NavAccount setAccount={setAccount} />
        </div>
      )}
    </nav>
  );
};

export default NavMobile;
