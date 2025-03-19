import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

function EventRegistration({ eventId, teams }) {
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [teamId, setTeamId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/register", { studentName, studentEmail, eventId, teamId });
            toast.success("Registration successful!");
            setStudentName("");
            setStudentEmail("");
            setTeamId("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Register for Event</h3>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                <input type="email" placeholder="Email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
                <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                    <option value="">Join a Team (Optional)</option>
                    {teams.map(team => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            </form>
        </div>
    );
}

export default EventRegistration;
