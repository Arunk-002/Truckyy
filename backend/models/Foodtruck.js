const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodTruckSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cuisineType: [
      {
        type: String,
        trim: true,
      },
    ],
    gstInfo: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      coordinates: {
        type: [Number],
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium"],
        default: "free",
      },
      features: [
        {
          type: String,
          enum: ["analytics", "priority_support"],
        },
      ],
    },
    operatingHours: {
      Monday: { open: String, close: String, isOpen: Boolean },
      Tuesday: { open: String, close: String, isOpen: Boolean },
      Wednesday: { open: String, close: String, isOpen: Boolean },
      Thursday: { open: String, close: String, isOpen: Boolean },
      Friday: { open: String, close: String, isOpen: Boolean },
      Saturday: { open: String, close: String, isOpen: Boolean },
      Sunday: { open: String, close: String, isOpen: Boolean },
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodTruck = mongoose.model("FoodTruck", foodTruckSchema);
module.exports = FoodTruck;
