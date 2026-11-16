import React, { useState } from 'react';
import {
  X,
  Settings,
  Building,
  BarChart2,
  Layers,
  Users,
  MapPin,
  Inbox,
  Database,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Plus,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FloorPlan, Agent } from '../types';

export const CMSDrawer: React.FC = () => {
  const {
    content,
    leads,
    isCmsOpen,
    setIsCmsOpen,
    activeTab,
    setActiveTab,
    updateProjectDetails,
    updateStats,
    updateLocation,
    updateFloorPlan,
    addFloorPlan,
    deleteFloorPlan,
    updateAgent,
    addAgent,
    deleteAgent,
    updateLeadStatus,
    deleteLead,
    resetToDefaults,
    exportJSON,
    importJSON,
    showToast
  } = useCMS();

  // Local state for forms
  const [projectForm, setProjectForm] = useState(content.project);
  const [statsForm, setStatsForm] = useState(content.stats);
  const [locationForm, setLocationForm] = useState(content.location);
  const [jsonInput, setJsonInput] = useState('');

  // Sync forms when content changes
  React.useEffect(() => {
    setProjectForm(content.project);
    setStatsForm(content.stats);
    setLocationForm(content.location);
  }, [content]);

  if (!isCmsOpen) {
    return (
      /* Floating Persistent CMS Launcher Pill */
      <button
        type="button"
        onClick={() => setIsCmsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#18222b] hover:bg-brand-cyan text-white px-4 py-3 rounded-full shadow-2xl border border-brand-cyan/40 hover:border-white transition-all flex items-center space-x-2 group hover:scale-105 active:scale-95"
        title="Open Real Estate Dealer CMS Panel"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
        <Settings className="w-4 h-4 text-brand-cyan group-hover:text-white transition-colors group-hover:rotate-90 duration-300" />
        <span className="text-xs font-semibold tracking-wider font-sans">CMS Editor</span>
        {leads.filter(l => l.status === 'New').length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-brand-cyan text-white text-[10px] font-bold">
            {leads.filter(l => l.status === 'New').length} Leads
          </span>
        )}
      </button>
    );
  }

  const exportLeadsCSV = () => {
    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Source', 'Interested Unit', 'Status', 'Timestamp', 'Message'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.source}"`,
      `"${l.interestedUnit || 'General'}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quarter-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported to CSV');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Sliding Drawer Container */}
      <div className="w-full max-w-2xl bg-[#18222b] text-white h-full flex flex-col shadow-2xl border-l border-white/10 animate-slideLeft">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-[#141c23] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-medium tracking-wide text-white">
                  Dealer CMS Live Control
                </h3>
                <span className="text-[10px] font-mono bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded border border-brand-cyan/30">
                  MUMBAI
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Real-time frontend state editor • Instant updates across landing page
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCmsOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close CMS"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#1a2530] border-b border-white/10 px-4 flex items-center space-x-1 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'project', label: 'Project Info', icon: Building },
            { id: 'stats', label: 'Key Stats', icon: BarChart2 },
            { id: 'floorplans', label: 'Floor Plans', icon: Layers },
            { id: 'agents', label: 'Advisors', icon: Users },
            { id: 'location', label: 'Location', icon: MapPin },
            { id: 'leads', label: `Inquiries (${leads.length})`, icon: Inbox },
            { id: 'gallery', label: 'Data & Backup', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 py-3 px-3 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-brand-cyan text-brand-cyan bg-white/5 font-semibold'
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-gray-200">
          
          {/* TAB 1: PROJECT DETAILS */}
          {activeTab === 'project' && (
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">General Project Branding</h4>
                  <p className="text-[11px] text-gray-400">Controls the hero headlines, price kicker, and hotline.</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateProjectDetails(projectForm)}
                  className="px-3 py-1.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={projectForm.brandName}
                    onChange={(e) => setProjectForm({ ...projectForm, brandName: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={projectForm.tagline}
                    onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={projectForm.projectName}
                    onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Location Tag</label>
                  <input
                    type="text"
                    value={projectForm.locationTag}
                    onChange={(e) => setProjectForm({ ...projectForm, locationTag: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Hotline Display Number</label>
                  <input
                    type="text"
                    value={projectForm.hotlineFormatted}
                    onChange={(e) => setProjectForm({ ...projectForm, hotlineFormatted: e.target.value, hotlinePhone: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={projectForm.startingPrice}
                    onChange={(e) => setProjectForm({ ...projectForm, startingPrice: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">MahaRERA Project Number</label>
                  <input
                    type="text"
                    value={projectForm.reraNumber}
                    onChange={(e) => setProjectForm({ ...projectForm, reraNumber: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Channel Partner RERA Number</label>
                  <input
                    type="text"
                    value={projectForm.agentReraNumber}
                    onChange={(e) => setProjectForm({ ...projectForm, agentReraNumber: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">About Project Lead Quote</label>
                <textarea
                  rows={2}
                  value={projectForm.aboutLead}
                  onChange={(e) => setProjectForm({ ...projectForm, aboutLead: e.target.value })}
                  className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Hero Background Image URL</label>
                <input
                  type="text"
                  value={projectForm.heroBgUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, heroBgUrl: e.target.value })}
                  className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => updateProjectDetails(projectForm)}
                  className="w-full py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-bold uppercase tracking-wider"
                >
                  Save & Apply All Project Details
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KEY STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Circular Key Stats</h4>
                  <p className="text-[11px] text-gray-400">Displays the 4 circular metrics in Section 3.</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateStats(statsForm)}
                  className="px-3 py-1.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Stats</span>
                </button>
              </div>

              <div className="space-y-3">
                {statsForm.map((stat, idx) => (
                  <div key={stat.id} className="p-3 bg-[#141c23] border border-white/10 rounded grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].value = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Unit</label>
                      <input
                        type="text"
                        value={stat.unit}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].unit = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].label = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white uppercase font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Description</label>
                      <input
                        type="text"
                        value={stat.description || ''}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].description = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => updateStats(statsForm)}
                className="w-full py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-bold uppercase tracking-wider"
              >
                Save Stats
              </button>
            </div>
          )}

          {/* TAB 3: FLOOR PLANS */}
          {activeTab === 'floorplans' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h4 className="font-semibold text-white">Apartment Configurations</h4>
                  <p className="text-[11px] text-gray-400">Edit dimensions, bedrooms, and pricing for each layout.</p>
                </div>
              </div>

              {content.floorPlans.map((plan) => (
                <div key={plan.id} className="p-4 bg-[#141c23] border border-white/10 rounded space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-brand-cyan uppercase tracking-wider">
                      {plan.typeCode} • {plan.title}
                    </span>
                    <span className="font-mono text-gray-400">{plan.priceEstimate}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block">Area (Sq. Mtr)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={plan.areaSqMeters}
                        onChange={(e) => updateFloorPlan({ ...plan, areaSqMeters: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Area (Sq. Ft)</label>
                      <input
                        type="number"
                        value={plan.areaSqFt}
                        onChange={(e) => updateFloorPlan({ ...plan, areaSqFt: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">RERA Carpet (Sq. Ft)</label>
                      <input
                        type="number"
                        value={plan.carpetAreaSqFt}
                        onChange={(e) => updateFloorPlan({ ...plan, carpetAreaSqFt: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Price Estimate</label>
                      <input
                        type="text"
                        value={plan.priceEstimate}
                        onChange={(e) => updateFloorPlan({ ...plan, priceEstimate: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Bedrooms</label>
                      <input
                        type="number"
                        value={plan.bedrooms}
                        onChange={(e) => updateFloorPlan({ ...plan, bedrooms: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Bathrooms</label>
                      <input
                        type="number"
                        value={plan.bathrooms}
                        onChange={(e) => updateFloorPlan({ ...plan, bathrooms: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Car Parking Bays</label>
                      <input
                        type="number"
                        value={plan.parkingSpaces}
                        onChange={(e) => updateFloorPlan({ ...plan, parkingSpaces: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Facing Orientation</label>
                      <input
                        type="text"
                        value={plan.facing}
                        onChange={(e) => updateFloorPlan({ ...plan, facing: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={plan.description}
                      onChange={(e) => updateFloorPlan({ ...plan, description: e.target.value })}
                      className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ADVISORS & AGENTS */}
          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h4 className="font-semibold text-white">Private Client Advisors</h4>
                  <p className="text-[11px] text-gray-400">Edit agent details, credentials, and contact channels.</p>
                </div>
              </div>

              {content.agents.map((agent) => (
                <div key={agent.id} className="p-4 bg-[#141c23] border border-white/10 rounded space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={agent.photoUrl} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h5 className="font-bold text-white">{agent.name}</h5>
                      <span className="text-[11px] text-brand-cyan">{agent.title}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block">Full Name</label>
                      <input
                        type="text"
                        value={agent.name}
                        onChange={(e) => updateAgent({ ...agent, name: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Title / Designation</label>
                      <input
                        type="text"
                        value={agent.title}
                        onChange={(e) => updateAgent({ ...agent, title: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">MahaRERA Cert Number</label>
                      <input
                        type="text"
                        value={agent.reraRegNo}
                        onChange={(e) => updateAgent({ ...agent, reraRegNo: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Experience (Years)</label>
                      <input
                        type="number"
                        value={agent.experienceYears}
                        onChange={(e) => updateAgent({ ...agent, experienceYears: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Direct Line 1</label>
                      <input
                        type="text"
                        value={agent.phone1}
                        onChange={(e) => updateAgent({ ...agent, phone1: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block">Mobile / WhatsApp 2</label>
                      <input
                        type="text"
                        value={agent.phone2}
                        onChange={(e) => updateAgent({ ...agent, phone2: e.target.value })}
                        className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block">Email</label>
                    <input
                      type="email"
                      value={agent.email}
                      onChange={(e) => updateAgent({ ...agent, email: e.target.value })}
                      className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block">Photo URL</label>
                    <input
                      type="text"
                      value={agent.photoUrl}
                      onChange={(e) => updateAgent({ ...agent, photoUrl: e.target.value })}
                      className="w-full bg-[#10171e] border border-white/15 rounded p-1.5 text-white text-[11px] font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: LOCATION & TRANSIT */}
          {activeTab === 'location' && (
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Location & Landmarks</h4>
                  <p className="text-[11px] text-gray-400">Worli Sea Face address and driving times.</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateLocation(locationForm)}
                  className="px-3 py-1.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Location</span>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 block mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={locationForm.heading}
                    onChange={(e) => setLocationForm({ ...locationForm, heading: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={locationForm.description}
                    onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Address Line 1</label>
                  <input
                    type="text"
                    value={locationForm.addressLine1}
                    onChange={(e) => setLocationForm({ ...locationForm, addressLine1: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">City & Postal</label>
                  <input
                    type="text"
                    value={locationForm.cityPostal}
                    onChange={(e) => setLocationForm({ ...locationForm, cityPostal: e.target.value })}
                    className="w-full bg-[#121920] border border-white/15 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => updateLocation(locationForm)}
                  className="w-full py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-bold uppercase tracking-wider"
                >
                  Save Location Info
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: INQUIRIES & LEADS MANAGER */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    Inquiries & Leads Manager ({leads.length})
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Live capture of inquiries submitted across landing page forms.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportLeadsCSV}
                  className="px-3 py-1.5 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded text-xs font-semibold flex items-center space-x-1 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-white/5 rounded border border-white/10">
                  <Inbox className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p>No inquiries submitted yet. Submit through any form to see real-time capture.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-[#141c23] border border-white/10 rounded-sm space-y-2 hover:border-brand-cyan/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">{lead.name}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              lead.status === 'New'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : lead.status === 'Meeting Scheduled'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-gray-700 text-gray-300'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {lead.createdAt} • Source: {lead.source}
                          </span>
                        </div>

                        {/* Status Switcher & Delete */}
                        <div className="flex items-center space-x-1.5">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="bg-[#10171e] text-[11px] text-brand-cyan border border-white/15 rounded px-2 py-1 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Meeting Scheduled">Meeting Scheduled</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 text-gray-500 hover:text-red-400"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Info Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center space-x-1 px-2 py-1 rounded bg-white/5 hover:bg-brand-cyan/20 text-white font-mono"
                        >
                          <Phone className="w-3 h-3 text-brand-cyan" />
                          <span>{lead.phone}</span>
                        </a>
                        {lead.email && lead.email !== 'Not provided' && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center space-x-1 px-2 py-1 rounded bg-white/5 hover:bg-brand-cyan/20 text-gray-300 font-sans"
                          >
                            <Mail className="w-3 h-3 text-brand-cyan" />
                            <span>{lead.email}</span>
                          </a>
                        )}
                        {lead.interestedUnit && (
                          <span className="px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                            Unit: {lead.interestedUnit}
                          </span>
                        )}
                      </div>

                      {lead.message && (
                        <p className="text-xs text-gray-300 bg-[#10171e] p-2.5 rounded border border-white/5 italic">
                          &ldquo;{lead.message}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: DATA & BACKUP */}
          {activeTab === 'gallery' && (
            <div className="space-y-5">
              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-2">
                <h4 className="font-semibold text-white">Export CMS Configuration</h4>
                <p className="text-gray-400 text-[11px]">
                  Download a JSON snapshot of all your edited text, floor plans, agents, and captured leads.
                </p>
                <button
                  type="button"
                  onClick={exportJSON}
                  className="px-4 py-2 bg-brand-cyan hover:bg-brand-cyanHover text-white rounded font-semibold flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CMS JSON File</span>
                </button>
              </div>

              <div className="p-4 bg-white/5 rounded border border-white/10 space-y-2">
                <h4 className="font-semibold text-white">Import Configuration JSON</h4>
                <p className="text-gray-400 text-[11px]">
                  Paste a previously exported JSON configuration to instantly restore or switch dealer profiles.
                </p>
                <textarea
                  rows={3}
                  placeholder="Paste JSON content here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full bg-[#10171e] border border-white/15 rounded p-2 text-white font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (importJSON(jsonInput)) setJsonInput('');
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-semibold flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4 text-brand-cyan" />
                  <span>Import JSON Now</span>
                </button>
              </div>

              <div className="p-4 bg-red-950/30 rounded border border-red-500/20 space-y-2">
                <h4 className="font-semibold text-red-300">Factory Reset</h4>
                <p className="text-gray-400 text-[11px]">
                  Revert all texts, stats, floor plans, and agents back to the default Mumbai flagship project defaults.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all CMS customizations back to initial defaults?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded font-semibold flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Dealership Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Bar */}
        <div className="p-3 bg-[#141c23] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <span>Active Dealership: Worli Sea Face, Mumbai</span>
          <button
            type="button"
            onClick={() => setIsCmsOpen(false)}
            className="text-brand-cyan hover:underline font-semibold"
          >
            Close & Return to Live Site
          </button>
        </div>

      </div>
    </div>
  );
};

