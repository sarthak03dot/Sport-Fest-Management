import React, { useState, useEffect } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [joinedEvent, setJoinedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/events");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleJoinEvent = (eventId) => {
    setJoinedEvent(eventId);
    alert("You have successfully joined the event!");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Events</h2>
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={joinedEvent === event._id}
                  >
                    {joinedEvent === event._id ? "Joined" : "Join Event"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No events available</p>
        )}
      </div>
    </div>
  );
}

export default Events;
