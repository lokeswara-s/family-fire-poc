import React, { useState } from 'react';
import { FlagIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { FinancialGoal } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { GoalContributors } from '../Goals/GoalContributors';
import { GoalInvestments } from '../Goals/GoalInvestments';

interface GoalProgressProps {
  goal: FinancialGoal;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <FlagIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">{goal.title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>{formatCurrency(goal.currentAmount)}</span>
          <span>{formatCurrency(goal.targetAmount)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Target Date: {goal.deadline.toLocaleDateString()}
        </p>
      </div>

      {isExpanded && (
        <>
          <GoalContributors contributorIds={goal.contributors} />
          <GoalInvestments goal={goal} />
        </>
      )}
    </div>
  );
};