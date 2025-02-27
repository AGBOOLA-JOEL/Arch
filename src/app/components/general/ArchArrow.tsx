import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type ArrowProp = {
  text: string;
  route: string;
  color?: "primary" | "secondary";
};
const ArchArrow = ({ text, route, color }: ArrowProp) => {
  return (
    <Link
      href={route}
      className={`arch_arrow ${color === "primary" ? "primary" : "secondary"}`}
    >
      <span>{text}</span>
      <FaArrowRight />
    </Link>
  );
};

export default ArchArrow;
