const express = require("express");
const { authenticateToken } = require('../middlewares/auth')
const { createOrder, verifyPayment } = require("../services/razorpay")
const router = express.Router();

router.post("/create-order",authenticateToken,createOrder);
router.post('/verify-payment',authenticateToken,verifyPayment)


module.exports = router
