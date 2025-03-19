import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/leaderboard");
            setLeaderboard(response.data);
        } catch (error) {
            toast.error("Failed to fetch leaderboard.");
        }
    };

    return (
        <div className="container">
            <h2>Sports Fest Leaderboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Matches Played</th>
                        <th>Matches Won</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((team, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{team.team}</td>
                            <td>{team.matchesPlayed}</td>
                            <td>{team.matchesWon}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
