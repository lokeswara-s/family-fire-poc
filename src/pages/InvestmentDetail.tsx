import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FundDetails } from '../components/Investments/FundDetails';
import { FundCharts } from '../components/Investments/FundCharts';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { getInvestmentIcon, getInvestmentLabel } from '../utils/investmentUtils';
import { formatCurrency } from '../utils/formatCurrency';

export const InvestmentDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const investments = useStore((state) => state.investments);
  const filteredInvestments = type ? investments.filter(inv => inv.type === type) : [];
  const Icon = type ? getInvestmentIcon(type) : QuestionMarkCircleIcon;

  const totalAmount = filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const averageReturn = filteredInvestments.length > 0
    ? filteredInvestments.reduce((sum, inv) => sum + inv.returnRate, 0) / filteredInvestments.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/investments" className="text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Icon className="h-8 w-8 text-blue-600" />
          <span>{type ? getInvestmentLabel(type) : 'Investments'}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Value</h2>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Average Return</h2>
          <p className="text-3xl font-bold text-green-600">+{averageReturn.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Investments</h2>
          <p className="text-3xl font-bold text-gray-900">{filteredInvestments.length}</p>
        </div>
      </div>

      <div className="space-y-6">
        {filteredInvestments.map((investment) => (
          <div key={investment.id} className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{investment.name}</h3>
                  <p className="text-sm text-gray-600">
                    Started: {investment.startDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatCurrency(investment.amount)}</p>
                  <p className="text-sm font-semibold text-green-600">
                    +{investment.returnRate}%
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  investment.risk === 'low' ? 'bg-green-100 text-green-800' :
                  investment.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {investment.risk.toUpperCase()} RISK
                </span>
              </div>
            </div>
            
            {investment.fundDetails && (
              <div className="p-4 space-y-6">
                <FundDetails investment={investment} />
                <FundCharts investment={investment} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};