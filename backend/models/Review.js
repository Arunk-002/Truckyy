const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    truckId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodTruck',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    }
  }, {
    timestamps: true
  });