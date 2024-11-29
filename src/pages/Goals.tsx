import React from 'react';
import { useStore } from '../store/useStore';
import { AddGoalForm } from '../components/Forms/AddGoalForm';
import { GoalInvitations } from '../components/Goals/GoalInvitations';

export const Goals: React.FC = () => {
  const goals = useStore((state) => state.goals);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
      
      <GoalInvitations />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
          <AddGoalForm />
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Current Goals</h2>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-gray-600">
                  Progress: ${goal.currentAmount.toLocaleString()} / $
                  {goal.targetAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {goal.category}
                </p>
                <p className="text-sm text-gray-600">
                  Contributors: {goal.contributors.length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};