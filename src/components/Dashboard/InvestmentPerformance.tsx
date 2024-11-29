//@ts-nocheck
import React from "react";
import { Investment } from "../../types";

interface InvestmentPerformanceProps {
  investments: Investment[];
}

export const InvestmentPerformance: React.FC<InvestmentPerformanceProps> = ({
  investments,
}) => {
  const sortedByReturn = [...investments].sort(
    (a, b) => b.returnRate - a.returnRate,
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Top Performing Investments</h2>
      <div className="space-y-4">
        {sortedByReturn.slice(0, 3).map((investment) => (
          <div
            key={investment.id}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{investment.name}</h3>
              <p className="text-sm text-gray-600 capitalize">
                {investment.type}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">
                +{investment.returnRate}%
              </p>
              <p className="text-sm text-gray-600">
                ${investment.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
