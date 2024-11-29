import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '../../store/useStore';

const goalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  targetAmount: z.number().min(1, 'Target amount must be greater than 0'),
  deadline: z.string().min(1, 'Deadline is required'),
  category: z.enum(['retirement', 'education', 'housing', 'emergency', 'other']),
  type: z.enum(['individual', 'family']),
  familyMemberId: z.string().optional(),
});

type GoalFormData = z.infer<typeof goalSchema>;

export const AddGoalForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      type: 'individual',
    },
  });
  
  const addGoal = useStore((state) => state.addGoal);
  const familyMembers = useStore((state) => state.familyMembers);
  const goalType = watch('type');

  const onSubmit = (data: GoalFormData) => {
    const contributors = data.type === 'individual' && data.familyMemberId
      ? [data.familyMemberId]
      : data.type === 'family'
      ? ['user', ...familyMembers.map(member => member.id)]
      : ['user'];

    addGoal({
      id: crypto.randomUUID(),
      ...data,
      currentAmount: 0,
      deadline: new Date(data.deadline),
      contributors,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Type</label>
        <div className="mt-2 flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register('type')}
              value="individual"
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Individual Goal</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register('type')}
              value="family"
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Family Goal</span>
          </label>
        </div>
      </div>

      {goalType === 'individual' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Family Member</label>
          <select
            {...register('familyMemberId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Me</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.relationship})
              </option>
            ))}
          </select>
          {familyMembers.length === 0 && (
            <p className="mt-1 text-sm text-gray-500">
              No family members added yet. You can add family members in the Profile section.
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter goal title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Amount</label>
        <input
          type="number"
          {...register('targetAmount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter target amount"
        />
        {errors.targetAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.targetAmount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          type="date"
          {...register('deadline')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="retirement">Retirement</option>
          <option value="education">Education</option>
          <option value="housing">Housing</option>
          <option value="emergency">Emergency Fund</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Goal
      </button>
    </form>
  );
};