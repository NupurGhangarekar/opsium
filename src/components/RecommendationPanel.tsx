import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock, ArrowRight, Zap, Package } from "lucide-react";

const recommendations = [
  {
    id: 1,
    type: "pricing",
    title: "Dynamic Rate Adjustment",
    description: "Offer 12% discount on LAX-MEM route for high-volume customers during off-peak hours",
    impact: "Increase utilization by 15%",
    savings: "$45,000/month",
    priority: "high",
    icon: DollarSign,
  },
  {
    id: 2,
    type: "capacity",
    title: "Route Consolidation",
    description: "Merge SEA-MEM with ORD-MEM cargo for optimized load factors on Tuesday/Thursday flights",
    impact: "Reduce empty space by 22%",
    savings: "$28,000/month",
    priority: "medium",
    icon: Package,
  },
  {
    id: 3,
    type: "timing",
    title: "Schedule Optimization",
    description: "Shift ATL-MEM departure by 2 hours to align with customer demand patterns",
    impact: "Improve on-time delivery by 8%",
    savings: "$15,000/month",
    priority: "medium",
    icon: Clock,
  },
  {
    id: 4,
    type: "demand",
    title: "Promotional Partnership",
    description: "Coordinate with top 3 customers for promotional surge capacity during Q4 holiday season",
    impact: "Capture 18% more volume",
    savings: "$92,000/quarter",
    priority: "high",
    icon: Zap,
  },
];

const priorityStyles = {
  high: "bg-primary/10 text-primary border-primary/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export function RecommendationPanel() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-success" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Actionable insights for capacity optimization and customer rate strategies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="group p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{rec.title}</h4>
                    <Badge variant="outline" className={priorityStyles[rec.priority as keyof typeof priorityStyles]}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-success font-medium">{rec.impact}</span>
                    <span className="text-foreground font-semibold">{rec.savings}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full mt-4">
          View All Recommendations
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
