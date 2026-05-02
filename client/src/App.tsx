import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import InsightsPage from "@/pages/insights";
import BuiltProjectsPage from "@/pages/built-projects";
import CaseStudiesPage from "@/pages/case-studies";
import PrivacyPage from "@/pages/privacy";

const AdminPage = lazy(() => import("@/pages/admin"));

function AdminFallback() {
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(220,25%,14%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid hsl(35,45%,45%)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/insights" component={InsightsPage} />
      <Route path="/portfolio" component={BuiltProjectsPage} />
      <Route path="/projects" component={BuiltProjectsPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/admin">
        <Suspense fallback={<AdminFallback />}>
          <AdminPage />
        </Suspense>
      </Route>
      <Route component={Home} />
    </Switch>
  );
}

function PrefetchOnIdle() {
  useEffect(() => {
    const prefetch = () => {
      queryClient.prefetchQuery({ queryKey: ['/api/projects'] });
      queryClient.prefetchQuery({ queryKey: ['/api/blog-posts'] });
      queryClient.prefetchQuery({ queryKey: ['/api/built-projects'] });
      queryClient.prefetchQuery({ queryKey: ['/api/site/settings'] });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 800);
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
