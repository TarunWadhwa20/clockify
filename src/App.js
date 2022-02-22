import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Projects from "./components/Projects";

function App() {
  let initSaveProject;
  if (localStorage.getItem("saveProject") === null) {
    initSaveProject = [];
  } else {
    initSaveProject = JSON.parse(localStorage.getItem("saveProject"));
  }
  const [saveProject, setSaveProject] = useState(initSaveProject);
  const [isResume, setIsResume] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Menu />
            </div>
            <div className="col-9">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      saveProject={saveProject}
                      setSaveProject={setSaveProject}
                      isResume={isResume}
                      setIsResume={setIsResume}
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <Projects
                      saveProject={saveProject}
                      setSaveProject={setSaveProject}
                      isResume={isResume}
                      setIsResume={setIsResume}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
