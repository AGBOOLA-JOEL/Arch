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
    url: "/policy/terms",
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
    url: "/showroom",
  },
  {
    id: uuid(),
    name: "Architectural videos",
    url: "/archmedia",
  },
  {
    id: uuid(),
    name: "IT placements",
    url: "/placement",
  },
  {
    id: uuid(),
    name: "Job listings",
    url: "/",
  },
  {
    id: uuid(),
    name: "Submit a project",
    url: "/submit",
  },
  {
    id: uuid(),
    name: "Admin area",
    url: "/admin",
  },
];

export const footerFour: FooterProp = [
  {
    id: uuid(),
    name: "Projects",
    url: "/projects",
  },
  {
    id: uuid(),
    name: "News",
    url: "/news",
  },
  {
    id: uuid(),
    name: "Portfolios",
    url: "/portfolio",
  },
  {
    id: uuid(),
    name: "Competitions",
    url: "/competition",
  },
  {
    id: uuid(),
    name: "Scholarships",
    url: "/scholarship",
  },
];
