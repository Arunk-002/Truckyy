const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { registerTruck } = require("../controllers/truckController");
const {upload} =require('../middlewares/imageUpload')

const router = express.Router();

router.post('/register',authenticateToken,upload.single('image'),registerTruck)

module.exports = router;