import React from 'react';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { LocationSection } from './components/LocationSection';
import { GallerySection } from './components/GallerySection';
import { ApartmentsSection } from './components/ApartmentsSection';
import { AgentsSection } from './components/AgentsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CMSDrawer } from './components/CMSDrawer';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { Toast } from './components/Toast';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Quarter UI Caught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#18222b] text-white p-6 text-center">
          <div className="max-w-md bg-[#141c23] p-8 rounded-sm border border-brand-cyan/40 shadow-2xl space-y-4">
            <h2 className="font-serif text-2xl text-white">Temporary Interface Refresh Required</h2>
            <p className="text-xs text-gray-300">
              A state synchronization update occurred. Click below to reload the real estate portal.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('quarter_mumbai_cms_content_v2');
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white text-xs font-bold rounded uppercase tracking-wider"
            >
              Reset & Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#18222b] font-sans antialiased">
      {/* Top Fixed Luxury Navigation Bar */}
      <Navbar />

      {/* Main Sections matching reference layout with 100vh presence */}
      <main className="flex-grow">
        {/* Section 1: Hero (100vh) */}
        <Hero />

        {/* Section 2: About The Project + Quick Inquiry Card (100vh) */}
        <AboutSection />

        {/* Section 3: Key Numbers Circular Badges Banner (100vh) */}
        <StatsSection />

        {/* Section 4: Location & Interactive Mumbai Coastal Map (100vh) */}
        <LocationSection />

        {/* Section 5: Architectural Gallery Mosaic (100vh) */}
        <GallerySection />

        {/* Section 6: Apartments & Interactive CAD Floor Plans (100vh) */}
        <ApartmentsSection />

        {/* Section 7: MahaRERA Certified Luxury Agents (100vh) */}
        <AgentsSection />

        {/* Section 8: Main Contact Us Form (100vh) */}
        <ContactSection />
      </main>

      {/* Section 9: Slate Dark Footer */}
      <Footer />

      {/* In-Page CMS Editor Drawer */}
      <CMSDrawer />

      {/* VIP Private Site Visit Scheduler Modal */}
      <ScheduleTourModal />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </ErrorBoundary>
  );
};

export default App;
