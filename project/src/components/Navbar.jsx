import React from "react";
import { MapPin, Search, List, LogOut, User, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ setIsMobileFiltersOpen, searchQuery, setSearchQuery, showSearch = true }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <MapPin className="w-8 h-8" />
            <span className="text-xl font-bold hidden sm:inline">
              FoodTruck Finder
            </span>
          </div>
        </Link>

        {showSearch && (
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food trucks, cuisines, locations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary bg-white text-gray-800"
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="p-2 hover:text-accent">
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 hover:text-accent"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </> 
          ) : (
            <button className="flex gap-x-2" onClick={() => navigate('/signin')}>
              <LogIn /> Login
            </button>
          )}
        </div>

        <button
          className="sm:hidden p-2 hover:bg-primary-dark"
          onClick={() => setIsMobileFiltersOpen && setIsMobileFiltersOpen(true)}
        >
          <List className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;