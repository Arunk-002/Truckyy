const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "owner"],
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "FoodTruck",
      },
    ]
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User',userSchema)
module.exports=User