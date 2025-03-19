// import { useState, useEffect } from "react";
// import axios from "axios";

// function ManageEvents() {
//     const [events, setEvents] = useState([]);
//     const [newEvent, setNewEvent] = useState({ name: "", description: "", date: "" });

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         const { data } = await axios.get("http://localhost:5000/api/events");
//         setEvents(data);
//     };

//     const handleAddEvent = async (e) => {
//         e.preventDefault();
//         await axios.post("http://localhost:5000/api/events", newEvent);
//         fetchEvents();
//         setNewEvent({ name: "", description: "", date: "" });
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:5000/api/events/${id}`);
//         fetchEvents();
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Manage Events</h2>

//             <form onSubmit={handleAddEvent} className="mb-4">
//                 <input type="text" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} required />
//                 <input type="text" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
//                 <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
//                 <button type="submit">Add Event</button>
//             </form>

//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>Date</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {events.map((event) => (
//                         <tr key={event._id}>
//                             <td>{event.name}</td>
//                             <td>{event.description}</td>
//                             <td>{new Date(event.date).toLocaleDateString()}</td>
//                             <td><button onClick={() => handleDelete(event._id)}>Delete</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ManageEvents;




import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: "", description: "", date: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/events");
            setEvents(data);
        } catch (error) {
            toast.error("Error fetching events.");
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!newEvent.name || !newEvent.description || !newEvent.date) {
            toast.error("Please fill all fields.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/events", newEvent);
            toast.success("Event added successfully!");
            fetchEvents();
            setNewEvent({ name: "", description: "", date: "" });
        } catch (error) {
            toast.error("Error adding event.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            toast.success("Event deleted successfully!");
            fetchEvents();
        } catch (error) {
            toast.error("Error deleting event.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manage Events</h2>

            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter event name"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter event description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Event"}
                </button>
            </form>

            {/* Events Table */}
            <table className="table table-bordered mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.name}</td>
                                <td>{event.description}</td>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No events found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageEvents;
