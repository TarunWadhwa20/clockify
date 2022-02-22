import React, { useEffect } from "react";
import TrackRecord from "./TrackRecord";

const Projects = (props) => {
  const { saveProject, setSaveProject, isResume, setIsResume } = props;
  useEffect(() => {
    setIsResume(false);
  }, [setIsResume]);
  return (
    <div className="container">
      <div className="row my-5">
        <h2>Projects</h2>
        <div className="my-2">
          <TrackRecord
            saveProject={saveProject}
            setSaveProject={setSaveProject}
            resume={isResume}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
