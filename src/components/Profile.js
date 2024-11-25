import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { User, Camera } from 'lucide-react';

const Profile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || ''
  });

  const handleSave = async () => {
    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-[var(--glass-border)]">
          <h1 className="text-2xl font-semibold text-[var(--primary-600)] mb-6">Profile Settings</h1>
          
          {/* Profile Image */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-[var(--primary-100)]"
              />
              <button
                onClick={() => user?.openProfileImageUpdate()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-white 
                  shadow-md border border-[var(--primary-100)]
                  hover:bg-[var(--primary-50)] transition-colors"
              >
                <Camera className="w-4 h-4 text-[var(--primary-500)]" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[var(--primary-600)]">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-[var(--primary-400)]">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--primary-600)] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-[var(--primary-100)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)]
                    disabled:bg-[var(--primary-50)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary-600)] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 rounded-md border border-[var(--primary-100)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)]
                    disabled:bg-[var(--primary-50)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--primary-600)] mb-1">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-md border border-[var(--primary-100)]
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)]
                  disabled:bg-[var(--primary-50)]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--primary-500)]
                    hover:bg-[var(--primary-50)] rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white
                    bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-coral)]
                    rounded-md hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white
                  bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-coral)]
                  rounded-md hover:opacity-90 transition-opacity"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 