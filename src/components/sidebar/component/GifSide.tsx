import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
import ArchArrow from "../../general/ArchArrow";

const GifSide = () => {
  // page rebranded to submit a project
  return (
    <div className="gifside">
      <div className="gifside_header">
        <p>SUBMIT A PROJECT</p>
      </div>
      <div className="gifside_info">
        <div className="gifside_image">
          <Image
            src={"/assets/gifs/submit.gif"}
            alt=""
            width={0}
            height={0}
            unoptimized
          />
        </div>

        <div className="gifside_link">
          <ArchArrow text="Submit a project" route="/submit" />
        </div>
      </div>
    </div>
  );
};

export default GifSide;
