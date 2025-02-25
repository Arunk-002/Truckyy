import React, { useState } from 'react';
import { 
  Clock, MapPin, Menu, Heart, Power, Crown, 
  Plus, ChevronDown, X, Edit2, Save, Trash2,
  FileText, Image as ImageIcon
} from 'lucide-react';

function TruckDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const [showAddItem, setShowAddItem] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [truckInfo, setTruckInfo] = useState({
    name: "Taco King Food Truck",
    description: "Taco King is a family-owned food truck serving authentic Mexican street food. Our recipes have been passed down for generations, bringing the true flavors of Mexico to your neighborhood.",
    shortDescription: "Authentic Mexican street food with a modern twist",
    cuisine: "Mexican",
    specialties: ["Tacos", "Burritos", "Quesadillas"],
    story: "Founded in 2020, Taco King started as a passion project...",
    coverImage: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1200&h=400"
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

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Classic Burger", price: 8.99, category: "Burgers", description: "Juicy beef patty with fresh vegetables" },
    { id: 2, name: "Cheese Fries", price: 4.99, category: "Sides", description: "Crispy fries with melted cheese" },
  ]);

  const [location, setLocation] = useState({
    address: "123 Food Truck Lane, City",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  });

  const [stats] = useState({
    favorites: 156,
    todayOrders: 24,
    totalRevenue: 1250.50
  });

  const handleUpdateTruckInfo = (field, value) => {
    setTruckInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    // Here you would typically save to backend
  };

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    // Add new menu item logic
    setShowAddItem(false);
  };

  const handleUpdateHours = (day, field, value) => {
    setOperatingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
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
            <h1 className="text-2xl font-bold text-gray-900">Food Truck Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`px-4 py-2 rounded-full flex items-center ${
                  isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                <Power className="w-4 h-4 mr-2" />
                {isOpen ? 'Open' : 'Closed'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Favorites</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.favorites}</h3>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.todayOrders}</h3>
              </div>
              <Menu className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <Crown className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
              {['menu', 'about', 'hours', 'location', 'subscription'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Truck Information</h2>
                  <button
                    onClick={() => setIsEditingDescription(!isEditingDescription)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    {isEditingDescription ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Details
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Cover Image */}
                  <div className="relative">
                    <img
                      src={truckInfo.coverImage}
                      alt="Truck Cover"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {isEditingDescription && (
                      <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
                        <ImageIcon className="w-5 h-5 text-primary" />
                      </button>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Truck Name
                      </label>
                      {isEditingDescription ? (
                        <input
                          type="text"
                          value={truckInfo.name}
                          onChange={(e) => handleUpdateTruckInfo('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{truckInfo.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cuisine Type
                      </label>
                      {isEditingDescription ? (
                        <input
                          type="text"
                          value={truckInfo.cuisine}
                          onChange={(e) => handleUpdateTruckInfo('cuisine', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{truckInfo.cuisine}</p>
                      )}
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    {isEditingDescription ? (
                      <input
                        type="text"
                        value={truckInfo.shortDescription}
                        onChange={(e) => handleUpdateTruckInfo('shortDescription', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Brief description of your food truck (appears in search results)"
                      />
                    ) : (
                      <p className="text-gray-900">{truckInfo.shortDescription}</p>
                    )}
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description
                    </label>
                    {isEditingDescription ? (
                      <textarea
                        value={truckInfo.description}
                        onChange={(e) => handleUpdateTruckInfo('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tell customers about your food truck, its history, and what makes it special"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{truckInfo.description}</p>
                    )}
                  </div>

                  {/* Specialties */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialties
                    </label>
                    {isEditingDescription ? (
                      <div className="space-y-2">
                        {truckInfo.specialties.map((specialty, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={specialty}
                              onChange={(e) => {
                                const newSpecialties = [...truckInfo.specialties];
                                newSpecialties[index] = e.target.value;
                                handleUpdateTruckInfo('specialties', newSpecialties);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const newSpecialties = truckInfo.specialties.filter((_, i) => i !== index);
                                handleUpdateTruckInfo('specialties', newSpecialties);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => handleUpdateTruckInfo('specialties', [...truckInfo.specialties, ''])}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          + Add Specialty
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {truckInfo.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Our Story */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Our Story
                    </label>
                    {isEditingDescription ? (
                      <textarea
                        value={truckInfo.story}
                        onChange={(e) => handleUpdateTruckInfo('story', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Share your food truck's journey, mission, and values"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{truckInfo.story}</p>
                    )}
                  </div>

                  {/* Save Button */}
                  {isEditingDescription && (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsEditingDescription(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveDescription}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Menu Items</h2>
                  <button
                    onClick={() => setShowAddItem(true)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </button>
                </div>

                {/* Menu Items List */}
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.category} • ${item.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item Modal */}
                {showAddItem && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Add Menu Item</h3>
                        <button onClick={() => setShowAddItem(false)}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <form onSubmit={handleAddMenuItem} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Price</label>
                          <input type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" rows="3"></textarea>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowAddItem(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                          >
                            Add Item
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hours Tab */}
            {activeTab === 'hours' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Operating Hours</h2>
                <div className="space-y-4">
                  {Object.entries(operatingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="w-28">
                        <span className="font-medium">{day}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleUpdateHours(day, 'open', e.target.value)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleUpdateHours(day, 'close', e.target.value)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={hours.isOpen}
                            onChange={(e) => handleUpdateHours(day, 'isOpen', e.target.checked)}
                            className="rounded text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-gray-600">Open</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Save Changes
                </button>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Current Location</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-start space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-gray-900">{location.address}</p>
                      <p className="text-sm text-gray-500">
                        Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                    Map Component Here
                  </div>
                  <button
                    onClick={handleUpdateLocation}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Update Location
                  </button>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Subscription Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Plan */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Basic</h3>
                    <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-500">/mo</span></p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Basic Analytics
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Up to 50 Menu Items
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Email Support
                      </li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                      Current Plan
                    </button>
                  </div>

                  {/* Pro Plan */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-primary relative">
                    <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      Popular
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Pro</h3>
                    <p className="text-3xl font-bold mb-4">$49<span className="text-sm text-gray-500">/mo</span></p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Advanced Analytics
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Unlimited Menu Items
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Priority Support
                      </li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/10">
                      Upgrade
                    </button>
                  </div>

                  {/* Premium Plan */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Premium</h3>
                    <p className="text-3xl font-bold mb-4">$99<span className="text-sm text-gray-500">/mo</span></p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Custom Analytics
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        White-label Service
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        24/7 Support
                      </li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/10">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TruckDashboard;