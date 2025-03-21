import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Leaderboard from "./pages/Leaderboard";
import PlayerDashboard from "./pages/PlayerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard"; 
import AdminDashboard from "./pages/AdminDashboard";
import ManageEvents from "./pages/ManageEvents";
import ManageTeams from "./pages/ManageTeams";
import ManageMatches from "./pages/ManageMatches";
import ManageRegistrations from "./pages/Admin/ManageRegistrations";
import UpdateScores from "./pages/Admin/UpdateScores";
import LiveScores from "./pages/LiveScores";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <>
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <div className="container">
          <Routes>
            <Route path="/live-scores" element={<LiveScores />} />
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/player/dashboard"
              element={
                <PrivateRoute>
                  <PlayerDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/update-scores"
              element={
                <PrivateRoute>
                  <UpdateScores />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/registrations"
              element={
                <PrivateRoute>
                  <ManageRegistrations />
                </PrivateRoute>
              }
            />
            {/* DONE */}
            <Route
              path="/admin/events"
              element={
                <PrivateRoute>
                  <ManageEvents />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/teams"
              element={
                <PrivateRoute>
                  <ManageTeams />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/matches"
              element={
                <PrivateRoute>
                  <ManageMatches />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
