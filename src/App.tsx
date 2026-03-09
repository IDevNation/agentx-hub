import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import AgentDetail from "./pages/AgentDetail";
import Acquire from "./pages/Acquire";
import AcquireDealRoom from "./pages/AcquireDealRoom";
import AcquireList from "./pages/AcquireList";
import Invest from "./pages/Invest";
import InvestList from "./pages/InvestList";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/acquire" element={<Acquire />} />
            <Route path="/acquire/list" element={<AcquireList />} />
            <Route path="/acquire/:id" element={<AcquireDealRoom />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/invest/list" element={<InvestList />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buyer-dashboard" element={<Dashboard />} />
            <Route path="/seller-dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
