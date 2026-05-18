import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, ShieldCheck, Target, TrendingUp, Menu, X, FileText, HeartHandshake, Zap } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Smart Budget', href: '/budget', icon: PieChart },
  { name: 'Emergency Fund', href: '/emergency-fund', icon: ShieldCheck },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Investments', href: '/investments', icon: TrendingUp },
  { name: 'Step-Up SIP', href: '/step-up-sip', icon: Zap },
  { name: 'Tax Planning', href: '/tax', icon: FileText },
  { name: 'Insurance', href: '/insurance', icon: HeartHandshake },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AI CFO</span>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-xl border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border hidden md:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AI CFO</h1>
          <p className="text-xs text-muted-foreground mt-1">Your Personal Financial Guide</p>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
        {children}
      </main>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
