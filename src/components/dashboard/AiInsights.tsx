import { useFinancial } from "@/context/FinancialContext";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AIInsights() {
  const { data } = useFinancial();

  const totalIncome =
    data.monthlySalary +
    data.otherIncome +
    data.bonus / 12;

  const totalCommitments =
    data.homeLoanEMI +
    data.carLoanEMI +
    data.creditCardDues +
    data.otherEMIs;

  const totalExpenses =
    data.rent +
    data.groceries +
    data.utilities +
    data.lifestyle +
    data.otherExpenses;

  const totalOutflow =
    totalCommitments + totalExpenses;

  const monthlySavings =
    totalIncome - totalOutflow;

  const savingsRate =
    totalIncome > 0
      ? (monthlySavings / totalIncome) * 100
      : 0;

  const debtRatio =
    totalIncome > 0
      ? (totalCommitments / totalIncome) * 100
      : 0;

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>AI ANALYST</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {monthlySavings < 0 && (
          <div className="border-[3px] border-black p-4">
            <div className="flex gap-3">
              <AlertTriangle size={18} />
              <div>
                <p className="font-mono text-sm uppercase">
                  Negative Cash Flow
                </p>
                <p className="text-sm">
                  Reduce lifestyle expenses immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {debtRatio > 40 && (
          <div className="border-[3px] border-black p-4">
            <div className="flex gap-3">
              <AlertTriangle size={18} />
              <div>
                <p className="font-mono text-sm uppercase">
                  High Debt Ratio
                </p>
                <p className="text-sm">
                  Avoid taking additional loans.
                </p>
              </div>
            </div>
          </div>
        )}

        {savingsRate < 20 && monthlySavings > 0 && (
          <div className="border-[3px] border-black p-4">
            <div className="flex gap-3">
              <TrendingUp size={18} />
              <div>
                <p className="font-mono text-sm uppercase">
                  Increase Savings
                </p>
                <p className="text-sm">
                  Try saving at least 20% of your income.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-[3px] border-black p-4">
          <div className="flex gap-3">
            <CheckCircle size={18} />
            <div>
              <p className="font-mono text-sm uppercase">
                Emergency Fund
              </p>
              <p className="text-sm">
                Recommended corpus:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(totalOutflow * 6)}
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}