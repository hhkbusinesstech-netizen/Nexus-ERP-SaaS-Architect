
import React, { useState } from 'react';
import { 
  Database, 
  Globe, 
  GitBranch, 
  Terminal, 
  Lock, 
  Cpu,
  Workflow
} from 'lucide-react';

export const ArchitectureDoc: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'entities' | 'workflow'>('stack');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 flex p-1 bg-slate-50/50">
        <TabButton active={activeTab === 'stack'} onClick={() => setActiveTab('stack')} label="Platform Stack" icon={Database} />
        <TabButton active={activeTab === 'entities'} onClick={() => setActiveTab('entities')} label="Entity Models" icon={GitBranch} />
        <TabButton active={activeTab === 'workflow'} onClick={() => setActiveTab('workflow')} label="Orchestration Workflow" icon={Workflow} />
      </div>

      <div className="p-8">
        {activeTab === 'stack' && <StackView />}
        {activeTab === 'entities' && <EntityView />}
        {activeTab === 'workflow' && <WorkflowView />}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: any }> = ({ active, onClick, label, icon: Icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all rounded-lg ${
      active ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const StackView = () => (
  <div className="space-y-8">
    <div className="prose max-w-none">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Frappe Multi-Tenant SaaS Stack</h2>
      <p className="text-slate-600">The platform utilizes a site-per-tenant isolation strategy powered by the Frappe Framework. Each site maintains a completely separate database and private storage.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StackCard 
        title="Load Balancer" 
        tech="Nginx / HAProxy" 
        desc="Handles request routing via Server Name Indication (SNI) to specific tenant sites." 
        icon={Globe}
      />
      <StackCard 
        title="App Engine" 
        tech="Gunicorn / Python" 
        desc="Stateless application servers running ERPNext/Frappe core logic." 
        icon={Terminal}
      />
      <StackCard 
        title="Database Layer" 
        tech="MariaDB Cluster" 
        desc="Tenant-isolated schemas for 100% data residency and safety." 
        icon={Database}
      />
      <StackCard 
        title="Cache / Queue" 
        tech="Redis" 
        desc="Private namespaces for real-time notifications and background jobs." 
        icon={Cpu}
      />
      <StackCard 
        title="Storage" 
        tech="S3 / MinIO" 
        desc="Tenant-isolated buckets for documents, images, and backups." 
        icon={Lock}
      />
      <StackCard 
        title="Control Plane" 
        tech="React + Frappe API" 
        desc="Central management system for provisioning and billing." 
        icon={Terminal}
      />
    </div>

    <div className="mt-8 p-6 bg-slate-900 rounded-xl text-emerald-400 font-mono text-sm">
      <p className="mb-2 text-slate-500"># Bench Command Orchestration</p>
      <p>bench new-site [tenant].nexus.erp --db-name [isolated_db] --install-app erpnext</p>
      <p>bench --site [tenant].nexus.erp set-config premium_theme 1</p>
      <p>bench --site [tenant].nexus.erp install-app nexus_marketplace_client</p>
    </div>
  </div>
);

const EntityView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <EntityCard 
      name="Nexus SaaS Central" 
      fields={['TenantID', 'Subdomain', 'PlanLevel', 'GCP_Region', 'AdminEmail', 'BillingCycle']} 
    />
    <EntityCard 
      name="Tenant Instance" 
      fields={['InstalledModules[]', 'ActiveUsers', 'StorageUsed', 'CustomFieldsMeta', 'LastBackup']} 
    />
    <EntityCard 
      name="Marketplace App" 
      fields={['PackageID', 'Version', 'FrappeAppRef', 'DependencyTree', 'LicenseKey', 'Status']} 
    />
    <EntityCard 
      name="Vendor Link" 
      fields={['VendorID', 'TenantSourceID', 'ConsignmentTerms', 'PortalAccessLevel', 'SyncStatus']} 
    />
  </div>
);

const WorkflowView = () => (
  <div className="relative">
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block"></div>
    <div className="space-y-12">
      <WorkflowItem 
        step="1" 
        title="Onboarding & Payment" 
        desc="Customer selects Vertical (e.g., Manufacturing) and Plan. Payment Gateway confirms subscription." 
      />
      <WorkflowItem 
        step="2" 
        title="Site Provisioning" 
        desc="SaaS Orchestrator triggers Ansible/Bench to spin up new MariaDB schema and site folder." 
      />
      <WorkflowItem 
        step="3" 
        title="Governed Customization" 
        desc="System applies selected Vertical Marketplace apps and Nexus Premium Theme via Git." 
      />
      <WorkflowItem 
        step="4" 
        title="Portal Activation" 
        desc="External Portals (Vendor/Customer) are connected via standard Frappe REST APIs." 
      />
    </div>
  </div>
);

const StackCard = ({ title, tech, desc, icon: Icon }: any) => (
  <div className="p-6 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-indigo-600 w-5 h-5" />
    </div>
    <h4 className="font-bold text-slate-800">{title}</h4>
    <p className="text-xs text-indigo-500 font-mono mb-2">{tech}</p>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const EntityCard = ({ name, fields }: any) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
      <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">{name}</h4>
    </div>
    <div className="space-y-2">
      {fields.map((f: string, i: number) => (
        <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100 text-sm">
          <span className="text-slate-600 font-medium">{f}</span>
          <span className="text-slate-300 font-mono text-[10px]">STRING</span>
        </div>
      ))}
    </div>
  </div>
);

const WorkflowItem = ({ step, title, desc }: any) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 w-16 h-16 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center z-10">
      <span className="text-xl font-black text-indigo-600">{step}</span>
    </div>
    <div className="bg-slate-50 p-6 rounded-2xl ml-8">
      <h4 className="font-bold text-slate-800 text-lg mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);
