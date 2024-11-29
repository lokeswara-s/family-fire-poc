import React from 'react';
import { UserIcon, UsersIcon } from '@heroicons/react/24/outline';

interface GoalsToggleProps {
  activeView: 'individual' | 'family';
  onToggle: (view: 'individual' | 'family') => void;
}

export const GoalsToggle: React.FC<GoalsToggleProps> = ({ activeView, onToggle }) => {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
      <button
        onClick={() => onToggle('individual')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center space-x-2 ${
          activeView === 'individual'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <UserIcon className="h-4 w-4" />
        <span>Individual Goals</span>
      </button>
      <button
        onClick={() => onToggle('family')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center space-x-2 ${
          activeView === 'family'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <UsersIcon className="h-4 w-4" />
        <span>Family Goals</span>
      </button>
    </div>
  );
};