const userService = require("../services/userService");

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
    console.log("------------",userId);
    
    const curUser = await userService.findUserById(userId);
    console.log(curUser);
    
    const updateData = req.body;
    curUser.name=updateData.name
    console.log(updateData);
    
    if (!(updateData.password==='false'||updateData.password==='')) {
      curUser.password=updateData.password
    }
    
    const updatedUser = await userService.updateUser(userId, curUser);
console.log(updatedUser);

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

module.exports = {
  getUserProfile,
  updateUserProfile,
  handleFavoriteToggle
};
