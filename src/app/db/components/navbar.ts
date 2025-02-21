// import Mobproj from "/assets/svg/navbar/mobproj.svg";
// import Mobnews from "assets/svg/navbar/mobnews.svg";
// import Mobport from "assets/svg/navbar/mobport.svg";
// import Mobcomp from "assets/svg/navbar/mobcomp.svg";
// import Mobsch from "assets/svg/navbar/mobsch.svg";
// import Mobshow from "assets/svg/navbar/mobshow.svg";
// import Mobpod from "assets/svg/navbar/mobpod.svg";
// import Mobcomic from "assets/svg/navbar/mobcomic.svg";
// import Mobit from "assets/svg/navbar/mobit.svg";
// import Mobsub from "assets/svg/navbar/mobsub.svg";
// import Mobarc from "assets/svg/navbar/mobarc.svg";

export const navprimary = [
  {
    name: "projects",
    to: "/all/project",
    linkstyle: "project",
  },
  {
    name: "news",
    to: "/all/news",
    linkstyle: "news",
  },
  {
    name: "portfolios",
    to: "/all/portfolio",
    linkstyle: "portfolio",
  },
  {
    name: "competitions",
    to: "/all/competition",
    linkstyle: "competition",
  },
  {
    name: "scholarships",
    to: "/all/scholarships",
    linkstyle: "scholarships",
  },
];

export const navsecondary = [
  {
    name: "show rooms",
    to: "",
    linkstyle: "",
  },
  {
    name: "architectural media",
    to: "",
    linkstyle: "",
    drop: [
      { name: "interviews", to: "/all/interviews" },
      { name: "podcast", to: "/all/podcast" },
    ],
  },
  {
    name: "comics",
    to: "/all/comic",
    linkstyle: "comic",
  },
  {
    name: "it placements",
    to: "/all/placement",
    linkstyle: "placement",
  },
  {
    name: "submit a project",
    to: "/form/submit",
    linkstyle: "submit",
  },
  {
    name: "be an architect",
    to: "",
    linkstyle: "",
  },
];

export const navmobile = [
  {
    name: "projects",
    to: "/all/project",
    img: "/assets/svg/navbar/mobproj.svg",
  },
  {
    name: "news",
    to: "/all/news",
    img: "assets/svg/navbar/mobnews.svg",
  },
  {
    name: "portfolios",
    to: "/all/portfolio",
    img: "assets/svg/navbar/mobport.svg",
  },
  {
    name: "competitions",
    to: "/all/competition",
    img: "assets/svg/navbar/mobcomp.svg",
  },
  {
    name: "scholarships",
    to: "/all/scholarships",
    img: "assets/svg/navbar/mobsch.svg",
  },
  {
    name: "show rooms",
    to: "/all/showrooms",
    img: "assets/svg/navbar/mobshow.svg",
  },
  {
    name: "architectural media",
    to: "",
    img: "assets/svg/navbar/mobpod.svg",
    drop: [
      { name: "interviews", to: "/all/interviews" },
      { name: "podcast", to: "/all/podcast" },
    ],
  },
  {
    name: "comics",
    to: "/all/comic",
    img: "assets/svg/navbar/mobcomic.svg",
  },
  {
    name: "it placements",
    to: "/all/placement",
    img: "assets/svg/navbar/mobit.svg",
  },
  {
    name: "submit a project",
    to: "/form/submit",
    img: "assets/svg/navbar/mobsub.svg",
  },
  {
    name: "be an architect",
    to: "",
    img: "assets/svg/navbar/mobarc.svg",
  },
];
