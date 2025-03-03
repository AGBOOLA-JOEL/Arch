// import { NavLink, useLocation, useNavigate } from "react-router-dom";

// import useRole from "pages/hooks/useRole";
// import useProtectedRoute from "pages/hooks/useProtectedRoute";
// import axios from "axios";

// import dropdown from "assets/svg/down.svg";
// import { mainContext } from "pages/hooks/Context";

// import { useDetectClickOutside } from "react-detect-click-outside";
import NavMobile from "./NavMobile";
import NavPrimary from "./NavPrimary";
import NavSecondary from "./NavSecondary";
// import NavMobile from "./component/NavMobile";

const Navbar = () => {
  // const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  return (
    <div className="nav_container">
      <div className="nav_desktop">
        <NavPrimary />
        <NavSecondary />
      </div>
      <div className="nav_mobile">
        <NavMobile />
      </div>
    </div>
  );
};

export default Navbar;
