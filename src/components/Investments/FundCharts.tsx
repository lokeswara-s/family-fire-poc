import React from 'react';
import { Investment } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FundChartsProps {
  investment: Investment;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// Simulated historical data
const generateHistoricalData = (investment: Investment) => {
  const data = [];
  const startDate = investment.startDate;
  const months = 12;
  let currentNav = investment.fundDetails?.nav || 100;

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    const randomChange = (Math.random() * 4) - 2; // Random change between -2% and 2%
    currentNav = currentNav * (1 + (randomChange / 100));
    
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      nav: currentNav,
      benchmark: currentNav * (1 + (Math.random() * 0.4 - 0.2)), // Benchmark varies slightly from NAV
    });
  }
  return data;
};

// Simulated sector allocation data
const generateSectorData = () => [
  { name: 'Financial Services', value: 35 },
  { name: 'Technology', value: 25 },
  { name: 'Consumer Goods', value: 15 },
  { name: 'Healthcare', value: 15 },
  { name: 'Others', value: 10 },
];

export const FundCharts: React.FC<FundChartsProps> = ({ investment }) => {
  const historicalData = generateHistoricalData(investment);
  const sectorData = generateSectorData();

  return (
    <div className="space-y-6">
      {/* NAV vs Benchmark Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">NAV vs Benchmark Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                domain={['dataMin', 'dataMax']}
                tickFormatter={(value) => `₹${value.toFixed(2)}`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toFixed(2)}`, '']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="nav"
                name="Fund NAV"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name="Benchmark"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Allocation Pie Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Returns Bar Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monthly Returns</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Return']}
              />
              <Bar
                dataKey="nav"
                fill="#3B82F6"
                name="Monthly Return"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};