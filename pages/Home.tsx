
import React, { useState } from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PlanTier } from '../types';

// Portfolio data with categories - Ensuring 2 options per category
const portfolioData = [
  // Living Room
  {
    title: "Modern City Loft",
    category: "Living Room",
    before: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    id: 1
  },
  {
    title: "Scandi-Boho Living",
    category: "Living Room",
    before: "https://images.unsplash.com/photo-1505691938895-1cd1027448ac?q=80&w=1600&auto=format&fit=crop", 
    after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    id: 2
  },
  // Bedroom
  {
    title: "Suburban Master Suite",
    category: "Bedroom",
    before: "https://images.unsplash.com/photo-1513694203232-7e9bb168609a?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1616594039964-40891a940855?q=80&w=1600&auto=format&fit=crop",
    id: 3
  },
  {
    title: "Minimalist Guest Room",
    category: "Bedroom",
    before: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop",
    id: 4
  },
  // Kitchen
  {
    title: "Gourmet Chef's Kitchen",
    category: "Kitchen",
    before: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop",
    id: 5
  },
  {
    title: "Modern Farmhouse Kitchen",
    category: "Kitchen",
    before: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1600&auto=format&fit=crop",
    id: 6
  },
  // Dining
  {
    title: "Elegant Formal Dining",
    category: "Dining",
    before: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1600&auto=format&fit=crop",
    id: 7
  },
  {
    title: "Open Concept Dining",
    category: "Dining",
    before: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1600&auto=format&fit=crop",
    id: 8
  },
  // Bathroom
  {
    title: "Luxury Spa Retreat",
    category: "Bathroom",
    before: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop",
    id: 9
  },
  {
    title: "Contemporary Vanity",
    category: "Bathroom",
    before: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1620626012053-93f2bc72338d?q=80&w=1600&auto=format&fit=crop",
    id: 10
  }
];

const faqs = [
    { q: "Is the first transformation really free?", a: "Yes! We are so confident you'll love our work that your first room transformation is on us. No credit card required—just fill out the form to get started." },
    { q: "How fast will I receive my images?", a: "We know time is money in real estate. Our standard turnaround time is 24-48 hours, ensuring you can get your listing on the market as quickly as possible." },
    { q: "Can I use these images on the MLS?", a: "Yes, absolutely. Our images are fully compliant with MLS standards. We ensure the virtual furniture is realistic and scaled correctly, without altering the physical structure of the property." },
    { q: "Why do I need multiple styles?", a: "Offering multiple styles (e.g., Modern, Scandinavian, Farmhouse) helps you appeal to a wider range of potential buyers. What captivates one buyer might not appeal to another." },
    { q: "What if I need revisions?", a: "We want you to love your images! We offer one complimentary round of revisions for minor adjustments to ensure the furniture placement and style match your vision perfectly." },
    { q: "How do I submit my room for transformation?", a: "Simply choose a package, and you'll be directed to our secure portal to upload your photos. You can add notes for our designers and select your preferred styles right there." }
];

interface HomeProps {
    openLeadCapture: (plan: PlanTier) => void;
    openChat: () => void;
}

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom"];

export const Home: React.FC<HomeProps> = ({ openLeadCapture, openChat }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter portfolio items
  const filteredPortfolio = activeCategory === "All" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <main className="flex-1 w-full font-body">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-6 animate-fade-in">
              PREMIUM VIRTUAL STAGING
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-body tracking-tighter leading-tight text-secondary dark:text-white mb-8 animate-fade-in-up">
              Triple Your Showings Overnight with Our <span className="text-primary inline-block">Proprietary Virtual Staging</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              Attract more buyers and sell properties faster with stunning, photorealistic virtual staging.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
              <button 
                onClick={() => openLeadCapture('free')}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1"
              >
                Get Started - It's Free!
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-secondary dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:border-primary transition-all"
              >
                View Examples
              </button>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up delay-300 border-4 border-white dark:border-gray-800">
             <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                altText="Living Room Staging"
             />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by the best in the business</p>
             <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 select-none">
                 <span className="text-2xl font-black tracking-tighter text-gray-600 dark:text-gray-400">RE/MAX</span>
                 <span className="text-xl font-serif font-bold text-gray-600 dark:text-gray-400">Keller Williams</span>
                 <span className="text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">Coldwell Banker</span>
                 <span className="text-xl font-bold font-display tracking-tight text-gray-600 dark:text-gray-400">Century 21</span>
                 <span className="text-lg font-serif font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400">Berkshire Hathaway</span>
                 <span className="text-xl font-serif font-medium text-gray-600 dark:text-gray-400">Compass</span>
                 <span className="text-2xl font-sans font-black tracking-tighter text-gray-600 dark:text-gray-400">Zillow</span>
                 <span className="text-xl font-sans font-bold text-gray-600 dark:text-gray-400">Redfin</span>
                 <span className="text-xl font-serif italic font-bold text-gray-600 dark:text-gray-400">Sotheby's</span>
             </div>
         </div>
      </section>

      {/* Portfolio (See the Magic of Transformations) */}
      <section id="portfolio" className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-4">See the Magic of Our Transformations</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">Explore our portfolio to see how we bring empty rooms to life with elegance and style.</p>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                            activeCategory === cat
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Portfolio Grid - Bigger & Centered (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {filteredPortfolio.length > 0 ? (
                    filteredPortfolio.map((item) => (
                        <div key={item.id} className="flex flex-col gap-5 animate-slide-up group">
                            <div className="relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-200 dark:ring-gray-800">
                                <BeforeAfterSlider 
                                    beforeImage={item.before} 
                                    afterImage={item.after} 
                                    altText={item.title} 
                                />
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-2xl font-bold font-display text-secondary dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">{item.category}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No projects found in this category yet.
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Services Process (A Simple Path to Perfection) */}
      <section id="services" className="py-24 bg-white dark:bg-[#0d101b]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-4">A Simple Path to Perfection</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">Our streamlined process ensures you get stunning results in just a few steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: 'upload_file', title: '1. Upload Photos', desc: 'Securely upload your property photos through our simple portal.' },
                    { icon: 'palette', title: '2. Choose Style', desc: 'Select from our curated collection of luxury and modern design styles.' },
                    { icon: 'download_done', title: '3. Receive Images', desc: 'Get your professionally staged, quality-inspected images back in 24-48 hours.' }
                ].map((step, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-background-light dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold font-display mb-3 text-secondary dark:text-white">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-4">Choose the Perfect Plan for Your Needs</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">Choose from our tailored packages to get the exact virtual staging services you need, with transparent pricing and no hidden fees.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Basic Plan */}
                <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/50 transition-colors">
                    <h3 className="text-2xl font-bold font-display text-secondary dark:text-white mb-4">1 Transformation</h3>
                    <div className="text-4xl font-black text-primary mb-6">$100</div>
                    <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 1 Room Staged
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 3 Contrasting Styles
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 3 High-Res Images
                        </li>
                         <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> Manual Quality Inspection
                        </li>
                    </ul>
                    <button onClick={() => openLeadCapture('basic')} className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                        Get Started - It's Free!
                    </button>
                </div>

                {/* Popular Plan */}
                <div className="relative p-8 rounded-2xl border-2 border-primary bg-white dark:bg-gray-800 shadow-2xl transform lg:-translate-y-4">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
                    <h3 className="text-2xl font-bold font-display text-secondary dark:text-white mb-4">5 Transformations</h3>
                    <div className="text-4xl font-black text-primary mb-2">$400</div>
                    <p className="text-sm text-primary font-bold mb-6 uppercase tracking-wider">Save 20%</p>
                    <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 5 Rooms Staged
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 3 Styles per Room
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> <strong>15 High-Res Images</strong>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> Priority Manual Check
                        </li>
                    </ul>
                    <button onClick={() => openLeadCapture('popular')} className="w-full py-4 rounded-lg bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-lg">
                        Get Started - It's Free!
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/50 transition-colors">
                    <h3 className="text-2xl font-bold font-display text-secondary dark:text-white mb-4">10 Transformations</h3>
                    <div className="text-4xl font-black text-primary mb-2">$700</div>
                    <p className="text-sm text-primary font-bold mb-6 uppercase tracking-wider">Save 30%</p>
                    <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 10 Rooms Staged
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 3 Styles per Room
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> 30 High-Res Images
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span> Top Priority Support
                        </li>
                    </ul>
                    <button onClick={() => openLeadCapture('premium')} className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                        Get Started - It's Free!
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials - Wall of Love (Static Social Media Style) */}
      <section className="py-24 bg-gray-50 dark:bg-[#1a1f2e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           {/* Section Header */}
           <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-4">
                What Our Clients Are Saying
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join hundreds of satisfied professionals who trust us with their properties.
              </p>
           </div>

           {/* Masonry Grid Layout (3x3) */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* === COLUMN 1 === */}
              <div className="flex flex-col gap-6">
                  {/* Card 1: Juan */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Juan" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Juan Colicchio</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Realtor • 150k/tasks per month</p>
                        </div>
                        <div className="ml-auto text-primary">
                            <span className="material-symbols-outlined text-2xl">thumb_up</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded transform -rotate-1">
                            Highly Recommended for luxury listings
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        I moved from physical staging to Luxury Transformations. We used to spend $3k/month on rentals. I would highly recommend!
                        <br/><br/>
                        Update Sep 9th, we've staged ~16 homes this month, and only paid a fraction of the cost. I highly recommend x2 !!!!!
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">24w • Edited</span>
                        <div className="flex items-center gap-1">
                            <span className="text-lg">🟡</span>
                            <span className="text-xs text-gray-500">38</span>
                        </div>
                    </div>
                  </div>

                  {/* Card 4: Jessica */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Jessica" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Jessica Miller</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Realtor</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <div className="mb-3">
                        <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded transform rotate-1">
                            Crazy Amount of Styles
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        I've been using Luxury Transformations for a few months now & It's really been helping me automate my business from top to bottom. Plus there are a crazy amount of styles available!
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w</span>
                        <div className="flex items-center gap-1">
                            <span className="text-lg">🟡</span>
                            <span className="text-xs text-gray-500">5</span>
                        </div>
                    </div>
                  </div>
                  
                  {/* Card 7: Jaymes */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Jaymes" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Jaymes Poudrier</h4>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        Great service that is only getting better!
                    </p>
                    <div className="mb-4 text-right">
                        <span className="inline-block bg-blue-100 text-blue-600 dark:bg-[#2563eb]/20 dark:text-[#60a5fa] text-xs font-bold px-2 py-1 rounded transform -rotate-1">
                            Service is getting better everyday
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w</span>
                    </div>
                  </div>
              </div>

              {/* === COLUMN 2 === */}
              <div className="flex flex-col gap-6">
                   {/* Card 2: Benjie */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Benjie" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Benjie Malinao</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Luxury Broker</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <div className="mb-3 text-right">
                        <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded transform rotate-2">
                            Better than Physical Staging
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        If you love the look of high-end staging but hate the expensive monthly furniture rental contracts, then this is the answer! I stopped paying for physical staging entirely after I discovered this service!
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w • Edited</span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white"><span className="text-[10px] text-white">❤️</span></div>
                            <span className="text-xs text-gray-500">7</span>
                        </div>
                    </div>
                  </div>

                  {/* Card 5: Ankush */}
                   <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Ankush" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Ankush Chopra</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Investor</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        Don't miss it. Even if you don't need it right now, keep them in mind for your future flips. It's an investment that pays off.
                    </p>
                    <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-600 dark:bg-[#2563eb]/20 dark:text-[#60a5fa] text-xs font-bold px-2 py-1 rounded transform rotate-1">
                            Essential for investors
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">1w • Edited</span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white"><span className="text-[10px] text-white">❤️</span></div>
                            <span className="text-xs text-gray-500">1</span>
                        </div>
                    </div>
                  </div>

                  {/* Card 8: Raj */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="Raj" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Raj Nadar</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Architect</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        Great team, stunning results, and the fast delivery time is an absolute must have for my presentations!
                    </p>
                    <div className="mb-3 text-right">
                        <span className="inline-block bg-blue-100 text-blue-600 dark:bg-[#2563eb]/20 dark:text-[#60a5fa] text-xs font-bold px-2 py-1 rounded transform -rotate-1">
                            Stunning Quality
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w</span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white"><span className="text-[10px] text-white">❤️</span></div>
                            <span className="text-xs text-gray-500">1</span>
                        </div>
                    </div>
                  </div>
              </div>

              {/* === COLUMN 3 === */}
              <div className="flex flex-col gap-6">
                  {/* Card 3: Mohamed */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Mohamed" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Mohamed Ali</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Developer</p>
                        </div>
                        <div className="ml-auto text-red-500">
                            <span className="text-xl">❤️</span>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        This is an amazing service. I moved from another provider and never looked back. Try it and you won't be disappointed.
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w</span>
                        <div className="flex items-center gap-1">
                            <span className="text-lg">🟡</span>
                            <span className="text-xs text-gray-500">2</span>
                        </div>
                    </div>
                  </div>

                  {/* Card 6: Brijesh */}
                  <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Brijesh" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Brijesh Parikh</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Homeowner</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <div className="mb-3 text-right">
                        <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded transform rotate-1">
                            Better than competition
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        A high value for money alternative....If you need fast staging ...Go for it.....
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">25w</span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white"><span className="text-[10px] text-white">❤️</span></div>
                            <span className="text-xs text-gray-500">1</span>
                        </div>
                    </div>
                  </div>

                   {/* Card 9: Sarah */}
                   <div className="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="Sarah" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-secondary dark:text-white">Sarah Jenkins</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Interior Designer</p>
                        </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        I use Luxury Transformations for all my e-design clients. The realism is unmatched and it helps them visualize the final look perfectly before we even buy furniture.
                    </p>
                    <div className="mb-3">
                        <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded transform -rotate-1">
                            Unmatched Realism
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Like</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Reply</button>
                        </div>
                        <span className="text-xs text-gray-400">2d • Edited</span>
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white"><span className="text-[10px] text-white">❤️</span></div>
                            <span className="text-xs text-gray-500">12</span>
                        </div>
                    </div>
                  </div>

              </div>

           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white dark:bg-[#0d101b]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-secondary dark:text-white mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <details key={i} className="group bg-background-light dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer open:shadow-md transition-shadow">
                        <summary className="flex items-center justify-between font-bold font-display text-lg text-secondary dark:text-white list-none">
                            {faq.q}
                            <span className="material-symbols-outlined transform group-open:rotate-45 transition-transform text-primary">add</span>
                        </summary>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.a}
                        </p>
                    </details>
                ))}
            </div>
            {/* Additional Questions Call to Action */}
            <div className="mt-12 text-center animate-fade-in">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    Have more questions?
                </p>
                <button 
                    onClick={openChat}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary dark:hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">chat</span>
                    Chat with Alex, our AI Assistant for instant answers
                </button>
            </div>
          </div>
      </section>
    </main>
  );
};
