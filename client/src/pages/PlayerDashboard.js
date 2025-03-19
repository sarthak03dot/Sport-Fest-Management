import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PlayerDashboard() {
    const [user, setUser] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:5000/api/auth/user");
            setUser(response.data);
        };

        const fetchRegistrations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/registrations");
                setRegistrations(response.data);
            } catch (error) {
                toast.error("Failed to load registrations.");
            }
        };

        fetchUser();
        fetchRegistrations();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h3>Welcome, {user.name}</h3>
            <div>
                <h4>Your Event Registrations</h4>
                {registrations.length === 0 ? (
                    <p>You have not registered for any events yet.</p>
                ) : (
                    <ul>
                        {registrations.map((registration) => (
                            <li key={registration._id}>
                                {registration.eventName} - {registration.status}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default PlayerDashboard;
