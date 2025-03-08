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
  const [isVerified, setVerified] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const { user } = useAuth();
  const [curUser, setUser] = useState(user);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Initialize user data
  useEffect(() => {
    if (user) {
      getUserProfile();
    }
  }, [user]);

  const getUserProfile = async () => {
    if (!user?._id) return;
    try {
      const response = await axiosInstance.get(
        `/users/user-profile/${user._id}`
      );
      if (response.status === 200) {
        setUser(response.data.user);
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!curUser || !curUser.name || curUser.password === "") {
      notifyError("No changes to save");
      return;
    }
    setLoading(true);
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
    if (isVerified) {
      setLoading(true);
      userUpdation();
      setLoading(false);
    }
  }, [isVerified]);

  // Ensure user is loaded before rendering
  if (!user) return <CustomLoader />;

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
                {curUser?.name ? curUser.name[0] : "?"}
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {curUser?.name || "Guest"}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                  <span>
                    Member since {curUser?.createdAt?.slice(0, 4) || "N/A"}
                  </span>
                  <span>
                    {reviews?.length || 0} Reviews ·{" "}
                    {curUser?.favorites?.length || 0} Favorites
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              {["profile", "reviews", "favorites"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <button
                onClick={() => navigate("/truck/signup")}
                className="px-6 py-4 text-sm font-medium self-end text-primary"
              >
                Have a Food Truck?
              </button>
            </div>
          </div>

          {/* Profile Section */}
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
                      value={curUser?.name || ""}
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
                      {curUser?.email || "N/A"}
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

          {/* Reviews Section */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold">Your Recent Reviews</h2>
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">
                        {review.truckId?.name || "Unknown Truck"}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="text-primary fill-current w-5 h-5" />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Favorites Section */}
          {activeTab === "favorites" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Recent Favorites</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {curUser.favorites && curUser.favorites.length > 0 ? (
                    curUser.favorites.map((favorite) => (
                      <a
                        href={`/truck/${favorite._id}`}
                        target="_blank"
                        key={favorite._id}
                        className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
                      >
                        <img
                          src={favorite.image}
                          alt={favorite.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900">
                            {favorite.name}
                          </h3>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-gray-500">Add Some Favorites 😁</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          onVerify={setVerified}
          email={curUser?.email}
        />
      </div>
    </>
  );
}

export default Profile;
