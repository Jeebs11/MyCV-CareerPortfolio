import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("@/pages/home"));
const InsightsPage = lazy(() => import("@/pages/insights"));
const BuiltProjectsPage = lazy(() => import("@/pages/built-projects"));
const AdminPage = lazy(() => import("@/pages/admin"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));

function LoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(220,25%,14%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid hsl(35,45%,45%)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/insights" component={InsightsPage} />
        <Route path="/portfolio" component={BuiltProjectsPage} />
        <Route path="/projects" component={BuiltProjectsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="*" component={Home} />
      </Switch>
    </Suspense>
  );
}

function PrefetchOnIdle() {
  useEffect(() => {
    const prefetch = () => {
      queryClient.prefetchQuery({ queryKey: ['/api/projects'] });
      queryClient.prefetchQuery({ queryKey: ['/api/blog-posts'] });
      queryClient.prefetchQuery({ queryKey: ['/api/built-projects'] });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 1500);
    }
  }, []);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PrefetchOnIdle />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
