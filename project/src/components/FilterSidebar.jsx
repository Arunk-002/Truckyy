import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

function FilterSidebar({ 
  isMobileFiltersOpen, 
  setIsMobileFiltersOpen,
  selectedCuisine,
  setSelectedCuisine,
  selectedDistance,
  setSelectedDistance,
  selectedRating,
  setSelectedRating,
  allCuisines = []
}) {
  const CUISINES = ["All", "None", ...allCuisines];
  const DISTANCES = ["None", "0.5", "1", "2", "5"];
  const RATINGS = ["None", "4.5", "4.0", "3.5", "3.0"];

  return (
    <div className={`
      lg:w-72 flex-shrink-0 
      ${isMobileFiltersOpen ? 'block' : 'hidden'} 
      lg:block fixed lg:relative 
      inset-0 z-40 lg:z-0 
      bg-white lg:bg-transparent
      p-4 lg:p-0
    `}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {/* Cuisine Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Cuisine Type</h3>
          <div className="space-y-2">
            {CUISINES.map(cuisine => (
              <label key={cuisine} className="flex items-center">
                <input
                  type="radio"
                  name="cuisine"
                  checked={selectedCuisine === cuisine}
                  onChange={() => setSelectedCuisine(cuisine)}
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                />
                <span className="ml-2 text-sm text-gray-600">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Distance (miles)</h3>
          <select
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary"
          >
            {DISTANCES.map(distance => (
              <option key={distance} value={distance}>{distance === "None" ? "None" : `Within ${distance} miles`}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
          <div className="space-y-2">
            {RATINGS.map(rating => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                />
                <span className="ml-2 text-sm text-gray-600 flex items-center">
                  {rating === "None" ? "None" : `${rating}+ `} 
                  {rating !== "None" && <Star className="w-4 h-4 ml-1 text-accent fill-current" />}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
