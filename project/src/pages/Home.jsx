import React, { useEffect, useState, useMemo } from "react";
import { Map, List } from "lucide-react";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import TruckCard from "../components/TruckCard";
import axiosInstance from "../axios/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

function Home() {
  const [AllTrucks, setAllTrucks] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("5");
  const [selectedRating, setSelectedRating] = useState("0");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const truckIcon = new Icon({
    iconUrl: "/food-truck.png", // Truck image URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open
  });

  useEffect(() => {
    getAllTrucks();
  }, []);

  const getAllTrucks = async () => {
    try {
      const response = await axiosInstance.get("/trucks/");
      if (response.status === 200) {
        setAllTrucks(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const allCuisines = useMemo(() => {
    const cuisines = new Set();
    AllTrucks.forEach((truck) => {
      if (truck.cuisineType) {
        truck.cuisineType.forEach((type) => cuisines.add(type));
      }
    });
    return Array.from(cuisines);
  }, [AllTrucks]);

  const filteredTrucks = useMemo(() => {
    return AllTrucks.filter((truck) => {
      if (!truck || !truck.name) return false;

      if (
        searchQuery &&
        !(
          truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          truck.cuisineType
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      if (
        selectedCuisine !== "All" &&
        (!truck.cuisineType || !truck.cuisineType.includes(selectedCuisine))
      ) {
        return false;
      }

      if (
        truck.rating &&
        truck.rating.average !== undefined &&
        truck.rating.average < parseFloat(selectedRating)
      ) {
        return false;
      }
      return true;
    });
  }, [AllTrucks, searchQuery, selectedCuisine, selectedRating]);

  const mapCenter =
    AllTrucks.length > 0
      ? [
          AllTrucks[0].location.coordinates[1],
          AllTrucks[0].location.coordinates[0],
        ]
      : [20.5937, 78.9629];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setIsMobileFiltersOpen={setIsMobileFiltersOpen} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            isMobileFiltersOpen={isMobileFiltersOpen}
            setIsMobileFiltersOpen={setIsMobileFiltersOpen}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            allCuisines={allCuisines}
          />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-2 mb-6 inline-flex">
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-secondary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5 inline-block mr-2" />
                List View
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === "map"
                    ? "bg-secondary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("map")}
              >
                <Map className="w-5 h-5 inline-block mr-2" />
                Map View
              </button>
            </div>

            {viewMode === "map" ? (
              <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center text-gray-500">
                <MapContainer
                  center={mapCenter}
                  zoom={14}
                  style={{ height: "600px", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {AllTrucks.map(
                    (truck) =>
                      truck.location?.coordinates?.length === 2 && (
                        <Marker
                          key={truck._id}
                          position={[
                            truck.location.coordinates[1],
                            truck.location.coordinates[0],
                          ]}
                          icon={truckIcon} // 👈 Add custom icon here
                        >
                          <Popup>
                            <a href={`${window.location.origin}/truck/${truck._id}`}>
                              <h3>{truck?.name || "No Name"}</h3>
                              <p>
                                {truck?.cuisineType?.join(", ") ||
                                  "Cuisine not specified"}
                              </p>
                              {/* Add fallbacks for all data fields */}
                              {truck?.image && (
                                <img src={truck.image} alt={truck.name} />
                              )}
                            </a>
                          </Popup>
                        </Marker>
                      )
                  )}
                </MapContainer>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTrucks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No food trucks match your filters.
                    </p>
                    <p className="text-gray-400">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                ) : (
                  filteredTrucks.map((truck) => (
                    <TruckCard key={truck._id} truck={truck} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
