import { useState } from 'react';
import { useFinancial } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';

export default function Tax() {
  const { data } = useFinancial();
  const [investments80C, setInvestments80C] = useState(0);
  const [insurance80D, setInsurance80D] = useState(0);

  const annualIncome = (data.monthlySalary + data.otherIncome) * 12 + data.bonus;

  // Simplified Tax Calculation (FY 2024-25)
  const calculateTax = (regime: 'Old' | 'New') => {
    let taxableIncome = annualIncome;
    let deductions = 0;

    if (regime === 'Old') {
      deductions += Math.min(investments80C, 150000); // 80C limit
      deductions += Math.min(insurance80D, 25000); // 80D limit (self)
      deductions += 50000; // Standard Deduction
      taxableIncome = Math.max(0, taxableIncome - deductions);
    } else {
      deductions += 75000; // Standard Deduction for New Regime
      taxableIncome = Math.max(0, taxableIncome - deductions);
    }

    let tax = 0;
    if (regime === 'New') {
      // New Regime Slabs
      if (taxableIncome > 300000) tax += Math.min(taxableIncome - 300000, 400000) * 0.05;
      if (taxableIncome > 700000) tax += Math.min(taxableIncome - 700000, 300000) * 0.10;
      if (taxableIncome > 1000000) tax += Math.min(taxableIncome - 1000000, 200000) * 0.15;
      if (taxableIncome > 1200000) tax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
      // Rebate u/s 87A if income <= 7L
      if (taxableIncome <= 700000) tax = 0;
    } else {
      // Old Regime Slabs
      if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30;
      // Rebate u/s 87A if income <= 5L
      if (taxableIncome <= 500000) tax = 0;
    }

    // Cess 4%
    tax = tax * 1.04;
    return { tax, taxableIncome, deductions };
  };

  const oldRegime = calculateTax('Old');
  const newRegime = calculateTax('New');

  const betterRegime = oldRegime.tax < newRegime.tax ? 'Old' : 'New';
  const savings = Math.abs(oldRegime.tax - newRegime.tax);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tax Optimization</h1>
        <p className="text-muted-foreground">Compare regimes and save more.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deductions (Old Regime)</CardTitle>
            <CardDescription>Enter your investments to check Old Regime benefits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Section 80C (PPF, ELSS, LIC)</Label>
              <Input 
                type="number" 
                value={investments80C} 
                onChange={(e) => setInvestments80C(parseFloat(e.target.value) || 0)}
                placeholder="Max 1.5L"
              />
              <p className="text-xs text-muted-foreground">Limit: ₹1,50,000</p>
            </div>
            <div className="space-y-2">
              <Label>Section 80D (Health Insurance)</Label>
              <Input 
                type="number" 
                value={insurance80D} 
                onChange={(e) => setInsurance80D(parseFloat(e.target.value) || 0)}
                placeholder="Max 25k"
              />
              <p className="text-xs text-muted-foreground">Limit: ₹25,000 (Self)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium">You should choose the</p>
              <h2 className="text-3xl font-bold text-primary">{betterRegime} Regime</h2>
              <p className="text-sm text-muted-foreground mt-2">
                You will save <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(savings)}</strong>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-white p-3 border">
                <p className="font-semibold">Old Regime Tax</p>
                <p>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(oldRegime.tax)}</p>
              </div>
              <div className="rounded-lg bg-white p-3 border">
                <p className="font-semibold">New Regime Tax</p>
                <p>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(newRegime.tax)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Saving Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments80C < 150000 && (
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Maximize 80C</h4>
                  <p className="text-sm text-muted-foreground">
                    Invest another {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(150000 - investments80C)} in ELSS Mutual Funds or PPF to fully utilize the ₹1.5L limit.
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">NPS (Section 80CCD(1B))</h4>
                <p className="text-sm text-muted-foreground">
                  Invest ₹50,000 in National Pension System for additional deduction over and above 80C.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Health Insurance (80D)</h4>
                <p className="text-sm text-muted-foreground">
                  Buying health insurance for yourself and parents can save tax up to ₹75,000.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
