const truckService = require('../services/truckService')
const userService = require('../services/userService')
const registerTruck = async (req, res) => {
    try {
      const { userId, truckName, gstNumber } = req.body;
      const imageUrl= req.file.location;
      if (!userId || !truckName || !gstNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const truck = await truckService.createTruck({
        userId,
        name: truckName,
        gstInfo: gstNumber,
        image:imageUrl
      });
      await userService.updateUserField(userId,'role','owner')
      res.status(201).json({ message: 'Truck registered successfully', truck });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { registerTruck };