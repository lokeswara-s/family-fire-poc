import React from 'react';
import { FamilyMember } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon 
} from '@heroicons/react/24/outline';

interface FamilyOverviewProps {
  members: FamilyMember[];
}

export const FamilyOverview: React.FC<FamilyOverviewProps> = ({ members }) => {
  const totalIncome = members.reduce((sum, member) => sum + member.monthlyIncome, 0);
  const totalExpenses = members.reduce((sum, member) => sum + member.monthlyExpenses, 0);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Family Overview</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
            <span className="text-gray-600">Total Monthly Income</span>
          </div>
          <span className="font-semibold text-green-600">
            {formatCurrency(totalIncome)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
            <span className="text-gray-600">Total Monthly Expenses</span>
          </div>
          <span className="font-semibold text-red-600">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BanknotesIcon className="h-5 w-5 text-blue-600" />
            <span className="text-gray-600">Monthly Savings</span>
          </div>
          <span className="font-semibold text-blue-600">
            {formatCurrency(totalIncome - totalExpenses)}
          </span>
        </div>
      </div>
    </div>
  );
};