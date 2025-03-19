import { useEffect, useState } from "react";
import socket from "../utils/socket";
import axios from "axios";

function LiveScores() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchMatches();

        socket.on("scoreUpdated", (updatedMatch) => {
            setMatches((prevMatches) =>
                prevMatches.map((match) =>
                    match._id === updatedMatch._id ? updatedMatch : match
                )
            );
        });

        return () => {
            socket.off("scoreUpdated");
        };
    }, []);

    const fetchMatches = async () => {
        const { data } = await axios.get("http://localhost:5000/api/matches");
        setMatches(data);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Live Scores</h2>
            {matches.map((match) => (
                <div key={match._id} className="card p-3 mb-3">
                    <h4>{match.teamA} vs {match.teamB}</h4>
                    <p>Score: {match.teamAScore} - {match.teamBScore}</p>
                </div>
            ))}
        </div>
    );
}

export default LiveScores;
