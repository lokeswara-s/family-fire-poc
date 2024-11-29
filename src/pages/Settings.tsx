import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your notification preferences</p>
        </div>
        
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
          <p className="mt-1 text-sm text-gray-500">Control your privacy settings</p>
        </div>
        
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Currency</h2>
          <p className="mt-1 text-sm text-gray-500">Set your preferred currency</p>
        </div>
        
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Theme</h2>
          <p className="mt-1 text-sm text-gray-500">Customize your app appearance</p>
        </div>
      </div>
    </div>
  );
};