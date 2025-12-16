import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Plane, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const flightData = [
  { route: "LAX-MEM", capacity: 85, utilized: 72, optimized: 82, status: "optimized" },
  { route: "JFK-MEM", capacity: 90, utilized: 88, optimized: 89, status: "optimal" },
  { route: "ORD-MEM", capacity: 80, utilized: 58, optimized: 75, status: "underutilized" },
  { route: "DFW-MEM", capacity: 75, utilized: 71, optimized: 74, status: "optimal" },
  { route: "ATL-MEM", capacity: 95, utilized: 65, optimized: 88, status: "optimized" },
  { route: "SEA-MEM", capacity: 70, utilized: 52, optimized: 68, status: "underutilized" },
];

const statusColors = {
  optimal: "hsl(var(--success))",
  optimized: "hsl(var(--chart-1))",
  underutilized: "hsl(var(--warning))",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-lg shadow-elevated">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.fill || entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CapacityOptimization() {
  const avgUtilization = Math.round(flightData.reduce((acc, d) => acc + d.utilized, 0) / flightData.length);
  const avgOptimized = Math.round(flightData.reduce((acc, d) => acc + d.optimized, 0) / flightData.length);
  const improvement = avgOptimized - avgUtilization;

  return (
    <Card variant="elevated" className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Tricolor Flight Capacity Optimization
            </CardTitle>
            <CardDescription>
              AI-driven capacity planning for FedEx commercial package network
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{avgUtilization}%</p>
              <p className="text-xs text-muted-foreground">Current Utilization</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{avgOptimized}%</p>
              <p className="text-xs text-muted-foreground">Optimized Target</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              +{improvement}% Improvement
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={flightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="route"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="utilized" name="Current Utilization" radius={[4, 4, 0, 0]}>
                {flightData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--muted-foreground))" opacity={0.5} />
                ))}
              </Bar>
              <Bar dataKey="optimized" name="AI Optimized" radius={[4, 4, 0, 0]}>
                {flightData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[entry.status as keyof typeof statusColors]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Route status legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">Optimal ({'>'}85% utilized)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Optimized (improved)</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">Underutilized ({'<'}70%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
