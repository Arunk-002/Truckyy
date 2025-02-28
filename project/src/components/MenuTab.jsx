import React, { useEffect, useState } from "react";
import { Edit2, Trash2, X, Plus } from "lucide-react";
import axiosInstance from "../axios/axios"; // Import axiosInstance
import { confirmModal, notifyError, notifyMessage } from "../toasts/toast";
import{useTruck}from '../context/TruckContext'
function MenuTab() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const {truck} = useTruck()
  const [newItem, setNewItem] = useState({
    truckId: "",
    name: "",
    category: "",
    price: "",
    description: "",
  });
  useEffect(() => {
    if (truck) {
      setNewItem((prevState) => ({
        ...prevState,
        truckId: truck._id, // Ensure truckId is set properly
      }));
    }
    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get(`/trucks/${truck._id}/menu`);
        console.log(response.data);

        setMenuItems(response.data.truck.items || []);
        setMenuId(response.data.truck._id);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setMenuItems([]); // Prevents undefined state
      }
    };

    if (truck?._id) {
      fetchMenuItems();
    }
  }, [truck]);

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleDeleteItem = async (itemId) => {
    if (!menuId || !itemId) {
      alert("Menu ID and Item ID are required");
      return;
    }
    if (!(await confirmModal())) return null;
    try {
      const response = await axiosInstance.delete(
        `/trucks/${menuId}/item/${itemId}`
      );

      if (response.status === 200) {
        setMenuItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        notifyMessage("Item deleted successfully");
      } else {
        notifyMessage("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      notifyError(error.response?.data?.message || "Something went wrong");
    }
  };

  // Add menu item handler
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    console.log("fghjk",truck?.subscription.plan);
    
    if (menuItems.length>=3 && (truck?.subscription.plan==='free')) {
      notifyMessage('You have reached Your Limit! subscribe to unlock more')
      return
    }
    if (
      !newItem.truckId ||
      !newItem.name ||
      !newItem.category ||
      !newItem.price
    ) {
      notifyError("Truck ID, name, category, and price are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/trucks/add-item`, newItem);

      if (response.status === 201) {
        console.log(response.data.menu.items);
        setMenuItems(response.data.menu.items);
        setNewItem({
          truckId:truck?._id,
          name: "",
          category: "",
          price: "",
          description: "",
        });
        setShowAddItem(false);
        notifyMessage("New item added to the menu");
      } else {
        notifyError("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      notifyError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {menuItems && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item?.name}</h3>
                <p className="text-sm text-gray-600">{item?.description}</p>
                <p className="text-sm text-gray-500">
                  {item?.category} • ${item?.price}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No menu items available</p>
        )}
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
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={newItem.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  rows="3"
                ></textarea>
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
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuTab;
