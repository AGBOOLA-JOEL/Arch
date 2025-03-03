export const navprimary = [
  {
    name: "projects",
    to: "/project",
    linkstyle: "project",
  },
  {
    name: "news",
    to: "news",
    linkstyle: "news",
  },
  {
    name: "portfolios",
    to: "/portfolio",
    linkstyle: "portfolio",
  },
  {
    name: "competitions",
    to: "/competition",
    linkstyle: "competition",
  },
  {
    name: "scholarships",
    to: "/scholarship",
    linkstyle: "scholarships",
  },
];

export const navsecondary = [
  {
    name: "show rooms",
    to: "/showroom",
    linkstyle: "",
  },
  {
    name: "architectural media",
    to: "/archmedia",
    linkstyle: "",
    drop: [
      { name: "interviews", to: "/interviews" },
      { name: "podcast", to: "/podcast" },
    ],
  },
  {
    name: "comics",
    to: "/comic",
    linkstyle: "comic",
  },
  {
    name: "it placements",
    to: "/placement",
    linkstyle: "placement",
  },
  {
    name: "submit a project",
    to: "/form/submit",
    linkstyle: "submit",
  },
  {
    name: "be an architect",
    to: "/architect",
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
    img: "/assets/svg/navbar/mobnews.svg",
  },
  {
    name: "portfolios",
    to: "/all/portfolio",
    img: "/assets/svg/navbar/mobport.svg",
  },
  {
    name: "competitions",
    to: "/all/competition",
    img: "/assets/svg/navbar/mobcomp.svg",
  },
  {
    name: "scholarships",
    to: "/all/scholarships",
    img: "/assets/svg/navbar/mobsch.svg",
  },
  {
    name: "show rooms",
    to: "/all/showrooms",
    img: "/assets/svg/navbar/mobshow.svg",
  },
  {
    name: "architectural media",
    to: "",
    img: "/assets/svg/navbar/mobpod.svg",
    drop: [
      { name: "interviews", to: "/all/interviews" },
      { name: "podcast", to: "/all/podcast" },
    ],
  },
  {
    name: "comics",
    to: "/all/comic",
    img: "/assets/svg/navbar/mobcomic.svg",
  },
  {
    name: "it placements",
    to: "/all/placement",
    img: "/assets/svg/navbar/mobit.svg",
  },
  {
    name: "submit a project",
    to: "/form/submit",
    img: "/assets/svg/navbar/mobsub.svg",
  },
  {
    name: "be an architect",
    to: "",
    img: "/assets/svg/navbar/mobarc.svg",
  },
];
