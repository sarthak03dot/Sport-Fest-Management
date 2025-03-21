// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../models/User");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, invalid token");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// const admin = (req, res, next) => {
//   if (req.user && req.user.role === "Admin") {
//     next();
//   } else {
//     res.status(403);
//     throw new Error("Access denied, admin only");
//   }
// };
// const authenticateUser = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token)
//     return res
//       .status(401)
//       .json({ message: "Access Denied. No token provided." });

//   try {
//     const decoded = jwt.verify(
//       token.replace("Bearer ", ""),
//       process.env.JWT_SECRET
//     );
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// const authorizeAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access Denied. Admins only." });
//   }
//   next();
// };

// module.exports = { protect, admin, authenticateUser, authorizeAdmin };



const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {  
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user details without password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};

module.exports = { protect, admin, authenticateUser, authorizeAdmin };
