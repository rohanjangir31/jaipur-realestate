import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InquiryProvider, useInquiry } from './context/InquiryContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import QuickContact from './components/ui/QuickContact';
import ScrollToTop from './components/layout/ScrollToTop';
import InquiryModal from './components/inquiry/InquiryModal';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Buy Module
import BuyListings from './pages/buy/BuyListings';
import PropertyDetail from './pages/buy/PropertyDetail';
import SubmitProperty from './pages/buy/SubmitProperty';

// Stay Module
import StayListings from './pages/stay/StayListings';
import StayDetail from './pages/stay/StayDetail';
import HostSubmitStay from './pages/stay/HostSubmitStay';

// Invest Module
import InvestListings from './pages/invest/InvestListings';
import InvestmentDetail from './pages/invest/InvestmentDetail';
import InvestorCriteria from './pages/invest/InvestorCriteria';
import InvestorMatches from './pages/invest/InvestorMatches';

// Admin Operations Dashboard & Poster
import AdminDashboard from './pages/admin/AdminDashboard';
import Poster from './pages/Poster';
import NotFound from './pages/NotFound';

function GlobalInquiryModal() {
  const { isOpen, closeInquiry, initialVertical, propertyContext } = useInquiry();
  return (
    <InquiryModal
      isOpen={isOpen}
      onClose={closeInquiry}
      initialVertical={initialVertical}
      propertyContext={propertyContext}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <InquiryProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                {/* Buy Property Module */}
                <Route path="/buy" element={<BuyListings />} />
                <Route path="/buy/:id" element={<PropertyDetail />} />
                <Route
                  path="/buy/submit"
                  element={
                    <ProtectedRoute>
                      <SubmitProperty />
                    </ProtectedRoute>
                  }
                />

                {/* Stay / Short-Term Accommodations Module */}
                <Route path="/stay" element={<StayListings />} />
                <Route path="/stay/:id" element={<StayDetail />} />
                <Route
                  path="/stay/host/submit"
                  element={
                    <ProtectedRoute>
                      <HostSubmitStay />
                    </ProtectedRoute>
                  }
                />

                {/* Invest in Property Module */}
                <Route path="/invest" element={<InvestListings />} />
                <Route path="/invest/:id" element={<InvestmentDetail />} />
                <Route
                  path="/invest/criteria"
                  element={
                    <ProtectedRoute>
                      <InvestorCriteria />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invest/matches"
                  element={
                    <ProtectedRoute>
                      <InvestorMatches />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Operations Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute roles={['admin', 'super_admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="/poster" element={<Poster />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <QuickContact />
            <GlobalInquiryModal />
          </div>
        </InquiryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
