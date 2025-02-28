const FoodTruck = require('../models/Foodtruck')
const createTruck = async ({ userId, name, gstInfo }) => {
    try {
      const existingTruck = await FoodTruck.findOne({ userId });
      if (existingTruck) {
        throw new Error('User already has a registered food truck');
      }
  
      const newTruck = new FoodTruck({
        userId,
        name,
        gstInfo,
        location: { coordinates: [0, 0] }, // Placeholder for location
      });
  
      await newTruck.save();
      return newTruck;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const findtruck = async (userId) => {
    try {
      const truck = await FoodTruck.findOne({userId})
      return truck
    } catch (error) {
      throw new Error(error.message)
    }
  }
  module.exports = { createTruck ,findtruck};