import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const { data } = await axios.get("http://localhost:5000/api/teams");
            setTeams(data);
        };
        fetchTeams();
    }, []);

    return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
            "h2",
            { className: "mt-4" },
            "Registered Teams"
        ),
        React.createElement(
            "table",
            { className: "table table-bordered" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Team Name"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Event"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                teams.map(team => React.createElement(
                    "tr",
                    { key: team._id },
                    React.createElement(
                        "td",
                        null,
                        team.name
                    ),
                    React.createElement(
                        "td",
                        null,
                        team.event.name
                    )
                ))
            )
        )
    );
}

export default Teams;

