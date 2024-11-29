import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/formatCurrency';

interface GoalContributorsProps {
  contributorIds: string[];
}

export const GoalContributors: React.FC<GoalContributorsProps> = ({ contributorIds }) => {
  const familyMembers = useStore((state) => state.familyMembers);
  
  const contributors = contributorIds.map(id => {
    const member = familyMembers.find(m => m.id === id);
    return member || { id: 'user', name: 'You', monthlyIncome: 0 };
  });

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Contributors</h4>
      <div className="space-y-2">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">{contributor.name}</span>
            </div>
            {contributor.monthlyIncome > 0 && (
              <span className="text-sm text-gray-600">
                Income: {formatCurrency(contributor.monthlyIncome)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};