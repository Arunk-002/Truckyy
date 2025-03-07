const Reviews = require("../models/Review")

const addReview = async (data) => {
    try {
      return await Reviews.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getReviewsByTruck = async (truckId) => {
    try {
      return await Reviews.find({ truckId }).populate("userId", "name"); 
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getUserReviews = async (userId) => {
    try {
      const reviews = await Reviews.find({userId:userId}).populate("truckId","name");
      return reviews || false;
    } catch (error) {
      return new Error(error.message);
    }
  }

  module.exports = {
    addReview,
    getReviewsByTruck,
    getUserReviews
  }