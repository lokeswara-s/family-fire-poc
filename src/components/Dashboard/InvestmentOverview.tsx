import React from 'react';
import { Investment } from '../../types';
import { InvestmentCard } from './InvestmentCard';

interface InvestmentOverviewProps {
  investments: Investment[];
}

export const InvestmentOverview: React.FC<InvestmentOverviewProps> = ({ investments }) => {
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const investmentsByType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Investment Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-700">Total Investments</h3>
          <p className="text-2xl font-bold text-blue-600">${totalInvestments.toLocaleString()}</p>
        </div>
        {Object.entries(investmentsByType).map(([type, amount]) => (
          <InvestmentCard key={type} type={type} amount={amount} />
        ))}
      </div>
    </div>
  );
};