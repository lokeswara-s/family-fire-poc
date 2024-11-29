import { z } from 'zod';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  contributors: string[];
  category: 'retirement' | 'education' | 'housing' | 'emergency' | 'other';
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'realEstate' | 'crypto' | 'other' | 'mutualFund';
  amount: number;
  returnRate: number;
  risk: 'low' | 'medium' | 'high';
  startDate: Date;
  fundDetails?: {
    fundHouse: string;
    category: string;
    nav: number;
    units: number;
    expenseRatio: number;
    exitLoad: string;
    benchmark: string;
    fundManager: string;
  };
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
}

export const fundSchema = z.object({
  fundHouse: z.string(),
  category: z.string(),
  nav: z.number(),
  units: z.number(),
  expenseRatio: z.number(),
  exitLoad: z.string(),
  benchmark: z.string(),
  fundManager: z.string(),
});