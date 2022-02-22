import React from "react";

const ControlButtons = (props) => {
  const { handleStart, handleReset, active } = props;
  const StartButton = (
    <button
      type="button"
      className="btn btn-primary px-5 py-2 rounded-0"
      onClick={handleStart}
    >
      Start
    </button>
  );
  const ActiveButtons = (
    <button
      className="btn btn-danger px-5 py-2 rounded-0"
      onClick={handleReset}
    >
      Stop
    </button>
  );
  return (
    <div className="Control-Buttons">
      <div>{active ? ActiveButtons : StartButton}</div>
      {/* <div className="btn btn-one" onClick={props.handlePauseResume}>
          {props.isPaused ? "Resume" : "Pause"}
        </div> */}
    </div>
  );
};

export default ControlButtons;
