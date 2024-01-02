// Imports

const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");

// Routes Import

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

// Environment Varaibles
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connectio to DB
db();

// Creating the server instance
const app = express();

// Parsing the incoming request
app.use(express.json());

// API Endpoints
app.use("/api_v1/user", userRoutes);
app.use("/api_v1/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the ToDo App <br/>--Assignment for Charitism</h1>");
});

// Starting the server on the provided port
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
