import React, { useEffect, useState, useMemo } from 'react';
import { Map, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import TruckCard from '../components/TruckCard';
import axiosInstance from '../axios/axios';

function Home() {
  const [AllTrucks, setAllTrucks] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("5");
  const [selectedRating, setSelectedRating] = useState("3.0");
  const [selectedPrice, setSelectedPrice] = useState("$$$$");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    getAllTrucks();
  }, []);

  const getAllTrucks = async () => {
    try {
      const response = await axiosInstance.get('/trucks/');
      if (response.status === 200) {
        console.log(response.data.data);
        setAllTrucks(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredTrucks = useMemo(() => {
    return AllTrucks.filter(truck => {
      // Filter by search query: check in name and cuisineType array
      if (searchQuery && !(
        truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.cuisineType.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      )) {
        return false;
      }

      // Filter by selected cuisine: if not "All", check if truck.cuisineType contains it
      if (selectedCuisine !== "All" && !truck.cuisineType.includes(selectedCuisine)) {
        return false;
      }

      // Since the backend data doesn't include distance and price, these filters are omitted.
      // If you plan to implement them later, calculate distance from truck.location.coordinates or add a price field.

      // Filter by rating using truck.rating.average
      if (truck.rating && truck.rating.average < parseFloat(selectedRating)) {
        return false;
      }

      return true;
    });
  }, [AllTrucks, searchQuery, selectedCuisine, selectedRating]);

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
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />

          <div className="flex-1">
            {/* View Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-2 mb-6 inline-flex">
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-secondary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5 inline-block mr-2" />
                List View
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'map'
                    ? 'bg-secondary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('map')}
              >
                <Map className="w-5 h-5 inline-block mr-2" />
                Map View
              </button>
            </div>

            {viewMode === 'map' ? (
              <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center text-gray-500">
                Interactive Map Component Here
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTrucks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No food trucks match your filters.</p>
                    <p className="text-gray-400">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  filteredTrucks.map(truck => (
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
