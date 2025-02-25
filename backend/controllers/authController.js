require("dotenv").config();
const userService = require("../services/userService");
const { createTokens } = require("../services/jwt");
const { generateOTP } = require("../utils/otp");
const transporter = require('../services/nodeMailer')

const userCreation = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required" });
    }

    const existingUser = await userService.findUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Save user in database
    const newUser = await userService.createUser({
      email,
      password,
      name,
      role,
    });

    const { accessToken, refreshToken } = createTokens(newUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User created successfully",
      token: accessToken, // Send access token in response
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userService.findUser(email);
    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = createTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    user.password=false
    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: user,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

const tokenAuth = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).json({ message: "Unauthorized" });

  const newAccessToken = verifyToken(refreshToken);
  if (!newAccessToken)
    return res.status(403).json({ message: "Invalid refresh token" });

  res.json({ accessToken: newAccessToken });
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const sendEmail = async (req, res) => {
  const { to } = req.body;
  const otp = await generateOTP(to);
  try {
    await transporter.sendMail({
      from: process.env.NODE_USER,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

async function verifyOTP(req,res) {
  const {email, enteredOTP} = req.body
  try {
    const record = await userService.findOtp( email );
    if (!record || record.expiresAt < new Date()) {
        return { success: false, message: "OTP expired or not found" };
    }
  
    if (!record.otp === enteredOTP) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  
    // OTP verified, now delete it to prevent reuse
    await userService.deleteOtp( email );
  
    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: error.message });
  }
}


module.exports = { userCreation, userLogin, tokenAuth, logout, sendEmail ,verifyOTP};
