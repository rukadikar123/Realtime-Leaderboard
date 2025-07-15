import express from "express";
import dotenv from "dotenv";
import { mongoDbconnect } from "./config/MongoDb_connect.js";
import cors from "cors";
import userRoutes from "./Routes/user.routes.js";
import { Server } from "socket.io";
import http from "http";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server instance from Express app
const server = http.createServer(app);

// Initialize Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL allowed to connect
    methods: ["POST", "GET"], // Allowed HTTP methods
  },
});

// Make the Socket.IO instance accessible throughout the app
app.set("io", io);

// Middlewares

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // Parse incoming JSON request bodies

// Routes
// All user-related routes will be prefixed with /api
app.use("/api", userRoutes);

// Set port from env or fallback to 4000
const port = process.env.PORT || 4000;

// Start server and connect to MongoDB
server.listen(port, () => {
  console.log(`app is started on port ${port}`);
  mongoDbconnect();
});
