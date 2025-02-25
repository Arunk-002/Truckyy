import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Mail, Lock, Loader } from "lucide-react";
import { notifyError, notifyLogin } from "../toasts/toast";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await login(email, password);
      if (response.name) {
        console.log(response);
        notifyLogin(response.name);
        navigate("/");
      }else{
        notifyError(response.message)
      }
  };
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-dark/5">
      
      
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MapPin className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">
            Sign in to find your favorite food trucks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input pl-10"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button bg-primary hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
