import { SiteContent, InquiryLead } from '../types';

export const initialSiteContent: SiteContent = {
  project: {
    brandName: "QUARTER",
    tagline: "BUILDING URBAN LIVING",
    projectName: "RESIDENTIAL QUARTER PREMIUM",
    subTitle: "FLAGSHIP WATERFRONT RESIDENCES",
    locationTag: "Worli Sea Face, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    purchaseKicker: "PURCHASE OF APARTMENTS",
    hotlinePhone: "+91 (22) 6845 6789",
    hotlineFormatted: "+91 (22) 6845-6789",
    whatsappNumber: "+919820045678",
    primaryEmail: "advisory@quarter-mumbai.com",
    reraNumber: "MahaRERA Reg No: P51900048291",
    agentReraNumber: "Quarter Realty Advisory LLP - MahaRERA: A51900018429",
    aboutTitle: "ABOUT THE PROJECT",
    aboutLead: "The flagship 'Quarter Premium' is an iconic 42-storey waterfront landmark nestled directly along the coveted Worli Sea Face promenade in South Mumbai.",
    aboutParagraphs: [
      "The project 'Quarter' is a high-end secure residential development with 48 bespoke sky residences, each enjoying unobstructed panoramic vistas of the Arabian Sea and the Bandra-Worli Sea Link. Each floor accommodates only 2 expansive residences with private biometric elevator foyers, ensuring absolute discretion and acoustic privacy.",
      "Engineered to world-class seismic and thermal standards, the architectural facade combines natural Italian travertino, champagne-anodized German fenestration, and insulated acoustic double glazing. The ground level hosts a double-height private arrival lobby, temperature-controlled lap pool, bespoke wellness suite, and round-the-clock concierge team."
    ],
    startingPrice: "₹ 14.50 Cr*",
    possessionDate: "December 2026",
    heroBgUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
  },
  stats: [
    {
      id: "stat-1",
      value: "2.4",
      unit: "ha",
      label: "AREA",
      description: "6.0 Acres of Prime Waterfront Estate"
    },
    {
      id: "stat-2",
      value: "3",
      unit: "towers",
      label: "BUILDINGS",
      description: "Low-density Iconic Sky Towers"
    },
    {
      id: "stat-3",
      value: "48",
      unit: "units",
      label: "APARTMENTS",
      description: "Exclusive Sea-Facing Residences"
    },
    {
      id: "stat-4",
      value: "128",
      unit: "slots",
      label: "PARKING",
      description: "Dedicated Multi-Level EV Bays"
    }
  ],
  location: {
    heading: "LOCATION",
    description: "The residential landmark is situated on Worli Sea Face, Mumbai. In close proximity to the city's finest business hubs, international schools, luxury hotels, and private clubs, Quarter offers seamless access via the coastal road and sea link while preserving tranquil oceanfront seclusion.",
    addressLine1: "Quarter Tower, 28 Worli Sea Face Promenade",
    addressLine2: "Worli, Mumbai, Maharashtra",
    cityPostal: "400018, India",
    phone: "+91 (22) 6845 6789",
    email: "concierge@quarter-mumbai.com",
    googleMapsUrl: "https://maps.google.com/?q=Worli+Sea+Face+Mumbai",
    landmarks: [
      { name: "Bandra-Worli Sea Link", distance: "1.2 km", travelTime: "3 mins", category: "transit" },
      { name: "Coastal Road Interchange", distance: "800 m", travelTime: "2 mins", category: "transit" },
      { name: "Bandra Kurla Complex (BKC)", distance: "11 km", travelTime: "16 mins", category: "business" },
      { name: "The St. Regis & Palladium Mall", distance: "3.5 km", travelTime: "8 mins", category: "lifestyle" },
      { name: "Nariman Point Financial Hub", distance: "12 km", travelTime: "18 mins", category: "business" },
      { name: "Chhatrapati Shivaji Maharaj Airport", distance: "16 km", travelTime: "24 mins", category: "transit" }
    ]
  },
  floorPlans: [
    {
      id: "plan-a",
      typeCode: "TYPE A",
      title: "3 BHK Sea Suite",
      areaSqMeters: 148.5,
      areaSqFt: 2450,
      carpetAreaSqFt: 1845,
      bedrooms: 3,
      bathrooms: 3,
      parkingSpaces: 2,
      balconies: 2,
      facing: "West / Arabian Sea",
      priceEstimate: "₹ 14.85 Cr*",
      description: "Generous 3-bedroom layout with double-height oceanfront sundeck, expansive living-dining expanse, separate dry/wet kitchen, and en-suite domestic staff quarter.",
      features: [
        "11.5 ft clear floor-to-ceiling volume",
        "Direct west-facing sea-facing sundeck (220 sq.ft)",
        "Italian Botticino marble across living & suites",
        "Private biometric elevator lobby with dual access"
      ],
      svgBlueprintType: "typeA"
    },
    {
      id: "plan-b",
      typeCode: "TYPE B",
      title: "4 BHK Royal Horizon",
      areaSqMeters: 212.0,
      areaSqFt: 3680,
      carpetAreaSqFt: 2780,
      bedrooms: 4,
      bathrooms: 5,
      parkingSpaces: 3,
      balconies: 3,
      facing: "Corner West-South / Sea & Skyline",
      priceEstimate: "₹ 22.50 Cr*",
      description: "Palatial 4-bedroom corner residence featuring dual master suites, walk-in Poggenpohl closets, private home theatre lounge, and wrap-around viewing terrace.",
      features: [
        "Wraparound cantilever viewing deck",
        "Dual Master Suites with freestanding spa tubs",
        "Customized Italian kitchen by Poliform with Miele fittings",
        "3 reserved podium car parking bays with EV charge point"
      ],
      svgBlueprintType: "typeB"
    },
    {
      id: "plan-c",
      typeCode: "TYPE C",
      title: "5 BHK Duplex Sky Villa",
      areaSqMeters: 335.0,
      areaSqFt: 5400,
      carpetAreaSqFt: 4120,
      bedrooms: 5,
      bathrooms: 6,
      parkingSpaces: 4,
      balconies: 4,
      facing: "360° Panoramic Arabian Sea & City",
      priceEstimate: "₹ 38.00 Cr*",
      description: "Crowing jewel duplex penthouse occupying the top two tiers. Features private rooftop plunge pool, internal architectural glass elevator, and separate staff wing.",
      features: [
        "Private 40 ft infinity lap pool on upper sundeck",
        "Internal glass capsule elevator connecting both levels",
        "Temperature-controlled wine cellar and cigar lounge",
        "4 dedicated basement parking slots + private driver room"
      ],
      svgBlueprintType: "typeC"
    }
  ],
  agents: [
    {
      id: "agent-1",
      name: "Vikramaditya Singhania",
      title: "Managing Partner & Luxury Director",
      companyRole: "Quarter Private Client Advisory",
      experienceYears: 18,
      reraRegNo: "MahaRERA: A51900029341",
      bio: "Vikramaditya has overseen marquee transactions exceeding ₹2,400 Crores across South Mumbai's golden mile, advising premier corporate leaders and family offices.",
      phone1: "+91 (22) 6845 6769",
      phone2: "+91 98200 89123",
      email: "vikramaditya@quarter-mumbai.com",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "agent-2",
      name: "Rajeshwar Mehta",
      title: "Senior Vice President - Investments",
      companyRole: "Quarter Realty Capital",
      experienceYears: 14,
      reraRegNo: "MahaRERA: A51900031890",
      bio: "Specializing in ultra-luxury developments across Worli, Bandra, and Malabar Hill, Rajeshwar provides analytical valuation guidance and discreet transaction management.",
      phone1: "+91 (22) 6845 6770",
      phone2: "+91 98199 45210",
      email: "rajeshwar@quarter-mumbai.com",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "agent-3",
      name: "Ananya Deshmukh",
      title: "Principal Residential Consultant",
      companyRole: "Quarter Private Client Advisory",
      experienceYears: 11,
      reraRegNo: "MahaRERA: A51900045612",
      bio: "Ananya heads NRI client relations and bespoke portfolio acquisitions, delivering end-to-end bespoke concierge services for discerning homebuyers globally.",
      phone1: "+91 (22) 6845 6771",
      phone2: "+91 98205 77890",
      email: "ananya@quarter-mumbai.com",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Cantilevered Glass Balconies",
      category: "Exterior",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      caption: "Distinctive geometric cuboid balconies crafted with marine-grade acoustic glazing overlooking the coastline."
    },
    {
      id: "gal-2",
      title: "Curtain-Wall Glass Facade",
      category: "Exterior",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      caption: "Triple-glazed UV-treated facade engineered to maximize natural daylight while insulating from coastal elements."
    },
    {
      id: "gal-3",
      title: "Grand Entrance Portico",
      category: "Exterior",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      caption: "Double-height driveway portico with water cascade, valet reception, and 24/7 security checkpoint."
    },
    {
      id: "gal-4",
      title: "Arabian Sea Viewing Deck",
      category: "Views",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      caption: "Bespoke 220 sq.ft private outdoor sundeck offering unobstructed golden-hour ocean horizons."
    },
    {
      id: "gal-5",
      title: "Master Suite Sanctuary",
      category: "Interior",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      caption: "Custom Italian herringbone oak timber flooring, motorized drapery, and acoustic insulation."
    },
    {
      id: "gal-6",
      title: "European Gourmet Kitchen",
      category: "Interior",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      caption: "Integrated Poliform wet & dry kitchens equipped with Sub-Zero refrigeration and Miele smart appliances."
    }
  ]
};

export const sampleInitialLeads: InquiryLead[] = [
  {
    id: "lead-101",
    name: "Dr. Cyrus Mistry",
    phone: "+91 98201 11223",
    email: "cyrus.mistry@pedderroadclinic.com",
    message: "Interested in the 4 BHK Royal Horizon high-floor unit. Please share floor plan booklet and schedule a site visit this Saturday.",
    source: "About Section Form",
    interestedUnit: "TYPE B (4 BHK)",
    createdAt: "2026-11-15 11:30 AM",
    status: "Meeting Scheduled"
  },
  {
    id: "lead-102",
    name: "Roshni Singhania",
    phone: "+91 98110 99887",
    email: "roshni@singhaniagroup.in",
    message: "Requesting details on duplex penthouse configuration and car parking allocations.",
    source: "Hero Quick Inquiry",
    interestedUnit: "TYPE C (5 BHK Duplex)",
    createdAt: "2026-11-16 09:15 AM",
    status: "New"
  }
];

