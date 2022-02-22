import React from "react";

const TrackRecord = (props) => {
  const { saveProject, setSaveProject, resume, handleProjectResume } = props;
  const handleDelete = (id) => {
    const newRecord = saveProject.filter((save) => {
      return save.sid !== id;
    });
    setSaveProject(newRecord);
    // localStorage.setItem("saveProject", JSON.stringify(saveProject));
  };

  const handleResume = (saveProject) => {
    handleProjectResume(saveProject);
  };

  return (
    <div className="my-5 border border-2">
      <div className="row bg-light align-items-center py-2 px-3 mx-0">
        <div className="col">
          <p className="my-0">Today</p>
        </div>
      </div>
      {saveProject.map((save) => {
        return (
          <div
            className="row align-items-center px-3 py-2"
            id={save.sid}
            key={save.sid}
          >
            <div className="col">Description</div>
            <div className="col">{save.sname}</div>
            <div className="col">{save.strtime}</div>
            <div className="col">
              <div className="pointer">
                <i
                  className={resume ? "fas fa-play" : "far fa-trash-alt"}
                  onClick={
                    resume
                      ? () => handleResume(save)
                      : () => handleDelete(save.sid)
                  }
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackRecord;
