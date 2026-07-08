import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Zap } from 'lucide-react';

export default function StepUpSIP() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(15);

  const calculateSIP = () => {
    const data = [];
    let currentSIP = monthlyInvestment;
    let totalInvested = 0;
    let currentValue = 0;
    let regularSIPValue = 0;
    let regularInvested = 0;

    for (let year = 1; year <= years; year++) {
      // Monthly compounding for the year
      for (let month = 1; month <= 12; month++) {
        // Step Up Logic
        currentValue = (currentValue + currentSIP) * (1 + (expectedReturn / 100) / 12);
        totalInvested += currentSIP;

        // Regular Logic (No Step Up)
        regularSIPValue = (regularSIPValue + monthlyInvestment) * (1 + (expectedReturn / 100) / 12);
        regularInvested += monthlyInvestment;
      }

      data.push({
        year: `Year ${year}`,
        stepUpValue: Math.round(currentValue),
        regularValue: Math.round(regularSIPValue),
        invested: Math.round(totalInvested)
      });

      // Increase SIP for next year
      currentSIP = currentSIP * (1 + annualStepUp / 100);
    }
    return { data, finalValue: currentValue, finalRegular: regularSIPValue, totalInvested };
  };

  const { data: chartData, finalValue, finalRegular, totalInvested } = calculateSIP();
  const extraWealth = finalValue - finalRegular;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Step-Up SIP Calculator
        </h1>
        <p className="text-muted-foreground">See the magic of increasing your investment annually.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controls */}
        <Card className="lg:col-span-1 border-white/10 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Adjust your plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Monthly Investment (₹)</Label>
              <Input 
                type="number" 
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="bg-secondary/50 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Annual Step-Up (%)</Label>
                <span className="text-sm text-primary font-bold">{annualStepUp}%</span>
              </div>
              <Slider 
                value={[annualStepUp]} 
                onValueChange={(val) => setAnnualStepUp(val[0])} 
                max={30} 
                step={1}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Expected Return (%)</Label>
                <span className="text-sm text-primary font-bold">{expectedReturn}%</span>
              </div>
              <Slider 
                value={[expectedReturn]} 
                onValueChange={(val) => setExpectedReturn(val[0])} 
                max={30} 
                step={0.5}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Time Period (Years)</Label>
                <span className="text-sm text-primary font-bold">{years} Years</span>
              </div>
              <Slider 
                value={[years]} 
                onValueChange={(val) => setYears(val[0])} 
                max={40} 
                step={1}
                className="py-4"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-[3px] border-black bg-white shadow-[6px_6px_0px_#111]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Projected Wealth (Step-Up)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalValue)}
                </div>
                <div className="flex items-center gap-1 text-xs text-green-700">
                  <TrendingUp className="h-3 w-3" />
                  <span>{((finalValue / totalInvested) * 100).toFixed(0)}% Growth</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[3px] border-black bg-white shadow-[6px_6px_0px_#111]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Extra Wealth Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-black">
                  +{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(extraWealth)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Zap className="h-3 w-3 text-zinc-600" />
                  <span>vs Regular SIP</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Wealth Growth Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStepUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRegular" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                      formatter={(value: number | undefined) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value ?? 0)}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="stepUpValue" name="Step-Up SIP" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorStepUp)" strokeWidth={2} />
                    <Area type="monotone" dataKey="regularValue" name="Regular SIP" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRegular)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
