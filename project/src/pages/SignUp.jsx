import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Mail, Lock, User } from "lucide-react";
import axiosInstance from "../axios/axios";
import { notifyError, notifySignup } from "../toasts/toast";
import OTPModal from "../components/OTPModal";
import SendEmail from "../utils/SendEmail";
import CustomLoader from "../components/CustomLoader";
function SignUp() {
  const [loading, setLoading] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isVerifed, setVerified] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Adding data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      const response = await SendEmail(email);
      if (response) {
        setIsOTPModalOpen(true);
        setLoading(false);
      }
    }
  };
  const userCreation = async () => {
    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
        role: "customer",
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        notifySignup(response.data.user.name);
        navigate("/");
      }
    } catch (error) {
      console.error("Client Error:", error.response?.data || error.message);
      notifyError(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    if (isVerifed) {
      setLoading(true);
      userCreation();
      setLoading(false);
    }
  }, [isVerifed]);

  return (
    <>
      {loading && <CustomLoader />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-dark/5">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <MapPin className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Join our food truck community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            <button
              type="submit"
              className="auth-button bg-primary hover:bg-primary/90"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          onVerify={setVerified}
          email={email}
        />
      </div>
    </>
  );
}

export default SignUp;
