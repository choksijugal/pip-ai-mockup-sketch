
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TaskEngine from "./pages/TaskEngine";
import Reconciliations from "./pages/Reconciliations";
import ReconciliationDetail from "./pages/ReconciliationDetail";
import AIAssistant from "./pages/AIAssistant";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Accruals from "./pages/Accruals";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { AppLayout } from "./components/layout/app-layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<AppLayout title="Dashboard"><Index /></AppLayout>} />
          <Route path="/task-engine" element={<AppLayout title="Task Engine"><TaskEngine /></AppLayout>} />
          <Route path="/reconciliations" element={<AppLayout title="Reconciliations"><Reconciliations /></AppLayout>} />
          <Route path="/reconciliations/:id" element={<AppLayout title="Reconciliation Detail"><ReconciliationDetail /></AppLayout>} />
          <Route path="/assistant" element={<AppLayout title="AI Assistant"><AIAssistant /></AppLayout>} />
          <Route path="/transactions" element={<AppLayout title="Transactions"><Transactions /></AppLayout>} />
          <Route path="/reports" element={<AppLayout title="Financial Reports"><Reports /></AppLayout>} />
          <Route path="/accruals" element={<AppLayout title="Accruals"><Accruals /></AppLayout>} />
          <Route path="/team" element={<AppLayout title="Team"><Team /></AppLayout>} />
          <Route path="/settings" element={<AppLayout title="Settings"><Settings /></AppLayout>} />
          <Route path="/help" element={<AppLayout title="Help & Support"><Help /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
