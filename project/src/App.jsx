import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TruckDetail from "./pages/TruckDetail";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import TruckDashboard from "./pages/TruckDashboard";
import TruckSignUp from "./pages/TruckSignUp";

function App() {

  return (
    <>
      <Toaster />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/truck/:id" element={<TruckDetail />} />
          <Route path="/truck/dashboard" element={<TruckDashboard />} />
          <Route
            path="/truck/signup"
            element={
              <ProtectedRoute>
                <TruckSignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
