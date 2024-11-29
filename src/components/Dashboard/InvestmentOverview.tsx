//@ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { Investment } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  HomeModernIcon,
  CircleStackIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

interface InvestmentOverviewProps {
  investments: Investment[];
}

export const InvestmentOverview: React.FC<InvestmentOverviewProps> = ({
  investments,
}) => {
  const totalInvestments = investments.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const avgReturn =
    investments.reduce((sum, inv) => sum + inv.returnRate, 0) /
    investments.length;

  const investmentsByType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  const getIcon = (type: string) => {
    switch (type) {
      case "stocks":
        return BanknotesIcon;
      case "bonds":
        return BuildingLibraryIcon;
      case "realEstate":
        return HomeModernIcon;
      case "crypto":
        return CircleStackIcon;
      default:
        return ArrowTrendingUpIcon;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Investment Portfolio</h2>
        <Link
          to="/investments"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalInvestments)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Average Return</p>
          <p className="text-2xl font-bold text-green-600">
            +{avgReturn.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(investmentsByType).map(([type, amount]) => {
          const Icon = getIcon(type);
          return (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium capitalize">
                  {type === "realEstate" ? "Real Estate" : type}
                </span>
              </div>
              <span className="text-sm font-medium">
                {formatCurrency(amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
