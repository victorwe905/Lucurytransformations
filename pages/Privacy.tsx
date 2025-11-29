import React from 'react';

export const Privacy: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'introduction', title: '1. Introduction', content: 'At Luxury Transformations, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.' },
    { id: 'collection', title: '2. Information We Collect', content: 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:\n\n• Identity Data: includes first name, last name, username or similar identifier.\n• Contact Data: includes billing address, delivery address, email address and telephone numbers.\n• Transaction Data: includes details about payments to and from you and other details of products and services you have purchased from us.\n• Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location.' },
    { id: 'usage', title: '3. How We Use Your Data', content: 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:\n\n• Where we need to perform the contract we are about to enter into or have entered into with you.\n• Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.\n• Where we need to comply with a legal or regulatory obligation.' },
    { id: 'security', title: '4. Data Security', content: 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.' },
    { id: 'contact', title: '5. Contact Us', content: 'If you have any questions about this privacy policy or our privacy practices, please contact us at:\n\nLuxury Transformations\n304-17 Worthington Ave #8\nBrampton ON L7A 1M9\nEmail: support@luxurytransformations.com' }
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
              <h1 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-2">Privacy Policy</h1>
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