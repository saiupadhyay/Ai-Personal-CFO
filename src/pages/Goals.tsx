import { useFinancial } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Goals() {
  const { data } = useFinancial();

  // Constants
  const INFLATION_RATE = 0.06; // 6%
  const INVESTMENT_RETURN_RATE = 0.10; // 10% (Conservative equity assumption)

  // Calculate monthly surplus
  const totalIncome = data.monthlySalary + data.otherIncome + (data.bonus / 12);
  const totalExpenses = data.rent + data.groceries + data.utilities + data.homeLoanEMI + data.carLoanEMI + data.otherEMIs + data.lifestyle + data.otherExpenses;
  const monthlySurplus = Math.max(0, totalIncome - totalExpenses);

  const calculateGoalMetrics = (goal: typeof data.goals[0]) => {
    // Future Value = PV * (1 + r)^n
    const futureValue = goal.targetAmount * Math.pow(1 + INFLATION_RATE, goal.yearsToAchieve);
    
    // Monthly SIP Formula (Investment at beginning of period)
    // FV = P * ( (1+r)^n - 1 ) / r * (1+r)
    // So, P = FV / ( ( (1+r)^n - 1 ) / r * (1+r) )
    const r = INVESTMENT_RETURN_RATE / 12;
    const n = goal.yearsToAchieve * 12;
    
    const requiredSIP = futureValue / ( ((Math.pow(1 + r, n) - 1) / r) * (1 + r) );

    return {
      futureValue,
      requiredSIP
    };
  };

  const goalMetrics = data.goals.map(goal => ({
    ...goal,
    ...calculateGoalMetrics(goal)
  }));

  const totalRequiredSIP = goalMetrics.reduce((acc, curr) => acc + curr.requiredSIP, 0);
  const shortfall = Math.max(0, totalRequiredSIP - monthlySurplus);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Goal Planning</h1>
        <p className="text-muted-foreground">Map your dreams to reality.</p>
      </div>

      {/* Summary Card */}
      <Card className={shortfall > 0 ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Monthly Investment Required</h3>
            <p className="text-3xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalRequiredSIP)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              To achieve all goals on time (assuming 10% returns & 6% inflation).
            </p>
          </div>
          <div className="text-right">
             <h3 className="text-lg font-semibold">Your Surplus</h3>
             <p className={cn("text-2xl font-bold", shortfall > 0 ? "text-red-600" : "text-green-600")}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlySurplus)}
             </p>
             {shortfall > 0 && (
               <p className="text-sm text-red-600 font-medium mt-1">Shortfall: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(shortfall)}</p>
             )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {goalMetrics.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>Target: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(goal.targetAmount)} in {goal.yearsToAchieve} years</CardDescription>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  goal.priority === 'High' ? "bg-red-100 text-red-800" :
                  goal.priority === 'Medium' ? "bg-amber-100 text-amber-800" :
                  "bg-blue-100 text-blue-800"
                )}>
                  {goal.priority} Priority
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Inflation Adjusted Cost</p>
                  <p className="text-xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(goal.futureValue)}</p>
                  <p className="text-xs text-muted-foreground">@ 6% inflation</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Required Monthly SIP</p>
                  <p className="text-xl font-bold text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(goal.requiredSIP)}</p>
                  <p className="text-xs text-muted-foreground">@ 10% returns</p>
                </div>
                <div className="flex items-center gap-2">
                   {monthlySurplus >= totalRequiredSIP ? (
                     <div className="flex items-center gap-2 text-green-600">
                       <CheckCircle className="h-5 w-5" />
                       <span className="font-medium">Achievable</span>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 text-amber-600">
                       <Clock className="h-5 w-5" />
                       <span className="font-medium">May be delayed</span>
                     </div>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {goalMetrics.length === 0 && (
          <div className="text-center p-10 border rounded-xl border-dashed">
            <p className="text-muted-foreground">No goals added yet. Go to onboarding to add goals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

