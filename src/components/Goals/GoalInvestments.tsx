import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { FinancialGoal } from '../../types';

interface GoalInvestmentsProps {
  goal: FinancialGoal;
}

export const GoalInvestments: React.FC<GoalInvestmentsProps> = ({ goal }) => {
  const investments = useStore((state) => state.investments);
  
  const relatedInvestments = investments.filter(inv => {
    switch (goal.category) {
      case 'retirement':
        return ['stocks', 'bonds'].includes(inv.type);
      case 'housing':
        return inv.type === 'realEstate';
      case 'education':
        return ['stocks', 'bonds'].includes(inv.type);
      default:
        return false;
    }
  });

  if (relatedInvestments.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Related Investments</h4>
      <div className="space-y-2">
        {relatedInvestments.map((investment) => (
          <div key={investment.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">{investment.name}</p>
                <p className="text-xs text-gray-600 capitalize">{investment.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{formatCurrency(investment.amount)}</p>
              <p className="text-xs text-green-600">+{investment.returnRate}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};