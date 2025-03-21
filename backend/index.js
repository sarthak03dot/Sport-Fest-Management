const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const teamRoutes = require("./routes/teamRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");
const matchRoutes = require("./routes/matchRoutes");
const scoreboardRoutes = require("./routes/scoreboardRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("updateScore", (data) => {
    io.emit("scoreUpdated", data); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/scoreboard", scoreboardRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Routing . . .");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
