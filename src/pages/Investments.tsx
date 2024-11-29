import React from 'react';
import { LineChart, PieChart, Building2, Briefcase, Landmark, Home, Coins, Wallet } from 'lucide-react';

const Investments: React.FC = () => {
  const portfolioAllocation = [
    { name: 'US Stocks', percentage: 45, amount: 450000, color: 'bg-blue-500' },
    { name: 'International Stocks', percentage: 25, amount: 250000, color: 'bg-green-500' },
    { name: 'Bonds', percentage: 15, amount: 150000, color: 'bg-yellow-500' },
    { name: 'Real Estate', percentage: 10, amount: 100000, color: 'bg-purple-500' },
    { name: 'Commodities', percentage: 5, amount: 50000, color: 'bg-red-500' },
  ];

  const investmentOptions = [
    {
      title: 'Index Funds',
      description: 'Low-cost, diversified investment tracking market indices',
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      returns: '10.5%',
      risk: 'Medium',
      minInvestment: '1,000',
    },
    {
      title: 'Real Estate Investment Trusts',
      description: 'Investment in commercial and residential properties',
      icon: <Building2 className="h-6 w-6 text-purple-600" />,
      returns: '8.2%',
      risk: 'Medium-High',
      minInvestment: '5,000',
    },
    {
      title: 'Corporate Bonds',
      description: 'Fixed-income securities from established companies',
      icon: <Briefcase className="h-6 w-6 text-green-600" />,
      returns: '5.5%',
      risk: 'Low-Medium',
      minInvestment: '2,500',
    },
    {
      title: 'Government Securities',
      description: 'Safe, government-backed investment options',
      icon: <Landmark className="h-6 w-6 text-gray-600" />,
      returns: '4.2%',
      risk: 'Low',
      minInvestment: '1,000',
    },
    {
      title: 'Real Estate Direct Investment',
      description: 'Direct property ownership and management',
      icon: <Home className="h-6 w-6 text-orange-600" />,
      returns: '12.0%',
      risk: 'High',
      minInvestment: '50,000',
    },
    {
      title: 'Precious Metals',
      description: 'Gold, silver, and other precious metal investments',
      icon: <Coins className="h-6 w-6 text-yellow-600" />,
      returns: '7.0%',
      risk: 'Medium',
      minInvestment: '500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Investment Portfolio</h1>
        <p className="text-gray-500 mt-2">Manage and track your investment allocations</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Current Allocation</h2>
          <div className="flex flex-wrap gap-4">
            {portfolioAllocation.map((item) => (
              <div key={item.name} className="flex-1 min-w-[200px]">
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ${item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">$1,000,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Returns</p>
              <p className="text-xl font-semibold text-green-600">+$8,500 (2.8%)</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Annual Projected Returns</p>
              <p className="text-xl font-semibold text-blue-600">9.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Options */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Investment Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentOptions.map((option) => (
            <div key={option.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">{option.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Returns</p>
                  <p className="font-medium text-green-600">{option.returns}</p>
                </div>
                <div>
                  <p className="text-gray-500">Risk</p>
                  <p className="font-medium text-gray-900">{option.risk}</p>
                </div>
                <div>
                  <p className="text-gray-500">Min</p>
                  <p className="font-medium text-gray-900">${option.minInvestment}</p>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Tips */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-sm p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Wallet className="h-8 w-8" />
          <h2 className="text-2xl font-semibold">Investment Tips</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Diversification</h3>
            <p className="text-indigo-100">Spread investments across different asset classes to minimize risk</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Regular Investing</h3>
            <p className="text-indigo-100">Set up automatic monthly investments to benefit from dollar-cost averaging</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Long-term Focus</h3>
            <p className="text-indigo-100">Stay invested through market cycles for better long-term returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;