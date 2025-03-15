import React from 'react';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-dark/5 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative">
          {/* Road */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gray-300 rounded"></div>
          
          {/* Animated Truck */}
          <div className="animate-drive relative">
            <Truck className="w-16 h-16 text-primary transform -scale-x-100" />
            {/* Wheel Animation */}
            <div className="absolute bottom-1 left-3 w-3 h-3 bg-gray-700 rounded-full animate-wheel"></div>
            <div className="absolute bottom-1 right-3 w-3 h-3 bg-gray-700 rounded-full animate-wheel"></div>
          </div>
        </div>

        <h1 className="mt-8 text-8xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl text-gray-700">Oops! Looks like this truck took a wrong turn</p>
        <p className="mt-2 text-gray-500">The page you're looking for has driven off somewhere else</p>
        
        <Link 
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Back to Home
        </Link>
      </div>

      {/* Add the animations to the page */}
      <style>
        {`
          @keyframes drive {
            0% {
              transform: translateX(-200px);
            }
            50% {
              transform: translateX(200px);
            }
            100% {
              transform: translateX(-200px);
            }
          }

          @keyframes wheel {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .animate-drive {
            animation: drive 6s linear infinite;
          }

          .animate-wheel {
            animation: wheel 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default NotFound;