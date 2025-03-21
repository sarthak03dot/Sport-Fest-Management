// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// function AdminDashboard() {
//   const [events, setEvents] = useState([]);
//   const [registrations, setRegistrations] = useState([]);
//   const [matches, setMatches] = useState([]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   useEffect(() => {
//     fetchEvents();
//     fetchRegistrations();
//     fetchMatches();
//   }, []);
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/events");
//       setEvents(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch events.");
//     }
//   };
//   const fetchRegistrations = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/admin/registrations"
//       );
//       setRegistrations(response.data);
//     } catch (error) {
//       toast.error("Error loading registrations");
//     }
//   };
//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/matches");
//       setMatches(response.data);
//     } catch (error) {
//       toast.error("Error loading matches");
//     }
//   };
//   const updateRegistrationStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/registrations/${id}`, {
//         status,
//       });
//       toast.success("Registration status updated");
//       fetchRegistrations();
//     } catch (error) {
//       toast.error("Error updating status");
//     }
//   };
//   const updateMatchScore = async (id, teamAScore, teamBScore, winner) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/matches/${id}`, {
//         teamAScore,
//         teamBScore,
//         winner,
//       });
//       toast.success("Match score updated");
//       fetchMatches();
//     } catch (error) {
//       toast.error("Error updating match score");
//     }
//   };
//   const downloadReport = async (eventId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/reports/event-report/${eventId}`,
//         {
//           responseType: "blob", // Important to handle file download
//         }
//       );

//       // Create a URL for the PDF file and trigger download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `Event-Report.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       toast.error("Error downloading report.");
//     }
//   };
//   return (
//     <div className="container">
//       <h2 className="mt-4">Admin Dashboard</h2>
//       <h4>Event Reports</h4>
//       {events.length === 0 ? (
//         <p>No events available.</p>
//       ) : (
//         events.map((event) => (
//           <div key={event._id} className="card p-3 mb-3">
//             <h5>{event.name}</h5>
//             <button onClick={() => downloadReport(event._id)}>
//               Download Report
//             </button>
//           </div>
//         ))
//       )}

//       <h4>Event Registrations</h4>
//       {registrations.length === 0 ? (
//         <p>No registrations available</p>
//       ) : (
//         registrations.map((reg) => (
//           <div key={reg._id} className="card p-3 mb-3">
//             <p>
//               {reg.studentName} - {reg.eventId.name}
//             </p>
//             <select
//               onChange={(e) =>
//                 updateRegistrationStatus(reg._id, e.target.value)
//               }
//             >
//               <option value="pending" selected={reg.status === "pending"}>
//                 Pending
//               </option>
//               <option value="approved" selected={reg.status === "approved"}>
//                 Approved
//               </option>
//               <option value="rejected" selected={reg.status === "rejected"}>
//                 Rejected
//               </option>
//             </select>
//           </div>
//         ))
//       )}

//       <h4>Manage Match Scores</h4>
//       {matches.length === 0 ? (
//         <p>No matches available</p>
//       ) : (
//         matches.map((match) => (
//           <div key={match._id} className="card p-3 mb-3">
//             <p>
//               {match.teamA} vs {match.teamB}
//             </p>
//             <input
//               type="number"
//               placeholder="Team A Score"
//               defaultValue={match.teamAScore}
//               onBlur={(e) =>
//                 updateMatchScore(
//                   match._id,
//                   e.target.value,
//                   match.teamBScore,
//                   match.winner
//                 )
//               }
//             />
//             <input
//               type="number"
//               placeholder="Team B Score"
//               defaultValue={match.teamBScore}
//               onBlur={(e) =>
//                 updateMatchScore(
//                   match._id,
//                   match.teamAScore,
//                   e.target.value,
//                   match.winner
//                 )
//               }
//             />
//             <select
//               onChange={(e) =>
//                 updateMatchScore(
//                   match._id,
//                   match.teamAScore,
//                   match.teamBScore,
//                   e.target.value
//                 )
//               }
//             >
//               <option value="" selected={!match.winner}>
//                 Select Winner
//               </option>
//               <option
//                 value={match.teamA}
//                 selected={match.winner === match.teamA}
//               >
//                 {match.teamA}
//               </option>
//               <option
//                 value={match.teamB}
//                 selected={match.winner === match.teamB}
//               >
//                 {match.teamB}
//               </option>
//             </select>
//           </div>
//         ))
//       )}
//       <button onClick={handleLogout} className="btn btn-danger">
//         Logout
//       </button>
//       <div className="list-group">
//         <Link
//           to="/admin/update-scores"
//           className="list-group-item list-group-item-action"
//         >
//           Update Scores
//         </Link>

//         <Link
//           to="/admin/events"
//           className="list-group-item list-group-item-action"
//         >
//           Manage Events
//         </Link>
//         <Link
//           to="/admin/registrations"
//           className="list-group-item list-group-item-action"
//         >
//           Manage Registrations
//         </Link>

//         <Link
//           to="/admin/teams"
//           className="list-group-item list-group-item-action"
//         >
//           Manage Teams
//         </Link>
//         <Link
//           to="/admin/matches"
//           className="list-group-item list-group-item-action"
//         >
//           Manage Matches
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [matches, setMatches] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, registrationsRes, matchesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/events"),
          axios.get("http://localhost:5000/api/admin/registrations"),
          axios.get("http://localhost:5000/api/matches"),
        ]);
        setEvents(eventsRes.data);
        setRegistrations(registrationsRes.data);
        setMatches(matchesRes.data);
      } catch (error) {
        toast.error("Error fetching data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const updateRegistrationStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/registrations/${id}`, {
        status,
      });
      toast.success("Registration status updated successfully!");
      setRegistrations((prev) =>
        prev.map((reg) => (reg._id === id ? { ...reg, status } : reg))
      );
    } catch (error) {
      toast.error("Error updating registration status.");
    }
  };

  const updateMatchScore = async (id, teamAScore, teamBScore, winner) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/matches/${id}`, {
        teamAScore,
        teamBScore,
        winner,
      });
      toast.success("Match score updated successfully!");
      setMatches((prev) =>
        prev.map((match) =>
          match._id === id ? { ...match, teamAScore, teamBScore, winner } : match
        )
      );
    } catch (error) {
      toast.error("Error updating match score.");
    }
  };

  const downloadReport = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reports/event-report/${eventId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Event-Report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error downloading report.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Event Reports */}
      <h4>Event Reports</h4>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="card p-3 mb-3 shadow-sm">
            <h5>{event.name}</h5>
            <button className="btn btn-primary" onClick={() => downloadReport(event._id)}>
              Download Report
            </button>
          </div>
        ))
      )}

      {/* Event Registrations */}
      <h4 className="mt-4">Event Registrations</h4>
      {registrations.length === 0 ? (
        <p>No registrations available.</p>
      ) : (
        registrations.map((reg) => (
          <div key={reg._id} className="card p-3 mb-3 shadow-sm">
            <p>
              <strong>{reg.studentName}</strong> - {reg.eventId.name}
            </p>
            <select
              className="form-select"
              value={reg.status}
              onChange={(e) => updateRegistrationStatus(reg._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        ))
      )}

      {/* Manage Match Scores */}
      <h4 className="mt-4">Manage Match Scores</h4>
      {matches.length === 0 ? (
        <p>No matches available.</p>
      ) : (
        matches.map((match) => (
          <div key={match._id} className="card p-3 mb-3 shadow-sm">
            <p>
              <strong>{match.teamA}</strong> vs <strong>{match.teamB}</strong>
            </p>
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                placeholder="Team A Score"
                value={match.teamAScore}
                onChange={(e) =>
                  setMatches((prev) =>
                    prev.map((m) =>
                      m._id === match._id ? { ...m, teamAScore: e.target.value } : m
                    )
                  )
                }
                onBlur={() =>
                  updateMatchScore(match._id, match.teamAScore, match.teamBScore, match.winner)
                }
              />
              <input
                type="number"
                className="form-control"
                placeholder="Team B Score"
                value={match.teamBScore}
                onChange={(e) =>
                  setMatches((prev) =>
                    prev.map((m) =>
                      m._id === match._id ? { ...m, teamBScore: e.target.value } : m
                    )
                  )
                }
                onBlur={() =>
                  updateMatchScore(match._id, match.teamAScore, match.teamBScore, match.winner)
                }
              />
            </div>
            <select
              className="form-select mt-2"
              value={match.winner}
              onChange={(e) => updateMatchScore(match._id, match.teamAScore, match.teamBScore, e.target.value)}
            >
              <option value="">Select Winner</option>
              <option value={match.teamA}>{match.teamA}</option>
              <option value={match.teamB}>{match.teamB}</option>
            </select>
          </div>
        ))
      )}

      {/* Logout Button */}
      <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button>

      {/* Navigation Links */}
      <div className="list-group mt-4">
        <Link to="/admin/update-scores" className="list-group-item list-group-item-action">
          Update Scores
        </Link>
        <Link to="/admin/events" className="list-group-item list-group-item-action">
          Manage Events
        </Link>
        <Link to="/admin/registrations" className="list-group-item list-group-item-action">
          Manage Registrations
        </Link>
        <Link to="/admin/teams" className="list-group-item list-group-item-action">
          Manage Teams
        </Link>
        <Link to="/admin/matches" className="list-group-item list-group-item-action">
          Manage Matches
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
