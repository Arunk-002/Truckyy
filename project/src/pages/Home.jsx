import React, { useState, useMemo } from 'react';
import { Map, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import TruckCard from '../components/TruckCard';

const SAMPLE_TRUCKS = [
  {
    id: 1,
    name: "Taco Truck Deluxe",
    cuisine: "Mexican",
    rating: 4.8,
    reviews: 234,
    distance: 0.3,
    price: 2,
    hours: "Open until 10PM",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 2,
    name: "Burger Paradise",
    cuisine: "American",
    rating: 4.6,
    reviews: 186,
    distance: 0.5,
    price: 3,
    hours: "Open until 9PM",
    image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 3,
    name: "Pasta Express",
    cuisine: "Italian",
    rating: 4.2,
    reviews: 156,
    distance: 1.2,
    price: 2,
    hours: "Open until 8PM",
    image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 4,
    name: "Sushi on Wheels",
    cuisine: "Asian",
    rating: 4.9,
    reviews: 312,
    distance: 0.8,
    price: 4,
    hours: "Open until 11PM",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&h=300"
  }
];

function Home() {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState("5");
  const [selectedRating, setSelectedRating] = useState("3.0");
  const [selectedPrice, setSelectedPrice] = useState("$$$$");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredTrucks = useMemo(() => {
    return SAMPLE_TRUCKS.filter(truck => {
      if (searchQuery && !truck.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !truck.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCuisine !== "All" && truck.cuisine !== selectedCuisine) {
        return false;
      }
      if (truck.distance > parseFloat(selectedDistance)) {
        return false;
      }
      if (truck.rating < parseFloat(selectedRating)) {
        return false;
      }
      const maxPrice = selectedPrice.length;
      if (truck.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedCuisine, selectedDistance, selectedRating, selectedPrice]);

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
                    <TruckCard key={truck.id} truck={truck} />
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