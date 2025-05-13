"use client";
import { IoArchiveOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { navsecondary } from "@/data/navbar";
import Link from "next/link";
import NavInput from "./component/NavInput";
import { useNavselectors } from "@/_lib/store/nav-store";
import { usePathname } from "next/navigation";
import { useAuthselectors } from "@/_lib/store/auth-store";

const NavSecondary = () => {
  const toggle = useNavselectors.use.toggle();
  const cartLength = useNavselectors.use.cartLength();
  const authenticated = useAuthselectors.use.loggedIn();

  const pathname = usePathname();
  const linkColor = (name: string) => {
    return pathname.split("/")[1] === name ? "linkcolor" : "";
  };
  return (
    <nav className="nav_sec">
      {toggle === false &&
        navsecondary.map((nav) => {
          return (
            <div className="nav_secarch" key={nav.name}>
              <div className="nav_secarrow">
                <Link href={nav.to} className={linkColor(nav.linkstyle)}>
                  {nav.name}
                </Link>
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
      {authenticated && (
        <Link href="/dashboard/archive" className="nav_seccart">
          {cartLength && cartLength > 0 ? <span>{cartLength}</span> : ""}

          <IoArchiveOutline size={26} />
        </Link>
      )}
    </nav>
  );
};

export default NavSecondary;
