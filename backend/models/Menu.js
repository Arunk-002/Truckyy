const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Menu Schema (Separated to handle large menus)
const menuItemSchema = new Schema({
    truckId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodTruck',
      required: true
    },
    category: {
      type: String,
      required: true
    },
    items: [{
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      description: String,
      isAvailable: {
        type: Boolean,
        default: true
      },
      isPopular: {
        type: Boolean,
        default: false
      }
    }]
  }, {
    timestamps: true
  });