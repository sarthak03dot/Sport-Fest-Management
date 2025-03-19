// import { useState, useEffect } from "react";
// import axios from "axios";

// function ManageTeams() {
//     const [teams, setTeams] = useState([]);
//     const [teamName, setTeamName] = useState("");

//     useEffect(() => {
//         fetchTeams();
//     }, []);

//     const fetchTeams = async () => {
//         const { data } = await axios.get("http://localhost:5000/api/teams");
//         setTeams(data);
//     };

//     const handleAddTeam = async (e) => {
//         e.preventDefault();
//         await axios.post("http://localhost:5000/api/teams", { name: teamName });
//         fetchTeams();
//         setTeamName("");
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:5000/api/teams/${id}`);
//         fetchTeams();
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Manage Teams</h2>

//             <form onSubmit={handleAddTeam} className="mb-4">
//                 <input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
//                 <button type="submit">Add Team</button>
//             </form>

//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Team Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {teams.map((team) => (
//                         <tr key={team._id}>
//                             <td>{team.name}</td>
//                             <td><button onClick={() => handleDelete(team._id)}>Delete</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ManageTeams;



import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageTeams() {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/teams");
            setTeams(data);
        } catch (error) {
            toast.error("Error fetching teams.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddTeam = async (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            toast.warning("Team name cannot be empty.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/teams", { name: teamName });
            toast.success("Team added successfully!");
            fetchTeams();
            setTeamName("");
        } catch (error) {
            toast.error("Error adding team.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this team?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/teams/${id}`);
            toast.success("Team deleted successfully!");
            fetchTeams();
        } catch (error) {
            toast.error("Error deleting team.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manage Teams</h2>

            {/* Add Team Form */}
            <form onSubmit={handleAddTeam} className="mb-4 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Add Team</button>
            </form>

            {/* Display Loading Message */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Team Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <tr key={team._id}>
                                    <td>{team.name}</td>
                                    <td>
                                        <button onClick={() => handleDelete(team._id)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">No teams available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageTeams;
