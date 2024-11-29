import React, { useState } from 'react';
import { X, Users, Target, Calendar } from 'lucide-react';
import InviteMemberForm from './InviteMemberForm';
import InvestmentRecommendations from './InvestmentRecommendations';

interface InvestmentOption {
  type: string;
  allocation: number;
  risk: string;
  expectedReturn: number;
  description: string;
}

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goal: any) => void;
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ isOpen, onClose, onCreateGoal }) => {
  const [goalData, setGoalData] = useState({
    title: '',
    target: '',
    deadline: '',
    description: '',
    inviteMembers: false,
    selectedInvestments: [] as InvestmentOption[],
  });

  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleInviteMember = (email: string) => {
    setInvitedEmails([...invitedEmails, email]);
  };

  const handleSelectInvestments = (investments: InvestmentOption[]) => {
    setGoalData(prev => ({
      ...prev,
      selectedInvestments: investments
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRecommendations) {
      setShowRecommendations(true);
      return;
    }
    onCreateGoal({
      ...goalData,
      invitedMembers: invitedEmails,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {showRecommendations ? 'Investment Recommendations' : 'Create New Goal'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!showRecommendations ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
              <input
                type="text"
                value={goalData.title}
                onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
              <input
                type="number"
                value={goalData.target}
                onChange={(e) => setGoalData({ ...goalData, target: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
              <input
                type="date"
                value={goalData.deadline}
                onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={goalData.description}
                onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={goalData.inviteMembers}
                  onChange={(e) => setGoalData({ ...goalData, inviteMembers: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="text-sm font-medium text-gray-700">Invite family members to contribute</span>
              </label>

              {goalData.inviteMembers && (
                <div className="mt-4 space-y-4">
                  <InviteMemberForm onInvite={handleInviteMember} />
                  {invitedEmails.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Invited members:</p>
                      {invitedEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{email}</span>
                          <button
                            type="button"
                            onClick={() => setInvitedEmails(invitedEmails.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                View Investment Options
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 sm:p-6">
            <InvestmentRecommendations 
              goalAmount={Number(goalData.target)} 
              timeframe={goalData.deadline}
              onSelectInvestments={handleSelectInvestments}
            />
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowRecommendations(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 text-white rounded-lg transition ${
                  goalData.selectedInvestments.length > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={goalData.selectedInvestments.length === 0}
              >
                Create Goal with {goalData.selectedInvestments.length} Investment{goalData.selectedInvestments.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGoalModal;