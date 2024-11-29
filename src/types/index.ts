export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}
export type FamilyMemberRelationship = "spouse" | "child" | "other";

// Investment
export type Investment = "stocks" | "bonds" | "mutualFunds";
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface GoalInvitation {
  id: string;
  goalId: string;
  inviterId: string;
  inviteeId: string;
  status: "pending" | "accepted" | "declined";
  message?: string;
  createdAt: Date;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  contributors: string[];
  category: "retirement" | "education" | "housing" | "emergency" | "other";
  invitations?: GoalInvitation[];
}

// Rest of the types remain the same...
