import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RiskAppetite = 'Safe' | 'Balanced' | 'Aggressive';

export interface FinancialData {
  // Basic
  age: number;
  city: string;
  maritalStatus: string;
  dependents: number;

  // Income
  monthlySalary: number;
  bonus: number;
  otherIncome: number;

  // Fixed Commitments
  homeLoanEMI: number;
  carLoanEMI: number;
  creditCardDues: number;
  otherEMIs: number;

  // Monthly Expenses
  rent: number;
  groceries: number;
  utilities: number;
  lifestyle: number;
  otherExpenses: number;

  // Goals
  goals: {
    id: string;
    name: string;
    targetAmount: number;
    yearsToAchieve: number;
    priority: 'High' | 'Medium' | 'Low';
  }[];

  // Risk
  riskAppetite: RiskAppetite;
}

const initialData: FinancialData = {
  age: 30,
  city: '',
  maritalStatus: 'Single',
  dependents: 0,
  monthlySalary: 0,
  bonus: 0,
  otherIncome: 0,
  homeLoanEMI: 0,
  carLoanEMI: 0,
  creditCardDues: 0,
  otherEMIs: 0,
  rent: 0,
  groceries: 0,
  utilities: 0,
  lifestyle: 0,
  otherExpenses: 0,
  goals: [],
  riskAppetite: 'Balanced',
};

interface FinancialContextType {
  data: FinancialData;
  updateData: (newData: Partial<FinancialData>) => void;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FinancialData>(() => {
    const savedData = localStorage.getItem('financialData');
    return savedData ? JSON.parse(savedData) : initialData;
  });
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => {
    return localStorage.getItem('isOnboardingComplete') === 'true';
  });

  const updateData = (newData: Partial<FinancialData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('financialData', JSON.stringify(updated));
      return updated;
    });
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem('isOnboardingComplete', 'true');
  };

  return (
    <FinancialContext.Provider value={{ data, updateData, isOnboardingComplete, completeOnboarding }}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};
