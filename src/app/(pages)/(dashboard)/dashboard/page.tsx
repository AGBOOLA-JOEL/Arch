import { IoArchive } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";

const Page = () => {
  return (
    <div className="dash_stat">
      <div className="dash_statmap">
        {[
          { icon: <IoArchive />, title: "Your approved Projects", value: 3 },
          { icon: <BsFillPostcardFill />, title: "Your posts", value: 3 },
          { icon: <IoMdMailUnread />, title: "Unread messages", value: 3 },
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
