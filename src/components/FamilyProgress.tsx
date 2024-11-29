import React from 'react';
import { Sparkles } from 'lucide-react';

const FamilyProgress: React.FC = () => {
  const totalSavings = 935000;
  const fireNumber = 2000000;
  const progress = (totalSavings / fireNumber) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Path to Financial Independence</h3>
          <p className="text-gray-500">Family FIRE Progress</p>
        </div>
        <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
          <Sparkles className="h-5 w-5 text-green-600 mr-2" />
          <span className="font-medium text-green-600">{progress.toFixed(1)}% Complete</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Current Savings</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalSavings.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 mb-1">FIRE Number</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">${fireNumber.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 mb-1">Monthly Savings Rate</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">$8,500</p>
        </div>
      </div>
    </div>
  );
};

export default FamilyProgress;