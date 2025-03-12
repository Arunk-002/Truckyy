import React from 'react';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

function TruckCard({ truck,distance }) {
  return (
    <Link to={`/truck/${truck._id}`} className="block"> {/* Use _id instead of id */}
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
                <h3 className="text-xl font-semibold capitalize text-primary">{truck.name}</h3>
                <p className="text-dark">{truck.cuisineType.join(", ")}</p> {/* Fix cuisine display */}
              </div>
              <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                <Star className="w-5 h-5 text-accent fill-current" />
                <span className="text-gray-700">{truck.rating.average.toFixed(1)}</span> {/* Fix rating display */}
                <span className="text-gray-500">({truck.rating.count})</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-secondary" />
                {/* Distance is not in backend data - Remove or calculate it */}
                <span>{Number(distance.toFixed(2))} miles away</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-secondary" />
                {truck.hours || "Hours not available"} {/* Prevent error if hours is missing */}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-secondary" />
                <span>Price not available</span> {/* Remove price until it's added in backend */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TruckCard;
