
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (target: 'home' | 'portfolio') => {
    // Navigate to home route
    navigate('/');
    
    // If portfolio selected, scroll to it after a brief delay to allow mounting
    if (target === 'portfolio') {
        setTimeout(() => {
            const element = document.getElementById('portfolio');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300); // Slight delay to ensure Home component renders
    } else {
        // For home, ensure we are at the top
        window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12">
       <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
             <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display text-secondary dark:text-white mb-6">
             Thank You!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
             We have received your submission. Our team will review your details and send your transformation preview within 24-48 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
             <button 
                onClick={() => handleNavigation('portfolio')}
                className="flex-1 py-4 px-6 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
             >
                View Portfolio
                <span className="material-symbols-outlined">photo_library</span>
             </button>
             <button 
                onClick={() => handleNavigation('home')}
                className="flex-1 py-4 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-secondary dark:text-white rounded-lg font-bold hover:border-primary transition-colors flex items-center justify-center gap-2"
             >
                Return Home
                <span className="material-symbols-outlined">home</span>
             </button>
          </div>
       </main>
    </div>
  );
};
