//@ts-nocheck
import React from "react";
import { Investment } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  DocumentTextIcon,
  UserIcon,
  ScaleIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface FundDetailsProps {
  investment: Investment;
}

export const FundDetails: React.FC<FundDetailsProps> = ({ investment }) => {
  if (!investment.fundDetails) return null;

  const details = [
    {
      icon: DocumentTextIcon,
      label: "Fund House",
      value: investment.fundDetails.fundHouse,
    },
    {
      icon: ChartBarIcon,
      label: "Category",
      value: investment.fundDetails.category,
    },
    {
      icon: ScaleIcon,
      label: "NAV",
      value: formatCurrency(investment.fundDetails.nav),
    },
    {
      icon: ArrowPathIcon,
      label: "Expense Ratio",
      value: `${investment.fundDetails.expenseRatio}%`,
    },
    {
      icon: UserIcon,
      label: "Fund Manager",
      value: investment.fundDetails.fundManager,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-center space-x-3">
            <detail.icon className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">{detail.label}</p>
              <p className="font-semibold">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Units Held</p>
            <p className="font-medium">
              {investment.fundDetails.units.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Exit Load</p>
            <p className="font-medium">{investment.fundDetails.exitLoad}</p>
          </div>
          <div>
            <p className="text-gray-600">Benchmark</p>
            <p className="font-medium">{investment.fundDetails.benchmark}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
