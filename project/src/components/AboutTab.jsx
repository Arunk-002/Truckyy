import React, { useState } from "react";
import { Save, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { useTruck } from "../context/TruckContext";
import axiosInstance from "../axios/axios";
import { notifyError, notifyMessage } from "../toasts/toast";

function AboutTab() {
  const { truck } = useTruck();
  const [image, setImage] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Store the original truck data
  const initialTruckInfo = {
    name: truck?.name || "",
    description: truck?.description || "Add Your description",
    cuisineType: truck?.cuisineType || ["Add Your's"],
    image:
      truck?.image ||
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1200&h=400",
  };

  const [truckInfo, setTruckInfo] = useState(initialTruckInfo);
  const [backupTruckInfo, setBackupTruckInfo] = useState(initialTruckInfo);

  const handleUpdateTruckInfo = (field, value) => {
    setTruckInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDescription = async () => {
    try {
      if (truck?.cuisineType.length >= 1 && truck?.subscription.plan === "free") {
        notifyMessage("You have reached Your Limit! subscribe to unlock more");
        return;
      }
      setIsEditingDescription(false);
      setBackupTruckInfo(truckInfo); // Update backup with saved state
      const truckId = truck?._id; // Replace this with the actual truck ID
      // Create a new FormData object
      const formData = new FormData();

      // Append all fields except 'name'
      Object.entries(truckInfo).forEach(([key, value]) => {
        if (key !== "name") {
          if (key === "image" && image) {
            // If image is a new file, append it as a file
            formData.append(key, image);
          } else if (Array.isArray(value)) {
            // If value is an array (e.g., cuisineType), append each item
            value.forEach((item) => formData.append(`${key}`, item));
          } else {
            formData.append(key, value);
          }
        }
      });
      const response = await axiosInstance.put(
        `trucks/${truckId}/update-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Truck updated successfully:", response.data);
      notifyMessage("Truck updated successfully");
    } catch (error) {
      notifyError("Error updating truck");
      console.error(
        "Error updating truck:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleCancel = () => {
    setTruckInfo(backupTruckInfo); // Revert to original data
    setIsEditingDescription(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      handleUpdateTruckInfo("image", imageUrl);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Truck Information</h2>
        <button
          onClick={() => {
            if (!isEditingDescription) setBackupTruckInfo(truckInfo);
            setIsEditingDescription(!isEditingDescription);
          }}
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
            src={truckInfo.image || "https://via.placeholder.com/1200x400"}
            alt="Truck Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
          {isEditingDescription && (
            <div className="absolute bottom-4 right-4">
              <label className="flex items-center bg-white p-2 rounded-full shadow-lg cursor-pointer">
                <ImageIcon className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm text-gray-700">Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
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
                disabled
                value={truckInfo.name}
                onChange={(e) => handleUpdateTruckInfo("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-not-allowed focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{truckInfo.name}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          {isEditingDescription ? (
            <textarea
              value={truckInfo.description}
              onChange={(e) =>
                handleUpdateTruckInfo("description", e.target.value)
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 whitespace-pre-wrap">
              {truckInfo.description}
            </p>
          )}
        </div>

        {/* Cuisine Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Type
          </label>
          {isEditingDescription ? (
            <div className="space-y-2">
              {truckInfo.cuisineType.map((cuisine, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => {
                      const newCuisineType = [...truckInfo.cuisineType];
                      newCuisineType[index] = e.target.value;
                      handleUpdateTruckInfo("cuisineType", newCuisineType);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      const newCuisineTypes = truckInfo.cuisineType.filter(
                        (_, i) => i !== index
                      );
                      handleUpdateTruckInfo("cuisineType", newCuisineTypes);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  handleUpdateTruckInfo("cuisineType", [
                    ...truckInfo.cuisineType,
                    "",
                  ])
                }
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                + Add Cuisine
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {truckInfo.cuisineType.map((cuisine, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Save & Cancel Buttons */}
        {isEditingDescription && (
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
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
  );
}

export default AboutTab;
