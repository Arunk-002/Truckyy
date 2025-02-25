import React from 'react';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRICES = ["$", "$$", "$$$", "$$$$"];

function TruckCard({ truck }) {
  return (
    <Link to={`/truck/${truck.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-72 h-48">
            <img
              src={truck.image}
              alt={truck.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-semibold text-primary">{truck.name}</h3>
                <p className="text-dark">{truck.cuisine}</p>
              </div>
              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                <Star className="w-5 h-5 text-accent fill-current" />
                <span className="text-gray-700">{truck.rating}</span>
                <span className="text-gray-500">({truck.reviews})</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-secondary" />
                {truck.distance} miles away
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-secondary" />
                {truck.hours}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-secondary" />
                {PRICES[truck.price - 1]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TruckCard;