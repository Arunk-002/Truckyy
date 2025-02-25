const User = require("../models/User");
const OTP = require("../models/OTP");
// Function to create a new user
const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(error.message); // Corrected
  }
};

//Function to check if user exists
const findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    return new Error(error.message); // Corrected
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user || false;
  } catch (error) {
    return new Error(error.message);
  }
};

const findOtp = async (email) => {
  try {
    const otp = await OTP.findOne({ email });
    return otp || false;
  } catch (error) {
    return new Error(error.message); 
  }
};

const deleteOtp = async (email) => {
  try {
    const status = await OTP.deleteOne({ email });
    return status || false;
  } catch (error) {
    return new Error(error.message); 
  }
};


const updateUser = async (id,data) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );
}

const updateUserField = async (id, field, data) => {
  const user = await User.findByIdAndUpdate(id, { [field]: data }, { new: true });
  return user;
};

module.exports = { createUser, findUser, findUserById,findOtp,deleteOtp,updateUser,updateUserField };
