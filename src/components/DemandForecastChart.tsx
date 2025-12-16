import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", actual: 4200, predicted: 4000, promotional: 4500 },
  { month: "Feb", actual: 3800, predicted: 3900, promotional: 4100 },
  { month: "Mar", actual: 5100, predicted: 4800, promotional: 5400 },
  { month: "Apr", actual: 4600, predicted: 4500, promotional: 4800 },
  { month: "May", actual: 5800, predicted: 5500, promotional: 6200 },
  { month: "Jun", actual: 6200, predicted: 6000, promotional: 6800 },
  { month: "Jul", actual: null, predicted: 6400, promotional: 7100 },
  { month: "Aug", actual: null, predicted: 6800, promotional: 7500 },
  { month: "Sep", actual: null, predicted: 7200, promotional: 7900 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-lg shadow-elevated">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value?.toLocaleString() ?? "N/A"}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function DemandForecastChart() {
  return (
    <Card variant="elevated" className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>SKU Demand Forecast</CardTitle>
        <CardDescription>
          Historical vs. AI-predicted demand with promotional campaign impact analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPromotional" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="month"
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
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="promotional"
                name="With Promotions"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPromotional)"
              />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual Demand"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                fill="url(#colorActual)"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="AI Predicted"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#colorPredicted)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
