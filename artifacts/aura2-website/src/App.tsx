import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Ranking from "@/pages/Ranking";
import Download from "@/pages/Download";
import Wiki from "@/pages/Wiki";
import MainLayout from "@/components/layout/MainLayout";
import TermsOfUse from "@/pages/termos-de-uso";
import PrivacyPolicy from "@/pages/politicas-de-privacidade";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Switch>
        <Route path="/ranking" component={Ranking} />
        <Route path="/download" component={Download} />
        <Route path="/wiki" component={Wiki} />
        <Route path="/termos-de-uso" component={TermsOfUse} />
        <Route path="/politicas-de-privacidade" component={PrivacyPolicy} />

        <Route path="/" component={Home} />

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
