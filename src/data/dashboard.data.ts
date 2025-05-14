import { IoHomeOutline } from "react-icons/io5";
import { LiaUserCircleSolid } from "react-icons/lia";
import { FaPenToSquare } from "react-icons/fa6";
import { GoBriefcase } from "react-icons/go";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { SlInfo } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { DashSideProp } from "@/types/dashboard.type";

export const dashdata: DashSideProp = [
  {
    name: "Dashboard",
    route: "/dashboard",
    logo: IoHomeOutline,
    linkcolor: "dashboard",
  },
  {
    name: "Your profile",
    route: "/dashboard/profile",
    logo: LiaUserCircleSolid,
    linkcolor: "profile",
  },
  {
    name: "Your portfolio",
    route: "/dashboard/portfolio",
    logo: GoBriefcase,
    linkcolor: "portfolio",
  },
  {
    name: "Posts",
    route: "/dashboard/posts",
    logo: FaPenToSquare,
    linkcolor: "posts",
    notif: true,
  },
  {
    name: "Messages",
    route: "/dashboard/messages/all",
    logo: FaEnvelopeOpenText,
    linkcolor: "messages",
    notif: true,
  },
  {
    name: "Project status",
    route: "/dashboard/project/approved",
    logo: SlInfo,
    linkcolor: "project",
    notif: true,
  },
  {
    name: "Submit a Project",
    route: "/submit",
    logo: BsSend,
  },
  {
    name: "Payment history",
    route: "/dashboard/payment/approved",
    logo: FaHistory,
    notif: true,
  },
  {
    name: "Your Archive",
    route: "/dashboard/archive",
    logo: MdOutlineShoppingCart,
    linkcolor: "archive",
  },

  {
    name: "Upgrade account",
    route: "/upgrade",
    logo: FaLayerGroup,
  },
];
