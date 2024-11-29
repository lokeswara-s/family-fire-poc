//@ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { InvestmentCharts } from "../components/Investments/InvestmentCharts";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  HomeModernIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "../utils/formatCurrency";

const investmentTypes = [
  { type: "stocks", icon: BanknotesIcon, label: "Stocks & Mutual Funds" },
  { type: "bonds", icon: BuildingLibraryIcon, label: "Bonds" },
  { type: "realEstate", icon: HomeModernIcon, label: "Real Estate" },
  { type: "crypto", icon: CircleStackIcon, label: "Cryptocurrency" },
];

export const Investments: React.FC = () => {
  const investments = useStore((state) => state.investments);
  const totalInvestments = investments.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );

  const investmentsByType = investments.reduce((acc, inv) => {
    acc[inv.type] = {
      amount: (acc[inv.type]?.amount || 0) + inv.amount,
      count: (acc[inv.type]?.count || 0) + 1,
      avgReturn: (acc[inv.type]?.avgReturn || 0) + inv.returnRate,
    };
    return acc;
  }, {} as Record<string, { amount: number; count: number; avgReturn: number }>);

  // Calculate average returns
  Object.values(investmentsByType).forEach((type) => {
    type.avgReturn = type.avgReturn / type.count;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Investment Portfolio
        </h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Portfolio Value</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalInvestments)}
          </p>
        </div>
      </div>

      <InvestmentCharts investments={investments} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {investmentTypes.map(({ type, icon: Icon, label }) => {
          const stats = investmentsByType[type] || {
            amount: 0,
            count: 0,
            avgReturn: 0,
          };
          return (
            <Link
              key={type}
              to={`/investments/${type}`}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon className="h-6 w-6 text-blue-600" />
                <h2 className="font-semibold text-gray-900">{label}</h2>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(stats.amount)}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Investments</span>
                  <span className="font-medium">{stats.count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Return</span>
                  <span
                    className={`font-medium ${
                      stats.avgReturn > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stats.avgReturn > 0 ? "+" : ""}
                    {stats.avgReturn.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Recent Investments</h2>
        <div className="space-y-4">
          {investments.slice(0, 5).map((investment) => (
            <div
              key={investment.id}
              className="flex justify-between items-center border-b pb-4 last:border-b-0"
            >
              <div>
                <h3 className="font-semibold">{investment.name}</h3>
                <p className="text-sm text-gray-600 capitalize">
                  {investment.type}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(investment.amount)}</p>
                <p
                  className={`text-sm ${
                    investment.returnRate > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {investment.returnRate > 0 ? "+" : ""}
                  {investment.returnRate}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
