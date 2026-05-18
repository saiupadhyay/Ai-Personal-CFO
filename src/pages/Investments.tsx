import { useFinancial, RiskAppetite } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Shield, Zap } from 'lucide-react';

const ALLOCATION_MODELS: Record<RiskAppetite, { name: string; value: number; color: string }[]> = {
  Safe: [
    { name: 'Debt / Fixed Income', value: 60, color: '#3B82F6' },
    { name: 'Equity (Large Cap)', value: 20, color: '#10B981' },
    { name: 'Gold', value: 20, color: '#F59E0B' },
  ],
  Balanced: [
    { name: 'Equity (Flexi Cap)', value: 50, color: '#10B981' },
    { name: 'Debt', value: 30, color: '#3B82F6' },
    { name: 'Gold', value: 20, color: '#F59E0B' },
  ],
  Aggressive: [
    { name: 'Equity (Mid/Small Cap)', value: 70, color: '#10B981' },
    { name: 'Debt', value: 20, color: '#3B82F6' },
    { name: 'Gold / Alt', value: 10, color: '#F59E0B' },
  ],
};

const RETURNS_ASSUMPTION: Record<RiskAppetite, number> = {
  Safe: 0.08, // 8%
  Balanced: 0.10, // 10%
  Aggressive: 0.12, // 12%
};

export default function Investments() {
  const { data } = useFinancial();
  const allocation = ALLOCATION_MODELS[data.riskAppetite];
  const expectedReturn = RETURNS_ASSUMPTION[data.riskAppetite];

  // Calculate projected wealth
  const monthlyInvestment = Math.max(0, (data.monthlySalary + data.otherIncome + (data.bonus / 12)) - (data.rent + data.groceries + data.utilities + data.homeLoanEMI + data.carLoanEMI + data.otherEMIs + data.lifestyle + data.otherExpenses));
  
  const projectionData = [];
  let currentCorpus = 0;
  for (let year = 0; year <= 20; year++) {
    projectionData.push({
      year: `Year ${year}`,
      amount: Math.round(currentCorpus),
    });
    // FV = P * (1+r)^n + PMT * ...
    // Simplified yearly compounding for chart
    currentCorpus = (currentCorpus + (monthlyInvestment * 12)) * (1 + expectedReturn);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Planning</h1>
        <p className="text-muted-foreground">Tailored strategy based on your <strong>{data.riskAppetite}</strong> risk profile.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Asset Allocation</CardTitle>
            <CardDescription>How you should split your investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 flex-wrap">
              {allocation.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategy Details */}
        <Card>
          <CardHeader>
            <CardTitle>Strategy & Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {data.riskAppetite === 'Safe' && <Shield className="h-6 w-6" />}
                {data.riskAppetite === 'Balanced' && <TrendingUp className="h-6 w-6" />}
                {data.riskAppetite === 'Aggressive' && <Zap className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-semibold">Profile: {data.riskAppetite}</h3>
                <p className="text-sm text-muted-foreground">
                  {data.riskAppetite === 'Safe' && "Focus on capital preservation. Stick to large-cap funds and high-rated bonds."}
                  {data.riskAppetite === 'Balanced' && "A healthy mix of stability and growth. Flexi-cap funds are your best friend."}
                  {data.riskAppetite === 'Aggressive' && "High growth potential. Exposure to mid/small caps is recommended for long horizons."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recommended Instruments</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {data.riskAppetite === 'Safe' && (
                  <>
                    <li>Public Provident Fund (PPF)</li>
                    <li>Corporate Bonds (AAA Rated)</li>
                    <li>Nifty 50 Index Funds</li>
                  </>
                )}
                {data.riskAppetite === 'Balanced' && (
                  <>
                    <li>Flexi Cap Mutual Funds</li>
                    <li>Balanced Advantage Funds</li>
                    <li>Sovereign Gold Bonds (SGB)</li>
                  </>
                )}
                {data.riskAppetite === 'Aggressive' && (
                  <>
                    <li>Mid Cap & Small Cap Funds</li>
                    <li>Nifty Next 50 Index</li>
                    <li>Direct Equity (Bluechip)</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Wealth Projection */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Wealth Projection (20 Years)</CardTitle>
            <CardDescription>
              Investing <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(monthlyInvestment)}/mo</strong> at approx <strong>{(expectedReturn * 100).toFixed(0)}%</strong> CAGR.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" hide />
                  <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)} />
                  <Area type="monotone" dataKey="amount" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
