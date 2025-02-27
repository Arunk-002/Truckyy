import React from 'react';
import { Heart, Menu, Crown } from 'lucide-react';

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Favorites</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.favorites}</h3>
          </div>
          <Heart className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Today's Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.todayOrders}</h3>
          </div>
          <Menu className="w-8 h-8 text-secondary" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</h3>
          </div>
          <Crown className="w-8 h-8 text-accent" />
        </div>
      </div>
    </div>
  );
}

export default StatsCards;