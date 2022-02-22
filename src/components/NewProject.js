import React, { useState, useRef } from "react";

const NewProject = (props) => {
  const { addProject } = props;
  const [userInput, setUserInput] = useState("");
  const refClose = useRef(null);

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(userInput);
    setUserInput("");
    refClose.current.click();
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create A New Project
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              id="projectname"
              name="pname"
              value={userInput}
              onChange={handleChange}
              minLength="5"
              placeholder="Enter a project name"
              required
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              ref={refClose}
              data-bs-dismiss="modal"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
