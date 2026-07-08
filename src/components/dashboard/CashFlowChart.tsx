import { useFinancial } from "@/context/FinancialContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CashFlowChart() {
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

  const monthlySavings =
    totalMonthlyIncome -
    (totalFixedCommitments + totalMonthlyExpenses);

  const chartData = [
    {
      name: "Fixed",
      value: totalFixedCommitments,
      color: "#111111",
    },
    {
      name: "Needs",
      value:
        data.rent +
        data.groceries +
        data.utilities,
      color: "#555555",
    },
    {
      name: "Wants",
      value: data.lifestyle,
      color: "#888888",
    },
    {
      name: "Savings",
      value: Math.max(monthlySavings, 0),
      color: "#0A7A2F",
    },
  ];

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>MONTHLY CASH FLOW</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              layout="vertical"
            >
              <XAxis type="number" hide />

              <YAxis
                type="category"
                dataKey="name"
                width={80}
              />

              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat(
                    "en-IN",
                    {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }
                  ).format(value)
                }
              />

              <Bar dataKey="value">
                {chartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </div>
      </CardContent>
    </Card>
  );
}