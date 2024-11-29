import React from 'react';
import { Link } from 'react-router-dom';
import { getInvestmentIcon, getInvestmentLabel } from '../../utils/investmentUtils';
import { formatCurrency } from '../../utils/formatCurrency';

interface InvestmentCardProps {
  type: string;
  amount: number;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ type, amount }) => {
  const Icon = getInvestmentIcon(type);

  return (
    <Link 
      to={`/investments/${type}`}
      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="font-semibold text-gray-700">{getInvestmentLabel(type)}</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
        </div>
      </div>
    </Link>
  );
};