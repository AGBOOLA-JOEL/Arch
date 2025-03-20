"use client";
import React from "react";
import Link from "next/link";
import { dashdata } from "@/data/dashboard.data";

const DashSidebar = () => {
  return (
    <nav className="dash_sidebar">
      <h1>Your links</h1>
      <ul className="dash_sidelinks">
        {dashdata.map((nav) => {
          return (
            <li key={nav.name}>
              <Link href={nav.route}>
                <nav.logo />
                <span>{nav.name}</span>
                {nav.notif && <span className="dash_sidenotif">2</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashSidebar;
