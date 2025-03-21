// import { useState, useEffect } from "react";
// import axios from "axios";

// function ManageMatches() {
//     const [matches, setMatches] = useState([]);

//     useEffect(() => {
//         fetchMatches();
//     }, []);

//     const fetchMatches = async () => {
//         const { data } = await axios.get("http://localhost:5000/api/matches");
//         setMatches(data);
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:5000/api/matches/${id}`);
//         fetchMatches();
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Manage Matches</h2>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Event</th>
//                         <th>Team 1</th>
//                         <th>Team 2</th>
//                         <th>Date</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {matches.map((match) => (
//                         <tr key={match._id}>
//                             <td>{match.event.name}</td>
//                             <td>{match.team1.name}</td>
//                             <td>{match.team2.name}</td>
//                             <td>{new Date(match.date).toLocaleDateString()}</td>
//                             <td><button onClick={() => handleDelete(match._id)}>Delete</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ManageMatches;



import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/matches");
            setMatches(data);
        } catch (error) {
            toast.error("Error fetching matches.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this match?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/matches/${id}`);
            toast.success("Match deleted successfully!");
            fetchMatches();
        } catch (error) {
            toast.error("Error deleting match.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manage Matches</h2>

            {/* Display Loading Message */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Event</th>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.length > 0 ? (
                            matches.map((match) => (
                                <tr key={match._id}>
                                    <td>{match.event.name}</td>
                                    <td>{match.team1.name}</td>
                                    <td>{match.team2.name}</td>
                                    <td>{new Date(match.date).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(match._id)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No matches available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageMatches;
