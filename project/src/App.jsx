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
import { TruckProvider } from "./context/TruckContext";
import TruckDashboard from "./pages/TruckDashboard";
import TruckSignUp from "./pages/TruckSignUp";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <TruckProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Profile route under protection */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Grouped Truck Routes */}
            <Route path="/truck">
              <Route path=":id" element={<TruckDetail />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <TruckDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <ProtectedRoute>
                    <TruckSignUp />
                  </ProtectedRoute>
                }
              />
            </Route>
            
            {/* 404 Route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TruckProvider>
      </AuthProvider>
    </>
  );
}

export default App;