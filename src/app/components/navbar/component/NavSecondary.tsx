// import React, { useEffect } from "react";
// import { IoArchiveOutline } from "react-icons/io5";

// import { navsecondary } from "@/app/db/components/navbar";
// import NavInput from "./NavInput";
// import Link from "next/link";

// const NavSecondary = () => {
//   return (
//     <nav className="nav_secondary">
//       {isExpanded === false && (
//         <>
//           {navsecondary.map((nav) => {
//             if (nav.drop) {
//               return (
//                 <div className="nav_secondaryarch" key={nav.name}>
//                   <div className="nav_secondaryarrow">
//                     <p>{nav.name}</p>

//                     {/* <img src={dropdown} alt="" onClick={toggleDropdown} /> */}
//                   </div>
//                   <>
//                     {displayDropdown && (
//                       <div className="nav_secondarydrop">
//                         {nav.drop.map((data) => {
//                           return (
//                             <div
//                               className="nav_secondarydroptop"
//                               key={data.name}
//                             >
//                               <p>{data.name}</p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </>
//                 </div>
//               );
//             } else {
//               return (
//                 <Link
//                   className="nav_secondarylink"
//                   href={nav.to}
//                   key={nav.name}
//                 >
//                   <div
//                     // style={{ color: seclinkColor(nav.linkstyle) }}
//                     onClick={() => {
//                       // closeDropdown();
//                     }}
//                   >
//                     <p> {nav.name}</p>
//                   </div>
//                 </Link>
//               );
//             }
//           })}
//         </>
//       )}

//       <NavInput isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
//       {isAuthenticated ? (
//         <Link className="nav_secondarylink" href="/user/userArchive">
//           {cartLength.length === 0 ? (
//             <></>
//           ) : (
//             <span className="cart_span">{cartLength.length}</span>
//           )}
//           <IoArchiveOutline size={26} />
//         </Link>
//       ) : (
//         <></>
//       )}
//     </nav>
//   );
// };

// export default NavSecondary;
"use client";
import { IoArchiveOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { navsecondary } from "@/app/db/components/navbar";
import NavInput from "./NavInput";
import Link from "next/link";
import { useState } from "react";

const NavSecondary = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <nav className="nav_sec">
      {isExpanded === false &&
        navsecondary.map((nav) => {
          if (nav.drop) {
            return (
              <div className="nav_secarch" key={nav.name}>
                <div className="nav_secarrow">
                  <p>{nav.name}</p>

                  <FaAngleDown />
                  {/* <img src={dropdown} alt="" onClick={toggleDropdown} /> */}
                </div>

                <div className="nav_secdrop">
                  {nav.drop.map((data) => {
                    return (
                      <div className="nav_secdroptext" key={data.name}>
                        <button>{data.name}</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <Link className="nav_seclink" href={nav.to} key={nav.name}>
                <div
                // style={{ color: seclinkColor(nav.linkstyle) }}
                // onClick={() => {
                //   // closeDropdown();
                // }}
                >
                  <p> {nav.name}</p>
                </div>
              </Link>
            );
          }
        })}
      <div className="nav_secinput">
        <NavInput isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* {isAuthenticated ? ( */}
      <Link href="/user/userArchive" className="nav_seccart">
        {/* {cartLength.length === 0 ? (
            <></>
          ) : (
            <span className="cart_span">{cartLength.length}</span>
          )} */}
        <span> 1</span>
        <IoArchiveOutline size={26} />
      </Link>
      {/* ) : (
        <></>
      )} */}
    </nav>
  );
};

export default NavSecondary;
