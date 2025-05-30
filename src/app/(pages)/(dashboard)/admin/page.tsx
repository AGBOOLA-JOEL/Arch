"use client";
import { IoArchive } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbUserExclamation } from "react-icons/tb";
import { LuUserRoundCheck } from "react-icons/lu";
import { GoProject } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";
import { useAnalyticsProject, useAnalyticsUser } from "@/_hooks/useAnalytics";
import { useNews, useNewsUser } from "@/_hooks/useNews";

const Page = () => {
  const { userAnalytics } = useAnalyticsUser();
  const { projectsAnalytics } = useAnalyticsProject();
  const { userNewsCount } = useNewsUser();
  const { newsCount } = useNews();

  const unverifiedUser =
    userAnalytics?.totalUsers - userAnalytics?.verifiedUsers;
  return (
    <div className="dash_stat">
      <div className="dash_statmap">
        {[
          { icon: <TfiWrite />, title: "Your Posts", value: userNewsCount | 0 },
          {
            icon: <BsFillPostcardFill />,
            title: "Published Posts",
            value: newsCount | 0,
          },
          // {
          //   icon: <BsFillPostcardFill />,
          //   title: "Approved Posts",
          //   value: newsCount | 0,
          // },
          {
            icon: <GoProject />,
            title: "Published Projects",
            value: projectsAnalytics?.approvedProjects | 0,
          },
          {
            icon: <GoProject />,
            title: "Rejected Projects",
            value: projectsAnalytics?.rejectedProjects | 0,
          },
          {
            icon: <GoProject />,
            title: "Pending Projects",
            value: projectsAnalytics?.pendingProjects | 0,
          },
          {
            icon: <GoProject />,
            title: "Premium Projects",
            value: projectsAnalytics?.premiumProjects | 0,
          },
          {
            icon: <GoProject />,
            title: "Free Projects",
            value: projectsAnalytics?.freeProjects | 0,
          },

          {
            icon: <LuUserRoundCheck />,
            title: "Verified Users",
            value: userAnalytics?.verifiedUsers | 0,
          },
          {
            icon: <TbUserExclamation />,
            title: "Unverified  Users",
            value: unverifiedUser | 0,
          },
        ].map(({ icon, title, value }) => (
          <div key={title} className="dash_statdata">
            {icon}
            <p>
              <span>{title}</span>
              <span>{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
