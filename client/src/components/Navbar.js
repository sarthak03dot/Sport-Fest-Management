import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const Navbar = () => {
  return (
    <div>
      {" "}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Sports Fest
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/matches">
                  Matches
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
