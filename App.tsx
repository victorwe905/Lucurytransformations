
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ThankYou } from './pages/ThankYou';
import { PlanTier } from './types';

// Scroll to top on route change wrapper
const ScrollToTop: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      // If there is a hash, wait slightly for DOM to be ready then scroll
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);

  return (
    <Router>
      <ScrollToTop>
        <div className="flex flex-col min-h-screen">
          <Header openLeadCapture={() => setSelectedPlan('free')} />
          
          <Routes>
            <Route path="/" element={<Home openLeadCapture={(plan) => setSelectedPlan(plan)} openChat={() => setIsChatOpen(true)} />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>

          <Footer />

          {/* Floating Chat Button */}
          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center group"
              aria-label="Open Chat"
            >
              <span className="material-symbols-outlined text-3xl group-hover:animate-bounce">chat_bubble</span>
            </button>
          )}

          {/* Chat Widget */}
          <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          {/* Lead Capture Modal */}
          <LeadCaptureModal 
            isOpen={!!selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
            selectedPlan={selectedPlan || 'free'}
          />
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default App;
