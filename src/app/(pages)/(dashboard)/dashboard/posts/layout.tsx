import DashNavbar from "@/components/dashboard/DashNavbar";
// import DashNavMobile from "@/components/dashboard/DashNavMobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dashdata = [
    {
      name: "Create New",
      route: "/dashboard/posts",
      linkstate: undefined,
    },
    // {
    //   name: "Published Posts",
    //   route: "/dashboard/posts/published",
    //   linkstate: "published",
    // },
    // {
    //   name: "Draft",
    //   route: "/dashboard/posts/draft",
    //   linkstate: "draft",
    // },
    // {
    //   name: "Pending posts",
    //   route: "/dashboard/posts/pending",
    //   linkstate: "pending",
    // },
  ];
  return (
    <div className="dash_posts">
      <div className="dash_postsnav">
        <DashNavbar data={dashdata} />
        {/* <DashNavMobile data={dashdata} /> */}
      </div>
      <div className="dash_postschild">{children}</div>
    </div>
  );
}
