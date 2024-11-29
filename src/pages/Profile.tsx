import React, { useState } from 'react';
import { UserCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '../store/useStore';
import { AddFamilyMemberForm } from '../components/Forms/AddFamilyMemberForm';

export const Profile: React.FC = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const familyMembers = useStore((state) => state.familyMembers);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCircleIcon className="h-12 w-12 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Family Profile</h2>
            <p className="text-gray-600">{familyMembers.length} family members</p>
          </div>
          <button
            onClick={() => setShowAddMember(!showAddMember)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Member
          </button>
        </div>

        {showAddMember && (
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Family Member</h3>
            <AddFamilyMemberForm />
          </div>
        )}

        <div className="space-y-4">
          {familyMembers.map((member) => (
            <div key={member.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">Relationship: {member.relationship}</p>
                  <p className="text-sm text-gray-600">
                    Monthly Income: ${member.monthlyIncome.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Monthly Expenses: ${member.monthlyExpenses.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {familyMembers.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No family members added yet. Click the "Add Member" button to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};