import { ArrowRight, Sparkles, TrendingUp, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/20 rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full opacity-20" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Logistics Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Demand Forecasting &</span>
            <br />
            <span className="text-gradient-primary">Capacity Optimization</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Leverage advanced AI to forecast customer SKU demand and optimize Tricolor flight network capacity for maximum efficiency and cost-effectiveness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Start Analysis
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="glass" size="xl">
              View Demo
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-3xl md:text-4xl font-bold text-foreground">94%</span>
              </div>
              <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Plane className="h-5 w-5 text-accent" />
                <span className="text-3xl md:text-4xl font-bold text-foreground">23%</span>
              </div>
              <p className="text-sm text-muted-foreground">Capacity Utilization</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-success" />
                <span className="text-3xl md:text-4xl font-bold text-foreground">$2.4M</span>
              </div>
              <p className="text-sm text-muted-foreground">Cost Savings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
