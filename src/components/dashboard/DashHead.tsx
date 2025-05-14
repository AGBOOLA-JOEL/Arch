"use client";
import { dashdata } from "@/data/dashboard.data";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDetectClickOutside } from "react-detect-click-outside";
import { usePathname } from "next/navigation";

const DashHead = () => {
  const [openHead, setOpenHead] = useState(false);
  const closeHead = () => {
    setOpenHead(false);
  };
  const headref = useDetectClickOutside({ onTriggered: closeHead });

  const pathname = usePathname();
  const pathsplit =
    pathname.split("/")[2] === undefined
      ? "Dashboard"
      : `${pathname.split("/")[2]} Dashboard`;

  return (
    <div className="dashboard_head" ref={headref}>
      <p
        className="dashboard_mainnav"
        onClick={() => {
          setOpenHead((prev) => !prev);
        }}
      >
        <span>{pathsplit}</span>
        <IoIosArrowDown />
      </p>

      <nav className="dashboard_mobilenav">
        {/* <p>
          <span>Create new</span> <IoIosArrowDown />
        </p> */}

        {openHead && (
          <ul>
            {dashdata.map((data) => {
              return (
                <li key={data.name}>
                  <Link href={data.route} onClick={closeHead}>
                    {data.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default DashHead;
