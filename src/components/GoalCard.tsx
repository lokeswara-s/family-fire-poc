import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  contributedAmount: number;
}

interface GoalCardProps {
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: React.ReactNode;
  familyMembers?: FamilyMember[];
}

const GoalCard: React.FC<GoalCardProps> = ({ 
  title, 
  target, 
  current, 
  deadline, 
  icon,
  familyMembers = []
}) => {
  const [showContributions, setShowContributions] = useState(false);
  const progress = (current / target) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-500">Due {deadline}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-900">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Current</span>
          <span className="font-medium text-gray-900">${current.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Target</span>
          <span className="font-medium text-gray-900">${target.toLocaleString()}</span>
        </div>
      </div>

      {familyMembers && familyMembers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowContributions(!showContributions)}
            className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900"
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{familyMembers.length} Contributors</span>
            </div>
            {showContributions ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showContributions && (
            <div className="mt-3 space-y-2">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{member.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      ${member.contributedAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({((member.contributedAmount / current) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalCard;