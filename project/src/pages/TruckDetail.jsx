import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Clock, DollarSign, Navigation, Heart, MessageSquare, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const SAMPLE_TRUCK = {
  id: 1,
  name: "Taco King Food Truck",
  cuisine: "Mexican, Tacos, Street Food",
  rating: 4.7,
  reviews: 125,
  distance: 0.3,
  price: 2,
  hours: {
    Monday: "11:00 AM - 8:00 PM",
    Tuesday: "11:00 AM - 8:00 PM",
    Wednesday: "11:00 AM - 8:00 PM",
    Thursday: "11:00 AM - 8:00 PM",
    Friday: "11:00 AM - 10:00 PM",
    Saturday: "12:00 PM - 10:00 PM",
    Sunday: "CLOSED"
  },
  location: "123 Main Street, San Francisco, CA",
  lastUpdated: "10 minutes ago",
  image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1200&h=400",
  about: "Taco King is family-owned food truck serving authentic Mexican street food. Our recipes have been passed down for generations, bringing the true flavors of Mexico to your neighborhood. We use only the freshest ingredients and make everything fresh daily. From our homemade tortillas to our signature salsas, every bite is crafted with love and tradition. Visit us and experience the royal treatment at Taco King!",
  popularItems: [
    {
      name: "Carne Asada Taco",
      description: "Grilled steak with onions, cilantro, and homemade salsa",
      price: 3.99
    },
    {
      name: "Chicken Quesadilla",
      description: "Grilled chicken with cheese, onions, and peppers",
      price: 7.99
    },
    {
      name: "Horchata",
      description: "Traditional Mexican rice drink with cinnamon",
      price: 2.50
    }
  ]
};

function TruckDetail() {
  const { id } = useParams();
  const truck = SAMPLE_TRUCK; // In real app, fetch truck data based on id

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setIsMobileFiltersOpen={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-[300px] relative">
            <img
              src={truck.image}
              alt={truck.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{truck.name}</h1>
                <p className="text-gray-600 mt-1">{truck.cuisine}</p>
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Star className="w-6 h-6 text-primary fill-current" />
                <span className="text-xl font-semibold">{truck.rating}</span>
                <span className="text-gray-600">({truck.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <button className="flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
            <Navigation className="w-5 h-5" />
            <span>Directions</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <Heart className="w-5 h-5" />
            <span>Favorite</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <MessageSquare className="w-5 h-5" />
            <span>Review</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Location Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Current Location</h2>
            <div className="bg-gray-100 h-[200px] rounded-lg mb-4 flex items-center justify-center text-gray-500">
              Map Component Here
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-gray-800">{truck.location}</p>
                <p className="text-gray-500 text-sm">Updated {truck.lastUpdated}</p>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
            <div className="space-y-3">
              {Object.entries(truck.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-gray-700">{day}</span>
                  <span className={hours === "CLOSED" ? "text-red-500 font-medium" : "text-gray-900"}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{truck.about}</p>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Popular Menu Items</h2>
          <div className="space-y-4">
            {truck.popularItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
                <span className="font-semibold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            View Full Menu
          </button>
        </div>

        {/* Reviews Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Reviews ({truck.reviews})</h2>
            <button className="text-primary hover:text-primary/80 transition-colors">
              See All
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TruckDetail;