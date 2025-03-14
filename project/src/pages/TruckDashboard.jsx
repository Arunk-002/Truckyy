import React, { useEffect, useState } from "react";
import StatsCards from "../components/StatsCards";
import AboutTab from "../components/AboutTab";
import MenuTab from "../components/MenuTab";
import HoursTab from "../components/HoursTab";
import LocationTab from "../components/LocationTab";
import SubscriptionTab from "../components/SubscriptionTab";
import { useAuth } from "../context/AuthContext";
import { useTruck } from "../context/TruckContext";

function TruckDashboard() {
  const [truckId, setTruckId] = useState();
  const [activeTab, setActiveTab] = useState("menu");
  const { truck, logoutTruck } = useTruck();
  const { user } = useAuth();
  const [navlinks, setNavlinks] = useState([]);

  useEffect(() => {
    if (truck) {
      setTruckId(truck._id);
    }
    if (truck?.subscription.plan === "premium") {
      setNavlinks(["menu", "about", "hours", "location"]);
    } else {
      setNavlinks(["menu", "about", "hours", "location", "subscription"]);
    }
  }, [truck]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="capitalize">{user.name}'s</span> Dashboard
          </h1>
          <button
            onClick={logoutTruck}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav
              className="flex space-x-8 px-6 overflow-x-auto"
              aria-label="Tabs"
            >
              {navlinks.map((tab) => (
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
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "about" && <AboutTab />}
            {activeTab === "menu" && <MenuTab />}
            {activeTab === "hours" && <HoursTab />}
            {activeTab === "location" && <LocationTab />}
            {activeTab === "subscription" && (
              <SubscriptionTab close={setActiveTab} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TruckDashboard;
