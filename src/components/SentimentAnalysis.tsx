import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Minus, MessageSquare, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const sentimentData = [
  { platform: "Twitter/X", positive: 68, neutral: 22, negative: 10, mentions: 12400 },
  { platform: "E-commerce Reviews", positive: 82, neutral: 12, negative: 6, mentions: 8900 },
  { platform: "Reddit", positive: 45, neutral: 35, negative: 20, mentions: 3200 },
  { platform: "News Articles", positive: 71, neutral: 24, negative: 5, mentions: 890 },
];

export function SentimentAnalysis() {
  const avgPositive = Math.round(sentimentData.reduce((acc, d) => acc + d.positive, 0) / sentimentData.length);
  const totalMentions = sentimentData.reduce((acc, d) => acc + d.mentions, 0);

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-accent" />
          Digital Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Real-time analysis across social media and e-commerce platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
          <div>
            <p className="text-sm text-muted-foreground">Overall Sentiment Score</p>
            <p className="text-3xl font-bold text-success">{avgPositive}%</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              +5% from last month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Mentions</p>
            <p className="text-2xl font-semibold text-foreground">{totalMentions.toLocaleString()}</p>
          </div>
        </div>

        {/* Platform breakdown */}
        <div className="space-y-4">
          {sentimentData.map((platform) => (
            <div key={platform.platform} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{platform.platform}</span>
                <span className="text-xs text-muted-foreground">{platform.mentions.toLocaleString()} mentions</span>
              </div>
              <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-success rounded-l-full transition-all duration-500"
                  style={{ width: `${platform.positive}%` }}
                />
                <div
                  className="bg-muted-foreground/50 transition-all duration-500"
                  style={{ width: `${platform.neutral}%` }}
                />
                <div
                  className="bg-destructive rounded-r-full transition-all duration-500"
                  style={{ width: `${platform.negative}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 text-success" /> {platform.positive}%
                </span>
                <span className="flex items-center gap-1">
                  <Minus className="h-3 w-3" /> {platform.neutral}%
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown className="h-3 w-3 text-destructive" /> {platform.negative}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
