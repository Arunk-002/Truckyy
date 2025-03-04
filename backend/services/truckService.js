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


  const updateFoodTruck = async (truckId, updates) => {
    try {
      const foodTruck = await FoodTruck.findById(truckId);
      if (!foodTruck) {
        throw new Error("Food truck not found");
      }
  
      // Only update fields present in the request
      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          foodTruck[key] = updates[key];
        }
      });
  
      const updatedTruck = await foodTruck.save();
      return updatedTruck;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const updateOperatingHours = async (truckId, operatingHours) => {
    try {
      const updatedTruck = await FoodTruck.findByIdAndUpdate(
        truckId,
        { operatingHours },
        { new: true, runValidators: true }
      );
  
      if (!updatedTruck) {
        throw new Error("Food truck not found");
      }
  
      return updatedTruck;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateLocation = async (truckId, lat, lng) => {
    try {
      const foodTruck = await FoodTruck.findByIdAndUpdate(
        truckId,
        {
          $set: {
            "location.coordinates": [lng, lat],
            "location.updatedAt": new Date(),
          },
        },
        { new: true }
      );
      return foodTruck;
    } catch (error) {
      throw new Error("Error updating location: " + error.message);
    }
  };

  const updateSubscription = async (truckId, plan) => {
    try {
      const foodTruck = await FoodTruck.findByIdAndUpdate(
        truckId,
        {
          $set: {
            "subscription.plan": plan
          },
        },
        { new: true }
      );
      return foodTruck;
    } catch (error) {
      throw new Error("Error updating subscription: " + error.message);
    }
  };
  module.exports = { updateFoodTruck,createTruck ,findtruck,updateOperatingHours,updateLocation,updateSubscription};