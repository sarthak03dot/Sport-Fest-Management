// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:5000/api/auth/admin/login", { email, password });
//             localStorage.setItem("adminToken", data.token);
//             navigate("/admin");
//         } catch (err) {
//             setError("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Admin Login</h2>
//             {error && <p className="text-danger">{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default AdminLogin;




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:5000/api/auth/admin/login", { email, password });

//             localStorage.setItem("token", data.token);
//             localStorage.setItem("role", "admin");  // Storing role

//             navigate("/admin"); // Redirect to admin dashboard
//         } catch (err) {
//             setError("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="mt-4">Admin Login</h2>
//             {error && <p className="text-danger">{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default AdminLogin;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/admin/login", { email, password });

            // Store token & role
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", "admin");

            // Redirect to Admin Dashboard
            navigate("/admin/dashboard");
        } catch (err) {
            setError("Invalid Email or Password!");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Admin Login</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
