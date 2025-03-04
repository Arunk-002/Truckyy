import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useAuth } from "./AuthContext";

const TruckContext = createContext();

export const TruckProvider = ({ children }) => {
  const [truck, setTruck] = useState(null);
  const { user } = useAuth();

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
  }, [user]); // Depend on `user` so it refetches when user changes

  return (
    <TruckContext.Provider value={{ truck,setTruck }}>
      {children}
    </TruckContext.Provider>
  );
};

export const useTruck = () => {
  return useContext(TruckContext);
};
