const userService = require("../services/userService");
const reviewService = require("../services/reviewService")
const truckService = require("../services/truckService")

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.findUserById(userId);
    user.password = false;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id    
    const curUser = await userService.findUserById(userId);
    const updateData = req.body;
    curUser.name=updateData.name
    if (!(updateData.password==='false'||updateData.password==='')) {
      curUser.password=updateData.password
    }
    const updatedUser = await userService.updateUser(userId, curUser);
    res.status(202).json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const handleFavoriteToggle = async (req, res) => {
  try {
    const { userId, truckId } = req.body;
    if (!userId || !truckId) return res.status(400).json({ error: "Missing userId or truckId" });

    const result = await userService.toggleFavorite(userId, truckId);
    if(result){
      return res.status(200).json(result);

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { truckId, rating, comment } = req.body;
    const userId = req.params.id;

    if (!truckId || !rating) {
      return res.status(400).json({ message: "Truck ID and rating are required" });
    }
    const review = await reviewService.addReview(userId, truckId, rating, comment);
    const updatedTruck = await truckService.updateFoodTruckRating(truckId, rating);

    return res.status(201).json({ message: "Review added successfully", review, updatedTruck });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getReviewsByTruck = async (req, res) => {
  try {
    const truckId  = req.params.id;

    if (!truckId) {
      return res.status(400).json({ message: "Truck ID is required" });
    }

    const reviews = await reviewService.getReviewsByTruck(truckId);
    
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

const getUserFullProfile = async (req,res) => {
  const userId = req.params.id
  try {
    if(!userId){
      return res.status(400).json({ message: "User ID is required" });
    }
    const reviews = await reviewService.getUserReviews(userId);
    const user = await userService.findUserById(userId);
    return res.status(200).json({reviews:reviews,user:user});
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
}
module.exports = {
  getUserProfile,
  updateUserProfile,
  handleFavoriteToggle,
  createReview,
  getReviewsByTruck,
  getUserFullProfile
};
