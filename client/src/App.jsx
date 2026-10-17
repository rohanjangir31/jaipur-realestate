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

                {/* ── Legacy Catalog Route Protection & Redirection ── */}
                <Route path="/buy" element={<Navigate to="/#services" replace />} />
                <Route path="/buy/*" element={<Navigate to="/#services" replace />} />
                <Route path="/invest" element={<Navigate to="/#services" replace />} />
                <Route path="/invest/*" element={<Navigate to="/#services" replace />} />
                <Route path="/stay" element={<Navigate to="/#services" replace />} />
                <Route path="/stay/*" element={<Navigate to="/#services" replace />} />

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
