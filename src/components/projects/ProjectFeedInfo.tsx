"use client";
import { IoDownloadOutline } from "react-icons/io5";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { SlLink } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { useState } from "react";

type InfoProp = {
  id: string;
  status: boolean;
};
const ProjectFeedInfo = ({ id, status }: InfoProp) => {
  const [clickedProject, setClickedProject] = useState<string | null>(null);
  return (
    <div className="project_info">
      {[
        { title: "Architects", value: `${"data.architect"}` },
        { title: "Size", value: `${"data.size"} sqm` },
        { title: "Client", value: `${"data.client"}` },
      ].map(({ title, value }) => (
        <p key={title} className="project_infotext">
          {title}: <span>{value} </span>
        </p>
      ))}

      {status ? (
        <p className="project_infotext">
          Construction Year:<span> 2000 (B)</span>
        </p>
      ) : (
        <p className="project_infotext">
          Software: <span> Revit</span>
        </p>
      )}
      <div className="project_infonav">
        <button className="project_infoadd">
          Add to archive <IoDownloadOutline />
        </button>

        <div className="project_infoshare">
          <button className="project_infoshareicon">
            <IoMdShareAlt size={35} />
          </button>
          {clickedProject === id && (
            <div className="project_infosocials">
              <TwitterShareButton
                url={""}
                title="Check out this project on ArchCache!"
              >
                <BsTwitter />
              </TwitterShareButton>
              <FacebookShareButton url={""}>
                <FaFacebookSquare />
              </FacebookShareButton>
              <EmailShareButton
                subject="View this project on ArchCache"
                url={"/"}
              >
                <MdOutlineEmail />
              </EmailShareButton>

              <SlLink />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFeedInfo;
