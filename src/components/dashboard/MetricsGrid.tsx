import { useFinancial } from "@/context/FinancialContext";
import {
  TrendingUp,
  PiggyBank,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MetricCard from "./MetricsCard";

export default function MetricsGrid() {
  const { data } = useFinancial();

  const totalMonthlyIncome =
    data.monthlySalary +
    data.otherIncome +
    data.bonus / 12;

  const totalFixedCommitments =
    data.homeLoanEMI +
    data.carLoanEMI +
    data.creditCardDues +
    data.otherEMIs;

  const totalMonthlyExpenses =
    data.rent +
    data.groceries +
    data.utilities +
    data.lifestyle +
    data.otherExpenses;

  const totalOutflow =
    totalFixedCommitments + totalMonthlyExpenses;

  const monthlySavings =
    totalMonthlyIncome - totalOutflow;

  const savingsRate =
    totalMonthlyIncome > 0
      ? (monthlySavings / totalMonthlyIncome) * 100
      : 0;

  const debtToIncomeRatio =
    totalMonthlyIncome > 0
      ? (totalFixedCommitments / totalMonthlyIncome) * 100
      : 0;

  let healthScore = 5;

  if (savingsRate > 20) healthScore++;
  if (savingsRate > 30) healthScore++;
  if (debtToIncomeRatio < 30) healthScore++;
  if (debtToIncomeRatio > 50) healthScore--;
  if (monthlySavings < 0) healthScore -= 2;

  healthScore = Math.max(0, Math.min(10, healthScore));

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <MetricCard
        title="FINANCIAL HEALTH"
        value={`${healthScore}/10`}
        subtitle="Overall Score"
        icon={TrendingUp}
      />

      <MetricCard
        title="SAVINGS RATE"
        value={`${savingsRate.toFixed(1)}%`}
        subtitle="Target: 20%+"
        icon={PiggyBank}
        valueClassName={cn(
          savingsRate < 20
            ? "text-red-700"
            : "text-green-700"
        )}
      />

      <MetricCard
        title="DEBT RATIO"
        value={`${debtToIncomeRatio.toFixed(1)}%`}
        subtitle="Target: Below 30%"
        icon={ShieldAlert}
        valueClassName={cn(
          debtToIncomeRatio > 40
            ? "text-red-700"
            : "text-green-700"
        )}
      />

      <MetricCard
        title="MONTHLY SURPLUS"
        value={new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(monthlySavings)}
        subtitle="Available to Invest"
        icon={Wallet}
      />

    </div>
  );
}