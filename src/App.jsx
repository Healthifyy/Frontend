import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import SymptomWizard from './pages/SymptomWizard';
import Results from './pages/Results';
import WorkerDashboard from './pages/WorkerDashboard';
import Settings from './pages/Settings';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 m-10 bg-red-100 border-4 border-red-500 rounded-lg shadow-2xl z-50 relative text-black">
          <h1 className="text-3xl font-bold text-red-700 mb-4">React App Crashed!</h1>
          <p className="font-mono text-sm whitespace-pre-wrap">{this.state.error && this.state.error.stack}</p>
        </div>
      );
    }
    return this.props.children; 
  }
}

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/check" element={<SymptomWizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/worker" element={
              <ErrorBoundary>
                <WorkerDashboard />
              </ErrorBoundary>
            } />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
