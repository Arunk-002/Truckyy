import React from 'react';
import { MapPin } from 'lucide-react';

function LocationTab({ location, handleUpdateLocation }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Current Location</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex items-start space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-gray-900">{location.address}</p>
            <p className="text-sm text-gray-500">
              Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500">
          Map Component Here
        </div>
        <button
          onClick={handleUpdateLocation}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Update Location
        </button>
      </div>
    </div>
  );
}

export default LocationTab;