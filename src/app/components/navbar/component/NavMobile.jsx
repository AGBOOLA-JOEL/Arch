import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navmobile.css";
import { Mobdrop } from "assets/svg/Mobdrop";
import logo from "assets/svg/logo.svg";
import cache from "assets/svg/ArchCache.svg";
import { Squash as HamburgerMenu } from "hamburger-react";
import { navmobileprimary } from "data/navmobile";
import { useDetectClickOutside } from "react-detect-click-outside";
import { ProfileIcon } from "assets/svg/ProfileIcon";
import { ProfileCart } from "assets/svg/ProfileCart";
import { ProfileSearch } from "assets/svg/ProfileSearch";
import { ProfileExport } from "assets/svg/ProfileExport";
import { ProfileCancel } from "assets/svg/ProfileCancel";
import { ProfileSend } from "assets/svg/ProfileSend";
import { SmallSearch } from "assets/svg/SmallSearch";

const NavMobile = ({
  navigator,
  isAuthenticated,
  role,
  signOut,
  cartLength,
}) => {
  const [nav, setNav] = useState(false);
  const [drop, setDrop] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const closeNav = () => {
    setNav(false);
  };

  const closeProfile = () => {
    setOpenProfile(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeNav });
  useEffect(() => {
    const handleScroll = () => {
      setNav(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const profileref = useDetectClickOutside({ onTriggered: closeProfile });
  return (
    <nav className="mobile_nav" ref={(ref, profileref)}>
      <div className="mobilenav_toggle">
        <HamburgerMenu
          size={25}
          toggled={nav}
          onToggle={(toggled) => {
            if (toggled) {
              setNav(true);
              setOpenProfile(false);
              setOpenSearch(false);
            } else {
              setNav(false);
            }
          }}
        />
      </div>
      <div className="mobilenav_logo">
        <img
          src={logo}
          alt=""
          onClick={() => {
            navigator("/");
          }}
          style={{ cursor: "pointer" }}
        />
        <img
          src={cache}
          alt=""
          onClick={() => {
            navigator("/");
          }}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="mobilenav_form">
        {isAuthenticated ? (
          <>
            <span
              className="mobilenav_formlogin"
              onClick={() => {
                setOpenSearch(!openSearch);
                setOpenProfile(false);
                setNav(false);
              }}
            >
              <ProfileSearch />
            </span>
            <span
              className="mobilenav_formlogin"
              onClick={() => {
                navigator("/user/userArchive");
              }}
            >
              {cartLength.length === 0 ? (
                <></>
              ) : (
                <span className="mobilecart_span">{cartLength.length}</span>
              )}
              <ProfileCart />
            </span>
            <span
              className="mobilenav_formlogin"
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenSearch(false);
                setNav(false);
              }}
            >
              <ProfileIcon />
            </span>
          </>
        ) : (
          <>
            <p
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setNav(false);
                navigator("/form/login");
              }}
            >
              SIGN IN
            </p>
            <p
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setNav(false);
                navigator("/form/join");
              }}
            >
              JOIN
            </p>
          </>
        )}
        {}
      </div>

      <div
        className={nav === true ? "mobilenav_content" : "mobilenav_contentopen"}
      >
        {navmobileprimary.map((data) => {
          if (data.drop) {
            return (
              <div key={data.name} onClick={() => setDrop(!drop)}>
                <div className="mobile_navinfo">
                  <img src={data.img} alt={data.name} />
                  <p>{data.name}</p>
                  <span
                    className={drop ? "mob_droprot" : "mob_drop"}
                    onClick={() => setDrop(!drop)}
                  >
                    <Mobdrop />
                  </span>
                </div>

                {drop && (
                  <div className="mobile_navdrop">
                    {data.drop.map((sub) => (
                      <NavLink
                        className={"mob_link"}
                        to={sub.to}
                        key={sub.name}
                      >
                        <p>{sub.name}</p>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <NavLink className={"mob_link"} to={data.to} key={data.name}>
                <div className="mobile_navinfo" onClick={() => setNav(false)}>
                  <img src={data.img} alt={data.name} />
                  <p>{data.name}</p>
                </div>
              </NavLink>
            );
          }
        })}
      </div>
      {openProfile && (
        <div className="mobilenav_account">
          <button className="mobilenav_accountchild first">
            <ProfileIcon />

            <span
              style={{ color: "rgba(102, 102, 102, 1)" }}
              onClick={() => {
                navigator("/user/userDashboard");
                setOpenProfile(false);
              }}
            >
              Your Account
            </span>
          </button>
          <button className="mobilenav_accountchild ">
            {/* <ProfileExport /> */}
            <img
              src={require("assets/svg/profileexp.png")}
              alt=""
              width={23}
              height={22}
            />
            <span
              style={{ color: "rgba(102, 102, 102, 1)" }}
              onClick={() => {
                signOut();
                setOpenProfile(false);
              }}
            >
              Logout
            </span>
          </button>
        </div>
      )}
      {openSearch && (
        <div className="mobilenav_search">
          <span className="mobilenav_smallsearch">
            <SmallSearch />
          </span>

          {/* <ProfileSearch /> */}
          <input type="text" placeholder="Search for anything.." />
          <span
            onClick={() => {
              setOpenSearch(false);
            }}
          >
            <ProfileCancel />
          </span>

          <span className="mobilenav_send">
            <ProfileSend />
          </span>
        </div>
      )}
    </nav>
  );
};

export default NavMobile;
