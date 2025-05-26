"use client";

import { Squash as HamburgerMenu } from "hamburger-react";
import ArchLogo from "../general/ArchLogo";
import { ImSearch } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import NavSearch from "./component/NavSearch";
import NavMoblink from "./component/NavMoblink";
import NavAccount from "./component/NavAccount";

import Link from "next/link";
import { useState } from "react";
import { useNavselectors } from "@/_lib/store/nav-store";
import { useSession } from "next-auth/react";

const NavMobile = () => {
  const cartLength = useNavselectors.use.cartLength();
  const [account, setAccount] = useState(false);
  const [links, setLinks] = useState(false);
  const [search, setSearch] = useState(false);

  const { data: session, status } = useSession();
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
        {status === "authenticated" ? (
          <div className="nav_mobtool">
            <button
              onClick={() => {
                setLinks(false);
                setSearch((prev) => !prev);
              }}
            >
              <ImSearch />
            </button>

            {session?.user.role === "USER" && (
              <Link href="/dashboard/archive">
                {/* {cartLength && (
                  <span className="nav_mobcart"> {cartLength}</span>
                )} */}
                {cartLength && cartLength > 0 ? (
                  <span className="nav_mobcart">{cartLength}</span>
                ) : (
                  ""
                )}
                <BsCart3 />
              </Link>
            )}

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
          <NavAccount setAccount={setAccount} session={session} />
        </div>
      )}
    </nav>
  );
};

export default NavMobile;
