const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { registerTruck, addItem, getTruck, getMenuItems, deleteMenuItem, updateTruckController, updateTruckOperatingHours, updateTruckLocation } = require("../controllers/truckController");
const {upload} =require('../middlewares/imageUpload');

const router = express.Router();
router.get('/:id',authenticateToken,getTruck)
router.get('/:id/menu',authenticateToken,getMenuItems)
router.delete('/:menuId/item/:itemId',authenticateToken,deleteMenuItem)
router.put('/:id/update-details',upload.single('image'),updateTruckController)
router.put('/:id/update-hours',authenticateToken,updateTruckOperatingHours)
router.put('/:id/update-location',authenticateToken,updateTruckLocation)

router.post('/register',authenticateToken,upload.single('image'),registerTruck)
router.post('/add-item',authenticateToken,addItem) 

module.exports = router;