import React from 'react';
import { Crown } from 'lucide-react';

function SubscriptionTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Basic</h3>
          <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-500">/mo</span></p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Basic Analytics
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Up to 50 Menu Items
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Email Support
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-primary relative">
          <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
            Popular
          </div>
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="text-3xl font-bold mb-4">$49<span className="text-sm text-gray-500">/mo</span></p>
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
              Priority Support
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/10">
            Upgrade
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Premium</h3>
          <p className="text-3xl font-bold mb-4">$99<span className="text-sm text-gray-500">/mo</span></p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Custom Analytics
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              White-label Service
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              24/7 Support
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/10">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTab;