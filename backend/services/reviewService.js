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
  

  module.exports = {
    addReview,
    getReviewsByTruck
  }