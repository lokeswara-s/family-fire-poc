import React from 'react';
import { Plus, Target, Book, Plane, Briefcase } from 'lucide-react';
import GoalCard from '../components/GoalCard';

const IndividualGoals: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Individual Goals</h1>
          <p className="text-gray-500 mt-2">Track and manage your personal financial goals</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Plus className="h-5 w-5 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GoalCard
          title="Career Development"
          target={15000}
          current={5000}
          deadline="2024"
          icon={<Briefcase className="h-6 w-6" />}
        />
        <GoalCard
          title="Travel Fund"
          target={10000}
          current={3500}
          deadline="2024"
          icon={<Plane className="h-6 w-6" />}
        />
        <GoalCard
          title="Skill Building"
          target={5000}
          current={2000}
          deadline="2024"
          icon={<Book className="h-6 w-6" />}
        />
        <GoalCard
          title="Personal Investment"
          target={50000}
          current={15000}
          deadline="2025"
          icon={<Target className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default IndividualGoals;