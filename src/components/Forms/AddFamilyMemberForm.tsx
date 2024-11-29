//@ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "../../store/useStore";

const familyMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  monthlyIncome: z.number().min(0, "Monthly income must be 0 or greater"),
  monthlyExpenses: z.number().min(0, "Monthly expenses must be 0 or greater"),
});

type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;

export const AddFamilyMemberForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FamilyMemberFormData>({
    resolver: zodResolver(familyMemberSchema),
  });
  const addFamilyMember = useStore((state) => state.addFamilyMember);

  const onSubmit = (data: FamilyMemberFormData) => {
    addFamilyMember({
      id: crypto.randomUUID(),
      ...data,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Relationship
        </label>
        <select
          {...register("relationship")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select relationship</option>
          <option value="spouse">Spouse</option>
          <option value="child">Child</option>
          <option value="parent">Parent</option>
          <option value="sibling">Sibling</option>
          <option value="other">Other</option>
        </select>
        {errors.relationship && (
          <p className="mt-1 text-sm text-red-600">
            {errors.relationship.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Income
        </label>
        <input
          type="number"
          {...register("monthlyIncome", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0"
        />
        {errors.monthlyIncome && (
          <p className="mt-1 text-sm text-red-600">
            {errors.monthlyIncome.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Expenses
        </label>
        <input
          type="number"
          {...register("monthlyExpenses", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0"
        />
        {errors.monthlyExpenses && (
          <p className="mt-1 text-sm text-red-600">
            {errors.monthlyExpenses.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Family Member
      </button>
    </form>
  );
};
