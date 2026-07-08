import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  valueClassName?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  valueClassName,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xs">{title}</CardTitle>

        <Icon
          size={18}
          strokeWidth={2.5}
        />
      </CardHeader>

      <CardContent>
        <h2
          className={cn(
            "number text-3xl font-bold",
            valueClassName
          )}
        >
          {value}
        </h2>

        <p className="mt-2 text-xs uppercase text-muted-foreground">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}