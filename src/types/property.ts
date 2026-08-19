export interface PropertyAgent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
  experience: string;
  languages: string[];
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  formattedPrice: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  propertyType: 'Villa' | 'Penthouse' | 'Mansion' | 'Waterfront' | 'Modernist Estate' | 'Chalet';
  status: 'For Sale' | 'Exclusive' | 'Pending' | 'New Release';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  lotSizeAcres?: number;
  yearBuilt: number;
  featured: boolean;
  images: string[];
  description: string;
  architecturalHighlights: string[];
  amenities: string[];
  agent: PropertyAgent;
}

export interface LocationItem {
  id: string;
  name: string;
  country: string;
  image: string;
  propertiesCount: number;
  averagePrice: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  propertyName?: string;
}

export interface FilterState {
  search: string;
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface VisitInquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyId: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  investmentTier?: string;
  agreeToTerms: boolean;
}
