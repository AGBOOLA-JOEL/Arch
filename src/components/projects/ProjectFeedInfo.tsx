"use client";
import { IoDownloadOutline } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import { useState } from "react";
import { ProjectShare } from "./ProjectShare";
import { useCart } from "@/_hooks/useCart";

type InfoProp = {
  id: string;
  status: boolean;
  data: any;
};
const ProjectFeedInfo = ({ id, status, data }: InfoProp) => {
  const [isClicked, setIsClicked] = useState<string | null>(null);
  const shareClicked = isClicked === data?.projectId;
  const { addToCart } = useCart();
  return (
    <div className="project_info">
      <p className="project_infotext">
        Architects :
        <span>
          {"   " +
            data?.architect?.map((data: any) => {
              return data;
            })}
        </span>
      </p>
      <p className="project_infotext">
        Size :<span>{data?.size}</span>
      </p>
      <p className="project_infotext">
        Client :<span>{data?.client}</span>
      </p>

      {status ? (
        <p className="project_infotext">
          Construction Year:<span> 2000 {status ? "(B)" : "(P)"}</span>
        </p>
      ) : (
        <p className="project_infotext">
          Software:
          <span>
            {` ${data?.softwares?.map((data: any) => {
              return data;
            })}`}
          </span>
        </p>
      )}
      <div className="project_infonav">
        <button
          className="project_infoadd"
          onClick={(e) => {
            e.preventDefault();
            addToCart.mutate(data?.projectId);
          }}
        >
          Add to archive <IoDownloadOutline />
        </button>

        <div className="project_infoshare">
          <button
            className="project_infoshareicon"
            onClick={() => {
              setIsClicked(data?.projectId);
            }}
          >
            <IoMdShareAlt size={35} />
          </button>
          {shareClicked && <ProjectShare data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectFeedInfo;
