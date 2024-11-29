import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Clock, Check } from 'lucide-react';

interface InvestmentRecommendation {
  type: string;
  allocation: number;
  risk: string;
  expectedReturn: number;
  description: string;
}

interface Props {
  goalAmount: number;
  timeframe: string;
  onSelectInvestments: (investments: InvestmentRecommendation[]) => void;
}

const InvestmentRecommendations: React.FC<Props> = ({ goalAmount, timeframe, onSelectInvestments }) => {
  const [selectedInvestments, setSelectedInvestments] = useState<Set<string>>(new Set());

  const getRecommendations = (amount: number, years: number): InvestmentRecommendation[] => {
    if (years <= 2) {
      return [
        { type: 'High-Yield Savings', allocation: 70, risk: 'Very Low', expectedReturn: 4.5, description: 'Safe, liquid savings with competitive interest rates' },
        { type: 'Short-Term Bonds', allocation: 30, risk: 'Low', expectedReturn: 5.5, description: 'Government and high-grade corporate bonds' },
      ];
    } else if (years <= 5) {
      return [
        { type: 'Index Funds', allocation: 40, risk: 'Medium', expectedReturn: 8, description: 'Broad market exposure through low-cost funds' },
        { type: 'Bonds', allocation: 40, risk: 'Low', expectedReturn: 5, description: 'Mix of government and corporate bonds' },
        { type: 'REITs', allocation: 20, risk: 'Medium-High', expectedReturn: 7, description: 'Real estate investment trusts for diversification' },
      ];
    } else {
      return [
        { type: 'Index Funds', allocation: 60, risk: 'Medium', expectedReturn: 8, description: 'Long-term growth through market exposure' },
        { type: 'International Stocks', allocation: 20, risk: 'High', expectedReturn: 9, description: 'Global diversification opportunities' },
        { type: 'REITs', allocation: 20, risk: 'Medium-High', expectedReturn: 7, description: 'Real estate for steady income and appreciation' },
      ];
    }
  };

  const years = new Date(timeframe).getFullYear() - new Date().getFullYear();
  const recommendations = getRecommendations(goalAmount, years);

  const toggleInvestment = (type: string) => {
    const newSelected = new Set(selectedInvestments);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedInvestments(newSelected);
    
    const selectedRecs = recommendations.filter(rec => newSelected.has(rec.type));
    onSelectInvestments(selectedRecs);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recommended Investment Strategy</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {years} year{years !== 1 ? 's' : ''} timeline
        </div>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div 
            key={rec.type} 
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
              selectedInvestments.has(rec.type) 
                ? 'bg-indigo-50 border-2 border-indigo-500' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => toggleInvestment(rec.type)}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
                <h4 className="font-medium text-gray-900">{rec.type}</h4>
                {selectedInvestments.has(rec.type) && (
                  <Check className="h-5 w-5 text-indigo-600 ml-2" />
                )}
              </div>
              <p className="text-sm text-gray-600">{rec.description}</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Expected Return: <span className="text-green-600 font-medium">{rec.expectedReturn}%</span>
                </span>
                <span className="text-sm text-gray-500">
                  Risk Level: <span className="font-medium">{rec.risk}</span>
                </span>
              </div>
            </div>
            <div className="ml-4 text-right">
              <div className="text-2xl font-bold text-indigo-600">{rec.allocation}%</div>
              <div className="text-sm text-gray-500">Allocation</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start p-4 bg-blue-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Investment Strategy Note</p>
          <p>This recommendation is based on your goal amount of ${goalAmount.toLocaleString()} and timeline. Consider consulting with a financial advisor for personalized advice.</p>
          {selectedInvestments.size > 0 && (
            <p className="mt-2 font-medium">
              Selected {selectedInvestments.size} investment{selectedInvestments.size !== 1 ? 's' : ''} for your goal
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;