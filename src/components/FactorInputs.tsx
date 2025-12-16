import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Megaphone, Globe, ChevronRight, CheckCircle2 } from "lucide-react";

const factors = [
  {
    id: "promotional",
    icon: Megaphone,
    title: "Promotional Campaigns",
    description: "Black Friday, Holiday Sales, Flash Deals",
    status: "active",
    impact: "+24% demand spike",
    color: "primary",
  },
  {
    id: "sustainability",
    icon: Leaf,
    title: "Sustainability Trends",
    description: "Eco-packaging mandates, Carbon regulations",
    status: "active",
    impact: "+8% green logistics",
    color: "success",
  },
  {
    id: "sentiment",
    icon: Globe,
    title: "Digital Sentiment",
    description: "Social media trends, Review analysis",
    status: "active",
    impact: "78% positive score",
    color: "accent",
  },
];

const statusColors = {
  active: "bg-success/10 text-success border-success/30",
  pending: "bg-warning/10 text-warning border-warning/30",
  inactive: "bg-muted text-muted-foreground border-border",
};

const iconBgColors = {
  primary: "bg-primary/10",
  success: "bg-success/10",
  accent: "bg-accent/10",
};

const iconColors = {
  primary: "text-primary",
  success: "text-success",
  accent: "text-accent",
};

export function FactorInputs() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Forecasting Factors</CardTitle>
        <CardDescription>
          AI model inputs from promotional, sustainability, and sentiment analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {factors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div
              key={factor.id}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className={`p-3 rounded-xl ${iconBgColors[factor.color as keyof typeof iconBgColors]}`}>
                <Icon className={`h-5 w-5 ${iconColors[factor.color as keyof typeof iconColors]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{factor.title}</h4>
                  <Badge variant="outline" className={statusColors[factor.status as keyof typeof statusColors]}>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {factor.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{factor.impact}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}

        <Button variant="outline" className="w-full mt-4">
          Configure Factors
        </Button>
      </CardContent>
    </Card>
  );
}
