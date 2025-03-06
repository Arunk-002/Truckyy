    const express = require("express");
const { userCreation ,userLogin, tokenAuth, logout, sendEmail, verifyOTP} = require("../controllers/authController");
const {getUserProfile, updateUserProfile, handleFavoriteToggle, createReview, getReviewsByTruck} = require('../controllers/userController')
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// Route for creating a new user

router.put('/update/:id',authenticateToken,updateUserProfile)
router.post('/add-review/:id',authenticateToken,createReview)
router.get('/get-reviews/:id',authenticateToken,getReviewsByTruck)

router.post('/favourite',authenticateToken,handleFavoriteToggle)
router.post('/verify-otp',verifyOTP)
router.post('/send-email',sendEmail)
router.get('/refresh-token',tokenAuth)
router.get('/profile',authenticateToken,getUserProfile)
router.get('/logout',logout)
router.post("/register", userCreation);
router.post('/login',userLogin)

module.exports = router;
