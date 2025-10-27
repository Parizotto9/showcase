import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NewAuction from './features/auctions/components/create/NewAuction';
import Index from './features/static/components/Index';
import NotFound from './features/static/components/NotFound';
import PrivacyPolicy from './features/static/components/PrivacyPolicy';
import SellerDashboard from './features/seller/components/dashboard/SellerDashboard';
import TermsOfService from './features/static/components/TermsOfService';
import CompletedAuctionsContainer from './features/auctions/components/completed/CompletedAuctionsContainer';
import AuctionSummaryContainer from './features/auctions/components/summary/AuctionSummaryContainer';
import SellerCockpitContainer from './features/seller/components/cockpit/SellerCockpitContainer';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/auctions/complete"
            element={<CompletedAuctionsContainer />}
          />
          <Route
            path="/auction/:id/summary"
            element={<AuctionSummaryContainer />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/dashboard/:tab" element={<SellerDashboard />} />
          <Route
            path="/seller/dashboard/:tab/:auctionId"
            element={<SellerDashboard />}
          />
          <Route path="/seller/new-auction" element={<NewAuction />} />
          <Route path="/cockpit" element={<SellerCockpitContainer />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
