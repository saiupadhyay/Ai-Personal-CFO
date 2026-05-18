import { useFinancial } from '@/context/FinancialContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, HeartPulse, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Insurance() {
  const { data } = useFinancial();

  const annualIncome = (data.monthlySalary + data.otherIncome) * 12 + data.bonus;
  
  // Term Insurance Logic
  const recommendedTermCover = annualIncome * 15; // 15x Income rule
  // Assume user has 0 cover for now (or could add to onboarding)
  const currentTermCover = 0; 
  const termGap = Math.max(0, recommendedTermCover - currentTermCover);

  // Health Insurance Logic
  const recommendedHealthCover = 500000 + (data.dependents * 200000); // Base 5L + 2L per dependent
  const currentHealthCover = 0; // Assume 0
  const healthGap = Math.max(0, recommendedHealthCover - currentHealthCover);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insurance Planning</h1>
        <p className="text-muted-foreground">Protect your wealth and family.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Term Life Insurance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Term Life Insurance</CardTitle>
            </div>
            <CardDescription>Income Replacement Protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Recommended Cover</p>
              <p className="text-2xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(recommendedTermCover)}</p>
              <p className="text-xs text-muted-foreground">15x of Annual Income</p>
            </div>
            
            {data.dependents > 0 ? (
              <div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900">Critical Priority</h4>
                  <p className="text-sm text-amber-800">
                    Since you have {data.dependents} dependents, getting a pure Term Plan is essential to secure their future.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900">Low Priority</h4>
                  <p className="text-sm text-blue-800">
                    With no dependents, you may not need high term cover yet. Focus on Health Insurance.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Insurance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-red-500" />
              <CardTitle>Health Insurance</CardTitle>
            </div>
            <CardDescription>Medical Emergency Protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Recommended Cover</p>
              <p className="text-2xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(recommendedHealthCover)}</p>
              <p className="text-xs text-muted-foreground">Base + Dependent Coverage</p>
            </div>

            <div className="flex gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900">Must Have</h4>
                <p className="text-sm text-green-800">
                  Medical inflation is 14%. Ensure you have a personal policy separate from your employer's cover.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Avoid These Mistakes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Don't mix Insurance with Investment:</strong> Avoid ULIPs or Endowment plans. Returns are usually low (4-6%).</li>
            <li><strong>Employer Cover is not enough:</strong> If you lose your job, you lose your cover. Buy a separate policy.</li>
            <li><strong>Disclose everything:</strong> Don't hide pre-existing diseases. It leads to claim rejection.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
