import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, InquiryLead, ProjectDetails, StatItem, LocationInfo, FloorPlan, Agent, GalleryItem } from '../types';
import { initialSiteContent, sampleInitialLeads } from '../data/initialContent';

const STORAGE_KEY_CONTENT = 'quarter_mumbai_cms_content_v2';
const STORAGE_KEY_LEADS = 'quarter_mumbai_cms_leads_v2';

interface CMSContextType {
  content: SiteContent;
  leads: InquiryLead[];
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  activeTab: 'project' | 'stats' | 'floorplans' | 'agents' | 'location' | 'gallery' | 'leads';
  setActiveTab: (tab: 'project' | 'stats' | 'floorplans' | 'agents' | 'location' | 'gallery' | 'leads') => void;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (open: boolean) => void;
  selectedUnitForSchedule: string;
  setSelectedUnitForSchedule: (unit: string) => void;
  updateProjectDetails: (partial: Partial<ProjectDetails>) => void;
  updateStats: (newStats: StatItem[]) => void;
  updateLocation: (newLocation: Partial<LocationInfo>) => void;
  updateFloorPlan: (updatedPlan: FloorPlan) => void;
  addFloorPlan: (newPlan: FloorPlan) => void;
  deleteFloorPlan: (id: string) => void;
  updateAgent: (updatedAgent: Agent) => void;
  addAgent: (newAgent: Agent) => void;
  deleteAgent: (id: string) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  submitInquiry: (leadData: Omit<InquiryLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: InquiryLead['status']) => void;
  deleteLead: (id: string) => void;
  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load CMS content from storage', e);
    }
    return initialSiteContent;
  });

  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load leads from storage', e);
    }
    return sampleInitialLeads;
  });

  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'project' | 'stats' | 'floorplans' | 'agents' | 'location' | 'gallery' | 'leads'>('project');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedUnitForSchedule, setSelectedUnitForSchedule] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content', e);
    }
  }, [content]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads', e);
    }
  }, [leads]);

  const updateProjectDetails = (partial: Partial<ProjectDetails>) => {
    setContent(prev => ({
      ...prev,
      project: { ...prev.project, ...partial }
    }));
    showToast('Project details updated successfully');
  };

  const updateStats = (newStats: StatItem[]) => {
    setContent(prev => ({
      ...prev,
      stats: newStats
    }));
    showToast('Key statistics updated');
  };

  const updateLocation = (newLocation: Partial<LocationInfo>) => {
    setContent(prev => ({
      ...prev,
      location: { ...prev.location, ...newLocation }
    }));
    showToast('Location information updated');
  };

  const updateFloorPlan = (updatedPlan: FloorPlan) => {
    setContent(prev => ({
      ...prev,
      floorPlans: prev.floorPlans.map(p => p.id === updatedPlan.id ? updatedPlan : p)
    }));
    showToast(`Floor plan ${updatedPlan.typeCode} updated`);
  };

  const addFloorPlan = (newPlan: FloorPlan) => {
    setContent(prev => ({
      ...prev,
      floorPlans: [...prev.floorPlans, newPlan]
    }));
    showToast(`New floor plan ${newPlan.typeCode} added`);
  };

  const deleteFloorPlan = (id: string) => {
    setContent(prev => ({
      ...prev,
      floorPlans: prev.floorPlans.filter(p => p.id !== id)
    }));
    showToast('Floor plan removed');
  };

  const updateAgent = (updatedAgent: Agent) => {
    setContent(prev => ({
      ...prev,
      agents: prev.agents.map(a => a.id === updatedAgent.id ? updatedAgent : a)
    }));
    showToast(`Agent ${updatedAgent.name} updated`);
  };

  const addAgent = (newAgent: Agent) => {
    setContent(prev => ({
      ...prev,
      agents: [...prev.agents, newAgent]
    }));
    showToast(`New agent ${newAgent.name} added`);
  };

  const deleteAgent = (id: string) => {
    setContent(prev => ({
      ...prev,
      agents: prev.agents.filter(a => a.id !== id)
    }));
    showToast('Agent removed');
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.map(item => item.id === id ? { ...item, ...updated } : item)
    }));
    showToast('Gallery image updated');
  };

  const submitInquiry = (leadData: Omit<InquiryLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: InquiryLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      status: 'New'
    };
    setLeads(prev => [newLead, ...prev]);
    showToast('Inquiry received! Our luxury advisor will contact you within 15 minutes.');
  };

  const updateLeadStatus = (id: string, status: InquiryLead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast(`Lead status updated to ${status}`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Lead entry deleted');
  };

  const resetToDefaults = () => {
    setContent(initialSiteContent);
    setLeads(sampleInitialLeads);
    localStorage.removeItem(STORAGE_KEY_CONTENT);
    localStorage.removeItem(STORAGE_KEY_LEADS);
    showToast('Restored original dealership defaults', 'info');
  };

  const exportJSON = () => {
    const data = {
      content,
      leads,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quarter-mumbai-cms-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CMS configuration exported to JSON');
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.content && parsed.content.project) {
        setContent(parsed.content);
        if (parsed.leads && Array.isArray(parsed.leads)) {
          setLeads(parsed.leads);
        }
        showToast('CMS configuration imported successfully');
        return true;
      }
      throw new Error('Invalid schema');
    } catch (e) {
      showToast('Failed to import JSON: Invalid file format', 'error');
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        leads,
        isCmsOpen,
        setIsCmsOpen,
        activeTab,
        setActiveTab,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        selectedUnitForSchedule,
        setSelectedUnitForSchedule,
        updateProjectDetails,
        updateStats,
        updateLocation,
        updateFloorPlan,
        addFloorPlan,
        deleteFloorPlan,
        updateAgent,
        addAgent,
        deleteAgent,
        updateGalleryItem,
        submitInquiry,
        updateLeadStatus,
        deleteLead,
        resetToDefaults,
        exportJSON,
        importJSON,
        toast,
        showToast
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

