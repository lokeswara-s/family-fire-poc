import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';

export const GoalInvestmentOverview: React.FC = () => {
  const { goals, investments } = useStore();
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalGoals = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const progressPercentage = (totalInvestments / totalGoals) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ChartBarIcon className="h-6 w-6 text-blue-600 mr-2" />
        Goals vs Investments Progress
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Goals</p>
            <p className="text-2xl font-bold text-blue-600">
              ${totalGoals.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Investments</p>
            <p className="text-2xl font-bold text-green-600">
              ${totalInvestments.toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress Towards Goals</span>
            <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => {
            const relatedInvestments = investments.filter(inv => 
              (goal.category === 'retirement' && ['stocks', 'bonds'].includes(inv.type)) ||
              (goal.category === 'housing' && inv.type === 'realEstate')
            );
            const investmentAmount = relatedInvestments.reduce((sum, inv) => sum + inv.amount, 0);
            const goalProgress = (investmentAmount / goal.targetAmount) * 100;

            return (
              <div key={goal.id} className="border-t pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-gray-600">Target: ${goal.targetAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      ${investmentAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Invested</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.min(goalProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          to="/investments"
          className="block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View All Investments
        </Link>
      </div>
    </div>
  );
};