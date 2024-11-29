import React, { useState } from 'react';
import { Plus, Target, Users, PiggyBank, Home } from 'lucide-react';
import GoalCard from '../components/GoalCard';
import FamilyProgress from '../components/FamilyProgress';
import FamilyMembersList from '../components/FamilyMembersList';
import CreateGoalModal from '../components/CreateGoalModal';

const FamilyGoals: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data for family members and their contributions
  const familyMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active' as const,
      contributedAmount: 25000,
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      status: 'active' as const,
      contributedAmount: 30000,
    },
    {
      id: '3',
      name: 'Mike Smith',
      email: 'mike@example.com',
      status: 'pending' as const,
      contributedAmount: 0,
    },
  ];

  // Mock data for goal contributions
  const goalContributions = {
    retirement: [
      { id: '1', name: 'John Doe', contributedAmount: 400000 },
      { id: '2', name: 'Jane Doe', contributedAmount: 350000 },
    ],
    education: [
      { id: '1', name: 'John Doe', contributedAmount: 80000 },
      { id: '2', name: 'Jane Doe', contributedAmount: 70000 },
    ],
    emergency: [
      { id: '1', name: 'John Doe', contributedAmount: 20000 },
      { id: '2', name: 'Jane Doe', contributedAmount: 15000 },
    ],
    home: [
      { id: '1', name: 'John Doe', contributedAmount: 60000 },
      { id: '2', name: 'Jane Doe', contributedAmount: 40000 },
    ],
  };

  const handleCreateGoal = (goalData: any) => {
    console.log('New goal created:', goalData);
    // Here you would typically make an API call to create the goal
    // and handle the invited members
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Family Goals</h1>
          <p className="text-gray-500 mt-2">Track and manage your family's shared financial goals</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Family Goal
        </button>
      </div>

      <div className="mb-12">
        <FamilyProgress />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoalCard
              title="Early Retirement"
              target={1500000}
              current={750000}
              deadline="2035"
              icon={<Target className="h-6 w-6" />}
              familyMembers={goalContributions.retirement}
            />
            <GoalCard
              title="Children's Education"
              target={400000}
              current={150000}
              deadline="2030"
              icon={<Users className="h-6 w-6" />}
              familyMembers={goalContributions.education}
            />
            <GoalCard
              title="Emergency Fund"
              target={50000}
              current={35000}
              deadline="2024"
              icon={<PiggyBank className="h-6 w-6" />}
              familyMembers={goalContributions.emergency}
            />
            <GoalCard
              title="New Home"
              target={300000}
              current={100000}
              deadline="2026"
              icon={<Home className="h-6 w-6" />}
              familyMembers={goalContributions.home}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <FamilyMembersList members={familyMembers} />
        </div>
      </div>

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
    </div>
  );
};

export default FamilyGoals;