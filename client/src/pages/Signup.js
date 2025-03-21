import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Signup"),
    React.createElement(
      "form",
      { onSubmit: handleSignup },
      React.createElement("input", {
        type: "text",
        placeholder: "Name",
        value: name,
        onChange: (e) => setName(e.target.value),
        required: true,
      }),
      React.createElement("input", {
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
      }),
      React.createElement("input", {
        type: "password",
        placeholder: "Password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
      }),
      React.createElement("button", { type: "submit" }, "Signup")
    )
  );
}

export default Signup;
