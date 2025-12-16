import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

const variantStyles = {
  default: "text-foreground",
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
};

const iconBgStyles = {
  default: "bg-secondary",
  primary: "bg-primary/10",
  accent: "bg-accent/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
};

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
}: MetricCardProps) {
  const isPositive = change && change > 0;

  return (
    <Card variant="metric" className="group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className={cn("text-3xl font-bold tracking-tight", variantStyles[variant])}>
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive ? "text-success" : "text-destructive"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-muted-foreground">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
              iconBgStyles[variant]
            )}
          >
            <Icon className={cn("h-6 w-6", variantStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
