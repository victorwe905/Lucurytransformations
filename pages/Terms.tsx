import React from 'react';

export const Terms: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'introduction', title: '1. Introduction', content: 'Welcome to Luxury Transformations. These Terms of Use ("Terms") govern your access to and use of our virtual staging services and website. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our services.' },
    { id: 'services', title: '2. Services', content: 'Luxury Transformations provides professional virtual staging services. We digitally furnish and decorate photographs of real estate properties provided by you. We strive for high-quality, photorealistic results, but specific artistic interpretations may vary.' },
    { id: 'user-obligations', title: '3. User Obligations', content: 'You represent and warrant that you own all necessary rights, title, and interest in the photos you submit for staging. You agree not to submit content that is unlawful, offensive, or infringes on the rights of others. You are responsible for the accuracy of any instructions provided to us.' },
    { id: 'payments', title: '4. Payments & Refunds', content: 'All prices are in USD unless otherwise stated. Payment is required before the delivery of final images. Due to the nature of digital goods and custom services, refunds are generally not provided once work has commenced, except as required by law. We offer one complimentary revision to ensure satisfaction.' },
    { id: 'intellectual-property', title: '5. Intellectual Property', content: 'Upon full payment, we grant you a non-exclusive, perpetual, worldwide license to use the final staged images for marketing and advertising purposes. Luxury Transformations retains the right to use the before and after images for its own portfolio and marketing unless explicitly agreed otherwise in writing.' },
    { id: 'limitation-liability', title: '6. Limitation of Liability', content: 'To the fullest extent permitted by law, Luxury Transformations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.' },
    { id: 'jurisdiction', title: '7. Governing Law & Jurisdiction', content: 'These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any legal action or proceeding arising under these Terms will be instituted exclusively in the courts located in Brampton, Ontario, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.' },
    { id: 'contact', title: '8. Contact Information', content: `If you have any questions about these Terms, please contact us at:\n\nLuxury Transformations\n304-17 Worthington Ave #8\nBrampton ON L7A 1M9\nEmail: support@luxurytransformations.com` }
  ];

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen font-body">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-4">
            <h3 className="font-bold text-secondary dark:text-white text-sm uppercase tracking-wider mb-2">Table of Contents</h3>
            <nav className="flex flex-col space-y-1">
              {sections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors text-left"
                >
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap justify-between items-end gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-2">Terms of Use</h1>
              <p className="text-gray-500 dark:text-gray-400">Last Updated: October 2024</p>
            </div>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-secondary dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">print</span>
              Print
            </button>
          </div>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 animate-fade-in">
                <h2 className="text-2xl font-bold font-display text-secondary dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};