import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Mail, Lock, User, Truck, FileText } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import sendEmail from "../utils/SendEmail";
import { notifyError, notifySignup } from "../toasts/toast";
import axiosInstance from "../axios/axios";
import CustomLoader from "../components/CustomLoader";


function TruckSignUp() {  
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(user);
  const [formData, setFormData] = useState({
    truckName: "",
    gstNumber: "",
  });
  const navigate = useNavigate();

  const validateGSTNumber = (gst) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form submission'); 
    if (!validateGSTNumber(formData.gstNumber)) {
      notifyError("Please enter a valid GST number");
      return;
    }
    setLoading(true);
    truckCreation()
    setLoading(false);
  };
const truckCreation = async () => {
  try {
    const response = await axiosInstance.post("/trucks/register", {
      userId:user._id,
      gstNumber:formData.gstNumber,
      truckName:formData.truckName,
    });
    notifySignup(response.data.truck.name);
    navigate("/truck/dashboard");
  } catch (error) {
    console.error("Client Error:", error.response?.data || error.message);
    notifyError(error.response.data.message || error.message);
  }
}
  return (
    <>
    {loading && <CustomLoader />}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-dark/5 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg flex flex-col max-h-[90vh]">
        {/* Header Section - Fixed */}
        <div className="p-6 pb-0">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Truck className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Register Your Food Truck
            </h2>
            <p className="text-gray-600 mt-2">
              Join our growing community of food vendors
            </p>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
          <form  onSubmit={handleSubmit} className="space-y-6">
            <div className="float-label">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={userData?.name || ""}
                  disabled
                  className="auth-input pl-14 pr-4 cursor-not-allowed"
                  placeholder="Owner Name"
                />
              </div>
            </div>

            <div className="float-label">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={userData?.email || ""}
                  disabled
                  className="auth-input pl-10 cursor-not-allowed"
                  placeholder="Owner Email"
                />
              </div>
            </div>
            <div className="float-label">
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="truckName"
                  value={formData.truckName}
                  onChange={handleChange}
                  className="auth-input pl-10 "
                  placeholder=" "
                />
                <label>Food Truck Name</label>
              </div>
            </div>

            <div className="float-label">
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="gstNumber"
                  required
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="auth-input pl-10"
                  placeholder=" "
                />
                <label>GST Number</label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: 22AAAAA0000A1Z5
              </p>
            </div>
          </form>
        </div>

        {/* Footer Section - Fixed */}
        <div className="p-6 border-t">
          <button
            type="submit"
            onClick={handleSubmit}
            className="auth-button cursor-pointer bg-primary hover:bg-primary/90 mb-4"
          >
            Register Food Truck
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TruckSignUp;
