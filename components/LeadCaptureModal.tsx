
import React, { useState, useEffect } from 'react';
import { LeadFormData, PlanTier, ListingSubmission } from '../types';
import { useNavigate } from 'react-router-dom';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanTier;
}

const initialFormData: LeadFormData = {
  userType: 'new',
  selectedPlan: 'free',
  fullName: '',
  email: '',
  phone: '',
  city: '',
  role: '',
  listingUrls: [{ url: '', notes: '' }], // Start with one empty slot
  referralSource: '',
  agreedToCommunications: false,
  
  // Legacy/Default
  location: '',
  roomType: '',
  stylePreference: '',
  file: null
};

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
// Replace with your actual Firebase configuration later
const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

const STRIPE_PAYMENT_LINKS = {
    basic: 'https://buy.stripe.com/bJe8wQ1Hp04U4zTcHzbfO00',
    popular: 'https://buy.stripe.com/bJe4gAadV9Fu3vPgXPbfO01',
    premium: 'https://buy.stripe.com/8x25kE3PxcRG4zTbDvbfO02',
    free: ''
};

const GOOGLE_SCRIPT_WEBHOOK_URL = ""; 

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const navigate = useNavigate();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...initialFormData,
        selectedPlan: selectedPlan,
        userType: selectedPlan === 'free' ? 'new' : 'returning'
      }));
      setStep(1);
      setErrors({});
      setCopiedCode(false);
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen) return null;

  const isPaidPlan = formData.selectedPlan !== 'free';

  const getPlanDetails = (plan: PlanTier) => {
    switch(plan) {
        case 'free': return { name: 'Free Transformation', price: 0, label: 'Free Trial' };
        case 'basic': return { name: 'Basic Package (1 Room)', price: 100, label: '$100 USD' };
        case 'popular': return { name: 'Pro Package (5 Rooms)', price: 400, label: '$400 USD' };
        case 'premium': return { name: 'Premium Package (10 Rooms)', price: 700, label: '$700 USD' };
        default: return { name: 'Transformation', price: 0, label: 'Free' };
    }
  };

  const getDiscountInfo = (plan: PlanTier) => {
    if (plan === 'popular') return { code: 'KEPWHQTN', label: '20% OFF' };
    if (plan === 'premium') return { code: '0FCCDNJB', label: '30% OFF' };
    return null;
  };

  const planDetails = getPlanDetails(formData.selectedPlan);
  const discountInfo = getDiscountInfo(formData.selectedPlan);

  const updateData = (field: keyof LeadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific errors on change
    if (errors[field]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ----------------------------------------------------------------------
  // VALIDATION & FORMATTING HELPERS
  // ----------------------------------------------------------------------
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateData('phone', formatted);
  };

  const validateEmail = (email: string) => {
    // Strict email regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Helper to manage listing URLs
  const handleUrlChange = (index: number, field: keyof ListingSubmission, value: string) => {
    const newUrls = [...formData.listingUrls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    updateData('listingUrls', newUrls);
  };

  const addUrlSlot = () => {
    if (formData.listingUrls.length < 5) {
      updateData('listingUrls', [...formData.listingUrls, { url: '', notes: '' }]);
    }
  };

  const removeUrlSlot = (index: number) => {
    const newUrls = formData.listingUrls.filter((_, i) => i !== index);
    updateData('listingUrls', newUrls);
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    switch(step) {
      case 2: // Contact
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Name is required';
            isValid = false;
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
        break;
      case 3: // Role
        if (!formData.role) isValid = false;
        break;
      case 4: // Listings
        // Require at least one URL to be filled out
        if (!formData.listingUrls.some(l => l.url.trim().length > 0)) isValid = false;
        break;
      case 5: // Consent
        if (!formData.referralSource) isValid = false;
        if (!formData.agreedToCommunications) isValid = false;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep() && step < 6) {
        setStep(step + 1);
    } else {
      // Shake or highlight errors? For now, errors state handles red borders/text
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const processSubmission = async () => {
    setSubmissionStatus('Packaging data...');
    
    // Construct Payload for Firebase
    const payload = {
        timestamp: new Date().toISOString(),
        userType: formData.userType,
        clientName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        role: formData.role,
        listings: formData.listingUrls,
        referralSource: formData.referralSource,
        consented: formData.agreedToCommunications,
        servicePlan: planDetails.name,
        paymentStatus: isPaidPlan ? 'PENDING_STRIPE' : 'FREE_TRIAL',
    };

    if (GOOGLE_SCRIPT_WEBHOOK_URL) {
        setSubmissionStatus('Saving Lead...');
        try {
            await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setSubmissionStatus('Success!');
            await new Promise(resolve => setTimeout(resolve, 800));
        } catch (error) {
            console.error("API Error:", error);
            // Non-blocking error for demo
        }
    } else {
        // --- SIMULATION MODE FOR FIREBASE ---
        setSubmissionStatus('Connecting to Firestore...');
        await new Promise(resolve => setTimeout(resolve, 600));
        console.log(`%c[Firebase] Initializing App: ${FIREBASE_CONFIG.projectId}`, 'color: #FFCA28; font-weight: bold;');
        
        setSubmissionStatus('Saving Lead Document...');
        await new Promise(resolve => setTimeout(resolve, 600));
        console.log(`%c[Firestore] Writing Document to 'leads' collection:`, 'color: #FFA000; font-weight: bold;');
        console.dir(payload);
        // --- END SIMULATION ---
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
        await processSubmission();

        setSubmissionStatus('Redirecting to Stripe...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        const paymentLink = STRIPE_PAYMENT_LINKS[formData.selectedPlan as keyof typeof STRIPE_PAYMENT_LINKS];
        if (paymentLink) {
            window.location.href = paymentLink;
        } else {
            console.error("No payment link found for plan:", formData.selectedPlan);
            setIsProcessing(false);
        }

    } catch (error) {
        console.error('Submission Error:', error);
        alert('There was an issue processing your request. Please try again.');
        setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPaidPlan) {
        handlePayment();
    } else {
        setIsProcessing(true);
        await processSubmission();
        onClose();
        navigate('/thank-you');
        setIsProcessing(false);
        setSubmissionStatus('');
    }
  };

  const renderStep = () => {
    switch (step) {
      // STEP 1: SEGMENTATION & PLAN SELECTION
      case 1:
        return (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-2xl font-bold font-display text-primary dark:text-accent mb-2">
                Let's Get Started
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Are you a new client claiming your free trial, or a returning client?</p>
            
            <div className="grid grid-cols-1 gap-4">
                <button
                    type="button"
                    onClick={() => {
                        updateData('userType', 'new');
                        updateData('selectedPlan', 'free');
                        setStep(2);
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                        formData.userType === 'new'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-secondary dark:text-white">New Client</span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Free Trial</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">I want to redeem my first free transformation.</p>
                </button>

                <div className={`p-6 rounded-xl border-2 text-left transition-all ${
                        formData.userType === 'returning'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                >
                    <div 
                        onClick={() => updateData('userType', 'returning')}
                        className="flex items-center justify-between mb-2 cursor-pointer"
                    >
                        <span className="font-bold text-lg text-secondary dark:text-white">Returning Client</span>
                        <span className="material-symbols-outlined text-primary">star</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">I'm ready to purchase a package.</p>
                    
                    {/* Plan Selection for Returning Users */}
                    <div className={`grid grid-cols-3 gap-2 ${formData.userType === 'returning' ? 'opacity-100 pointer-events-auto' : 'opacity-50 pointer-events-none'}`}>
                        {(['basic', 'popular', 'premium'] as PlanTier[]).map((plan) => (
                            <button
                                key={plan}
                                type="button"
                                onClick={() => {
                                    updateData('userType', 'returning');
                                    updateData('selectedPlan', plan);
                                }}
                                className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${
                                    formData.selectedPlan === plan
                                    ? 'bg-secondary dark:bg-primary text-white border-secondary dark:border-primary'
                                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary/50'
                                }`}
                            >
                                {plan === 'basic' ? '1 Room ($100)' : plan === 'popular' ? '5 Rooms ($400)' : '10 Rooms ($700)'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        );

      // STEP 2: CONTACT INFO
      case 2:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-display text-primary dark:text-accent mb-6">Contact Details</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-text-light dark:text-text-dark font-medium">Full Name</span>
                <input 
                  type="text" 
                  className={`mt-2 block w-full rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-white`}
                  value={formData.fullName}
                  onChange={(e) => updateData('fullName', e.target.value)}
                  placeholder="e.g. Jane Doe"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </label>
              
              <label className="block">
                <span className="text-text-light dark:text-text-dark font-medium">Email Address</span>
                <input 
                  type="email" 
                  className={`mt-2 block w-full rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-white`}
                  value={formData.email}
                  onChange={(e) => updateData('email', e.target.value)}
                  placeholder="name@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-text-light dark:text-text-dark font-medium">City</span>
                    <input 
                    type="text" 
                    className={`mt-2 block w-full rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-white`}
                    value={formData.city}
                    onChange={(e) => updateData('city', e.target.value)}
                    placeholder="e.g. New York"
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </label>
                <label className="block">
                    <span className="text-text-light dark:text-text-dark font-medium">Contact Number</span>
                    <input 
                    type="tel" 
                    maxLength={14}
                    className={`mt-2 block w-full rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:border-primary focus:ring-primary ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-white`}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </label>
              </div>
            </div>
          </div>
        );

      // STEP 3: ROLE
      case 3:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-display text-primary dark:text-accent mb-6">What is your role?</h3>
            <div className="grid grid-cols-1 gap-3">
                {[
                    'Realtor', 
                    'Luxury Homeowner', 
                    'Custom Home Builder', 
                    'Architect', 
                    'Real Estate Investor/Flipper'
                ].map((role) => (
                    <button
                        key={role}
                        type="button"
                        onClick={() => updateData('role', role)}
                        className={`py-4 px-4 rounded-xl text-left font-medium border transition-all flex items-center justify-between ${
                            formData.role === role 
                            ? 'bg-primary text-white border-primary shadow-lg' 
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-text-light dark:text-text-dark hover:border-primary hover:text-primary'
                        }`}
                    >
                        {role}
                        {formData.role === role && <span className="material-symbols-outlined">check</span>}
                    </button>
                ))}
            </div>
          </div>
        );

      // STEP 4: LISTING INFORMATION
      case 4:
        return (
           <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold font-display text-primary dark:text-accent">Listing Details</h3>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Max 5 Listings</span>
            </div>
            
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                {formData.listingUrls.map((listing, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 relative group">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">Listing #{index + 1}</span>
                            {formData.listingUrls.length > 1 && (
                                <button type="button" onClick={() => removeUrlSlot(index)} className="text-red-400 hover:text-red-600">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            )}
                        </div>
                        <div className="space-y-3">
                            <input 
                                type="url" 
                                required={index === 0}
                                placeholder="Paste Listing URL (e.g. Zillow, Realtor.com)"
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:border-primary focus:ring-primary"
                                value={listing.url}
                                onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                            />
                            <textarea 
                                placeholder="Notes: Which rooms need staging? Style preferences?"
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:border-primary focus:ring-primary"
                                rows={2}
                                value={listing.notes}
                                onChange={(e) => handleUrlChange(index, 'notes', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {formData.listingUrls.length < 5 && (
                <button
                    type="button"
                    onClick={addUrlSlot}
                    className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add Another Listing
                </button>
            )}
           </div> 
        );

      // STEP 5: MARKETING & CONSENT
      case 5:
        return (
            <div className="animate-fade-in">
                <h3 className="text-2xl font-bold font-display text-primary dark:text-accent mb-6">Final Details</h3>
                
                <div className="space-y-6">
                    <label className="block">
                        <span className="text-text-light dark:text-text-dark font-medium">How did you find out about us?</span>
                        <select 
                            required
                            className="mt-2 block w-full rounded-lg border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white shadow-sm focus:border-primary focus:ring-primary"
                            value={formData.referralSource}
                            onChange={(e) => updateData('referralSource', e.target.value)}
                        >
                            <option value="">Select an option...</option>
                            <option value="Google Search">Google Search</option>
                            <option value="Social Media (Instagram/Facebook)">Social Media</option>
                            <option value="Referral">Referral</option>
                            <option value="Email Marketing">Email Marketing</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                                type="checkbox"
                                required
                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                checked={formData.agreedToCommunications}
                                onChange={(e) => updateData('agreedToCommunications', e.target.checked)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                I agree to receive communications (Call, Text, Email) from Luxury Transformations regarding my project and future offers. I understand I can unsubscribe at any time.
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );

      // STEP 6: REVIEW
      case 6:
        return (
            <div className="animate-fade-in">
                <h3 className="text-2xl font-bold font-display text-primary dark:text-accent mb-6">Review & {isPaidPlan ? 'Pay' : 'Submit'}</h3>
                
                {/* Discount Code Box for Paid Plans */}
                {discountInfo && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg mb-6 shadow-sm">
                        <p className="text-sm text-green-800 dark:text-green-300 font-bold mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">celebration</span>
                            You qualify for {discountInfo.label}!
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 bg-white dark:bg-black/20 p-2 rounded border border-green-200 dark:border-green-800 font-mono text-center font-bold tracking-widest text-green-700 dark:text-green-400 select-all">
                                {discountInfo.code}
                            </code>
                            <button
                                type="button"
                                onClick={() => handleCopyCode(discountInfo.code)}
                                className="p-2 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
                                title="Copy Code"
                            >
                                {copiedCode ? (
                                    <span className="material-symbols-outlined text-lg">check</span>
                                ) : (
                                    <span className="material-symbols-outlined text-lg">content_copy</span>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-2 font-medium">
                            *Copy this code now and apply it at the Stripe checkout screen.
                        </p>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl space-y-4 mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                        <h4 className="font-bold text-lg text-secondary dark:text-white">Summary</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPaidPlan ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
                            {planDetails.label}
                        </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                             <span className="text-gray-500 dark:text-gray-400">Name:</span>
                             <span className="font-medium text-secondary dark:text-white">{formData.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                             <span className="text-gray-500 dark:text-gray-400">Email:</span>
                             <span className="font-medium text-secondary dark:text-white">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                             <span className="text-gray-500 dark:text-gray-400">Role:</span>
                             <span className="font-medium text-secondary dark:text-white">{formData.role}</span>
                        </div>
                        <div className="flex justify-between">
                             <span className="text-gray-500 dark:text-gray-400">Listings Submitted:</span>
                             <span className="font-medium text-secondary dark:text-white">{formData.listingUrls.length}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-lg text-secondary dark:text-white">Total</span>
                        <span className="font-black text-2xl text-primary">${planDetails.price}</span>
                    </div>
                </div>

                {isPaidPlan && (
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-4">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span>Payments are securely processed by Stripe. SSL Encrypted.</span>
                    </div>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">By proceeding, you agree to our Terms of Use and Privacy Policy.</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-body">
      <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-background-dark p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        
        {/* Progress Bar */}
        <div className="mb-4">
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                <span>Step {step} of 6</span>
                <span>{Math.round((step / 6) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${(step / 6) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Sticky Plan Summary */}
        {step > 1 && step < 6 && (
            <div className="mb-6 p-3 bg-primary/5 dark:bg-gray-800 rounded-lg border border-primary/10 dark:border-gray-700 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Applying for:</span>
                <span className="text-sm font-bold text-secondary dark:text-white flex items-center gap-2">
                    {planDetails.name} 
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        {planDetails.price === 0 ? 'FREE' : `$${planDetails.price}`}
                    </span>
                </span>
            </div>
        )}

        <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={isProcessing}
                        className="px-6 py-2 rounded-lg text-sm font-bold text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                ) : <div></div>}
                
                {step < 6 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-opacity-90 transition-opacity"
                    >
                        Next
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg w-full sm:w-auto justify-center ${isPaidPlan ? 'bg-[#635BFF] hover:bg-[#5348e3]' : 'bg-secondary'}`}
                    >
                        {isProcessing ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                {submissionStatus || 'Processing...'}
                            </>
                        ) : (
                            <>
                                {isPaidPlan ? 'Proceed to Payment' : 'Submit Transformation'}
                                <span className="material-symbols-outlined text-lg">{isPaidPlan ? 'credit_card' : 'check_circle'}</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </form>

        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
            <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};
