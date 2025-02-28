const truckService = require('../services/truckService')
const userService = require('../services/userService')
const menuService = require('../services/menuService');
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

  const addItem = async (req, res) => {
    try {
        const { truckId, category, name, price, description } = req.body;

        if (!truckId || !category || !name || !price) {
            return res.status(400).json({ message: 'Truck ID, category, name, and price are required' });
        }

        const result = await menuService.addItem({ truckId, category, name, price, description });

        if (!result.success) {
            return res.status(500).json({ message: result.message });
        }

        res.status(201).json({ message: 'Menu item added successfully', menu: result.data });
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: error.message });
    }
};

const getTruck = async (req,res) => {
  const userId = req.params.id
  try {
    if (!userId) {
      return res.status(400).json({message:'no user id found'})
    }
    const result = await truckService.findtruck(userId)
    res.status(200).json({message:'truck found' ,truck:result})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const getMenuItems = async (req,res) => {
  const truckId = req.params.id
  try {
    if (!truckId) {
      return res.status(400).json({message:'no user id found'})
    }
    const result = await menuService.getMenu(truckId)
    res.status(200).json({message:'truck found' ,truck:result})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}


const deleteMenuItem = async (req,res) => {
  const itemId = req.params.itemId
  const menuId = req.params.menuId
  try {
    if (!itemId) {
      return res.status(400).json({message:'no item id found'})
    }
    const result = await menuService.deleteItem(menuId,itemId)
    if (result) {
      return res.status(200).json({message:' item deleted' ,succes :true})
    }
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
  
module.exports = { registerTruck,addItem ,getTruck,getMenuItems,deleteMenuItem};