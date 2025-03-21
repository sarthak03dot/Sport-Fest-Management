import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await axios.get("http://localhost:5000/api/matches");
      setMatches(data);
    };
    fetchMatches();
  }, []);

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement("h2", { className: "mt-4" }, "Match Schedule"),
    React.createElement(
      "table",
      { className: "table table-bordered" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "Event"),
          React.createElement("th", null, "Team 1"),
          React.createElement("th", null, "Team 2"),
          React.createElement("th", null, "Date")
        )
      ),
      React.createElement(
        "tbody",
        null,
        matches.map((match) =>
          React.createElement(
            "tr",
            { key: match._id },
            React.createElement("td", null, match.event.name),
            React.createElement("td", null, match.team1.name),
            React.createElement("td", null, match.team2.name),
            React.createElement(
              "td",
              null,
              new Date(match.date).toLocaleDateString()
            )
          )
        )
      )
    )
  );
}

export default Matches;
