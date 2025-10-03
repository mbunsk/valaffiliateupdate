import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NewHome from "@/pages/new-home";
import About from "@/pages/about";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import ReportPage from "@/pages/report";
import NotFound from "@/pages/not-found";
import AdminPage from "@/pages/admin";
import ValidationStrategy from "@/pages/validation-strategy";
import Api from "./Api";
import start_flow from "./pages/success";
import Log from "./Log";


function Router() {
  return (
   
    <Switch>
      <Route path="/" component={NewHome} />
      <Route path="/old" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/report/:reportId?" component={ReportPage} />
      <Route path="/validation-strategy" component={ValidationStrategy} />
      <Route path="/aron" component={AdminPage} />
      <Route path="/test" component={Api} />
      <Route path="/success/:session_id" component={start_flow} />
      <Route path="/success" component={start_flow} />
      <Route path="/log" component={Log} />
      
      <Route component={NotFound} />
    </Switch>
   
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
