import { Plane, BarChart3, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Tricolor AI</h1>
              <p className="text-xs text-muted-foreground">FedEx Logistics Intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <BarChart3 className="h-4 w-4 mr-2" />
              Forecasting
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Package className="h-4 w-4 mr-2" />
              Capacity
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>

          <Button variant="hero" size="sm">
            Run Analysis
          </Button>
        </div>
      </div>
    </header>
  );
}
