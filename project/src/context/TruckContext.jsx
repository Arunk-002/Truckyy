import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const TruckContext = createContext();

export const TruckProvider = ({ children }) => {
  const [truck, setTruck] = useState(null);
  const { user, logout } = useAuth(); // include logout here
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // Exit if user is not available

    const getTruckDetails = async () => {
      try {
        const response = await axiosInstance.get(`/trucks/${user._id}`);
        if (response.status === 200) {
          setTruck(response.data.truck);
        }
      } catch (error) {
        console.error("Error fetching truck details:", error);
      }
    };

    getTruckDetails();
  }, [user]);

  const logoutTruck = async () => {
    try {
      setTruck(null);
      logout();
      navigate('/');
    } catch (error) {
      console.error("Error logging out truck:", error);
    }
  };

  return (
    <TruckContext.Provider value={{ truck, setTruck, logoutTruck }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTruck = () => {
  return useContext(TruckContext);
};
