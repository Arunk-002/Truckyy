import React, { useEffect } from 'react';
import { Heart, Menu, Crown } from 'lucide-react';
import { useTruck } from '../context/TruckContext';
function StatsCards() {
  const {truck} = useTruck()
  useEffect(()=>{
  },[truck])
console.log(truck)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className={(truck?.subscription.plan==='free')?" blur-md":''}>
            <p className="text-sm text-gray-600">Total Favorites</p>
            <h3 className="text-2xl font-bold text-gray-900">{truck?.reviews||0}</h3>
          </div>
          <Heart className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className={(truck?.subscription.plan==='free')?" blur-md":''}>
            <p className="text-sm text-gray-600">Total Reviews</p>
            <h3 className="text-2xl font-bold text-gray-900">{truck?.rating.count}</h3>
          </div>
          <Menu className="w-8 h-8 text-secondary" />
        </div>
      </div>  
    </div>
  );
}

export default StatsCards;