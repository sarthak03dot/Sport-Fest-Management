// import { useState, useEffect } from "react";
// import axios from "axios";
// import socket from "../../utils/socket";

// function UpdateScores() {
//     const [matches, setMatches] = useState([]);
//     const [selectedMatch, setSelectedMatch] = useState("");
//     const [teamAScore, setTeamAScore] = useState(0);
//     const [teamBScore, setTeamBScore] = useState(0);

//     useEffect(() => {
//         fetchMatches();
//     }, []);

//     const fetchMatches = async () => {
//         const { data } = await axios.get("http://localhost:5000/api/matches");
//         setMatches(data);
//     };

//     const handleScoreUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:5000/api/matches/update-score", {
//                 matchId: selectedMatch,
//                 teamAScore,
//                 teamBScore,
//             });

//             socket.emit("updateScore", data.match);  // Notify all users
//             alert("Score updated successfully!");
//         } catch (error) {
//             alert("Error updating score.");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Update Match Scores</h2>
//             <form onSubmit={handleScoreUpdate}>
//                 <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} required>
//                     <option value="">Select Match</option>
//                     {matches.map(match => (
//                         <option key={match._id} value={match._id}>
//                             {match.teamA} vs {match.teamB}
//                         </option>
//                     ))}
//                 </select>
//                 <input type="number" placeholder="Team A Score" value={teamAScore} onChange={(e) => setTeamAScore(e.target.value)} required />
//                 <input type="number" placeholder="Team B Score" value={teamBScore} onChange={(e) => setTeamBScore(e.target.value)} required />
//                 <button type="submit">Update Score</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateScores;



import { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../utils/socket";
import { toast } from "react-toastify";

function UpdateScores() {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState("");
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);

    useEffect(() => {
        fetchMatches();

        // Listen for live updates from socket
        socket.on("updateScore", (updatedMatch) => {
            setMatches((prevMatches) =>
                prevMatches.map((match) =>
                    match._id === updatedMatch._id ? updatedMatch : match
                )
            );
        });

        return () => {
            socket.off("updateScore");
        };
    }, []);

    const fetchMatches = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/matches");
            setMatches(data);
        } catch (error) {
            toast.error("Error fetching matches.");
        }
    };

    const handleScoreUpdate = async (e) => {
        e.preventDefault();

        if (!selectedMatch) {
            toast.error("Please select a match.");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/matches/update-score", {
                matchId: selectedMatch,
                teamAScore,
                teamBScore,
            });

            socket.emit("updateScore", data.match); // Notify all users
            toast.success("Score updated successfully!");

            // Reset form fields
            setSelectedMatch("");
            setTeamAScore(0);
            setTeamBScore(0);
        } catch (error) {
            toast.error("Error updating score.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Match Scores</h2>
            <form onSubmit={handleScoreUpdate} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Select Match</label>
                    <select
                        className="form-select"
                        value={selectedMatch}
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        required
                    >
                        <option value="">Select Match</option>
                        {matches.map((match) => (
                            <option key={match._id} value={match._id}>
                                {match.teamA} vs {match.teamB}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Team A Score</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Team A Score"
                        value={teamAScore}
                        onChange={(e) => setTeamAScore(parseInt(e.target.value, 10) || 0)}
                        required
                        min="0"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Team B Score</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Team B Score"
                        value={teamBScore}
                        onChange={(e) => setTeamBScore(parseInt(e.target.value, 10) || 0)}
                        required
                        min="0"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={!selectedMatch}>
                    Update Score
                </button>
            </form>
        </div>
    );
}

export default UpdateScores;
