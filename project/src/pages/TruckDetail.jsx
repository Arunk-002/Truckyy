import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Navigation,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import axiosInstance from "../axios/axios";
import { MapContainer, TileLayer ,Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function TruckDetail() {
  const [truck, setTruck] = useState(null); // Initialize as null
  const { id } = useParams();

  useEffect(() => {
    getTruck();
  }, [id]);

  const getTruck = async () => {
    try {
      const response = await axiosInstance.get(`/trucks/${id}/details`);
      if (response.status === 200) {
        console.log(response.data.truck);
        setTruck(response.data.truck);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!truck) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

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
                <h1 className="text-3xl capitalize font-bold text-gray-900">
                  {truck.name}
                </h1>
                <p className="text-gray-600 mt-1 font-semibold">
                  {truck.cuisineType.join(", ")}
                </p>{" "}
                {/* Cuisine Fix */}
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Star className="w-6 h-6 text-primary fill-current" />
                <span className="text-xl font-semibold">
                  {truck.rating.average.toFixed(1)}
                </span>{" "}
                {/* Rating Fix */}
                <span className="text-gray-600">
                  ({truck.rating.count} reviews)
                </span>{" "}
                {/* Reviews Fix */}
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
              <MapContainer
                center={[truck.location.coordinates[1], truck.location.coordinates[0]]}
                zoom={14}
                style={{ height: "200px", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    truck.location.coordinates[1],
                    truck.location.coordinates[0],
                  ]}
                />
              </MapContainer>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-gray-800">
                  {`Latitude: ${truck.location.coordinates[1]}, Longitude: ${truck.location.coordinates[0]}`}
                </p>{" "}
                {/* Fix Location */}
                <p className="text-gray-500 text-sm">
                  Updated {new Date(truck.location.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
            <div className="space-y-3">
              {Object.entries(truck.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-gray-700">{day}</span>
                  <span
                    className={
                      hours.isOpen
                        ? "text-gray-900"
                        : "text-red-500 font-medium"
                    }
                  >
                    {hours.isOpen ? `${hours.open} - ${hours.close}` : "CLOSED"}
                  </span>{" "}
                  {/* Fix Operating Hours */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {truck.description}
          </p>{" "}
          {/* Fix About */}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <p className="text-gray-700">Views: {truck.stats.views}</p>
          <p className="text-gray-700">Favorites: {truck.stats.favorites}</p>
        </div>
      </main>
    </div>
  );
}

export default TruckDetail;
