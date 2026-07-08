import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Financial Operating System
        </p>

        <h1 className="mt-2 font-mono text-4xl font-bold uppercase">
          AI PERSONAL CFO
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          System Status: <span className="font-semibold text-green-600">ONLINE</span>
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link to="/onboarding">SYSTEM SETTINGS</Link>
        </Button>

        <Button>
          RUN ANALYSIS
        </Button>
      </div>
    </div>
  );
}