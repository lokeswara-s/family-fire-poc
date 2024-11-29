import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

export const GoalInvitations: React.FC = () => {
  const { goalInvitations, familyMembers, goals, acceptInvitation, declineInvitation } = useStore();
  const pendingInvitations = goalInvitations.filter(inv => inv.status === 'pending');

  if (pendingInvitations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Pending Goal Invitations</h2>
      <div className="space-y-4">
        {pendingInvitations.map((invitation) => {
          const goal = goals.find(g => g.id === invitation.goalId);
          const inviter = familyMembers.find(m => m.id === invitation.inviterId) || 
                         { name: 'You' };

          return (
            <div key={invitation.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-medium">{goal?.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Invited by {inviter.name}
                  </p>
                  {invitation.message && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      "{invitation.message}"
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => acceptInvitation(invitation.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <CheckCircleIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => declineInvitation(invitation.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};