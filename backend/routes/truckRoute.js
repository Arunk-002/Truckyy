const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { registerTruck } = require("../controllers/truckController");


const router = express.Router();

router.post('/register',authenticateToken,registerTruck)

module.exports = router;