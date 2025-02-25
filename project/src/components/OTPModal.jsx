import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import axiosInstance from "../axios/axios";

function OTPModal({ isOpen, onClose,onVerify, email }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (isOpen) {
      refs[0].current?.focus();
      setOtp(["", "", "", ""]);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 3) {
        refs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      refs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpString = otp.join("");
      console.log(otpString);
      
      // if (otpString.length !== 4) return null
      const response = await axiosInstance.post("/users/verify-otp", {
        email: email,
        enteredOTP: otpString,
      });
      if (response.status===200) {
        
        onVerify(true)
        onClose()
      }
    } catch (error) {
      console.log('adfadsfads')
      console.log(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to {email}. Please enter the code
          below.
        </p>

        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={refs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.some((digit) => digit === "")}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Verify
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => setOtp(["", "", "", ""])}
            className="text-primary hover:text-primary/80"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPModal;
