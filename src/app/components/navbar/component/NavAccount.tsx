import React from "react";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";

const NavAccount = () => {
  return (
    <div className="nav_mobacc">
      <button>
        <RxAvatar />
        Your Account
      </button>
      <button>
        <RiLogoutBoxLine />
        Logout
      </button>
    </div>
  );
};

export default NavAccount;
