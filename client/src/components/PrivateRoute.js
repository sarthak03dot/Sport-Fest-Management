// import React from 'react'
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//     const isAuthenticated = !!localStorage.getItem("adminToken");
//     return isAuthenticated ? children : <Navigate to="/admin/login" />;
// };

// export default PrivateRoute;



import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/" />; // Redirect unauthorized users
    }

    return children;
};

export default PrivateRoute;
