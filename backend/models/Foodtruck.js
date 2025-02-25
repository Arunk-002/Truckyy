const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTruckSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  cuisineType: [{
    type: String,
    trim: true
  }],
  gstInfo:{
    type:String,
    required:true,
    unique:true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String,
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    expiryDate: Date,
    features: [{
      type: String,
      enum: ['analytics','priority_support']
    }]
  },
  operatingHours: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    open: String,
    close: String,
    isClosed: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const FoodTruck = mongoose.model("FoodTruck",foodTruckSchema)
module.exports=FoodTruck