import React from 'react';

interface InvestmentStreamProps {
  title: string;
  amount: number;
  growth: number;
  icon: React.ReactNode;
}

const InvestmentStream: React.FC<InvestmentStreamProps> = ({ title, amount, growth, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-green-600 font-medium">+{growth}%</span>
          <span className="text-gray-500 text-sm">YTD</span>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between items-baseline">
          <p className="text-gray-500">Current Value</p>
          <p className="text-2xl font-bold text-gray-900">${amount.toLocaleString()}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Monthly</p>
            <p className="font-medium text-gray-900">${(amount * 0.007).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quarterly</p>
            <p className="font-medium text-gray-900">${(amount * 0.02).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yearly</p>
            <p className="font-medium text-gray-900">${(amount * 0.08).toFixed(0)}k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStream;