"use client";

import { Squash as HamburgerMenu } from "hamburger-react";
import NavLogo from "./component/NavLogo";
import { ImSearch } from "react-icons/im";
import { BsCart3 } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import NavSearch from "./component/NavSearch";

const NavMobile = () => {
  return (
    <nav className="nav_mobile">
      <div className="nav_mobham">
        <HamburgerMenu size={25} />

        <NavLogo />
      </div>

      <div className="nav_mobnavs">
        <div className="nav_mobtool">
          <button>
            <ImSearch />
          </button>
          <button>
            <span className="nav_mobcart">1</span>
            <BsCart3 />
          </button>
          <button>
            <RxAvatar />
          </button>
        </div>
        {/* <div className="nav_mobform">
          <button>SIGN IN</button>
          <button>JOIN</button>
        </div> */}
      </div>

      <div className="nav_mobsearch">
        <NavSearch />
      </div>
    </nav>
  );
};

export default NavMobile;
