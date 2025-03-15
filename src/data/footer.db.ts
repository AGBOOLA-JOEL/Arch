import { FooterProp } from "@/types/footer.type";
import { v4 as uuid } from "uuid";

export const footerTwo: FooterProp = [
  {
    id: uuid(),
    name: "Contact Us",
    url: "/contact/select",
  },
  {
    id: uuid(),
    name: "Account issues",
    url: "/contact/general",
  },
  {
    id: uuid(),
    name: "Terms of use",
    url: "/policy/terms-of-use",
  },
  {
    id: uuid(),
    name: "Privacy policy",
    url: "/policy/privacy",
  },
  {
    id: uuid(),
    name: "Advertise",
    url: "/",
  },
  {
    id: uuid(),
    name: "Work @ Archcache",
    url: "/",
  },
];

export const footerThree: FooterProp = [
  {
    id: uuid(),
    name: "Showroom",
    url: "/",
  },
  {
    id: uuid(),
    name: "Architectural videos",
    url: "/",
  },
  {
    id: uuid(),
    name: "IT placements",
    url: "/all/placement",
  },
  {
    id: uuid(),
    name: "Job listings",
    url: "/",
  },
  {
    id: uuid(),
    name: "Submit a project",
    url: "form/submit",
  },
  {
    id: uuid(),
    name: "Admin area",
    url: "/admin/adminDashboard",
  },
];

export const footerFour: FooterProp = [
  {
    id: uuid(),
    name: "Projects",
    url: "/all/project",
  },
  {
    id: uuid(),
    name: "News",
    url: "/all/news",
  },
  {
    id: uuid(),
    name: "Portfolios",
    url: "/all/portfolio",
  },
  {
    id: uuid(),
    name: "Competitions",
    url: "/all/competition",
  },
  {
    id: uuid(),
    name: "Scholarships",
    url: "/all/scholarships",
  },
];
