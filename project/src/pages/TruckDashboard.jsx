import React, { useEffect, useState } from "react";
import { Power } from "lucide-react";
import StatsCards from "../components/StatsCards";
import AboutTab from "../components/AboutTab";
import MenuTab from "../components/MenuTab";
import HoursTab from "../components/HoursTab";
import LocationTab from "../components/LocationTab";
import SubscriptionTab from "../components/SubscriptionTab";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axios/axios";

function TruckDashboard() {
  const [truckId, setTruckid] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("menu");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const { user } = useAuth();
  const getTruckDetails = async () => {
    try {
      const response = await axiosInstance.get(`/trucks/${user._id}`);
      if (response.status === 200) {
        setTruckid(response.data.truck._id); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTruckDetails();
  });
  // State for truck information
  const [truckInfo, setTruckInfo] = useState({
    name: user.name,
    description:
      "Taco King is a family-owned food truck serving authentic Mexican street food. Our recipes have been passed down for generations, bringing the true flavors of Mexico to your neighborhood.",
    shortDescription: "Authentic Mexican street food with a modern twist",
    cuisine: "Mexican",
    specialties: ["Tacos", "Burritos", "Quesadillas"],
    story: "Founded in 2020, Taco King started as a passion project...",
    coverImage:
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1200&h=400",
  });

  const [operatingHours, setOperatingHours] = useState({
    Monday: { open: "11:00", close: "20:00", isOpen: true },
    Tuesday: { open: "11:00", close: "20:00", isOpen: true },
    Wednesday: { open: "11:00", close: "20:00", isOpen: true },
    Thursday: { open: "11:00", close: "20:00", isOpen: true },
    Friday: { open: "11:00", close: "22:00", isOpen: true },
    Saturday: { open: "12:00", close: "22:00", isOpen: true },
    Sunday: { open: "12:00", close: "20:00", isOpen: false },
  });

  const [location, setLocation] = useState({
    address: "123 Food Truck Lane, City",
    coordinates: { lat: 40.7128, lng: -74.006 },
  });

  const [stats] = useState({
    favorites: 156,
    todayOrders: 24,
    totalRevenue: 1250.5,
  });

  // Handlers
  const handleUpdateTruckInfo = (field, value) => {
    setTruckInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    // Here you would typically save to backend
  };

  const handleUpdateHours = (day, field, value) => {
    setOperatingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleUpdateLocation = () => {
    // Update location logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className=" capitalize">{user.name}'s</span> Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-full flex items-center ${
                  isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                <Power className="w-4 h-4 mr-2" />
                {isOpen ? "Open" : "Closed"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav
              className="flex space-x-8 px-6 overflow-x-auto"
              aria-label="Tabs"
            >
              {["menu", "about", "hours", "location", "subscription"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "about" && (
              <AboutTab
                truckInfo={truckInfo}
                isEditingDescription={isEditingDescription}
                setIsEditingDescription={setIsEditingDescription}
                handleUpdateTruckInfo={handleUpdateTruckInfo}
                handleSaveDescription={handleSaveDescription}
              />
            )}

            {activeTab === "menu" && <MenuTab truckId={truckId} />}

            {activeTab === "hours" && (
              <HoursTab
                operatingHours={operatingHours}
                handleUpdateHours={handleUpdateHours}
              />
            )}

            {activeTab === "location" && (
              <LocationTab
                location={location}
                handleUpdateLocation={handleUpdateLocation}
              />
            )}

            {activeTab === "subscription" && <SubscriptionTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TruckDashboard;
