import React from 'react';
import { Link } from 'react-router-dom';
import { getInvestmentIcon, getInvestmentLabel } from '../../utils/investmentUtils';
import { formatCurrency } from '../../utils/formatCurrency';

interface InvestmentCardProps {
  type: string;
  amount: number;
  count: number;
  avgReturn: number;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ type, amount, count, avgReturn }) => {
  const Icon = getInvestmentIcon(type);

  return (
    <Link 
      to={`/investments/${type}`}
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center space-x-3 mb-3">
        <Icon className="h-6 w-6 text-blue-600" />
        <h2 className="font-semibold text-gray-900">{getInvestmentLabel(type)}</h2>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(amount)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Investments</span>
          <span className="font-medium">{count}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Avg. Return</span>
          <span className={`font-medium ${avgReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {avgReturn > 0 ? '+' : ''}{avgReturn.toFixed(1)}%
          </span>
        </div>
      </div>
    </Link>
  );
};