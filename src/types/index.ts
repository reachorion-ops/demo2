export interface ProjectDetails {
  brandName: string;
  tagline: string;
  projectName: string;
  subTitle: string;
  locationTag: string;
  city: string;
  state: string;
  purchaseKicker: string;
  hotlinePhone: string;
  hotlineFormatted: string;
  whatsappNumber: string;
  primaryEmail: string;
  reraNumber: string;
  agentReraNumber: string;
  aboutTitle: string;
  aboutLead: string;
  aboutParagraphs: string[];
  startingPrice: string;
  possessionDate: string;
  heroBgUrl: string;
}

export interface StatItem {
  id: string;
  value: string;
  unit: string;
  label: string;
  description?: string;
}

export interface FloorPlan {
  id: string;
  typeCode: string;
  title: string;
  areaSqMeters: number;
  areaSqFt: number;
  carpetAreaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  balconies: number;
  facing: string;
  priceEstimate: string;
  description: string;
  features: string[];
  svgBlueprintType: 'typeA' | 'typeB' | 'typeC';
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  companyRole: string;
  experienceYears: number;
  reraRegNo: string;
  bio: string;
  phone1: string;
  phone2: string;
  email: string;
  photoUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Amenities' | 'Views';
  imageUrl: string;
  caption: string;
}

export interface NearbyLandmark {
  name: string;
  distance: string;
  travelTime: string;
  category: 'transit' | 'business' | 'lifestyle' | 'education';
}

export interface LocationInfo {
  heading: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  cityPostal: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
  landmarks: NearbyLandmark[];
}

export interface InquiryLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  source: 'Hero Quick Inquiry' | 'About Section Form' | 'Floor Plan Inquiry' | 'Main Contact Form' | 'Schedule Tour Modal';
  interestedUnit?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Closed';
}

export interface SiteContent {
  project: ProjectDetails;
  stats: StatItem[];
  location: LocationInfo;
  floorPlans: FloorPlan[];
  agents: Agent[];
  gallery: GalleryItem[];
}

