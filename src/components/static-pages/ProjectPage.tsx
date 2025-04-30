"use client";
import FeedDropdown from "@/components/feed/FeedDropdown";
import ArchPagination from "@/components/general/ArchPagination";
import ProjectFeed from "@/components/projects/ProjectFeed";
import { useState } from "react";
import FeedCategory from "../feed/FeedCategory";
import FeedFilter from "../feed/FeedFilter";
import FeedSearch from "../feed/FeedSearch";

const ProjectPage = ({ initialProjects }: { initialProjects: any[] }) => {
  const [value, setValue] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState(initialProjects);
  return (
    <div className="projects_feed">
      <div className="projects_feedheader">
        <FeedCategory />

        <FeedDropdown value={value} setValue={setValue} title={"Area"} />
        <FeedDropdown value={value} setValue={setValue} title={"Year"} />
        <FeedFilter value={filter} setValue={setFilter} title={"All Filter"} />
        <FeedSearch setValue={setSearch} />
        <FeedDropdown value={value} setValue={setValue} title={"Type"} />

        {/* <FeedDropdown value={value} setValue={setValue} title={"Architects"} /> */}
      </div>

      <div className="projects_feeddisplay">
        {projects.map((data) => {
          return (
            <div key={data?.projectId}>
              <ProjectFeed data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPage;
