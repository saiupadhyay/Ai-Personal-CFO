import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  ShieldCheck,
  Target,
  TrendingUp,
  Menu,
  X,
  FileText,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "CONTROL PANEL",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "CASH FLOW",
    href: "/budget",
    icon: PieChart,
  },
  {
    name: "EMERGENCY FUND",
    href: "/emergency-fund",
    icon: ShieldCheck,
  },
  {
    name: "GOALS",
    href: "/goals",
    icon: Target,
  },
  {
    name: "PORTFOLIO",
    href: "/investments",
    icon: TrendingUp,
  },
  {
    name: "STEP-UP SIP",
    href: "/step-up-sip",
    icon: Zap,
  },
  {
    name: "TAX ENGINE",
    href: "/tax",
    icon: FileText,
  },
  {
    name: "INSURANCE",
    href: "/insurance",
    icon: HeartHandshake,
  },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* MOBILE HEADER */}

      <header className="md:hidden fixed top-0 left-0 right-0 h-16 border-b-[3px] border-black bg-card z-50 flex items-center justify-between px-4">

        <div>

          <h1 className="font-mono font-bold uppercase">
            AI PERSONAL CFO
          </h1>

        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* SIDEBAR */}

      <aside
        className={cn(
          "fixed md:relative z-50",
          "top-0 left-0",
          "h-full w-72",
          "bg-card",
          "border-r-[3px] border-black",
          "transition-transform duration-200",
          "flex flex-col",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* LOGO */}

        <div className="border-b-[3px] border-black p-6">

          <h1 className="font-mono text-2xl font-bold uppercase leading-tight">

            AI PERSONAL CFO

          </h1>

          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">

            Financial Operating System

          </p>

        </div>

        {/* NAV */}

        <nav className="flex-1 overflow-y-auto p-4 space-y-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className={cn(
                  "flex items-center gap-3",

                  "border-[3px] border-black",

                  "px-4 py-3",

                  "uppercase",

                  "font-mono",

                  "text-sm",

                  "transition-all duration-150",

                  active
                    ? "bg-black text-white shadow-[6px_6px_0px_#111]"
                    : "bg-white text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111]"
                )}
              >
                <Icon size={18} strokeWidth={2.5} />

                {item.name}
              </Link>
            );

          })}

        </nav>

        {/* FOOTER */}

        <div className="mt-auto border-t-[3px] border-black p-5">
          <div className="font-mono text-xs uppercase">

            SYSTEM

          </div>

          <div className="mt-2 text-sm font-semibold">

            ● ONLINE

          </div>

          <div className="mt-4 text-xs text-muted-foreground">

            v1.0.0

          </div>

        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 md:ml-0 pt-20 md:pt-0 p-6 md:p-10 bg-background">

        {children}

      </main>

      {/* OVERLAY */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() =>
            setIsMobileMenuOpen(false)
          }
        />
      )}

    </div>
  );
}