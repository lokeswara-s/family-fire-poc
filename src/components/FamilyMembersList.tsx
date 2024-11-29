import React from 'react';
import { User, Mail, Check, X } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending';
  contributedAmount: number;
}

const FamilyMembersList: React.FC<{ members: FamilyMember[] }> = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h3>
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{member.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  {member.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Contributed</p>
                <p className="font-medium text-gray-900">${member.contributedAmount.toLocaleString()}</p>
              </div>
              {member.status === 'pending' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembersList;