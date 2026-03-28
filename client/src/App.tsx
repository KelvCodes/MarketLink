import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import TrustHub from './pages/TrustHub';
import Insights from './pages/Insights';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNav = !['/', '/onboarding'].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      {showNav && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trust" element={<TrustHub />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
