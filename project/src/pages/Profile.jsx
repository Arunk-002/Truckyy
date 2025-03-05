import React, { useEffect, useState } from "react";
import { Star, Home, Search, Map, User, Settings } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { notifyError, notifyLogin } from "../toasts/toast";
import SendEmail from "../utils/SendEmail";
import CustomLoader from "../components/CustomLoader";
import OTPModal from "../components/OTPModal";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [isVerifed, setVerified] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const { user } = useAuth();
  const [curUser, setUser] = useState(user);
  const navigate = useNavigate();

  // Initialize user data
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!curUser || user.name === curUser.name || curUser.password === "") {
      notifyError("No changes to save");
      return;
    }
    setLoading(true);
    console.log("asdfadsf");
    try {
      const response = await SendEmail(curUser.email);
      if (response) {
        setIsOTPModalOpen(true);
        setLoading(false);
      } else {
        notifyError("Failed to send verification email");
      }
    } catch (error) {
      console.error("Error in handleUpdateProfile:", error);
      notifyError("Something went wrong");
    }
  };

  const userUpdation = async () => {
    try {
      const response = await axiosInstance.put(
        `/users/update/${curUser._id}`,
        curUser
      );
      if (response.status === 202) {
        notifyLogin("Profile updated successfully");
        setUser(curUser);
      }
    } catch (error) {
      console.log(error);

      notifyError(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (isVerifed) {
      setLoading(true);
      userUpdation();
      setLoading(false);
    }
  }, [isVerifed]);
  return (
    <>
      {loading && <CustomLoader />}
      <div className="min-h-screen bg-gray-50 pb-16">
        <Navbar setIsMobileFiltersOpen={() => {}} />
        {/* Profile Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full capitalize bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
                {user.name[0]}
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                  <span>Member since {curUser.createdAt.slice(0, 4)}</span>
                  <span>
                    {curUser.reviewCount} Reviews · {curUser.favoriteCount}{" "}
                    Favorites
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "favorites"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => navigate("/truck/signup")}
                className="px-6 py-4 text-sm font-medium self-end text-primary"
              >
                Have a Food Truck ?
              </button>
            </div>
          </div>

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">
                Personal Information
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={curUser.name}
                      onChange={(e) =>
                        setUser({ ...curUser, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (non-editable)
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
                      {curUser.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value="••••••••"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        readOnly
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-primary hover:text-primary/80 text-sm"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold"> Favorites</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* {curUser.favorites.map(favorite => (
                  <div key={favorite.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-48">
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{favorite.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {favorite.cuisine} · {favorite.distance} miles away
                      </p>
                    </div>
                  </div>
                ))} */}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Recent Reviews</h2>
                  <button className="text-primary hover:text-primary/80">
                    See All
                  </button>
                </div>
                <div className="space-y-6">
                  {/* {curUser.reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <img
                        src={review.image}
                        alt={review.truckName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-900">{review.truckName}</h3>
                          <button className="text-primary hover:text-primary/80 text-sm">
                            Edit
                          </button>
                        </div>
                        <div className="flex items-center mt-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-accent fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))} */}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:hidden">
            <div className="flex justify-between items-center">
              <button className="flex flex-col items-center text-gray-500">
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <Search className="w-6 h-6" />
                <span className="text-xs mt-1">Search</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <Map className="w-6 h-6" />
                <span className="text-xs mt-1">Map</span>
              </button>
              <button className="flex flex-col items-center text-primary">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <Settings className="w-6 h-6" />
                <span className="text-xs mt-1">Settings</span>
              </button>
            </div>
          </div>
        </div>
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          onVerify={setVerified}
          email={curUser.email}
        />
      </div>
    </>
  );
}

export default Profile;
