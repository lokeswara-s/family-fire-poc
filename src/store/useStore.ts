import { create } from "zustand";
import {
  FamilyMember,
  FinancialGoal,
  Investment,
  GoalInvitation,
} from "../types";

interface Store {
  familyMembers: FamilyMember[];
  goals: FinancialGoal[];
  investments: Investment[];
  goalInvitations: GoalInvitation[];
  addFamilyMember: (member: FamilyMember) => void;
  addGoal: (goal: FinancialGoal) => void;
  addInvestment: (investment: Investment) => void;
  inviteToGoal: (
    invitation: Omit<GoalInvitation, "id" | "createdAt" | "status">,
  ) => void;
  acceptInvitation: (invitationId: string) => void;
  declineInvitation: (invitationId: string) => void;
}

// Initial dummy data
const initialFamilyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Priya Sharma",
    relationship: "spouse",
    monthlyIncome: 150000,
    monthlyExpenses: 50000,
  },
  {
    id: "2",
    name: "Arjun Sharma",
    relationship: "child",
    monthlyIncome: 0,
    monthlyExpenses: 25000,
  },
];

const initialGoals: FinancialGoal[] = [
  {
    id: "1",
    title: "Retirement Fund",
    targetAmount: 50000000,
    currentAmount: 15000000,
    deadline: new Date("2045-12-31"),
    contributors: ["user", "1"],
    category: "retirement",
  },
  {
    id: "2",
    title: "Child Education",
    targetAmount: 10000000,
    currentAmount: 2000000,
    deadline: new Date("2035-06-30"),
    contributors: ["user", "1", "2"],
    category: "education",
  },
  {
    id: "3",
    title: "Dream Home",
    targetAmount: 25000000,
    currentAmount: 5000000,
    deadline: new Date("2028-12-31"),
    contributors: ["user", "1"],
    category: "housing",
  },
];

const initialInvestments: Investment[] = [
  //@ts-ignore
  {
    id: "1",
    name: "Nifty 50 Index Fund",
    type: "stocks",
    amount: 5000000,
    returnRate: 12.5,
    risk: "medium",
    startDate: new Date("2022-01-15"),
    fundDetails: {
      fundHouse: "HDFC Mutual Fund",
      category: "Large Cap",
      nav: 158.75,
      expenseRatio: 0.15,
      fundManager: "Prashant Kumar",
      units: 31496.69,
      exitLoad: "1% if redeemed within 1 year",
      benchmark: "NIFTY 50 Total Return Index",
    },
  },
  //@ts-ignore
  {
    id: "2",
    name: "Government Securities Fund",
    type: "bonds",
    amount: 3000000,
    returnRate: 7.2,
    risk: "low",
    startDate: new Date("2022-03-20"),
    fundDetails: {
      fundHouse: "SBI Mutual Fund",
      category: "Debt",
      nav: 32.45,
      expenseRatio: 0.25,
      fundManager: "Radhika Gupta",
      units: 92450.23,
      exitLoad: "Nil",
      benchmark: "CRISIL Dynamic Gilt Index",
    },
  },
  //@ts-ignore
  {
    id: "3",
    name: "Mid Cap Growth Fund",
    type: "stocks",
    amount: 2500000,
    returnRate: 15.8,
    risk: "high",
    startDate: new Date("2022-06-10"),
    fundDetails: {
      fundHouse: "Nippon India Mutual Fund",
      category: "Mid Cap",
      nav: 85.3,
      expenseRatio: 0.35,
      fundManager: "Amit Shah",
      units: 29308.32,
      exitLoad: "1% if redeemed within 1 year",
      benchmark: "NIFTY Midcap 150 Total Return Index",
    },
  },
  //@ts-ignore
  {
    id: "4",
    name: "Real Estate Investment Trust",
    type: "realEstate",
    amount: 4000000,
    returnRate: 8.5,
    risk: "medium",
    startDate: new Date("2022-09-05"),
  },
  //@ts-ignore
  {
    id: "5",
    name: "Bitcoin Investment",
    type: "crypto",
    amount: 1000000,
    returnRate: 22.5,
    risk: "high",
    startDate: new Date("2023-01-10"),
  },
];

// Add some initial invitations for demonstration
const initialInvitations: GoalInvitation[] = [
  {
    id: "1",
    goalId: "1",
    inviterId: "1",
    inviteeId: "2",
    status: "pending",
    message: "Would you like to contribute to our retirement fund?",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    goalId: "3",
    inviterId: "user",
    inviteeId: "2",
    status: "pending",
    message: "Let's save together for our dream home!",
    createdAt: new Date("2024-01-16"),
  },
];

export const useStore = create<Store>((set) => ({
  familyMembers: initialFamilyMembers,
  goals: initialGoals,
  investments: initialInvestments,
  goalInvitations: initialInvitations,

  addFamilyMember: (member) =>
    set((state) => ({
      familyMembers: [...state.familyMembers, member],
    })),

  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),

  addInvestment: (investment) =>
    set((state) => ({
      investments: [...state.investments, investment],
    })),

  inviteToGoal: (invitationData) =>
    set((state) => ({
      goalInvitations: [
        ...state.goalInvitations,
        {
          id: crypto.randomUUID(),
          ...invitationData,
          status: "pending",
          createdAt: new Date(),
        },
      ],
    })),

  acceptInvitation: (invitationId) =>
    set((state) => {
      const invitation = state.goalInvitations.find(
        (inv) => inv.id === invitationId,
      );
      if (!invitation) return state;

      return {
        goalInvitations: state.goalInvitations.map((inv) =>
          inv.id === invitationId ? { ...inv, status: "accepted" } : inv,
        ),
        goals: state.goals.map((goal) =>
          goal.id === invitation.goalId
            ? {
                ...goal,
                contributors: [...goal.contributors, invitation.inviteeId],
              }
            : goal,
        ),
      };
    }),

  declineInvitation: (invitationId) =>
    set((state) => ({
      goalInvitations: state.goalInvitations.map((inv) =>
        inv.id === invitationId ? { ...inv, status: "declined" } : inv,
      ),
    })),
}));
