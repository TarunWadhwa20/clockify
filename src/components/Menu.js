import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  let location = useLocation();
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light align-stretch">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/" ? "active" : "link-dark"
            }`}
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16"></svg>
            Time Tracking
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`nav-link ${
              location.pathname === "/projects" ? "active" : "link-dark"
            }`}
          >
            <svg className="bi me-2" width="16" height="16"></svg>
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
