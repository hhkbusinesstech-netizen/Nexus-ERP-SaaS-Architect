
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Download, 
  ShieldCheck, 
  Factory, 
  Store, 
  Truck, 
  LayoutGrid, 
  Settings, 
  Puzzle, 
  Layers, 
  Cpu, 
  Database, 
  Zap, 
  Workflow,
  Search,
  X,
  CheckCircle2,
  Users,
  Building2,
  ChevronDown,
  Loader2,
  MoreVertical,
  Eye,
  Heart,
  Plus,
  Info,
  CheckSquare,
  Square,
  ArrowRight,
  Terminal,
  ChevronRight,
  Package,
  ExternalLink,
  BookOpen,
  Globe,
  CreditCard,
  BarChart3,
  ShieldAlert,
  History,
  Activity,
  GitBranch,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  Filter,
  Check
} from 'lucide-react';
import { MarketplaceModule, Tenant, ChangelogEntry } from '../types';

// Extended type for mock data internal to this component
interface ExtendedMarketplaceModule extends MarketplaceModule {
  longDescription: string;
  features: string[];
  developer: string;
  installCount: string;
  documentationUrl: string;
}

const generateRandomInstalls = () => {
  const num = (Math.random() * (10 - 1) + 1).toFixed(1);
  return `${num}k`;
};

const modules: ExtendedMarketplaceModule[] = [
  { 
    id: '1', 
    name: 'Nexus Manufacturing Pro', 
    categories: ['vertical', 'integration'], 
    description: 'Advanced OEE tracking, IoT integration, and multi-level BOM management for complex factory environments.', 
    longDescription: 'Nexus Manufacturing Pro is the ultimate suite for modern factories. It bridges the gap between shop-floor hardware and top-floor decision making. Features native support for Modbus and MQTT protocols, allowing real-time telemetry directly into your ERPNext instance.',
    features: ['Real-time OEE Dashboards', 'Multi-level BOM Visualizer', 'IoT Device Gateway', 'Predictive Maintenance Alerts'],
    changelog: [
      { version: 'v15.2.0', date: '2024-03-15', changes: ['Added MQTT broker support', 'Improved BOM loading speeds', 'Security patch for telemetry streams'] },
      { version: 'v15.1.5', date: '2024-02-10', changes: ['Fixed OEE calculation edge case', 'Optimized database indexing for job cards'] }
    ],
    price: 149, 
    rating: 4.9, 
    icon: 'factory',
    version: 'v15.2.0',
    developer: 'Nexus Core Team',
    installCount: generateRandomInstalls(),
    documentationUrl: 'https://frappe.io/docs/v15/user/en/manufacturing'
  },
  { 
    id: '7', 
    name: 'Nexus Treasury & Finance', 
    categories: ['vertical', 'utility'], 
    description: 'Advanced multi-currency consolidation, automated tax reporting, and liquidity forecasting.', 
    longDescription: 'The definitive financial engine for Nexus. Handles complex inter-company transactions and provides real-time consolidated financial statements across all your global entities.',
    features: ['Inter-company Consolidation', 'Liquidity Forecasting', 'Automated VAT/GST returns', 'Fixed Asset Lifecycle'],
    changelog: [
      { version: 'v15.4.2', date: '2024-04-01', changes: ['Enhanced Cash Flow projection AI', 'New IFRS compliance module', 'Performance boost for large ledger exports'] }
    ],
    price: 199, 
    rating: 5.0, 
    icon: 'credit-card',
    version: 'v15.4.2',
    developer: 'Nexus Core Team',
    installCount: '12.4k',
    documentationUrl: 'https://docs.erpnext.com/docs/v15/user/manual/en/accounts'
  },
  { 
    id: '2', 
    name: 'Omni Retail Plus', 
    categories: ['vertical'], 
    description: 'Unified POS for multi-store networks with real-time inventory sync and offline-first capabilities.', 
    longDescription: 'Manage thousands of retail outlets from a single pane of glass. Omni Retail Plus handles complex tax rules across regions and synchronized inventory pools.',
    features: ['Offline-First POS', 'Regional Tax Auto-Calc', 'Global Inventory Sync'],
    changelog: [
      { version: 'v15.0.4', date: '2024-01-20', changes: ['Initial V15 release', 'Added support for offline credit card processing'] }
    ],
    price: 99, 
    rating: 4.8, 
    icon: 'store',
    version: 'v15.0.4',
    developer: 'Nexus Core Team',
    installCount: generateRandomInstalls(),
    documentationUrl: 'https://docs.erpnext.com/docs/v15/user/manual/en/retail'
  },
  { 
    id: '8', 
    name: 'Nexus HCM Elite', 
    categories: ['vertical'], 
    description: 'Global payroll, employee benefits administration, and performance management at scale.', 
    longDescription: 'Manage your global workforce with confidence. Nexus HCM Elite automates payroll processing across 50+ countries with local tax compliance baked in.',
    features: ['Multi-country Payroll', 'Self-service Benefits', 'OKRs & Performance Reviews', 'Shift Scheduling'],
    changelog: [
      { version: 'v15.3.1', date: '2024-03-22', changes: ['Added Japan Tax localized pack', 'Updated 2024 EU labor law compliance checks'] }
    ],
    price: 129, 
    rating: 4.7, 
    icon: 'users',
    version: 'v15.3.1',
    developer: 'Nexus Core Team',
    installCount: '8.1k',
    documentationUrl: 'https://docs.erpnext.com/docs/v15/user/manual/en/human-resources'
  },
  { 
    id: '3', 
    name: 'Logistics Core', 
    categories: ['vertical', 'utility'], 
    description: 'Fleet management, driver apps, and automated routing for ERPNext, reducing delivery times.', 
    longDescription: 'Streamline your delivery operations. This module provides a native mobile app for drivers and real-time GPS tracking for dispatchers.',
    features: ['AI Route Optimization', 'Driver Companion App', 'Fuel Tracking'],
    changelog: [
      { version: 'v14.8.2', date: '2023-11-05', changes: ['Legacy bridge support', 'Improved GPS polling frequency'] }
    ],
    price: 199, 
    rating: 4.7, 
    icon: 'truck',
    version: 'v14.8.2',
    developer: 'LogiTech Systems',
    installCount: generateRandomInstalls(),
    documentationUrl: 'https://docs.erpnext.com/docs/v15/user/manual/en/stock/delivery-note'
  },
  { 
    id: '4', 
    name: 'Stripe Direct Connect', 
    categories: ['utility', 'integration'], 
    description: 'Native payment integration with automated ledger reconciliation and dispute handling.', 
    longDescription: 'The most robust Stripe integration for ERPNext. Automates the entire accounting lifecycle, from payment intent to ledger entry.',
    features: ['Automated Reconciliation', 'Subscription Billing Sync', 'Multi-currency Support'],
    changelog: [
      { version: 'v1.4.1', date: '2024-02-28', changes: ['Webhook reliability fix', 'Support for Stripe Connect regional platforms'] }
    ],
    price: 0, 
    rating: 5.0, 
    icon: 'credit-card',
    version: 'v1.4.1',
    developer: 'Nexus Core Team',
    installCount: generateRandomInstalls(),
    documentationUrl: 'https://docs.erpnext.com/docs/v15/user/manual/en/erpnext_integration/stripe-integration'
  }
];

const mockTenants: Partial<Tenant>[] = [
  { id: '1', name: 'Acme Manufacturing', subdomain: 'acme.nexus.erp' },
  { id: '2', name: 'Global Retailers', subdomain: 'global.nexus.erp' },
  { id: '3', name: 'Tech Services Inc', subdomain: 'tech.nexus.erp' },
];

const INSTALL_STEPS = [
  { label: "Resolving app dependencies...", threshold: 0 },
  { label: "Initializing bench task environment...", threshold: 15 },
  { label: "Fetching secure artifacts from registry...", threshold: 30 },
  { label: "Cloning application repositories...", threshold: 45 },
  { label: "Running multi-tenant migrations...", threshold: 65 },
  { label: "Building optimized static assets...", threshold: 80 },
  { label: "Restarting site workers...", threshold: 95 }
];

const LOCAL_STORAGE_KEY = 'nexus_marketplace_favorites';

const CATEGORIES = [
  { id: 'vertical', label: 'Verticals', icon: Factory },
  { id: 'utility', label: 'Utilities', icon: Settings },
  { id: 'integration', label: 'Integrations', icon: Puzzle },
];

export const Marketplace: React.FC = () => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<ExtendedMarketplaceModule | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [targetTenantId, setTargetTenantId] = useState(mockTenants[0].id);
  const [selectedModulesForInstall, setSelectedModulesForInstall] = useState<string[]>([]);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState("");
  const [installLogs, setInstallLogs] = useState<{timestamp: string, level: string, message: string}[]>([]);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [installLogs]);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFavorites = !showFavoritesOnly || favorites.includes(m.id);
    
    const matchesCategory = selectedCategories.length === 0 || 
                            m.categories.some(cat => selectedCategories.includes(cat));

    return matchesSearch && matchesFavorites && matchesCategory;
  });

  const handleOpenInstallModal = (e: React.MouseEvent, mod: ExtendedMarketplaceModule) => {
    e.stopPropagation();
    setSelectedModulesForInstall([mod.id]);
    setIsInstallModalOpen(true);
    setInstallSuccess(false);
    setInstallProgress(0);
    setInstallLogs([]);
  };

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (e: React.MouseEvent, mod: ExtendedMarketplaceModule) => {
    e.stopPropagation();
    setSelectedModule(mod);
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId) 
        : [...prev, catId]
    );
  };

  const executeInstallation = () => {
    setIsInstalling(true);
    setInstallProgress(0);
    const tenantName = mockTenants.find(t => t.id === targetTenantId)?.subdomain;
    
    setInstallLogs([
      { timestamp: getTimestamp(), level: 'INFO', message: `Nexus Provisioner initializing for target site: ${tenantName}` },
      { timestamp: getTimestamp(), level: 'INFO', message: `Verifying bench environment health...` },
      { timestamp: getTimestamp(), level: 'INFO', message: `Establishing secure SSH tunnel to orchestrator node...` }
    ]);
    
    let currentP = 0;
    const interval = setInterval(() => {
      currentP += Math.random() * 8 + 3;
      if (currentP >= 100) {
        currentP = 100;
        setInstallProgress(100);
        clearInterval(interval);
        
        setInstallLogs(prev => [
          ...prev, 
          { timestamp: getTimestamp(), level: 'INFO', message: 'Warming cache for high-availability workers...' },
          { timestamp: getTimestamp(), level: 'SUCCESS', message: 'Deployment verified. Site routing updated.' }
        ]);
        
        setTimeout(() => {
          setIsInstalling(false);
          setInstallSuccess(true);
          setTimeout(() => {
            setIsInstallModalOpen(false);
            setInstallSuccess(false);
          }, 3000);
        }, 1000);
      } else {
        setInstallProgress(currentP);
        const step = [...INSTALL_STEPS].reverse().find(s => currentP >= s.threshold);
        
        if (step && step.label !== currentStepText) {
          setCurrentStepText(step.label);
          
          const newLogs = [{ timestamp: getTimestamp(), level: 'PROCESS', message: step.label }];
          
          if (Math.random() > 0.7) {
            newLogs.push({ 
              timestamp: getTimestamp(), 
              level: 'INFO', 
              message: `Worker node-${Math.random().toString(36).substr(2, 4)} acknowledged task.` 
            });
          }
          
          if (currentP > 40 && currentP < 50 && Math.random() > 0.5) {
            newLogs.push({ 
              timestamp: getTimestamp(), 
              level: 'WARN', 
              message: `Minor latency detected in artifact registry. Retrying fetch...` 
            });
          }

          if (currentP > 70 && currentP < 80 && Math.random() > 0.8) {
            newLogs.push({ 
              timestamp: getTimestamp(), 
              level: 'ERROR', 
              message: `Connection timeout on worker node 04. Switching to failover...` 
            });
            newLogs.push({ 
              timestamp: getTimestamp(), 
              level: 'INFO', 
              message: `Failover successful. Resuming migration.` 
            });
          }

          setInstallLogs(prev => [...prev, ...newLogs]);
        }
      }
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Nexus App Marketplace</h2>
          <p className="text-indigo-100 opacity-90 mb-6 leading-relaxed">
            Provision specialized, governed ERPNext modules to your sites instantly. 
            Automated bench orchestration and multi-site dependency management built-in.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2">
              Explore Featured <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <ShoppingBag className="absolute -right-12 -bottom-12 w-64 h-64 text-indigo-500 opacity-20 rotate-12" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Favorites Filter */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all rounded-xl relative ${
              showFavoritesOnly 
                ? 'bg-rose-600 text-white shadow-lg' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-rose-200 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
            {favorites.length > 0 && !showFavoritesOnly && (
              <span className="ml-1.5 px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-black rounded-full">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Multiselect Categories Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-bold transition-all rounded-xl border ${
                selectedCategories.length > 0 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              {selectedCategories.length === 0 
                ? 'All Categories' 
                : `${selectedCategories.length} Categories Selected`
              }
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Filter by Capabilities</span>
                </div>
                <div className="p-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          selectedCategories.includes(cat.id) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                        }`}>
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-bold ${selectedCategories.includes(cat.id) ? 'text-indigo-600' : 'text-slate-600'}`}>{cat.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        selectedCategories.includes(cat.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 bg-white'
                      }`}>
                        {selectedCategories.includes(cat.id) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-50 bg-slate-50/50 flex gap-2">
                  <button 
                    onClick={() => setSelectedCategories([])}
                    className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(catId => {
              const cat = CATEGORIES.find(c => c.id === catId);
              return (
                <span key={catId} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg border border-indigo-100 shadow-sm animate-in zoom-in duration-200">
                  {cat?.label}
                  <button onClick={() => toggleCategory(catId)} className="hover:text-indigo-800 p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {searchQuery && (
            <span className="hidden md:inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg border border-slate-200 animate-in zoom-in duration-200">
              {filteredModules.length} Results
            </span>
          )}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-300 text-sm shadow-sm transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map((mod) => (
            <div 
              key={mod.id} 
              onClick={(e) => handleViewDetails(e, mod)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer active:scale-[0.98] relative overflow-hidden min-h-[550px]"
            >
              <div className="mb-4 flex justify-between items-start relative">
                <ModuleIcon iconId={mod.icon} />
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleToggleFavorite(e, mod.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        favorites.includes(mod.id) 
                          ? 'bg-rose-50 text-rose-500 scale-110' 
                          : 'bg-slate-50 text-slate-300 hover:text-rose-400 hover:bg-rose-50/50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(mod.id) ? 'fill-current animate-pulse' : ''}`} />
                    </button>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                      {mod.categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!selectedCategories.includes(cat)) {
                              setSelectedCategories([...selectedCategories, cat]);
                            }
                          }}
                          className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-md border border-slate-100 tracking-tighter hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-md border border-indigo-100 shadow-sm">
                    <GitBranch className="w-3 h-3" />
                    {mod.version}
                  </span>
                </div>
              </div>
              
              <div className="mb-2 relative">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{mod.name}</h4>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">{mod.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                  <Users className="w-3 h-3" />
                  <span className="text-[10px] font-medium tracking-wide">{mod.installCount} installations</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 mb-6">
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {mod.description}
                </p>

                {/* Latest Changes Preview */}
                {mod.changelog && mod.changelog.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Latest in {mod.version}</span>
                    </div>
                    <ul className="space-y-1">
                      {mod.changelog[0].changes.slice(0, 2).map((change, idx) => (
                        <li key={idx} className="text-[10px] text-slate-500 flex items-start gap-1.5 leading-tight">
                          <div className="w-1 h-1 bg-indigo-300 rounded-full mt-1 flex-shrink-0" />
                          <span className="line-clamp-1">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting at</span>
                    <span className="text-sm font-black text-slate-800">
                      {mod.price === 0 ? 'FREE' : `$${mod.price}/mo`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-slate-300" />
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={(e) => handleOpenInstallModal(e, mod)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all text-xs font-bold shadow-lg shadow-indigo-100 group/btn active:scale-95"
                  >
                    <Download className="w-4 h-4 group-hover/btn:animate-bounce" />
                    Deploy App
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No matching apps found</h3>
            <button 
              onClick={() => { setShowFavoritesOnly(false); setSelectedCategories([]); setSearchQuery(''); }}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Detailed Module Modal */}
      {selectedModule && !isInstallModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="w-full md:w-80 bg-slate-50 p-10 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center text-center">
              <div className="mb-8 relative">
                <ModuleIcon iconId={selectedModule.icon} size="large" />
                <span className="absolute -bottom-2 -right-2 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-[11px] font-black border-4 border-white shadow-xl flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4" />
                  {selectedModule.version}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">{selectedModule.name}</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {selectedModule.categories.map((cat) => (
                   <span key={cat} className="text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                     {cat}
                   </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3 mb-10">
                <div className="flex items-center text-amber-500 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-bold">{selectedModule.rating}</span>
                </div>
                <div className="flex items-center text-slate-500 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">
                  <Users className="w-4 h-4" />
                  <span className="ml-1 text-sm font-bold">{selectedModule.installCount}</span>
                </div>
              </div>

              <div className="w-full space-y-4 mb-8 text-left border-y border-slate-200 py-8">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Package className="w-3.5 h-3.5" /> Version
                   </span>
                   <span className="text-xs font-black text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                     {selectedModule.version}
                   </span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Clock className="w-3.5 h-3.5" /> Release Date
                   </span>
                   <span className="text-xs font-black text-slate-700">{selectedModule.changelog[0].date}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <CreditCard className="w-3.5 h-3.5" /> Pricing
                   </span>
                   <span className="text-xs font-black text-slate-800">{selectedModule.price === 0 ? 'FREE' : `$${selectedModule.price}/mo`}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck className="w-3.5 h-3.5" /> Status
                   </span>
                   <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                     Stable
                   </span>
                </div>
              </div>

              <div className="w-full space-y-3 mt-auto">
                <a 
                  href={selectedModule.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-slate-700 border border-slate-200 py-4 rounded-2xl font-black text-sm shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group/ext-link"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  Documentation
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/ext-link:opacity-100 transition-all" />
                </a>
                <button 
                  onClick={(e) => handleOpenInstallModal(e, selectedModule)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  Install Module
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 relative custom-scrollbar">
              <button 
                onClick={() => setSelectedModule(null)}
                className="absolute right-8 top-8 p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-10"
              >
                <X className="w-7 h-7" />
              </button>

              <section className="mb-12">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                  <Info className="w-6 h-6 text-indigo-500" /> Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {selectedModule.longDescription}
                </p>
              </section>

              <section className="mb-12">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-amber-500" /> Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedModule.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-indigo-50/40 rounded-3xl border border-indigo-100/50 hover:bg-white hover:border-indigo-300 transition-all shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                  <History className="w-6 h-6 text-slate-400" /> Version History & Changelog
                </h3>
                <div className="space-y-6">
                  {selectedModule.changelog.map((log, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-slate-100 ml-4 pb-4">
                      <div className="absolute -left-2.5 top-0 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full" />
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group hover:border-indigo-200 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-black text-slate-800 flex items-center gap-2">
                             {log.version}
                             {i === 0 && (
                               <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase rounded-md tracking-widest border border-emerald-200">
                                 Latest
                               </span>
                             )}
                          </h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.date}</span>
                        </div>
                        <ul className="space-y-2">
                          {log.changes.map((change, ci) => (
                            <li key={ci} className="text-xs text-slate-500 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Installation Orchestrator Modal */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500 border border-slate-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-xl leading-none">Site Provisioning</h3>
                  <p className="text-slate-500 text-xs mt-1.5 flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3 h-3 text-slate-400" /> site-management orchestrator
                  </p>
                </div>
              </div>
              {!isInstalling && (
                <button 
                  onClick={() => setIsInstallModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="p-8 space-y-6">
              {installSuccess ? (
                <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-50">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-800 mb-2">Success! App Deployed.</h4>
                  <p className="text-slate-500 text-sm">Site has been migrated and version {selectedModule?.version} is active.</p>
                </div>
              ) : isInstalling ? (
                <div className="py-6 space-y-8 animate-in fade-in duration-300">
                   <div className="text-center">
                    <div className="w-16 h-16 relative flex items-center justify-center mx-auto mb-4">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                      </div>
                      <h4 className="text-xl font-black text-slate-800 mb-1">{currentStepText}</h4>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner mt-4">
                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${installProgress}%` }} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] shadow-2xl border border-slate-800 relative group overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                          </div>
                          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">nexus-provisioner-v3.sh</span>
                        </div>
                        
                        <div className="h-48 overflow-y-auto custom-scrollbar-dark pr-2 space-y-1.5 relative z-10">
                          {installLogs.map((log, i) => (
                            <div key={i} className="flex gap-3 group animate-in slide-in-from-left-1 duration-200">
                              <span className="text-slate-600 flex-shrink-0">[{log.timestamp}]</span>
                              <span className={`font-black flex-shrink-0 w-12 tracking-tighter ${
                                log.level === 'INFO' ? 'text-blue-400' : 
                                log.level === 'PROCESS' ? 'text-indigo-400' : 
                                log.level === 'SUCCESS' ? 'text-emerald-400' : 
                                log.level === 'WARN' ? 'text-amber-400' : 
                                log.level === 'ERROR' ? 'text-rose-400' : 'text-slate-400'
                              }`}>
                                {log.level}
                              </span>
                              <span className={`${
                                log.level === 'WARN' ? 'text-amber-200/80' : 
                                log.level === 'ERROR' ? 'text-rose-200/80' : 'text-slate-300'
                              } group-hover:text-white transition-colors`}>
                                {log.message}
                              </span>
                            </div>
                          ))}
                          <div ref={logEndRef} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-900 to-transparent z-20 pointer-events-none" />
                      </div>
                    </div>
                </div>
              ) : (
                <div className="space-y-6">
                   <div className="space-y-2.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                        <Building2 className="w-4 h-4 text-indigo-500" /> Target Deployment Site
                      </label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 text-slate-800 font-bold shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
                        value={targetTenantId}
                        onChange={(e) => setTargetTenantId(e.target.value)}
                      >
                        {mockTenants.map(t => (
                          <option key={t.id} value={t.id}>{t.subdomain} — {t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 flex items-center justify-between border border-slate-800 shadow-xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Active Version for Install</p>
                        <p className="text-2xl font-black text-white">{selectedModule?.version}</p>
                      </div>
                      <div className="text-right relative z-10">
                         <div className="flex items-center gap-2 justify-end text-indigo-400 text-[10px] font-black uppercase mb-1">
                           <Activity className="w-3 h-3" /> System Health
                         </div>
                         <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end">
                           <ShieldCheck className="w-3.5 h-3.5" /> High Availability
                         </span>
                      </div>
                    </div>

                    <button 
                      onClick={executeInstallation}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 group-hover:animate-bounce" />
                      Provision App to Site
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModuleIcon: React.FC<{ iconId: string, size?: 'small' | 'large' }> = ({ iconId, size = 'small' }) => {
  const iconMap: Record<string, { icon: any, color: string }> = {
    factory: { icon: Factory, color: 'bg-emerald-50 text-emerald-600' },
    store: { icon: Store, color: 'bg-blue-50 text-blue-600' },
    truck: { icon: Truck, color: 'bg-indigo-50 text-indigo-600' },
    'credit-card': { icon: CreditCard, color: 'bg-purple-50 text-purple-600' },
    globe: { icon: Globe, color: 'bg-cyan-50 text-cyan-600' },
    'bar-chart': { icon: BarChart3, color: 'bg-amber-50 text-amber-600' },
    users: { icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    shield: { icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
  };

  const config = iconMap[iconId] || { icon: Package, color: 'bg-slate-50 text-slate-400' };
  const Icon = config.icon;
  
  const sizeClasses = size === 'large' ? 'w-24 h-24 rounded-[2rem] shadow-xl' : 'w-12 h-12 rounded-xl shadow-sm';
  const iconSize = size === 'large' ? 'w-10 h-10' : 'w-6 h-6';

  return (
    <div className={`${sizeClasses} flex items-center justify-center ${config.color} transition-all group-hover:scale-110 group-hover:rotate-6 duration-500 border border-white/50 relative overflow-hidden`}>
      <Icon className={iconSize} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    </div>
  );
};
