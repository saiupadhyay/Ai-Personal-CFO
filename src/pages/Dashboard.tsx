// import { useFinancial } from '@/context/FinancialContext';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { AlertTriangle, CheckCircle, TrendingUp, ShieldAlert, Wallet, PiggyBank } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { cn } from '@/lib/utils';

// export default function Dashboard() {
//   const { data } = useFinancial();

//   // Calculations
//   const totalMonthlyIncome = data.monthlySalary + data.otherIncome + (data.bonus / 12);
//   const totalFixedCommitments = data.homeLoanEMI + data.carLoanEMI + data.creditCardDues + data.otherEMIs;
//   const totalMonthlyExpenses = data.rent + data.groceries + data.utilities + data.lifestyle + data.otherExpenses;
//   const totalOutflow = totalFixedCommitments + totalMonthlyExpenses;
//   const monthlySavings = totalMonthlyIncome - totalOutflow;
//   const savingsRate = totalMonthlyIncome > 0 ? (monthlySavings / totalMonthlyIncome) * 100 : 0;
//   const debtToIncomeRatio = totalMonthlyIncome > 0 ? (totalFixedCommitments / totalMonthlyIncome) * 100 : 0;

//   // Health Score Calculation (Simple Logic)
//   let healthScore = 5; // Base score
//   if (savingsRate > 20) healthScore += 1;
//   if (savingsRate > 30) healthScore += 1;
//   if (debtToIncomeRatio < 30) healthScore += 1;
//   if (debtToIncomeRatio > 50) healthScore -= 1;
//   if (monthlySavings < 0) healthScore -= 2;
//   healthScore = Math.max(0, Math.min(10, healthScore));

//   const expenseData = [
//     { name: 'Fixed Commitments', value: totalFixedCommitments, color: '#EF4444' }, // Red
//     { name: 'Needs', value: data.rent + data.groceries + data.utilities, color: '#F59E0B' }, // Amber
//     { name: 'Wants', value: data.lifestyle, color: '#3B82F6' }, // Blue
//     { name: 'Savings', value: Math.max(0, monthlySavings), color: '#10B981' }, // Emerald
//   ];

//   return (
//     <div className="min-h-screen bg-background p-6 md:p-10">
//       <div className="mx-auto max-w-7xl space-y-8">
        
//         {/* Header */}
//         <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Financial Health Report</h1>
//             <p className="text-muted-foreground">Your AI-powered financial snapshot.</p>
//           </div>
//           <div className="flex gap-2">
//              <Button variant="outline" asChild className="border-primary/20 hover:bg-primary/10">
//                 <Link to="/onboarding">Edit Profile</Link>
//              </Button>
//              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700">Generate Plan</Button>
//           </div>
//         </div>

//         {/* Score Cards */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <Card className="bg-card/50 backdrop-blur border-white/5">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
//               <TrendingUp className="h-4 w-4 text-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{healthScore}/10</div>
//               <p className="text-xs text-muted-foreground">
//                 {healthScore >= 7 ? "Excellent! Keep it up." : "Needs attention."}
//               </p>
//             </CardContent>
//           </Card>
//           <Card className="bg-card/50 backdrop-blur border-white/5">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
//               <PiggyBank className="h-4 w-4 text-emerald-500" />
//             </CardHeader>
//             <CardContent>
//               <div className={cn("text-2xl font-bold", savingsRate < 20 ? "text-red-400" : "text-emerald-400")}>
//                 {savingsRate.toFixed(1)}%
//               </div>
//               <p className="text-xs text-muted-foreground">Target: 20%+</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-card/50 backdrop-blur border-white/5">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Debt-to-Income</CardTitle>
//               <ShieldAlert className="h-4 w-4 text-amber-500" />
//             </CardHeader>
//             <CardContent>
//               <div className={cn("text-2xl font-bold", debtToIncomeRatio > 40 ? "text-red-400" : "text-emerald-400")}>
//                 {debtToIncomeRatio.toFixed(1)}%
//               </div>
//               <p className="text-xs text-muted-foreground">Target: &lt; 30%</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-card/50 backdrop-blur border-white/5">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Surplus</CardTitle>
//               <Wallet className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlySavings)}
//               </div>
//               <p className="text-xs text-muted-foreground">Available for investment</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts & Analysis */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          
//           {/* Cash Flow Chart */}
//           <Card className="col-span-4 bg-card/50 backdrop-blur border-white/5">
//             <CardHeader>
//               <CardTitle>Monthly Cash Flow</CardTitle>
//               <CardDescription>Where your money is going every month.</CardDescription>
//             </CardHeader>
//             <CardContent className="pl-2">
//               <div className="h-[300px] w-full">
//                  <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={expenseData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
//                       <XAxis type="number" hide />
//                       <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#a1a1aa'}} />
//                       <Tooltip 
//                         formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
//                         contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #333', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', color: '#fff' }}
//                         itemStyle={{ color: '#fff' }}
//                         cursor={{fill: 'rgba(255,255,255,0.05)'}}
//                       />
//                       <Bar dataKey="value" radius={[0, 4, 4, 0]}>
//                         {expenseData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                  </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Insights */}
//           <Card className="col-span-3 bg-card/50 backdrop-blur border-white/5">
//             <CardHeader>
//               <CardTitle>AI Insights</CardTitle>
//               <CardDescription>Actionable observations based on your data.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {monthlySavings < 0 && (
//                   <div className="flex items-start gap-3 rounded-lg border border-red-900/50 bg-red-900/20 p-3 text-red-200">
//                     <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
//                     <div className="text-sm">
//                       <span className="font-semibold text-red-100">Negative Cash Flow:</span> You are spending more than you earn. Review your "Lifestyle" expenses immediately.
//                     </div>
//                   </div>
//                 )}
//                 {debtToIncomeRatio > 40 && (
//                   <div className="flex items-start gap-3 rounded-lg border border-amber-900/50 bg-amber-900/20 p-3 text-amber-200">
//                     <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
//                     <div className="text-sm">
//                       <span className="font-semibold text-amber-100">High Debt Stress:</span> Your EMIs are eating up {debtToIncomeRatio.toFixed(0)}% of your income. Avoid new loans.
//                     </div>
//                   </div>
//                 )}
//                 {savingsRate < 20 && monthlySavings > 0 && (
//                   <div className="flex items-start gap-3 rounded-lg border border-blue-900/50 bg-blue-900/20 p-3 text-blue-200">
//                     <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
//                     <div className="text-sm">
//                       <span className="font-semibold text-blue-100">Boost Savings:</span> Try to increase your savings rate to at least 20%. You have a surplus of {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlySavings)}.
//                     </div>
//                   </div>
//                 )}
//                 {data.goals.length === 0 && (
//                    <div className="flex items-start gap-3 rounded-lg border border-zinc-700 bg-zinc-800/50 p-3 text-zinc-300">
//                     <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" />
//                     <div className="text-sm">
//                       <span className="font-semibold text-zinc-100">Set Goals:</span> You haven't added any financial goals yet. Go back to onboarding to set targets.
//                     </div>
//                   </div>
//                 )}
//                  <div className="flex items-start gap-3 rounded-lg border border-emerald-900/50 bg-emerald-900/20 p-3 text-emerald-200">
//                     <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
//                     <div className="text-sm">
//                       <span className="font-semibold text-emerald-100">Emergency Fund:</span> Based on your expenses, you need an emergency fund of {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalOutflow * 6)}.
//                     </div>
//                   </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import CashFlowChart from "@/components/dashboard/CashFlowChart";
import AIInsights from "@/components/dashboard/AIInsights";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">

        <DashboardHeader />

        <MetricsGrid />

        <div className="grid gap-6 lg:grid-cols-7">
          <CashFlowChart />
          <AIInsights />
        </div>

      </div>
    </div>
  );
}