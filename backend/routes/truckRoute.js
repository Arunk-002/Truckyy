const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { registerTruck, addItem, getTruck, getMenuItems, deleteMenuItem } = require("../controllers/truckController");
const {upload} =require('../middlewares/imageUpload');

const router = express.Router();
router.get('/:id',authenticateToken,getTruck)
router.get('/:id/menu',authenticateToken,getMenuItems)
router.delete('/:menuId/item/:itemId',deleteMenuItem)

router.post('/register',authenticateToken,upload.single('image'),registerTruck)
router.post('/add-item',authenticateToken,addItem) 

module.exports = router;