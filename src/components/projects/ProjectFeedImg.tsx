"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiBuilding2Fill } from "react-icons/ri";

type FeedImgProp = {
  id: string;
  data: any;
};
const ProjectFeedImg = ({ id, data }: FeedImgProp) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  // const nonCoverImages = data?.images?.filter((img: any) => !img.coverImage);

  return (
    <>
      <div
        className="project_feedmainimg"
        onMouseEnter={() => setHoveredProject(id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        <Link
          href={`/projects/${data?.projectId}/${
            data?.premium === true ? "premium" : "free"
          }`}
        >
          <Image
            priority
            src={data?.coverImage || "/assets/images/noimage.png"}
            alt={"project-coverimage"}
            width={0}
            height={0}
            sizes={"100vw"}
          />
        </Link>
      </div>
      {/* <div className="project_feedsubimgmap">
        {nonCoverImages.slice(0, 3).map((img: any) => (
          <div className="project_feedsubimg" key={img.imageUrl}>
            <Image
              src={img.imageUrl}
              alt="Project image"
              width={100}
              height={100}
              sizes={"100vw"}
            />
          </div>
        ))}
        {nonCoverImages.length > 3 && (
          <div className="project_feedsubcount">
            <Link href={"/"}>+{3}</Link>
          </div>
        )}
      </div> */}
      {hoveredProject === id && (
        <div className="project_feedhover">
          <h1>
            <RiBuilding2Fill /> {data?.category}
          </h1>
          <p>{data?.location}</p>
          <p>{data?.user.user}</p>
        </div>
      )}
    </>
  );
};

export default ProjectFeedImg;
