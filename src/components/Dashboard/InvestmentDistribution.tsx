//@ts-nocheck
import React from "react";
import { Investment } from "../../types";

interface InvestmentDistributionProps {
  investments: Investment[];
}

export const InvestmentDistribution: React.FC<InvestmentDistributionProps> = ({
  investments,
}) => {
  const riskDistribution = investments.reduce((acc, inv) => {
    acc[inv.risk] = (acc[inv.risk] || 0) + inv.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalAmount = Object.values(riskDistribution).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Risk Distribution</h2>
      <div className="space-y-4">
        {Object.entries(riskDistribution).map(([risk, amount]) => {
          const percentage = ((amount / totalAmount) * 100).toFixed(1);
          return (
            <div key={risk} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{risk} Risk</span>
                <span className="text-gray-900">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    risk === "low"
                      ? "bg-green-600"
                      : risk === "medium"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
