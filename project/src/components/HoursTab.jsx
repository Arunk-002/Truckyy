import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useTruck } from "../context/TruckContext";
import { notifyError, notifyMessage } from "../toasts/toast";

function UpdateOperatingHours() {
  const { truck } = useTruck();
  const defaultHours = {
    Monday: { open: "", close: "", isOpen: false },
    Tuesday: { open: "", close: "", isOpen: false },
    Wednesday: { open: "", close: "", isOpen: false },
    Thursday: { open: "", close: "", isOpen: false },
    Friday: { open: "", close: "", isOpen: false },
    Saturday: { open: "", close: "", isOpen: false },
    Sunday: { open: "", close: "", isOpen: false },
  };

  const [operatingHours, setOperatingHours] = useState(defaultHours);
  const [initialHours, setInitialHours] = useState(defaultHours);

  useEffect(() => {
    if (truck?.operatingHours && Object.keys(truck.operatingHours).length > 0) {
      setOperatingHours(truck.operatingHours);
      setInitialHours(truck.operatingHours);
    }
  }, [truck]);

  const handleUpdateHours = (day, field, value) => {
    setOperatingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const isDifferent = (obj1, obj2) => {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDifferent(operatingHours, initialHours)) {
      notifyError("No changes detected");
      return;
    }
    try {
      const response = await axiosInstance.put(`/trucks/${truck?._id}/update-hours`, {
        operatingHours,
      });
      if (response.status === 201) {
        notifyMessage("Working Hours Updated Successfully");
        setInitialHours(operatingHours);
      }
    } catch (error) {
      console.error("Error updating hours", error);
      notifyError("Failed to update hours");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-6">Update Operating Hours</h2>
      <div className="space-y-4">
        {Object.entries(operatingHours).length > 0 ? (
          Object.entries(operatingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="w-28">
                <span className="font-medium">{day}</span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  value={hours?.open || ""}
                  onChange={(e) => handleUpdateHours(day, "open", e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
                <span>to</span>
                <input
                  type="time"
                  value={hours?.close || ""}
                  onChange={(e) => handleUpdateHours(day, "close", e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hours?.isOpen || false}
                    onChange={(e) => handleUpdateHours(day, "isOpen", e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Open</span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No operating hours set yet.</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Save Changes
      </button>
    </form>
  );
}

export default UpdateOperatingHours;
