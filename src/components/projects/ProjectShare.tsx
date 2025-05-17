import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { SlLink } from "react-icons/sl";

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { copyToClipBoard } from "@/_utils/copytoclipboard";
import { useGenselectors } from "@/_lib/store/general-store";

export const ProjectShare = ({ data }: any) => {
  const openToast = useGenselectors.use.openToast();
  return (
    <div className="project_infosocials">
      <TwitterShareButton
        url={`${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/projects/${
          data?.projectId
        }/${data?.premium === true ? "premium" : "free"}`}
        title="Explore innovative Architectural solutions with ArchCache"
      >
        <BsTwitter />
      </TwitterShareButton>
      <FacebookShareButton
        url={`${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/projects/${
          data?.projectId
        }/${data?.premium === true ? "premium" : "free"}`}
        title="Archcache Project"
      >
        <FaFacebookSquare />
      </FacebookShareButton>
      <EmailShareButton
        subject="View this project on ArchCache"
        url={`${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/projects/${
          data?.projectId
        }/${data?.premium === true ? "premium" : "free"}`}
      >
        <MdOutlineEmail />
      </EmailShareButton>

      <SlLink
        onClick={() => {
          copyToClipBoard(
            `${process.env.NEXT_PUBLIC_API_FRONTEND_URL}/projects/${
              data?.projectId
            }/${data?.premium === true ? "premium" : "free"}`,
            openToast
          );
        }}
      />
    </div>
  );
};
