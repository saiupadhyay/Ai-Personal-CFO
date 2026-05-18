import { useFinancial } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';

export default function EmergencyFund() {
  const { data } = useFinancial();

  const monthlyExpenses = data.rent + data.groceries + data.utilities + data.homeLoanEMI + data.carLoanEMI + data.otherEMIs + data.lifestyle + data.otherExpenses;
  
  // Target: 6 months of expenses
  const targetMonths = 6;
  const targetAmount = monthlyExpenses * targetMonths;
  
  // Simulated current emergency fund (In a real app, user would input this or link bank)
  // For demo, let's assume they have 2 months worth saved in "Savings" from the budget calculation
  const totalIncome = data.monthlySalary + data.otherIncome + (data.bonus / 12);
  const currentSavings = Math.max(0, totalIncome - monthlyExpenses) * 12; // Simulated existing savings over a year
  const currentEmergencyFund = Math.min(currentSavings, targetAmount * 0.4); // Assume 40% of savings is liquid

  const progress = Math.min(100, (currentEmergencyFund / targetAmount) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Fund Builder</h1>
        <p className="text-muted-foreground">Your financial safety net for unexpected events.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Fund Status</CardTitle>
            <CardDescription>Target: {targetMonths} months of expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Fund</p>
                <p className="text-3xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentEmergencyFund)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Target Goal</p>
                <p className="text-xl font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(targetAmount)}</p>
              </div>
            </div>
            <Progress value={progress} className="h-4" />
            <p className="text-sm text-muted-foreground text-center">
              You have coverage for <strong>{((currentEmergencyFund / monthlyExpenses)).toFixed(1)} months</strong> of expenses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why do I need this?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">Protects against job loss, medical emergencies, or urgent repairs without breaking your investments.</p>
            </div>
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">Keep this money in <strong>Liquid Funds</strong> or a separate <strong>Savings Account</strong> for instant access.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress < 100 ? (
              <div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900">Priority: High</h4>
                  <p className="text-sm text-amber-800">
                    Allocate an extra {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlyExpenses * 0.1)} per month to reach your goal in {Math.ceil((targetAmount - currentEmergencyFund) / (monthlyExpenses * 0.1))} months.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
                <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">Fully Funded!</h4>
                  <p className="text-sm text-green-800">You are safe. You can now focus entirely on investments and goals.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
