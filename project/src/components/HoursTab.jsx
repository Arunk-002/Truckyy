import React from 'react';

function HoursTab({ operatingHours, handleUpdateHours }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Operating Hours</h2>
      <div className="space-y-4">
        {Object.entries(operatingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="w-28">
              <span className="font-medium">{day}</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="time"
                value={hours.open}
                onChange={(e) => handleUpdateHours(day, 'open', e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <span>to</span>
              <input
                type="time"
                value={hours.close}
                onChange={(e) => handleUpdateHours(day, 'close', e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hours.isOpen}
                  onChange={(e) => handleUpdateHours(day, 'isOpen', e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Open</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
        Save Changes
      </button>
    </div>
  );
}

export default HoursTab;