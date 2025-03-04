import React, { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import RazorpayGateWay from "../utils/RazorPay";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axios/axios";
import { notifyError, notifyMessage } from "../toasts/toast";
import { useTruck } from "../context/TruckContext";
function SubscriptionTab({close}) {
  const [loading,setLoading] = useState(false)
  const { user } = useAuth();
  const { truck ,setTruck} = useTruck();
  useEffect(() => {}, [user,truck]);
  const handleSubscription = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.post("/payments/create-order", {
        amount: 99,
        currency: "INR",
      });
      if (response.status === 200) {
        const order = response.data.order;
        setLoading(false)
        await RazorpayGateWay(user, order);
        console.log(order);
        await updateSubscription()
      }
    } catch (error) {
      setLoading(false)
      notifyError(error.message);
      console.log(error.message);
    }
  };

  const updateSubscription = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`trucks/${truck._id}/update-subscription`);
      if (response.status ===200) {
        notifyMessage(response.data.message)
        setTruck(response.data.data)
        close('about')
        setLoading(false)
      }
    } catch (error) {
      notifyError(error.message)
      console.log(error);
      setLoading(false)
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Basic</h3>
          <p className="text-3xl font-bold mb-4">Free</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Basic Analytics
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Up to 3 Menu Items
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Max 3 Cuisine Types
            </li>
          </ul>
          <button
            disabled
            className="w-full px-4 py-2 cursor-not-allowed bg-primary text-white rounded-l"
          >
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-primary relative">
          <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
            Popular
          </div>
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="text-3xl font-bold mb-4">$99</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Advanced Analytics
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Unlimited Menu Items
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Unlimited Cuisine Types
            </li>
          </ul>
          <button
            onClick={handleSubscription}
            className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/10"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTab;
