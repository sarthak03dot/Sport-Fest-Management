// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function PlayerLogin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:5000/api/auth/player/login", { email, password });

//             localStorage.setItem("token", data.token);
//             localStorage.setItem("role", "player");  // Storing role

//             navigate("/player/dashboard"); // Redirect to player dashboard
//         } catch (err) {
//             setError("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Player Login</h2>
//             {error && <p className="text-danger">{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default PlayerLogin;
