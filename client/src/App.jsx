import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import QuickContact from './components/ui/QuickContact';

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

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                  <ProtectedRoute roles={['owner', 'agent', 'admin', 'super_admin']}>
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
                  <ProtectedRoute roles={['host', 'agent', 'admin', 'super_admin']}>
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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <QuickContact />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
