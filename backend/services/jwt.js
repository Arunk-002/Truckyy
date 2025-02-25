require('dotenv').config()
const jwt = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } 
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } 
  );

  return { accessToken, refreshToken };
};

const verifyUser = (token)=>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    
    return decoded;
  } catch (err) {
    return null; 
  }
}

const verifyToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    return newAccessToken;
  } catch (err) {
    return null; 
  }
};


module.exports = {
  createTokens,
  verifyToken,
  verifyUser
};
