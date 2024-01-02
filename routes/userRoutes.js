const express = require("express");
const rounter = express.Router();

const { userRegistration, authUser } = require("../controllers/userController");

rounter.route("/").post(userRegistration);
rounter.post("/login", authUser);

module.exports = rounter;
