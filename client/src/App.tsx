import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";

const InsightsPage = lazy(() => import("@/pages/insights"));
const AdminPage = lazy(() => import("@/pages/admin"));
const PortfolioPage = lazy(() => import("@/pages/portfolio"));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[hsl(270,8%,12%)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[hsl(var(--brand-primary))]/30 border-t-[hsl(var(--brand-primary))] rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/insights" component={InsightsPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="*" component={Home} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
