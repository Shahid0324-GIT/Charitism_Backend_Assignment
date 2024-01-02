const jwt = require("jsonwebtoken");
const CharitismUser = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await CharitismUser.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      //   console.log(err);
      res.status(401);
      throw new Error("Not Authorised!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorised");
  }
};

module.exports = protect;
