//@ts-nocheck
import React from "react";
import { Investment } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface InvestmentChartsProps {
  investments: Investment[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export const InvestmentCharts: React.FC<InvestmentChartsProps> = ({
  investments,
}) => {
  // Prepare data for allocation pie chart
  const allocationData = investments.reduce((acc, inv) => {
    const existingType = acc.find((item) => item.type === inv.type);
    if (existingType) {
      existingType.value += inv.amount;
    } else {
      acc.push({ type: inv.type, value: inv.amount });
    }
    return acc;
  }, [] as { type: string; value: number }[]);

  // Prepare data for returns bar chart
  const returnsData = investments.map((inv) => ({
    name: inv.name,
    return: inv.returnRate,
  }));

  // Prepare data for risk distribution
  const riskData = investments.reduce((acc, inv) => {
    const existingRisk = acc.find((item) => item.risk === inv.risk);
    if (existingRisk) {
      existingRisk.amount += inv.amount;
    } else {
      acc.push({ risk: inv.risk, amount: inv.amount });
    }
    return acc;
  }, [] as { risk: string; amount: number }[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Asset Allocation Pie Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ type, value }) =>
                  `${type} (${(
                    (value /
                      investments.reduce((sum, inv) => sum + inv.amount, 0)) *
                    100
                  ).toFixed(1)}%)`
                }
              >
                {allocationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Returns Bar Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Investment Returns</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={returnsData}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis unit="%" />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="return" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Distribution Line Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="risk" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
