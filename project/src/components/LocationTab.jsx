import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { MapPin } from "lucide-react";
import { notifyError, notifyMessage } from "../toasts/toast";
import axiosInstance from "../axios/axios";
import { useTruck } from "../context/TruckContext";

function LocationTab() {
  const { truck } = useTruck();
  const [location, setLocation] = useState({
    address: "Click on the map to select a location",
    coordinates: { lat: 0, lng: 0 },
  });
  useEffect(() => {
    if (truck) {
      setLocation({
        address: "Click on the map to select a location",
        coordinates: {
          lat: truck.location.coordinates[1],
          lng: truck.location.coordinates[0],
        }, // Default: New York
      });
    }
  }, [truck]);

  //update location 
  const handleUpdateLocation = async () => {
    try {
      const response = await axiosInstance.put(
        `trucks/${truck._id}/update-location`,
        { ...location.coordinates }
      );
      if (response.status === 200) {
        const UpdatedLocation = response.data.data
        notifyMessage(response.data.message);
        console.log(response.data);
        setLocation({
          address: "New Location",
          coordinates:{ lat: UpdatedLocation[1],
          lng: UpdatedLocation[0]},
        });
      }
    } catch (error) {
      console.log(error);
      notifyError("Could not Update location");
    }
  };

  //addMarker onclicking the map
  const AddMarkerOnClick = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLocation({
          address: "Selected Location",
          coordinates: { lat, lng },
        });
      },
    });
    return null;
  };

  //recentering the map after adding marker
  const RecenterMap = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([location.coordinates.lat, location.coordinates.lng], 100);
    }, [location, map]);
    return null;
  };

  //get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            address: "Your Current Location",
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          notifyError("Location access denied or unavailable.");
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      notifyError("Your browser does not support geolocation.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Current Location</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex items-start space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-gray-900">{location?.address}</p>
            <p className="text-sm text-gray-500">
              Lat: {location?.coordinates.lat}, Lng: {location?.coordinates.lng}
            </p>
          </div>
        </div>

        {/* Map Component */}
        <MapContainer
          center={[location?.coordinates.lat, location?.coordinates.lng]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap />
          <AddMarkerOnClick />
          <Marker
            position={[location?.coordinates.lat, location?.coordinates.lng]}
          />
        </MapContainer>

        <div className="flex justify-end mt-5 items-center gap-x-3">
          <button
            onClick={handleUpdateLocation}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Update Location
          </button>
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-white text-primary border-primary border rounded-lg hover:bg-secondary hover:text-primary"
          >
            Current Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationTab;
