"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDetectClickOutside } from "react-detect-click-outside";

const DashMobileNav = ({
  data,
  header,
}: {
  data: {
    name: string;
    route: string;
    linkstate: string | undefined;
  }[];
  header: string;
}) => {
  const dashdata = data;
  const [openNav, setOpenNav] = useState(false);
  const [head, setHead] = useState("");
  const closeNav = () => {
    setOpenNav(false);
  };
  const mobileref = useDetectClickOutside({ onTriggered: closeNav });
  return (
    <nav ref={mobileref} className="dash_mobilesubnav">
      <p
        onClick={() => {
          setOpenNav((prev) => !prev);
        }}
      >
        <span>{header || head}</span> <IoIosArrowDown />
      </p>

      {openNav && (
        <ul>
          {dashdata.map((data) => {
            return (
              <li key={data.name}>
                <Link
                  href={data.route}
                  onClick={() => {
                    setOpenNav(false);
                    setHead(data.name);
                  }}
                >
                  {data.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default DashMobileNav;
