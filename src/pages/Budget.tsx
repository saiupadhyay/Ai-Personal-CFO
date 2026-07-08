import { useFinancial } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

export default function Budget() {
  const { data } = useFinancial();

  const totalIncome = data.monthlySalary + data.otherIncome + (data.bonus / 12);
  
  // Actuals
  const actualNeeds = data.rent + data.groceries + data.utilities + data.homeLoanEMI + data.carLoanEMI + data.otherEMIs;
  const actualWants = data.lifestyle + data.otherExpenses;
  const actualSavings = Math.max(0, totalIncome - (actualNeeds + actualWants)); // Assuming surplus is savings

  // 50/30/20 Rule
  const idealNeeds = totalIncome * 0.5;
  const idealWants = totalIncome * 0.3;
  const idealSavings = totalIncome * 0.2;

  const budgetData = [
    { name: 'Needs', actual: actualNeeds, ideal: idealNeeds, color: '#3B82F6' },
    { name: 'Wants', actual: actualWants, ideal: idealWants, color: '#F59E0B' },
    { name: 'Savings', actual: actualSavings, ideal: idealSavings, color: '#10B981' },
  ];

  const getStatus = (actual: number, ideal: number, type: 'expense' | 'savings') => {
    const diff = actual - ideal;
    const percentDiff = (diff / ideal) * 100;

    if (type === 'expense') {
      if (percentDiff > 10) return { status: 'Critical', color: 'text-red-600', message: `Overspending by ${Math.round(percentDiff)}%` };
      if (percentDiff > 0) return { status: 'Warning', color: 'text-amber-600', message: `Slightly over budget` };
      return { status: 'Good', color: 'text-green-600', message: 'Within budget' };
    } else {
      if (percentDiff < -10) return { status: 'Critical', color: 'text-red-600', message: `Under saving by ${Math.round(Math.abs(percentDiff))}%` };
      if (percentDiff < 0) return { status: 'Warning', color: 'text-amber-600', message: `Slightly under target` };
      return { status: 'Good', color: 'text-green-600', message: 'On track' };
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Budget Planning</h1>
        <p className="text-muted-foreground">Analyze your spending against the 50/30/20 rule.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {budgetData.map((item) => {
          const isSavings = item.name === 'Savings';
          const status = getStatus(item.actual, item.ideal, isSavings ? 'savings' : 'expense');
          
          return (
            <Card key={item.name} className="bg-card/50 backdrop-blur border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                {status.status === 'Good' ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className={`h-4 w-4 ${status.status === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.actual)}
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Target: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.ideal)}
                </p>
                <Progress 
                  value={(item.actual / (item.ideal * 1.5)) * 100} 
                  className={cn("h-2", isSavings ? "bg-emerald-900/30" : "bg-blue-900/30")} 
                  // indicatorClassName={item.color} // Note: Progress component needs update to support custom color or use style
                />
                <p className={cn("mt-2 text-xs font-medium", status.color)}>
                  {status.message}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle>Actual vs Ideal Split</CardTitle>
            <CardDescription>Visualizing your budget allocation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{fill: '#a1a1aa'}} />
                  <YAxis tick={{fill: '#a1a1aa'}} />
                  <Tooltip 
                    formatter={(value: number | undefined) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0)} 
                    contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #333', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="actual" name="Actual" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ideal" name="Ideal (50/30/20)" fill="#3f3f46" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-white/5">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>How to optimize your budget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {actualNeeds > idealNeeds && (
              <div className="flex gap-3 rounded-lg border border-red-900/50 bg-red-900/20 p-3">
                <TrendingDown className="h-5 w-5 text-red-400" />
                <div>
                  <h4 className="font-semibold text-red-200">Reduce Fixed Costs</h4>
                  <p className="text-sm text-red-300">Your needs (rent, EMIs, groceries) are {Math.round((actualNeeds/totalIncome)*100)}% of your income. Ideally, this should be 50%. Consider refinancing loans or reducing utility bills.</p>
                </div>
              </div>
            )}
            {actualWants > idealWants && (
              <div className="flex gap-3 rounded-lg border border-amber-900/50 bg-amber-900/20 p-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <div>
                  <h4 className="font-semibold text-amber-200">Curb Lifestyle Inflation</h4>
                  <p className="text-sm text-amber-300">You are overspending on wants. Try the "24-hour rule" before making non-essential purchases.</p>
                </div>
              </div>
            )}
            {actualSavings < idealSavings && (
              <div className="flex gap-3 rounded-lg border border-blue-900/50 bg-blue-900/20 p-3">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="font-semibold text-blue-200">Automate Savings</h4>
                  <p className="text-sm text-blue-300">Set up an auto-debit of {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(idealSavings)} on salary day to ensure you meet your savings goal.</p>
                </div>
              </div>
            )}
            {actualNeeds <= idealNeeds && actualWants <= idealWants && actualSavings >= idealSavings && (
              <div className="flex gap-3 border-[3px] border-black bg-white p-4">
                <CheckCircle className="h-5 w-5 text-black" />
                <div>
                  <h4 className="font-mono font-bold uppercase text-black">Great Job!</h4>
                  <p className="text-sm text-black">Your budget is perfectly balanced. Consider increasing your investment contributions.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
