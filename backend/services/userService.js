const User = require("../models/User");
const OTP = require("../models/OTP");
const FoodTruck = require('../models/Foodtruck')
// Function to create a new user
const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(error.message); // Corrected
  }
};


const findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || false;
  } catch (error) {
    return new Error(error.message);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).populate('favorites',"name");
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


const toggleFavorite = async (userId, truckId) => {
  try {
    
    const truck = await FoodTruck.findById(truckId);
    if (!truck) throw new Error("Food truck not found");

    
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isFavorited = user.favorites.includes(truckId);

    if (isFavorited) {
      
      await User.findByIdAndUpdate(userId, { $pull: { favorites: truckId } });
      await FoodTruck.findByIdAndUpdate(truckId, { $inc: { "stats.favorites": -1 } });

      return { success: true, message: "Truck removed from favorites", favorited: false };
    } else {
      
      await User.findByIdAndUpdate(userId, { $addToSet: { favorites: truckId } });
      await FoodTruck.findByIdAndUpdate(truckId, { $inc: { "stats.favorites": 1 } });

      return { success: true, message: "Truck added to favorites", favorited: true };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { createUser, findUser, findUserById,findOtp,deleteOtp,updateUser,updateUserField,toggleFavorite };
