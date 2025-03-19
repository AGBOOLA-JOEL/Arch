"use client";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ProjectFeed from "../projects/ProjectFeed";
import ArchArrow from "../general/ArchArrow";

type HomeProjectProp = {
  header: string;
};

const HomeProject = ({ header }: HomeProjectProp) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 1012);
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Adjust number of items per slide based on screen size
  const groupSize = isMobile ? 1 : 2;
  const fakeData = [
    { id: 1, title: "Project 1" },
    { id: 2, title: "Project 2" },
    { id: 3, title: "Project 3" },
    { id: 4, title: "Project 4" },
    { id: 5, title: "Project 5" },
    { id: 6, title: "Project 6" },
    { id: 7, title: "Project 7" },
    { id: 8, title: "Project 8" },
  ];

  const sections = fakeData.reduce<{ id: number; title: string }[][]>(
    (acc, _, i) => {
      if (i % groupSize === 0) acc.push(fakeData.slice(i, i + groupSize));
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
              {section.map((project) => (
                <ProjectFeed key={project.id} />
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
