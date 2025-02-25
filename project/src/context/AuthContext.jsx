import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
    
        const res = await axiosInstance.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchUser();
  }, []);
  
  


  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Login failed", err.response?.data?.message);
      return err.response?.data?.message || "An error occurred";
    }
  };
  

  const logout = async () => {
    await axiosInstance.get("/users/logout");
    localStorage.clear("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
