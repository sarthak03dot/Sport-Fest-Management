// import { useState, useEffect } from "react";
// import axios from "axios";

// function ManageRegistrations() {
//     const [registrations, setRegistrations] = useState([]);

//     useEffect(() => {
//         fetchRegistrations();
//     }, []);

//     const fetchRegistrations = async () => {
//         const { data } = await axios.get("http://localhost:5000/api/registrations");
//         setRegistrations(data);
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Event Registrations</h2>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Student Name</th>
//                         <th>Email</th>
//                         <th>Event</th>
//                         <th>Team</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {registrations.map(reg => (
//                         <tr key={reg._id}>
//                             <td>{reg.studentName}</td>
//                             <td>{reg.studentEmail}</td>
//                             <td>{reg.eventId.name}</td>
//                             <td>{reg.teamId ? reg.teamId.name : "No Team"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ManageRegistrations;






import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/registrations");
            setRegistrations(data);
        } catch (error) {
            toast.error("Error fetching registrations.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Event Registrations</h2>

            {/* Show Loading Message */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Event</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.length > 0 ? (
                            registrations.map((reg) => (
                                <tr key={reg._id}>
                                    <td>{reg.studentName}</td>
                                    <td>{reg.studentEmail}</td>
                                    <td>{reg.eventId ? reg.eventId.name : "Unknown Event"}</td>
                                    <td>{reg.teamId ? reg.teamId.name : "No Team"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No registrations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageRegistrations;
