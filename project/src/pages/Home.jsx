import React, { useEffect, useState, useMemo } from "react";
import { Map, List } from "lucide-react";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import TruckCard from "../components/TruckCard";
import axiosInstance from "../axios/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import CalculateDistance from "../utils/CalculateDistance";

function Home() {
  const [AllTrucks, setAllTrucks] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("5");
  const [selectedRating, setSelectedRating] = useState("0");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const truckIcon = new Icon({
    iconUrl: "/food-truck.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    getAllTrucks();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setSelectedDistance("None");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!userLocation && selectedDistance !== "None") {
      setSelectedDistance("None");
    }
  }, [userLocation, selectedDistance]);

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

  const trucksWithDistance = useMemo(() => {
    return AllTrucks.map((truck) => {
      let distance = null;
      if (userLocation && truck.location?.coordinates?.length === 2) {
        const truckLon = truck.location.coordinates[0];
        const truckLat = truck.location.coordinates[1];
        const distanceKm = CalculateDistance(
          userLocation.lat,
          userLocation.lon,
          truckLat,
          truckLon
        );
        distance = distanceKm * 0.621371;
      }
      return { ...truck, distance };
    });
  }, [AllTrucks, userLocation]);

  const filteredTrucks = useMemo(() => {
    return trucksWithDistance.filter((truck) => {
      if (!truck || !truck.name) return false;

      // Search filter
      if (
        searchQuery &&
        !(
          truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          truck.cuisineType
            ?.join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      // Cuisine filter
      if (
        selectedCuisine !== "All" &&
        !truck.cuisineType?.includes(selectedCuisine)
      ) {
        return false;
      }

      // Rating filter
      if (truck.rating?.average < parseFloat(selectedRating)) {
        return false;
      }

      // Distance filter
      if (
        selectedDistance !== "None" &&
        (truck.distance === null ||
          truck.distance > parseFloat(selectedDistance))
      ) {
        return false;
      }

      return true;
    });
  }, [
    trucksWithDistance,
    searchQuery,
    selectedCuisine,
    selectedRating,
    selectedDistance,
  ]);

  const mapCenter = userLocation
    ? [userLocation.lat, userLocation.lon]
    : AllTrucks[0]?.location?.coordinates
    ? [
        AllTrucks[0].location.coordinates[1],
        AllTrucks[0].location.coordinates[0],
      ]
    : [20.5937, 78.9629];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        setIsMobileFiltersOpen={setIsMobileFiltersOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={true} // This is optional since true is the default
      />
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
            allCuisines={Array.from(
              new Set(AllTrucks.flatMap((t) => t.cuisineType))
            )}
            userLocation={userLocation}
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
                  {userLocation && (
                    <Marker
                      position={[userLocation.lat, userLocation.lon]}
                      icon={
                        new Icon({
                          iconUrl:
                            "https://img.icons8.com/ios/50/standing-man.png",
                          iconSize: [24, 24],
                          iconAnchor: [12, 24],
                        })
                      }
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {trucksWithDistance.map(
                    (truck) =>
                      truck.location?.coordinates?.length === 2 && (
                        <Marker
                          key={truck._id}
                          position={[
                            truck.location.coordinates[1],
                            truck.location.coordinates[0],
                          ]}
                          icon={truckIcon}
                        >
                          <Popup>
                            <a
                              href={`${window.location.origin}/truck/${truck._id}`}
                            >
                              <h3 className="font-semibold">{truck?.name}</h3>
                              <p className="text-sm">
                                {truck?.cuisineType?.join(", ") ||
                                  "No cuisine specified"}
                              </p>
                              {truck.distance !== null && (
                                <p className="text-sm mt-1">
                                  {truck.distance.toFixed(1)} miles away
                                </p>
                              )}
                              {truck?.image && (
                                <img
                                  src={truck.image}
                                  alt={truck.name}
                                  className="mt-2 w-32 h-32 object-cover"
                                />
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
                    <TruckCard
                      key={truck._id}
                      truck={truck}
                      distance={truck?.distance}
                    />
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
