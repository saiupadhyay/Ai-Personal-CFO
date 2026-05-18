import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { ArrowRight, PieChart, ShieldCheck, TrendingUp, BrainCircuit } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Analysis",
    description: "Get personalized insights on your spending, saving, and investing habits."
  },
  {
    icon: PieChart,
    title: "Smart Budgeting",
    description: "Move beyond 50/30/20. Get a budget that adapts to your actual lifestyle."
  },
  {
    icon: TrendingUp,
    title: "Goal-Based Investing",
    description: "Map your dreams to reality with inflation-adjusted SIP planning."
  },
  {
    icon: ShieldCheck,
    title: "Financial Health Check",
    description: "Instant snapshot of your financial fitness with actionable scores."
  }
];

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <motion.h1 
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Master Your Money with AI
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your personal financial guide that helps you plan, save, and grow your wealth with data-driven precision.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur border-white/5 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center pt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all"
            onClick={() => navigate('/onboarding')}
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
