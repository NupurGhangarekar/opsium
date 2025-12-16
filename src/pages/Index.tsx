import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MetricCard } from "@/components/MetricCard";
import { DemandForecastChart } from "@/components/DemandForecastChart";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";
import { CapacityOptimization } from "@/components/CapacityOptimization";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { FactorInputs } from "@/components/FactorInputs";
import { Package, TrendingUp, Plane, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Dashboard Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Segment 1: <span className="text-gradient-primary">Customer-Centric Forecasting</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI-powered SKU demand forecasting using promotional campaigns, sustainability trends, and digital sentiment analysis
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total SKUs Tracked"
              value="2,847"
              change={12}
              changeLabel="vs last month"
              icon={Package}
              variant="primary"
            />
            <MetricCard
              title="Forecast Accuracy"
              value="94.2%"
              change={3.5}
              changeLabel="improvement"
              icon={TrendingUp}
              variant="success"
            />
            <MetricCard
              title="Active Campaigns"
              value="23"
              change={8}
              changeLabel="this quarter"
              icon={Plane}
              variant="accent"
            />
            <MetricCard
              title="Cost Savings"
              value="$2.4M"
              change={18}
              changeLabel="YTD"
              icon={DollarSign}
              variant="warning"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DemandForecastChart />
            <FactorInputs />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentAnalysis />
            <RecommendationPanel />
          </div>
        </div>
      </section>

      {/* Segment 2 Section */}
      <section className="py-20 px-6 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Segment 2: <span className="text-gradient-accent">FedEx Capacity Optimization</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Optimize Tricolor flight network capacity and generate intelligent pricing recommendations
            </p>
          </div>

          <CapacityOptimization />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Tricolor AI - FedEx Demand Forecasting & Capacity Optimization Platform
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built for Opsium - The Operations Challenge (Shaastra 2026)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
