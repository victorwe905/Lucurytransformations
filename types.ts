
export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  type: 'text' | 'options';
  options?: string[];
}

export type PlanTier = 'free' | 'basic' | 'popular' | 'premium';

export interface ListingSubmission {
  url: string;
  notes: string;
}

export interface LeadFormData {
  // Segmentation
  userType: 'new' | 'returning';
  selectedPlan: PlanTier;

  // Contact
  fullName: string;
  email: string;
  phone: string;
  city: string;

  // Role
  role: string;

  // Listings
  listingUrls: ListingSubmission[];
  
  // Legacy fields (optional/unused in new flow but kept for type safety)
  location: string;
  roomType: string;
  stylePreference: string;
  file: File | null;

  // Marketing & Legal
  referralSource: string;
  agreedToCommunications: boolean;
}

export interface ChatUserData {
  room?: string;
  role?: string;
  name?: string;
  email?: string;
  phone?: string;
}
