"use client";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ProjectFeed from "../projects/ProjectFeed";
import ArchArrow from "../general/ArchArrow";

type HomeProjectProp = {
  header: string;
  data: any[];
};

const HomeProject = ({ header, data }: { header: string; data: any[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 1012);
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Adjust number of items per slide based on screen size
  const groupSize = isMobile ? 1 : 2;
  const apiData = data;

  const sections = apiData.reduce<{ id: number; title: string }[][]>(
    (acc, _, i) => {
      if (i % groupSize === 0) acc.push(apiData.slice(i, i + groupSize));
      return acc;
    },
    []
  );

  // Ensure only 4 slides for mobile
  const displayedSections = isMobile ? sections.slice(0, 4) : sections;

  return (
    <div className="home_project">
      <div className="home_projecthead">
        <p>{header}</p>
      </div>
      <div className="home_projectcar">
        <Carousel
          showArrows={false}
          showStatus={false}
          infiniteLoop={true}
          stopOnHover={true}
          showThumbs={false}
          transitionTime={700}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={200}
        >
          {displayedSections.map((section, index) => (
            <div className="home_projectfeed" key={index}>
              {section.map((project: any) => (
                <ProjectFeed key={project?.projectId} data={project} />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
      <div className="home_projectarrow">
        <ArchArrow text="All projects" color="primary" route="/projects" />
      </div>
    </div>
  );
};

export default HomeProject;
