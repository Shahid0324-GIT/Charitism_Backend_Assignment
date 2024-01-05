const CharitismUser = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Token Generation for Authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userRegistration = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExistsCheck = await CharitismUser.findOne({ email });

  if (userExistsCheck) {
    res.status(400).json({
      message: "User already exists",
    });
    // throw new Error("User already exists");
  }

  //   Hashing the password for better security
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await CharitismUser.create({
    username,
    password: hashPassword,
    email,
  });

  if (newUser) {
    res.status(200).json({
      userId: newUser.userId,
      username: newUser.username,
      email: newUser.email,
    });
  } else {
    res.status(400).json({
      message: "Failed to create the user",
    });
    throw new Error("Failed to create the user");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await CharitismUser.findOne({ email });

  const userPassword = findUser.password;
  const isPasswordMatch = await bcrypt.compare(password, userPassword);

  if (findUser && isPasswordMatch) {
    res.status(200).json({
      userId: findUser._id,
      username: findUser.username,
      email: findUser.email,
      token: generateToken(findUser._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid Username or Password",
    });
    throw new Error("Invalid Email or Password");
  }
};

module.exports = {
  userRegistration,
  authUser,
};
