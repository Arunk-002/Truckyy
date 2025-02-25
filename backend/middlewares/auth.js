require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired, please log in again." });
      }
      return res.status(403).json({ message: "Forbidden - Invalid Token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
