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
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../context/AuthContext";
import { notifyMessage } from "../toasts/toast";
import ReviewsTab from "../components/ReviewsTab"; // Import the ReviewsTab component
import { Icon } from "leaflet";
// Create a context provider to pass truck data to the ReviewsTab
import { createContext } from "react";
import CalculateDistance from "../utils/CalculateDistance";
export const TruckContext = createContext();

export const TruckProvider = ({ children, value }) => {
  return (
    <TruckContext.Provider value={value}>{children}</TruckContext.Provider>
  );
};

function TruckDetail() {
  const { user } = useAuth();
  const [avgReview, setavgReview] = useState(0);
  const [truck, setTruck] = useState(null);
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  const [showReviewsTab, setShowReviewsTab] = useState(false);

  useEffect(() => {
    getTruck();
  }, [id, user]);
  useEffect(() => {
    if (truck && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          const truckLat = truck.location.coordinates[1];
          const truckLon = truck.location.coordinates[0];

          const distance = CalculateDistance(
            userLat,
            userLon,
            truckLat,
            truckLon
          );
          setTruck((prevTruck) => ({ ...prevTruck, distance }));
        },
        (error) => console.error("Error fetching location", error),
        { enableHighAccuracy: true }
      );
    }
  }, [truck]);
  const shareTruck = () => {
    const truckURL = `${window.location.origin}/truck/${truck._id}`;
    navigator.clipboard.writeText(truckURL);
    notifyMessage("Truck link copied to clipboard!");
  };

  const getTruck = async () => {
    try {
      const response = await axiosInstance.get(`/trucks/${id}/details`);
      if (response.status === 200) {
        console.log(response.data.truck);
        setTruck(response.data.truck);
        if (user && user.favorites) {
          setFav(user.favorites.includes(response.data.truck._id));
          console.log(user.favorites.includes(response.data.truck._id));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const favourite = async () => {
    try {
      const response = await axiosInstance.post("/users/favourite", {
        userId: user._id,
        truckId: id,
      });
      if (response.status === 200) {
        notifyMessage(response.data.message);
      }
      setFav((prev) => !prev);
    } catch (error) {
      console.error(
        "Error toggling favorite:",
        error.response?.data || error.message
      );
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // Toggle the reviews tab visibility
  const toggleReviewsTab = () => {
    setShowReviewsTab(!showReviewsTab);
  };

  if (!truck) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <TruckProvider value={{ truck }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar setIsMobileFiltersOpen={() => {}} showSearch={false} />

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
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Star className="w-6 h-6 text-primary fill-current" />
                  <span className="text-xl font-semibold">
                    {avgReview ? avgReview : "3"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <button className="flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
              <MapPin className="w-5 h-5" />
              <span>Location</span>
            </button>
            {user ? (
              <>
                <button
                  onClick={favourite}
                  className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  {fav ? (
                    <Heart className="w-5 h-5 text-primary fill-current" />
                  ) : (
                    <Heart className="w-5 h-5" />
                  )}
                  <span>Favorite</span>
                </button>
              </>
            ) : (
              ""
            )}
            <a
              href="#reviews"
              onClick={toggleReviewsTab}
              className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Review</span>
            </a>
            <button
              onClick={shareTruck}
              className="flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
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
                  center={[
                    truck.location.coordinates[1],
                    truck.location.coordinates[0],
                  ]}
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
                    icon={
                      new Icon({
                        iconUrl: "/food-truck.png",
                        iconSize: [24, 24],
                        iconAnchor: [12, 24],
                      })
                    }
                  />
                </MapContainer>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-gray-800">
                    {truck.distance?.toFixed(1)} miles away
                  </p>
                  <p className="text-gray-500 text-sm">
                    Updated{" "}
                    {new Date(truck.location.updatedAt).toLocaleString()}
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
                      {hours.isOpen
                        ? `${hours.open} - ${hours.close}`
                        : "CLOSED"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{truck.description}</p>
          </div>

          {/* Reviews */}
          <div id="reviews" className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <button
                onClick={toggleReviewsTab}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                See All
              </button>
            </div>

            {/* Render the ReviewsTab component when showReviewsTab is true */}
            {showReviewsTab && (
              <ReviewsTab setavgReview={setavgReview} truckId={id} />
            )}
          </div>
        </main>
      </div>
    </TruckProvider>
  );
}

export default TruckDetail;
