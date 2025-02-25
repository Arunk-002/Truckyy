const OTP = require("../models/OTP");

async function generateOTP(email) {
    let digits = "0123456789";
    let OTP = "";
    let len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    await storeOTP(email,OTP)
    return OTP;
  }

  
  
  async function storeOTP(email,otp) { 
    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, // 5 min expiry
      { upsert: true }
    );
  }
 
 
  module.exports = {generateOTP}