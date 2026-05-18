import { useState } from 'react';
import { useFinancial, RiskAppetite } from '@/context/FinancialContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'basic', title: 'Basic Details', description: "Let's get to know you better." },
  { id: 'income', title: 'Income Details', description: "Understanding your cash flow." },
  { id: 'commitments', title: 'Fixed Commitments', description: "Your mandatory monthly payments." },
  { id: 'expenses', title: 'Monthly Expenses', description: "Where does the rest of the money go?" },
  { id: 'goals', title: 'Financial Goals', description: "What are you saving for?" },
  { id: 'risk', title: 'Risk Appetite', description: "How do you handle market ups and downs?" },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, completeOnboarding } = useFinancial();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age || ''}
                  onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => updateData({ city: e.target.value })}
                  placeholder="Mumbai"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <select
                id="maritalStatus"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={data.maritalStatus}
                onChange={(e) => updateData({ maritalStatus: e.target.value })}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Dependents</Label>
              <Input
                id="dependents"
                type="number"
                value={data.dependents}
                onChange={(e) => updateData({ dependents: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlySalary">Monthly In-hand Salary (₹)</Label>
              <Input
                id="monthlySalary"
                type="number"
                value={data.monthlySalary || ''}
                onChange={(e) => updateData({ monthlySalary: parseFloat(e.target.value) || 0 })}
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus">Annual Bonus / Variable Pay (₹)</Label>
              <Input
                id="bonus"
                type="number"
                value={data.bonus || ''}
                onChange={(e) => updateData({ bonus: parseFloat(e.target.value) || 0 })}
                placeholder="100000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherIncome">Other Monthly Income (₹)</Label>
              <Input
                id="otherIncome"
                type="number"
                value={data.otherIncome || ''}
                onChange={(e) => updateData({ otherIncome: parseFloat(e.target.value) || 0 })}
                placeholder="5000"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeLoanEMI">Home Loan EMI</Label>
              <Input
                id="homeLoanEMI"
                type="number"
                value={data.homeLoanEMI || ''}
                onChange={(e) => updateData({ homeLoanEMI: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carLoanEMI">Car Loan EMI</Label>
              <Input
                id="carLoanEMI"
                type="number"
                value={data.carLoanEMI || ''}
                onChange={(e) => updateData({ carLoanEMI: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditCardDues">Avg Monthly Credit Card Dues</Label>
              <Input
                id="creditCardDues"
                type="number"
                value={data.creditCardDues || ''}
                onChange={(e) => updateData({ creditCardDues: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Rent / Maintenance</Label>
                <Input
                  id="rent"
                  type="number"
                  value={data.rent || ''}
                  onChange={(e) => updateData({ rent: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groceries">Groceries</Label>
                <Input
                  id="groceries"
                  type="number"
                  value={data.groceries || ''}
                  onChange={(e) => updateData({ groceries: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities (Bills)</Label>
                <Input
                  id="utilities"
                  type="number"
                  value={data.utilities || ''}
                  onChange={(e) => updateData({ utilities: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle (Eating out, etc)</Label>
                <Input
                  id="lifestyle"
                  type="number"
                  value={data.lifestyle || ''}
                  onChange={(e) => updateData({ lifestyle: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select your primary financial goals (Multi-select)</p>
            <div className="grid grid-cols-2 gap-4">
              {['Buy House', 'Retirement', 'Travel', 'Child Education', 'Car', 'Wedding'].map((goal) => {
                const isSelected = data.goals.some(g => g.name === goal);
                return (
                  <div
                    key={goal}
                    className={cn(
                      "cursor-pointer rounded-lg border p-4 text-center transition-all hover:border-primary",
                      isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                    )}
                    onClick={() => {
                      if (isSelected) {
                        updateData({ goals: data.goals.filter(g => g.name !== goal) });
                      } else {
                        updateData({
                          goals: [...data.goals, {
                            id: Math.random().toString(),
                            name: goal,
                            targetAmount: 0,
                            yearsToAchieve: 5,
                            priority: 'Medium'
                          }]
                        });
                      }
                    }}
                  >
                    <span className="font-medium">{goal}</span>
                  </div>
                );
              })}
            </div>
            {data.goals.length > 0 && (
              <div className="mt-4 space-y-4 border-t pt-4">
                <h4 className="text-sm font-medium">Goal Details</h4>
                {data.goals.map((goal, index) => (
                  <div key={goal.id} className="space-y-2 rounded-md bg-muted/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{goal.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Target Amount</Label>
                        <Input
                          type="number"
                          className="h-8 text-xs"
                          value={goal.targetAmount || ''}
                          onChange={(e) => {
                            const newGoals = [...data.goals];
                            newGoals[index].targetAmount = parseFloat(e.target.value) || 0;
                            updateData({ goals: newGoals });
                          }}
                          placeholder="Amount"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Years</Label>
                        <Input
                          type="number"
                          className="h-8 text-xs"
                          value={goal.yearsToAchieve || ''}
                          onChange={(e) => {
                            const newGoals = [...data.goals];
                            newGoals[index].yearsToAchieve = parseFloat(e.target.value) || 0;
                            updateData({ goals: newGoals });
                          }}
                          placeholder="Years"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  value: 'Safe',
                  label: 'Safe / Conservative',
                  desc: 'I prefer capital protection over high returns. I cannot tolerate loss.'
                },
                {
                  value: 'Balanced',
                  label: 'Balanced / Moderate',
                  desc: 'I want a mix of growth and stability. I can handle some fluctuations.'
                },
                {
                  value: 'Aggressive',
                  label: 'Aggressive / Growth',
                  desc: 'I want maximum returns and can handle high market volatility.'
                }
              ].map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "cursor-pointer rounded-xl border p-4 transition-all hover:border-primary",
                    data.riskAppetite === option.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                  )}
                  onClick={() => updateData({ riskAppetite: option.value as RiskAppetite })}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{option.label}</h3>
                    {data.riskAppetite === option.value && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
