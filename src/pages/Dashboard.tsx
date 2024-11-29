import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { FamilyOverview } from '../components/Dashboard/FamilyOverview';
import { GoalProgress } from '../components/Dashboard/GoalProgress';
import { GoalsToggle } from '../components/Dashboard/GoalsToggle';
import { InvestmentOverview } from '../components/Dashboard/InvestmentOverview';
import { InvestmentDistribution } from '../components/Dashboard/InvestmentDistribution';

export const Dashboard: React.FC = () => {
  const { familyMembers, goals, investments } = useStore();
  const [activeView, setActiveView] = useState<'individual' | 'family'>('individual');

  const filteredGoals = goals.filter(goal => {
    if (activeView === 'individual') {
      return goal.contributors.length === 1;
    } else {
      return goal.contributors.length > 1;
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
      
      <FamilyOverview members={familyMembers} />

      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Goal Progress</h2>
        <GoalsToggle activeView={activeView} onToggle={setActiveView} />
        <div className="space-y-4">
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) => (
              <GoalProgress key={goal.id} goal={goal} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No {activeView} goals found. Add some goals to track your progress!
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InvestmentOverview investments={investments} />
        <InvestmentDistribution investments={investments} />
      </div>
    </div>
  );
};