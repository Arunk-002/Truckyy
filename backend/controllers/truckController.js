const truckService = require("../services/truckService");
const userService = require("../services/userService");
const menuService = require("../services/menuService");
const reviewService = require("../services/reviewService")
const registerTruck = async (req, res) => {
  try {
    const { userId, truckName, gstNumber } = req.body;
    const imageUrl = req.file.location;
    if (!userId || !truckName || !gstNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const truck = await truckService.createTruck({
      userId,
      name: truckName,
      gstInfo: gstNumber,
      image: imageUrl,
    });
    await userService.updateUserField(userId, "role", "owner");
    res.status(201).json({ message: "Truck registered successfully", truck });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { truckId, category, name, price, description } = req.body;

    if (!truckId || !category || !name || !price) {
      return res
        .status(400)
        .json({ message: "Truck ID, category, name, and price are required" });
    }

    const result = await menuService.addItem({
      truckId,
      category,
      name,
      price,
      description,
    });

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    res
      .status(201)
      .json({ message: "Menu item added successfully", menu: result.data });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: error.message });
  }
};

const getTruck = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({ message: "no user id found" });
    }
    const result = await truckService.findtruck(userId);
    const reviews = await reviewService.getReviewsByTruck(result._id)
    result.reviews=reviews.length
    res.status(200).json({ message: "truck found", truck: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenuItems = async (req, res) => {
  const truckId = req.params.id;
  try {
    if (!truckId) {
      return res.status(400).json({ message: "no user id found" });
    }
    const result = await menuService.getMenu(truckId);
    res.status(200).json({ message: "truck found", truck: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const itemId = req.params.itemId;
  const menuId = req.params.menuId;
  try {
    if (!itemId) {
      return res.status(400).json({ message: "no item id found" });
    }
    const result = await menuService.deleteItem(menuId, itemId);
    if (result) {
      return res.status(200).json({ message: " item deleted", succes: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTruckController = async (req, res) => {
  try {
    const truckId = req.params.id; // Get truck ID from the URL
    const updates = req.body; // Data from frontend
    if (req.file.location) updates.image = req.file.location;
    if (!truckId) {
      return res.status(400).json({ message: "Truck ID is required" });
    }

    const updatedTruck = await truckService.updateFoodTruck(truckId, updates);

    res.status(200).json({
      message: "Food truck updated successfully",
      data: updatedTruck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTruckOperatingHours = async (req, res) => {
  try {
    const id = req.params.id;
    const { operatingHours } = req.body; // Get operating hours from request body
    if (!operatingHours) {
      return res.status(400).json({ message: "Operating hours are required" });
    }
    const updatedTruck = await truckService.updateOperatingHours(
      id,
      operatingHours
    );
    return res
      .status(201)
      .json({
        message: "Operating hours updated successfully",
        truck: updatedTruck,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTruckLocation = async (req, res) => {
  const truckId  = req.params.id;
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and longitude are required." });
  }

  try {
    const updatedTruck = await truckService.updateLocation(truckId, lat, lng);
    if (!updatedTruck) {
      return res.status(404).json({ message: "Food truck not found." });
    }
    res.status(200).json({ message: "Location updated successfully", data: {...updatedTruck.location.coordinates} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTruckSubscription = async (req, res) => {
  const truckId = req.params.id;
  try {
    const updatedTruck = await truckService.updateSubscription(truckId, 'premium');
    if (!updatedTruck) {
      return res.status(404).json({ message: "Food truck not found." });
    }
    res.status(200).json({ message: "Subscription updated successfully", data: updatedTruck });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTrucks = async (req,res) => {
  try {
    const trucks = await truckService.getTrucks()
    if(!trucks.length>0){
      return res.status(400).json({ message: "No Food truck are found." })
    }
    return res.status(200).json({ message: "Subscription updated successfully", data: trucks })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSingleTruck = async (req,res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({ message: "no user id found" });
    }
    const result = await truckService.findtruckById(id);
    res.status(200).json({ message: "truck found", truck: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  registerTruck,
  addItem,
  getTruck,
  getMenuItems,
  deleteMenuItem,
  updateTruckController,
  updateTruckOperatingHours,
  updateTruckLocation,
  updateTruckSubscription,
  getAllTrucks,
  getSingleTruck
};
