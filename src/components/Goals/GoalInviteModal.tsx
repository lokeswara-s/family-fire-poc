import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '../../store/useStore';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const inviteSchema = z.object({
  inviteeId: z.string().min(1, 'Please select a family member'),
  message: z.string().optional(),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface GoalInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
}

export const GoalInviteModal: React.FC<GoalInviteModalProps> = ({
  isOpen,
  onClose,
  goalId,
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });
  
  const { familyMembers, goals, inviteToGoal } = useStore();
  const goal = goals.find(g => g.id === goalId);
  const availableMembers = familyMembers.filter(
    member => !goal?.contributors.includes(member.id)
  );

  const onSubmit = (data: InviteFormData) => {
    inviteToGoal({
      goalId,
      inviterId: 'user', // Current user's ID
      inviteeId: data.inviteeId,
      message: data.message,
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Invite to Goal: {goal?.title}
            </Dialog.Title>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Family Member
              </label>
              <select
                {...register('inviteeId')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Choose a family member</option>
                {availableMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.relationship})
                  </option>
                ))}
              </select>
              {errors.inviteeId && (
                <p className="mt-1 text-sm text-red-600">{errors.inviteeId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <textarea
                {...register('message')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a personal message..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};