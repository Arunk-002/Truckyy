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
      description: {
        type:String
      }
    }]
  }, {
    timestamps: true
  });

  const Menu = mongoose.model('Menu',menuItemSchema)
  module.exports = Menu