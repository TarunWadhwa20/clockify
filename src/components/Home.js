import React, { useState, useRef, useEffect } from "react";
import ControlButtons from "./ControlButtons";
import NewProject from "./NewProject";
import Timer from "./Timer";
import TrackRecord from "./TrackRecord";

const Home = (props) => {
  let initProjects;
  if (localStorage.getItem("projects") === null) {
    initProjects = [];
  } else {
    initProjects = JSON.parse(localStorage.getItem("projects"));
  }
  const { saveProject, setSaveProject, isResume, setIsResume } = props;
  const [dropDown, setDropDown] = useState(false);
  const [projects, setProjects] = useState(initProjects);
  const [selectedProject, setSelectedProject] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [addTime, setAddTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    let interval = null;
    setIsResume(true);
    setTotalTime(addTime + time);
    localStorage.setItem("projects", JSON.stringify(projects));
    // localStorage.setItem("saveProject", JSON.stringify(saveProject));
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, setIsResume, setTotalTime, addTime, time, projects]);

  const handleClick = (event) => {
    if (dropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };
  const addProject = (userInput) => {
    let copy = [...projects];
    copy = [...copy, { id: projects.length + 1, projectname: userInput }];
    setProjects(copy);
    setDropDown(false);
    setSelectedProject(userInput);
    localStorage.setItem("projects", JSON.stringify(projects));
  };
  const handleSelected = (project) => {
    setSelectedProject(project.projectname);
    setDropDown(false);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleProjectResume = (projectName) => {
    setIsActive(true);
    setIsPaused(false);
    setSelectedProject(projectName.sname);
    setAddTime(projectName.stime);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setTotalTime(addTime + time);
    let addTrack = [...saveProject];
    let theTrack = addTrack.findIndex(
      (sProject) => sProject.sname === selectedProject
    );
    if (theTrack >= 0 && addTrack[theTrack].sname === selectedProject) {
      addTrack[theTrack] = {
        ...addTrack[theTrack],
        stime: addTrack[theTrack].stime + time,
        strtime: updateNewTime,
      };

      setSaveProject(addTrack);
    } else {
      addTrack = [
        ...addTrack,
        {
          sid: saveProject.length + Math.floor(Math.random() * 10000),
          sname: selectedProject,
          stime: time,
          strtime: updateTime,
        },
      ];
      setSaveProject(addTrack);
    }
    // localStorage.setItem("saveProject", JSON.stringify(saveProject));
  };

  const updateTime = (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor(time / 360000)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
  const updateNewTime = (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor(totalTime / 360000)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((totalTime / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((totalTime / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );

  return (
    <div className="container">
      <div className="row my-5 align-items-center">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            minLength="5"
            placeholder="What are you working on?"
            required
          />
        </div>
        <div className="col">
          <div className="dropdown">
            <span
              className="text-decoration-none link-dark dropdown-toggle pointer"
              id="drop-menu"
              onClick={handleClick}
              ref={ref}
            >
              {selectedProject !== "" ? selectedProject : "Project"}
            </span>
            <ul
              className={`dropdown-menu px-2 py-1 ${
                dropDown ? "d-block" : "d-none"
              }`}
            >
              {projects.map((project) => {
                return (
                  <li
                    className="pointer"
                    key={project.id}
                    onClick={() => handleSelected(project)}
                  >
                    {project.projectname}
                  </li>
                );
              })}

              <hr className="my-1" />
              <li
                className="pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create a new project
              </li>
            </ul>
          </div>
          <NewProject addProject={addProject} />
        </div>
        <div className="col-auto">
          <Timer time={time} />
        </div>
        <div className="col-auto">
          <ControlButtons
            active={isActive}
            isPaused={isPaused}
            handleStart={handleStart}
            handleReset={handleReset}
            handlePauseResume={handlePauseResume}
          />
        </div>
      </div>
      <TrackRecord
        saveProject={saveProject}
        setSaveProject={setSaveProject}
        resume={isResume}
        handleProjectResume={handleProjectResume}
      />
    </div>
  );
};

export default Home;
