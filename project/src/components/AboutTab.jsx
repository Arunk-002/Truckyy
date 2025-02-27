import React from 'react';
import { Save, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

function AboutTab({ 
  truckInfo, 
  isEditingDescription, 
  setIsEditingDescription, 
  handleUpdateTruckInfo,
  handleSaveDescription 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Truck Information</h2>
        <button
          onClick={() => setIsEditingDescription(!isEditingDescription)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          {isEditingDescription ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Details
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={truckInfo.coverImage}
            alt="Truck Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
          {isEditingDescription && (
            <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
              <ImageIcon className="w-5 h-5 text-primary" />
            </button>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Truck Name
            </label>
            {isEditingDescription ? (
              <input
                type="text"
                value={truckInfo.name}
                onChange={(e) => handleUpdateTruckInfo('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{truckInfo.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Type
            </label>
            {isEditingDescription ? (
              <input
                type="text"
                value={truckInfo.cuisine}
                onChange={(e) => handleUpdateTruckInfo('cuisine', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{truckInfo.cuisine}</p>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          {isEditingDescription ? (
            <input
              type="text"
              value={truckInfo.shortDescription}
              onChange={(e) => handleUpdateTruckInfo('shortDescription', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Brief description of your food truck (appears in search results)"
            />
          ) : (
            <p className="text-gray-900">{truckInfo.shortDescription}</p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          {isEditingDescription ? (
            <textarea
              value={truckInfo.description}
              onChange={(e) => handleUpdateTruckInfo('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell customers about your food truck, its history, and what makes it special"
            />
          ) : (
            <p className="text-gray-900 whitespace-pre-wrap">{truckInfo.description}</p>
          )}
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialties
          </label>
          {isEditingDescription ? (
            <div className="space-y-2">
              {truckInfo.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => {
                      const newSpecialties = [...truckInfo.specialties];
                      newSpecialties[index] = e.target.value;
                      handleUpdateTruckInfo('specialties', newSpecialties);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      const newSpecialties = truckInfo.specialties.filter((_, i) => i !== index);
                      handleUpdateTruckInfo('specialties', newSpecialties);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleUpdateTruckInfo('specialties', [...truckInfo.specialties, ''])}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                + Add Specialty
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {truckInfo.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Our Story */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Our Story
          </label>
          {isEditingDescription ? (
            <textarea
              value={truckInfo.story}
              onChange={(e) => handleUpdateTruckInfo('story', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Share your food truck's journey, mission, and values"
            />
          ) : (
            <p className="text-gray-900 whitespace-pre-wrap">{truckInfo.story}</p>
          )}
        </div>

        {/* Save Button */}
        {isEditingDescription && (
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsEditingDescription(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDescription}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutTab;