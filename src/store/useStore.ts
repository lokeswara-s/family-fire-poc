import { create } from 'zustand';
import { FamilyMember, FinancialGoal, Investment, ExpenseCategory } from '../types';

interface Store {
  familyMembers: FamilyMember[];
  goals: FinancialGoal[];
  investments: Investment[];
  expenseCategories: ExpenseCategory[];
  addFamilyMember: (member: FamilyMember) => void;
  addGoal: (goal: FinancialGoal) => void;
  addInvestment: (investment: Investment) => void;
  updateGoalProgress: (goalId: string, amount: number) => void;
}

// Sample investment data with detailed fund information
const sampleInvestments: Investment[] = [
  {
    id: '1',
    name: 'Nifty 50 Index Fund',
    type: 'stocks',
    amount: 2000000,
    returnRate: 12.5,
    risk: 'medium',
    startDate: new Date('2020-01-01'),
    fundDetails: {
      fundHouse: 'UTI Mutual Fund',
      category: 'Index Fund',
      nav: 245.67,
      units: 8141.57, // amount / nav
      expenseRatio: 0.18,
      exitLoad: '0.25% if redeemed within 7 days',
      benchmark: 'Nifty 50 Total Return Index',
      fundManager: 'Sharwan Kumar Goyal',
    }
  },
  {
    id: '2',
    name: 'Government Securities',
    type: 'bonds',
    amount: 1500000,
    returnRate: 7.5,
    risk: 'low',
    startDate: new Date('2021-04-15'),
  },
  {
    id: '3',
    name: 'Real Estate Investment',
    type: 'realEstate',
    amount: 5000000,
    returnRate: 8.0,
    risk: 'medium',
    startDate: new Date('2019-07-01'),
  },
  {
    id: '4',
    name: 'Bitcoin Investment',
    type: 'crypto',
    amount: 500000,
    returnRate: 45.0,
    risk: 'high',
    startDate: new Date('2022-01-15'),
  },
  {
    id: '5',
    name: 'Nippon India Growth Fund',
    type: 'stocks',
    amount: 1000000,
    returnRate: 15.0,
    risk: 'high',
    startDate: new Date('2021-06-01'),
    fundDetails: {
      fundHouse: 'Nippon India Mutual Fund',
      category: 'Mid Cap Fund',
      nav: 178.45,
      units: 5603.25,
      expenseRatio: 1.92,
      exitLoad: '1% if redeemed within 1 year',
      benchmark: 'Nifty Midcap 150 Total Return Index',
      fundManager: 'Manish Gunwani',
    }
  },
  {
    id: '6',
    name: 'Corporate Bonds',
    type: 'bonds',
    amount: 800000,
    returnRate: 8.5,
    risk: 'medium',
    startDate: new Date('2022-03-15'),
  },
  {
    id: '7',
    name: 'REIT Investment',
    type: 'realEstate',
    amount: 1200000,
    returnRate: 9.0,
    risk: 'medium',
    startDate: new Date('2021-12-01'),
  },
  {
    id: '8',
    name: 'Ethereum Investment',
    type: 'crypto',
    amount: 300000,
    returnRate: 35.0,
    risk: 'high',
    startDate: new Date('2022-06-15'),
  },
  {
    id: '9',
    name: 'HDFC Index Fund - Sensex Plan',
    type: 'stocks',
    amount: 1500000,
    returnRate: 11.0,
    risk: 'medium',
    startDate: new Date('2020-09-01'),
    fundDetails: {
      fundHouse: 'HDFC Mutual Fund',
      category: 'Index Fund',
      nav: 456.78,
      units: 3283.59,
      expenseRatio: 0.10,
      exitLoad: 'NIL',
      benchmark: 'S&P BSE SENSEX Total Return Index',
      fundManager: 'Krishan Kumar Daga',
    }
  },
  {
    id: '10',
    name: 'Treasury Bonds',
    type: 'bonds',
    amount: 1000000,
    returnRate: 7.0,
    risk: 'low',
    startDate: new Date('2021-08-15'),
  },
];

// Rest of the sample data remains the same
const sampleFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    relationship: 'self',
    monthlyIncome: 150000,
    monthlyExpenses: 60000,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    relationship: 'spouse',
    monthlyIncome: 120000,
    monthlyExpenses: 45000,
  },
  {
    id: '3',
    name: 'Aarav Sharma',
    relationship: 'child',
    monthlyIncome: 0,
    monthlyExpenses: 25000,
  },
];

const sampleGoals: FinancialGoal[] = [
  {
    id: '1',
    title: 'Retirement Fund',
    targetAmount: 10000000,
    currentAmount: 2500000,
    deadline: new Date('2045-12-31'),
    contributors: ['1', '2'],
    category: 'retirement',
  },
  {
    id: '2',
    title: 'Child Education',
    targetAmount: 5000000,
    currentAmount: 1000000,
    deadline: new Date('2035-06-30'),
    contributors: ['1', '2'],
    category: 'education',
  },
  {
    id: '3',
    title: 'Dream Home',
    targetAmount: 15000000,
    currentAmount: 3500000,
    deadline: new Date('2028-12-31'),
    contributors: ['1', '2'],
    category: 'housing',
  },
  {
    id: '4',
    title: 'Emergency Fund',
    targetAmount: 1000000,
    currentAmount: 600000,
    deadline: new Date('2024-12-31'),
    contributors: ['1'],
    category: 'emergency',
  },
  {
    id: '5',
    title: 'Travel Fund',
    targetAmount: 500000,
    currentAmount: 200000,
    deadline: new Date('2024-06-30'),
    contributors: ['2'],
    category: 'other',
  },
];

const sampleExpenseCategories: ExpenseCategory[] = [
  {
    id: '1',
    name: 'Housing',
    budget: 40000,
    spent: 38000,
  },
  {
    id: '2',
    name: 'Transportation',
    budget: 15000,
    spent: 12000,
  },
  {
    id: '3',
    name: 'Groceries',
    budget: 25000,
    spent: 22000,
  },
  {
    id: '4',
    name: 'Utilities',
    budget: 10000,
    spent: 8500,
  },
  {
    id: '5',
    name: 'Entertainment',
    budget: 15000,
    spent: 14000,
  },
];

export const useStore = create<Store>((set) => ({
  familyMembers: sampleFamilyMembers,
  goals: sampleGoals,
  investments: sampleInvestments,
  expenseCategories: sampleExpenseCategories,
  
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
    
  updateGoalProgress: (goalId, amount) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, currentAmount: goal.currentAmount + amount }
          : goal
      ),
    })),
}));