
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Ban, 
  Plus, 
  X, 
  Globe, 
  Shield, 
  Box, 
  Loader2, 
  Zap, 
  Settings2, 
  Trash2, 
  RefreshCw, 
  Terminal,
  ArrowUpCircle,
  Package,
  Info,
  RotateCcw,
  Database,
  Users,
  HardDrive,
  Cpu,
  ExternalLink,
  Activity,
  AlertTriangle,
  History,
  UserPlus,
  ShieldCheck,
  Lock,
  ChevronRight,
  Fingerprint,
  Mail,
  UserCheck,
  Layout,
  Settings,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Check,
  Download
} from 'lucide-react';
import { Tenant, TenantLog, TenantUser, TenantRole } from '../types';

const getTimestamp = () => new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const defaultRoles: TenantRole[] = [
  { id: 'role-admin', name: 'Tenant Admin', description: 'Full access to all provisioned modules and site settings.', modules: ['ALL'] },
  { id: 'role-finance', name: 'Finance Manager', description: 'Access to accounting, payroll, and treasury modules.', modules: ['Accounting', 'HR', 'CRM'] },
  { id: 'role-ops', name: 'Operations', description: 'Manage manufacturing, stocks, and logistics.', modules: ['Manufacturing', 'Stocks', 'Logistics'] },
  { id: 'role-sales', name: 'Sales Executive', description: 'Access to CRM and Quotation engines.', modules: ['CRM', 'POS'] }
];

const initialTenants: Tenant[] = [
  { 
    id: '1', 
    name: 'Acme Manufacturing', 
    subdomain: 'acme.nexus.erp', 
    status: 'active', 
    plan: 'Enterprise', 
    region: 'us-east-1', 
    modules: ['CRM', 'Stocks', 'Manufacturing', 'Accounting'], 
    createdAt: '2023-10-01',
    logs: [
      { timestamp: '10:00:01', level: 'INFO', message: 'Provisioning request received' },
      { timestamp: '10:00:05', level: 'INFO', message: 'MariaDB schema isolated: acme_erp_prod' },
      { timestamp: '10:01:20', level: 'SUCCESS', message: 'Bench site acme.nexus.erp is live' }
    ],
    roles: [...defaultRoles],
    users: [
      { id: 'u1', name: 'John Doe', email: 'john@acme.com', roleId: 'role-admin' },
      { id: 'u2', name: 'Sarah Smith', email: 'sarah@acme.com', roleId: 'role-ops' }
    ]
  },
  { 
    id: '2', 
    name: 'Global Retailers', 
    subdomain: 'global.nexus.erp', 
    status: 'provisioning', 
    plan: 'Professional', 
    region: 'eu-west-1', 
    modules: ['POS', 'Retail', 'Stocks'], 
    createdAt: '2023-11-15', 
    provisioningProgress: 45, 
    currentStep: 'Downloading Apps',
    logs: [
      { timestamp: getTimestamp(), level: 'INFO', message: 'Initializing VPC Peering for EU-West' },
      { timestamp: getTimestamp(), level: 'INFO', message: 'Registry auth successful' },
      { timestamp: getTimestamp(), level: 'INFO', message: 'Cloning frappe/frappe v15.x...' }
    ],
    roles: [...defaultRoles],
    users: [
      { id: 'u3', name: 'Mike Ross', email: 'mike@global.retail', roleId: 'role-sales' }
    ]
  },
  { 
    id: '3', 
    name: 'Tech Services Inc', 
    subdomain: 'tech.nexus.erp', 
    status: 'active', 
    plan: 'Basic', 
    region: 'ap-south-1', 
    modules: ['Support', 'Projects', 'Accounting'], 
    createdAt: '2023-09-20',
    roles: [...defaultRoles],
    users: [
      { id: 'u4', name: 'Arjun K', email: 'arjun@techserv.in', roleId: 'role-admin' }
    ]
  }
];

const AVAILABLE_APPS = [
  { id: 'CRM', name: 'CRM Pro', desc: 'Advanced Lead Tracking', version: 'v15.2.1' },
  { id: 'Stocks', name: 'Inventory Master', desc: 'Multi-warehouse Stock', version: 'v15.0.4' },
  { id: 'Manufacturing', name: 'Manufacturing Core', desc: 'BOM & Shop Floor', version: 'v15.3.0' },
  { id: 'POS', name: 'Omni POS', desc: 'Retail Point of Sale', version: 'v14.9.9' },
  { id: 'Retail', name: 'Retail Analytics', desc: 'Insights & Reporting', version: 'v15.1.0' },
  { id: 'Support', name: 'Helpdesk Plus', desc: 'SLA-driven Support', version: 'v15.0.0' },
  { id: 'Projects', name: 'Project Hub', desc: 'Task & Timesheet mgmt', version: 'v15.2.2' },
  { id: 'Accounting', name: 'Finance Ledger', desc: 'Multi-currency Accounts', version: 'v15.4.1' },
  { id: 'HR', name: 'HR Center', desc: 'Payroll & Recruitment', version: 'v15.1.5' },
  { id: 'Assets', name: 'Asset Track', desc: 'Fixed Asset Lifecycle', version: 'v15.0.2' },
];

const PROVISIONING_STEPS = [
  { threshold: 0, label: 'Initializing Node...' },
  { threshold: 20, label: 'Downloading Apps' },
  { threshold: 45, label: 'Configuring Database' },
  { threshold: 75, label: 'Finalizing Setup' },
  { threshold: 95, label: 'Warming Cache' }
];

export const TenantManager: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'modules' | 'users'>('overview');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  
  const [statusFilter, setStatusFilter] = useState<Tenant['status'] | 'all'>('all');
  const [planFilter, setPlanFilter] = useState<Tenant['plan'] | 'all'>('all');
  
  const [operationProgress, setOperationProgress] = useState<number | null>(null);
  const [operationLabel, setOperationLabel] = useState("");
  const [operationLogs, setOperationLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    plan: 'Professional' as Tenant['plan'],
    region: 'us-east-1',
    modules: ['Core', 'Setup'] as string[]
  });

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [operationLogs, selectedTenant?.logs]);

  // Provisioning Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTenants(prevTenants => {
        let hasChanges = false;
        const nextTenants = prevTenants.map(tenant => {
          if (tenant.status === 'provisioning') {
            hasChanges = true;
            const currentProgress = tenant.provisioningProgress ?? 0;
            const nextProgress = Math.min(currentProgress + Math.floor(Math.random() * 5) + 2, 100);
            
            const step = [...PROVISIONING_STEPS].reverse().find(s => nextProgress >= s.threshold);
            const nextLogs = [...(tenant.logs || [])];

            if (Math.random() > 0.7 && nextProgress < 100) {
              const messages = [
                { level: 'INFO' as const, msg: `Bench executing: install-app ${tenant.modules[0]?.toLowerCase() || 'core'}` },
                { level: 'INFO' as const, msg: `Syncing site_config.json to isolated storage bucket` },
                { level: 'WARN' as const, msg: `Latency detected on MariaDB regional slave. Redirecting to master.` },
                { level: 'INFO' as const, msg: `Worker node acknowledged provisioning task: ${Math.random().toString(36).substr(2, 5)}` }
              ];
              const randomMsg = messages[Math.floor(Math.random() * messages.length)];
              nextLogs.push({ timestamp: getTimestamp(), level: randomMsg.level, message: randomMsg.msg });
            }

            if (nextProgress >= 100 && currentProgress < 100) {
              nextLogs.push({ timestamp: getTimestamp(), level: 'SUCCESS', message: 'Orchestration complete. All health checks passed.' });
              return { ...tenant, status: 'active' as const, provisioningProgress: 100, currentStep: 'Deployment Ready', logs: nextLogs };
            }
            
            return { ...tenant, provisioningProgress: nextProgress, currentStep: step?.label || 'Provisioning', logs: nextLogs };
          }
          return tenant;
        });

        if (selectedTenant && hasChanges) {
          const updatedSelected = nextTenants.find(t => t.id === selectedTenant.id);
          if (updatedSelected) setSelectedTenant(updatedSelected);
        }

        return hasChanges ? nextTenants : prevTenants;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedTenant]);

  const filteredTenants = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPlan = planFilter === 'all' || t.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPlanFilter('all');
  };

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant: Tenant = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      subdomain: `${formData.subdomain}.nexus.erp`,
      status: 'provisioning',
      plan: formData.plan,
      region: formData.region,
      modules: formData.modules,
      createdAt: new Date().toISOString().split('T')[0],
      provisioningProgress: 0,
      currentStep: 'Initializing Node...',
      logs: [
        { timestamp: getTimestamp(), level: 'INFO', message: `Site provisioning request created for ${formData.subdomain}` },
        { timestamp: getTimestamp(), level: 'INFO', message: 'VPC Resource Allocation started' }
      ],
      roles: [...defaultRoles],
      users: []
    };

    setTenants([newTenant, ...tenants]);
    setIsModalOpen(false);
    setFormData({ 
      name: '', 
      subdomain: '', 
      plan: 'Professional', 
      region: 'us-east-1',
      modules: ['Core', 'Setup']
    });
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Subdomain', 'Plan', 'Status', 'Modules', 'Created Date'];
    const csvContent = [
      headers.join(','),
      ...filteredTenants.map(t => {
        const modulesStr = t.modules.join('; ');
        return [
          `"${t.name.replace(/"/g, '""')}"`,
          `"${t.subdomain}"`,
          `"${t.plan}"`,
          `"${t.status}"`,
          `"${modulesStr}"`,
          `"${t.createdAt}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nexus_tenants_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenDetailView = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsDetailModalOpen(true);
    setActiveDetailTab('overview');
    setOperationProgress(null);
    setOperationLogs([]);
    setModuleSearchQuery('');
    setUserSearchQuery('');
  };

  const runModuleOperation = (type: 'install' | 'uninstall' | 'update' | 'rebuild', moduleId: string) => {
    setOperationProgress(0);
    const label = type === 'install' ? 'Installing' : type === 'uninstall' ? 'Removing' : type === 'update' ? 'Updating' : 'Rebuilding Assets for';
    setOperationLabel(`${label} ${moduleId}...`);
    setOperationLogs([
      `[INFO] Starting ${type} operation for ${moduleId}`, 
      `[INFO] Bench target site: ${selectedTenant?.subdomain}`,
      `[INFO] Acquiring lock on site_config.json...`
    ]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setOperationProgress(100);
        setOperationLogs(prev => [...prev, `[SUCCESS] ${moduleId} successfully processed.`, `[INFO] Restarting supervisor processes...`]);
        
        setTimeout(() => {
          setTenants(prev => prev.map(t => {
            if (t.id === selectedTenant?.id) {
              let updatedModules = [...t.modules];
              if (type === 'install') updatedModules.push(moduleId);
              if (type === 'uninstall') updatedModules = updatedModules.filter(m => m !== moduleId);
              
              const updatedTenant = { ...t, modules: updatedModules };
              setSelectedTenant(updatedTenant);
              return updatedTenant;
            }
            return t;
          }));
          setOperationProgress(null);
        }, 800);
      } else {
        setOperationProgress(progress);
        if (Math.random() > 0.7) {
          const commands = [
            `bench --site ${selectedTenant?.subdomain} clear-cache`,
            `bench --site ${selectedTenant?.subdomain} migrate`,
            `bench --site ${selectedTenant?.subdomain} restart`,
            `python3 -m frappe.utils.bench_helper --site ${selectedTenant?.subdomain} run-patch`
          ];
          setOperationLogs(prev => [...prev, `[EXEC] ${commands[Math.floor(Math.random() * commands.length)]}`]);
        }
      }
    }, 400);
  };

  const runBulkUpdate = () => {
    if (!selectedTenant) return;
    setOperationProgress(0);
    setOperationLabel("Orchestrating Bulk Update...");
    setOperationLogs([
      `[INFO] Initiating global maintenance for ${selectedTenant.subdomain}`,
      `[INFO] Target: ${selectedTenant.modules.length} capability sets`
    ]);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setOperationProgress(null);
      } else {
        setOperationProgress(progress);
        if (progress % 20 === 0) {
          setOperationLogs(prev => [...prev, `[INFO] Successfully patched module bundle at ${progress}%`]);
        }
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or domain..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="provisioning">Provisioning</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Tenant
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tenant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan & Region</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Installed Modules</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => handleOpenDetailView(tenant)}>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{tenant.name}</p>
                        <p className="text-xs text-indigo-600 font-mono">{tenant.subdomain}</p>
                      </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold">{tenant.plan}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-widest"><Globe className="w-3 h-3" /> {tenant.region}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {tenant.modules.map(m => (
                      <span key={m} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded border border-slate-200">{m}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-sm">
                    <Users className="w-4 h-4 text-slate-400" />
                    {tenant.users?.length || 0}
                  </div>
                </td>
                <td className="px-6 py-4">
                   <StatusBadge status={tenant.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-all">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDetailModalOpen && selectedTenant && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xl">
          <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 border border-slate-200 flex flex-col max-h-[95vh]">
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white relative">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100">
                  <Box className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-3xl tracking-tight leading-none">{selectedTenant.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-indigo-600 text-sm font-mono font-bold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> {selectedTenant.subdomain}
                    </p>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <StatusBadge status={selectedTenant.status} />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => !operationProgress && setIsDetailModalOpen(false)}
                className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="px-10 flex border-b border-slate-100 bg-slate-50/50">
              <TabLink active={activeDetailTab === 'overview'} onClick={() => setActiveDetailTab('overview')} icon={Layout} label="Site Overview" />
              <TabLink active={activeDetailTab === 'modules'} onClick={() => setActiveDetailTab('modules')} icon={Package} label="Manage Modules" />
              <TabLink active={activeDetailTab === 'users'} onClick={() => setActiveDetailTab('users')} icon={Users} label="Access Control" />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12 bg-white">
              {operationProgress !== null ? (
                <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                   <div className="w-24 h-24 relative flex items-center justify-center mb-8">
                      <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25" />
                      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin relative z-10" />
                   </div>
                   <h4 className="text-2xl font-black text-slate-800 tracking-tight">{operationLabel}</h4>
                   <p className="text-slate-400 text-sm mt-2 font-medium">Orchestrating bench tasks on isolated node pool</p>
                   
                   <div className="w-full max-w-lg bg-slate-100 h-3 rounded-full overflow-hidden mt-8 shadow-inner relative">
                     <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${operationProgress}%` }} />
                   </div>

                   <div className="w-full max-w-2xl bg-slate-900 rounded-2xl p-6 mt-12 text-left font-mono text-[11px] shadow-2xl relative">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                         <div className="flex gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                           <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                           <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                         </div>
                         <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Provisioner V2 // {selectedTenant.subdomain}</span>
                      </div>
                      <div className="space-y-1.5 h-48 overflow-y-auto custom-scrollbar-dark pr-2">
                        {operationLogs.map((log, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-slate-600">[{getTimestamp()}]</span>
                            <span className="text-slate-300">{log}</span>
                          </div>
                        ))}
                        <div ref={logEndRef} />
                      </div>
                   </div>
                </div>
              ) : (
                <>
                  {activeDetailTab === 'overview' && <OverviewTab tenant={selectedTenant} />}
                  {activeDetailTab === 'modules' && (
                    <ModulesTab 
                      tenant={selectedTenant} 
                      runOperation={runModuleOperation} 
                      runBulkUpdate={runBulkUpdate}
                      moduleSearchQuery={moduleSearchQuery} 
                      setModuleSearchQuery={setModuleSearchQuery} 
                    />
                  )}
                  {activeDetailTab === 'users' && <UsersTab tenant={selectedTenant} userSearchQuery={userSearchQuery} setUserSearchQuery={setUserSearchQuery} />}
                </>
              )}
            </div>

            <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Fingerprint className="w-4 h-4 text-emerald-500" /> Isolated Node Identity: {selectedTenant.id.toUpperCase()}-MASTER
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-black hover:bg-slate-100 transition-all">
                  Audit Snapshot
                </button>
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Terminate Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h3 className="text-xl font-black text-slate-800">Provision New Tenant Environment</h3>
               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleCreateTenant} className="p-10 space-y-6">
               <div className="grid gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Organization Legal Name</label>
                    <input required type="text" placeholder="e.g. Acme Corp Industries" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Instance Subdomain</label>
                    <div className="flex items-center">
                      <input required type="text" placeholder="acme-prod" className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-l-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 border-r-0 transition-all font-bold font-mono" value={formData.subdomain} onChange={e => setFormData({...formData, subdomain: e.target.value})} />
                      <span className="p-4 bg-slate-100 border border-slate-200 rounded-r-2xl text-slate-500 text-sm font-black font-mono">.nexus.erp</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Service Tier</label>
                        <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value as any})}>
                          <option value="Basic">Basic Hub</option>
                          <option value="Professional">Growth Pro</option>
                          <option value="Enterprise">Enterprise Grid</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deployment Region</label>
                        <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}>
                          <option value="us-east-1">US East (N. Virginia)</option>
                          <option value="eu-west-1">Europe (Ireland)</option>
                          <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                        </select>
                     </div>
                  </div>
               </div>
               <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4">
                 <Zap className="w-5 h-5 fill-current" /> Initialize Sovereignty Bench
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const TabLink: React.FC<{ active: boolean; onClick: () => void; icon: any; label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-5 flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all relative ${
      active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
  </button>
);

const OverviewTab = ({ tenant }: { tenant: Tenant }) => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatBox icon={Database} label="Schema Instance" value="Dedicated MariaDB" color="text-blue-600" />
      <StatBox icon={HardDrive} label="Persistent Storage" value="48.2 GB / 100GB" color="text-emerald-600" />
      <StatBox icon={Cpu} label="Compute Priority" value="High (Enterprise)" color="text-amber-600" />
      <StatBox icon={Activity} label="SLA Monitoring" value="99.998% Uptime" color="text-indigo-600" />
    </div>

    <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl overflow-hidden relative group">
       <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
               <h4 className="text-sm font-black text-white uppercase tracking-widest">Real-time Orchestration Stream</h4>
               <p className="text-[10px] text-slate-500 font-bold mt-1">Watching site events on worker-node-04</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Sync: Active</span>
          </div>
       </div>
       <div className="space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar-dark font-mono text-[11px] pr-2">
          {tenant.logs?.map((log, i) => (
            <div key={i} className="flex gap-5 group/log hover:bg-white/5 py-1 px-2 rounded transition-colors">
               <span className="text-slate-600 flex-shrink-0">[{log.timestamp}]</span>
               <span className={`w-14 font-black flex-shrink-0 tracking-tighter ${
                 log.level === 'INFO' ? 'text-blue-400' : log.level === 'SUCCESS' ? 'text-emerald-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-rose-400'
               }`}>{log.level}</span>
               <span className="text-slate-300 group-hover/log:text-white transition-colors">{log.message}</span>
            </div>
          ))}
       </div>
       <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-900/40" />
    </div>
  </div>
);

const ModulesTab = ({ tenant, runOperation, runBulkUpdate, moduleSearchQuery, setModuleSearchQuery }: any) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'installed' | 'available'>('all');
  
  const installedModules = tenant.modules.map((mId: string) => 
    AVAILABLE_APPS.find(a => a.id === mId) || { id: mId, name: mId, desc: 'Enterprise Extension', version: 'v1.0.0' }
  ).filter((m: any) => 
    m.name.toLowerCase().includes(moduleSearchQuery.toLowerCase()) || 
    m.id.toLowerCase().includes(moduleSearchQuery.toLowerCase())
  );

  const availableModules = AVAILABLE_APPS.filter(app => 
    !tenant.modules.includes(app.id) && 
    (app.name.toLowerCase().includes(moduleSearchQuery.toLowerCase()) || 
     app.id.toLowerCase().includes(moduleSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="p-4 bg-white border border-slate-200 text-indigo-600 rounded-3xl shadow-sm">
              <BoxesIcon className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">Capability Governance</h4>
              <p className="text-sm text-slate-500 font-medium">Manage atomic module injections for this isolated site.</p>
            </div>
         </div>
         <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                className="pl-10 pr-4 py-3 border border-slate-200 rounded-2xl bg-white text-xs font-bold outline-none w-64 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm" 
                value={moduleSearchQuery} 
                onChange={e => setModuleSearchQuery(e.target.value)} 
              />
            </div>
            <button 
              onClick={runBulkUpdate}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Bulk Patch Site
            </button>
         </div>
      </div>

      <div className="flex items-center gap-2 px-2 border-b border-slate-100 pb-1">
         <TabSelector active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} label="All Capability Sets" count={installedModules.length + availableModules.length} />
         <TabSelector active={activeFilter === 'installed'} onClick={() => setActiveFilter('installed')} label="Currently Active" count={installedModules.length} />
         <TabSelector active={activeFilter === 'available'} onClick={() => setActiveFilter('available')} label="Available Injection" count={availableModules.length} />
      </div>
      
      {(activeFilter === 'all' || activeFilter === 'installed') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Site-Active Capabilities
            </h4>
          </div>
          <div className="grid gap-4">
            {installedModules.length > 0 ? installedModules.map((app: any) => (
              <ModuleActionCard 
                key={app.id} 
                app={app} 
                isInstalled 
                onUpdate={() => runOperation('update', app.id)} 
                onUninstall={() => runOperation('uninstall', app.id)}
                onRebuild={() => runOperation('rebuild', app.id)}
              />
            )) : (
              <EmptyState message="No active modules found matching your search." />
            )}
          </div>
        </div>
      )}

      {(activeFilter === 'all' || activeFilter === 'available') && (
        <div className="space-y-6 pt-10 border-t border-slate-100">
           <div className="flex items-center justify-between px-2">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Plus className="w-4 h-4" /> Recommended for Injection
             </h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableModules.length > 0 ? availableModules.map(app => (
                <ModuleActionCard 
                  key={app.id} 
                  app={app} 
                  onInstall={() => runOperation('install', app.id)} 
                />
              )) : (
                <div className="col-span-full">
                  <EmptyState message="All available catalog modules are already provisioned to this site." />
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

const ModuleActionCard = ({ app, isInstalled, onInstall, onUninstall, onUpdate, onRebuild }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`p-6 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between hover:border-indigo-400 hover:shadow-xl transition-all group relative ${isInstalled ? 'border-l-4 border-l-indigo-600' : ''}`}>
       <div className="flex items-center gap-6 mb-4 md:mb-0">
          <div className={`p-4 rounded-2xl transition-all ${isInstalled ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
            <Package className="w-8 h-8" />
          </div>
          <div>
             <div className="flex items-center gap-3">
               <h5 className="text-lg font-black text-slate-800 tracking-tight">{app.name}</h5>
               <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-black uppercase rounded-lg border border-slate-200 tracking-widest">{app.version}</span>
               {isInstalled && (
                 <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-full border border-emerald-100">
                    <ShieldCheck className="w-3 h-3" /> Secure Sync
                 </span>
               )}
             </div>
             <p className="text-sm text-slate-500 mt-1 font-medium">{app.desc}</p>
          </div>
       </div>
       
       <div className="flex items-center gap-3 justify-end">
          {isInstalled ? (
            <>
              <button 
                onClick={() => setIsConfiguring(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-black transition-all border border-slate-200"
              >
                <Settings className="w-4 h-4" /> Config
              </button>
              <button onClick={onUpdate} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 group/btn">
                <RefreshCw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                Patch
              </button>
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2.5 bg-white text-slate-400 hover:text-slate-800 rounded-xl transition-all border border-slate-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {isMenuOpen && (
                  <div className="absolute bottom-full mb-2 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="p-2 space-y-1">
                      <button onClick={() => { setIsMenuOpen(false); onRebuild(); }} className="w-full flex items-center gap-3 p-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                        <ArrowUpCircle className="w-4 h-4 text-indigo-500" /> Rebuild Production Assets
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                        <Lock className="w-4 h-4 text-slate-400" /> Manage DB Access
                      </button>
                      <div className="h-px bg-slate-100 my-1 mx-2" />
                      <button onClick={() => { setIsMenuOpen(false); onUninstall(); }} className="w-full flex items-center gap-3 p-3 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 className="w-4 h-4" /> Uninstall Module
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button 
              onClick={onInstall}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-2xl text-xs font-black transition-all shadow-lg shadow-indigo-100 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" /> Inject Capability
            </button>
          )}
       </div>

       {isConfiguring && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-800 text-xl">{app.name} Config</h3>
                </div>
                <button onClick={() => setIsConfiguring(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              <div className="p-10 space-y-6">
                <div className="space-y-4">
                  <ConfigField label="Isolated Cache Strategy" value="Redis Cluster B" />
                  <ConfigField label="API Rate Limiting" value="1,200 req/min" />
                  <ConfigField label="Data Sovereignty" value="US-East Dedicated" />
                  <ConfigField label="Auto-Scaling Threshold" value="70% CPU Usage" />
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <button onClick={() => setIsConfiguring(false)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    Apply Governed Config
                  </button>
                </div>
              </div>
           </div>
         </div>
       )}
    </div>
  );
};

const ConfigField = ({ label, value }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-black text-slate-700">{value}</span>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-16 text-center bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{message}</p>
  </div>
);

const TabSelector = ({ active, onClick, label, count }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${
      active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
    <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${active ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
      {count}
    </span>
    {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />}
  </button>
);

const UsersTab = ({ tenant, userSearchQuery, setUserSearchQuery }: { tenant: Tenant, userSearchQuery: string, setUserSearchQuery: (s: string) => void }) => {
  const [selectedRole, setSelectedRole] = useState<TenantRole | null>(tenant.roles ? tenant.roles[0] : null);

  const filteredUsers = tenant.users?.filter(u => 
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  ) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
       <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
             <div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">Authenticated Site Users</h4>
                <p className="text-sm text-slate-500 font-medium">Authorized staff with direct access to this single-tenant instance.</p>
             </div>
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-[1.5rem] text-xs font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
               <UserPlus className="w-4 h-4" /> Provision New User
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center px-10">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  type="text" 
                  placeholder="Filter users by name or email..." 
                  className="bg-transparent text-sm font-bold text-slate-800 outline-none w-full placeholder:text-slate-300"
                  value={userSearchQuery}
                  onChange={e => setUserSearchQuery(e.target.value)}
                />
             </div>
             <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                   <tr className="border-b border-slate-100">
                      <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee Identity</th>
                      <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Role</th>
                      <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Access Controls</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {filteredUsers.length > 0 ? filteredUsers.map(user => {
                     const role = tenant.roles?.find(r => r.id === user.roleId);
                     return (
                       <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-7">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-indigo-100/50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-sm uppercase group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                   <p className="font-black text-slate-800 text-sm mb-1">{user.name}</p>
                                   <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-7">
                             <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full border border-indigo-100">
                                {role?.name || 'Unassigned'}
                             </span>
                          </td>
                          <td className="px-10 py-7 text-right">
                             <div className="flex justify-end gap-3">
                                <button className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-slate-100" title="Grant Module Access"><Lock className="w-4 h-4" /></button>
                                <button className="p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-slate-100" title="Revoke Site Access"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                       </tr>
                     );
                   }) : (
                     <tr>
                        <td colSpan={3} className="px-10 py-24 text-center">
                           <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                           <h5 className="text-lg font-black text-slate-300 uppercase tracking-widest">No Authorized Users Found</h5>
                        </td>
                     </tr>
                   )}
                </tbody>
             </table>
          </div>
       </div>

       <div className="space-y-8">
          <div>
             <h4 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-2">Capability Mapping</h4>
             <p className="text-sm text-slate-500 font-medium">Define module access for site roles.</p>
          </div>

          <div className="space-y-4">
             {tenant.roles?.map(role => (
               <button 
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group ${
                  selectedRole?.id === role.id 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:shadow-lg'
                }`}
               >
                 <div className="flex items-center gap-5">
                    <div className={`p-3.5 rounded-2xl transition-all ${
                      selectedRole?.id === role.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="font-black text-sm mb-1">{role.name}</h5>
                       <p className={`text-[10px] font-black uppercase tracking-widest transition-all ${selectedRole?.id === role.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                         {role.modules.includes('ALL') ? 'Superuser Access' : `${role.modules.length} Managed Sets`}
                       </p>
                    </div>
                 </div>
                 <ChevronRight className={`w-5 h-5 transition-all ${selectedRole?.id === role.id ? 'text-indigo-400 translate-x-1' : 'text-slate-200'}`} />
               </button>
             ))}
          </div>

          {selectedRole && (
            <div className="bg-indigo-50 rounded-[2.5rem] p-10 border border-indigo-100 animate-in slide-in-from-right-8 duration-500 shadow-xl shadow-indigo-100/20">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <UserCheck className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h5 className="text-xl font-black text-indigo-900 leading-none">Access Policy</h5>
               </div>
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5" /> Authorized Modules
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedRole.modules.includes('ALL') 
                        ? tenant.modules.map(m => <ModuleTag key={m} name={m} />)
                        : selectedRole.modules.map(mId => <ModuleTag key={mId} name={mId} />)
                      }
                      {selectedRole.modules.length === 0 && <span className="text-xs text-indigo-400 font-bold italic">No active modules mapped</span>}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 border border-indigo-100">
                    Update Security Policy
                  </button>
               </div>
            </div>
          )}
       </div>
    </div>
  );
};

// Fixed TypeScript error by using React.FC to allow 'key' prop when mapping over lists
const ModuleTag: React.FC<{ name: string }> = ({ name }) => (
  <span className="px-4 py-2 bg-white text-indigo-600 text-[10px] font-black uppercase rounded-xl border border-indigo-200 shadow-sm flex items-center gap-2 hover:border-indigo-400 transition-all cursor-default group">
     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:animate-ping" /> {name}
  </span>
);

const BoxesIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);

const StatBox: React.FC<{ icon: any, label: string, value: string, color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
    <div className={`p-4 rounded-2xl bg-slate-50 ${color} w-fit mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all relative z-10`}>
      <Icon className="w-7 h-7" />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 relative z-10">{label}</p>
    <p className="text-xl font-black text-slate-800 tracking-tight leading-none relative z-10">{value}</p>
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </div>
);

const StatusBadge: React.FC<{ status: Tenant['status'] }> = ({ status }) => {
  const configs = {
    active: { icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    provisioning: { icon: Clock, class: 'bg-blue-50 text-blue-700 border-blue-100' },
    suspended: { icon: Ban, class: 'bg-rose-50 text-rose-700 border-rose-100' },
  };

  const { icon: Icon, class: className } = configs[status];

  return (
    <span className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${className} shadow-sm transition-all hover:shadow-md`}>
      <Icon className={`w-3.5 h-3.5 ${status === 'provisioning' ? 'animate-spin' : ''}`} />
      {status}
    </span>
  );
};
