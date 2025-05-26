// "use client";
// import ProjectFeed from "@/components/projects/ProjectFeed";
// import { useEffect, useRef, useState } from "react";
// import ProjectSearch from "../projects/ProjectSearch";
// import ArchSpinner from "../general/ArchSpinner";

// const ProjectPage = ({ initialProjects }: { initialProjects: any[] }) => {
//   const [projects, setProjects] = useState(initialProjects);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1); // Start with initial page size
//   const handleLoadMore = () => {
//     setPage((prev) => prev + 1);
//   };
//   return (
//     <div className="projects_feed">
//       <div className="projects_feedheader">
//         <ProjectSearch
//           data={projects}
//           setData={setProjects}
//           setIsLoading={setIsLoading}
//           page={page}
//         />
//       </div>

//       {isLoading ? (
//         <div className="project_feedspinner">
//           <ArchSpinner />
//         </div>
//       ) : (
//         <div className="projects_feeddisplay">
//           {projects.map((data) => {
//             return (
//               <div key={data?.projectId}>
//                 <ProjectFeed data={data} />
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {!isLoading && (
//         <div style={{ textAlign: "center", padding: "1rem" }}>
//           <button onClick={handleLoadMore} className="load-more-button">
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectPage;

"use client";

import { useState } from "react";
import ProjectFeed from "@/components/projects/ProjectFeed";
import ProjectSearch from "../projects/ProjectSearch";
import ArchSpinner from "../general/ArchSpinner";
import ArchLoadmore from "../general/ArchLoadmore";

const ProjectPage = ({ initialProjects }: { initialProjects: any[] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="projects_feed">
      <div className="projects_feedheader">
        <ProjectSearch
          data={projects}
          setData={setProjects}
          setIsLoading={setIsLoading}
          page={page}
        />
      </div>

      <div className="projects_feeddisplay">
        {projects.map((data) => (
          <div key={data?.projectId}>
            <ProjectFeed data={data} />
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="project_feedspinner">
          <ArchSpinner />
        </div>
      )}

      <ArchLoadmore onLoadMore={handleLoadMore} isLoading={isLoading} />
      {/* {!isLoading && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProjectPage;
