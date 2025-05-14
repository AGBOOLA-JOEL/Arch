import { IoArchive } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbUserExclamation } from "react-icons/tb";
import { LuUserRoundCheck } from "react-icons/lu";
import { GoProject } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";

const Page = () => {
  return (
    <div className="dash_stat">
      <div className="dash_statmap">
        {[
          { icon: <TfiWrite />, title: "Your Posts", value: 3 },
          { icon: <BsFillPostcardFill />, title: "Approved Posts", value: 3 },
          { icon: <GoProject />, title: "Published Projects", value: 3 },
          { icon: <BsFillPostcardFill />, title: "Published Posts", value: 3 },
          { icon: <LuUserRoundCheck />, title: "Verified Users", value: 3 },
          { icon: <TbUserExclamation />, title: "Unverified  Users", value: 3 },
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
