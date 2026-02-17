
import React, { useState } from 'react';
import { 
  Database, 
  Globe, 
  GitBranch, 
  Terminal, 
  Lock, 
  Cpu,
  Workflow,
  ShieldCheck,
  RefreshCw,
  HardDrive,
  Activity,
  Server,
  Cloud,
  AlertOctagon,
  ArrowRight,
  Boxes,
  Code2,
  Rocket,
  Layout,
  Briefcase,
  Factory,
  Store,
  CreditCard,
  Users,
  Search,
  Zap,
  CheckCircle2,
  Package,
  FileText,
  Truck,
  MessageSquare,
  Shield,
  ShoppingCart,
  PieChart,
  Github,
  Ship,
  Layers,
  Repeat
} from 'lucide-react';

interface ArchitectureDocProps {
  defaultTab?: string;
}

export const ArchitectureDoc: React.FC<ArchitectureDocProps> = ({ defaultTab = 'stack' }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden min-h-[800px] flex flex-col">
      <div className="border-b border-slate-100 flex p-2 bg-slate-50/50 gap-2 overflow-x-auto custom-scrollbar-hide">
        <TabButton active={activeTab === 'stack'} onClick={() => setActiveTab('stack')} label="Infra Stack" icon={Server} />
        <TabButton active={activeTab === 'isolation'} onClick={() => setActiveTab('isolation')} label="Isolation" icon={ShieldCheck} />
        <TabButton active={activeTab === 'functional'} onClick={() => setActiveTab('functional')} label="Core ERP Suite" icon={Boxes} />
        <TabButton active={activeTab === 'entities'} onClick={() => setActiveTab('entities')} label="Entities & APIs" icon={Code2} />
        <TabButton active={activeTab === 'lifecycle'} onClick={() => setActiveTab('lifecycle')} label="Lifecycle & Onboarding" icon={Workflow} />
        <TabButton active={activeTab === 'rollout'} onClick={() => setActiveTab('rollout')} label="Rollout & DevOps" icon={Rocket} />
        <TabButton active={activeTab === 'portals'} onClick={() => setActiveTab('portals')} label="Experience Portals" icon={Layout} />
      </div>

      <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'stack' && <StackView />}
        {activeTab === 'isolation' && <IsolationView />}
        {activeTab === 'functional' && <FunctionalSuiteView />}
        {activeTab === 'entities' && <EntityApiView />}
        {activeTab === 'lifecycle' && <LifecycleView />}
        {activeTab === 'rollout' && <RolloutView />}
        {activeTab === 'portals' && <PortalsView />}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: any }> = ({ active, onClick, label, icon: Icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all rounded-xl whitespace-nowrap ${
      active ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
    {label}
  </button>
);

const StackView = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Nexus Multi-Tenant Core Architecture</h2>
      <p className="text-slate-500 leading-relaxed text-lg">
        Nexus leverages a "Sovereign Bench" approach. Every tenant is a first-class citizen with dedicated resources while maintaining a centralized control plane for mass orchestration.
      </p>
    </div>

    <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[11px] leading-relaxed shadow-2xl relative overflow-hidden group">
      <h3 className="text-indigo-400 font-bold mb-6 border-b border-slate-800 pb-2 flex items-center gap-2">
        <Server className="w-4 h-4" /> Nexus System Topology Map
      </h3>
      <div className="text-slate-300 space-y-1 whitespace-pre overflow-x-auto custom-scrollbar-dark">
{`
[ PUBLIC INTERNET ]
       |
       ▼
[ Cloudflare Anycast DNS / WAF ]
       |
       ▼
[ Global Load Balancer (GCP/AWS) ]
       |
       ▼
[ Regional Nginx Ingress ]  <---( SSL Termination & SNI Routing )
       |
       +---------------------------------+---------------------------------+
       |                                 |                                 |
       ▼                                 ▼                                 ▼
[ Tenant Node Pool A ]           [ Tenant Node Pool B ]           [ Enterprise Dedicated ]
( Gunicorn Workers )             ( Gunicorn Workers )             ( Private K8s Namespace )
       |                                 |                                 |
       +---------------------------------+---------------------------------+
                                         |
                                         ▼
[ Multi-Instance MariaDB Cluster ] <---( Individual Schema Isolation )
       |
       +---> [ Tenant DB 1 ]
       +---> [ Tenant DB 2 ]
                                         |
                                         ▼
[ Redis Namespaced Hub ]           [ Object Storage (S3) ]          [ Control Plane DB ]
( Cache & Background Jobs )        ( Private Buckets / Files )      ( Global Site Registry )
`}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StackCard icon={Cloud} title="Regional Hosting" desc="Instances deployed in 4 regions (US-East, EU-West, AP-South, US-West) to satisfy data sovereignty laws." />
      <StackCard icon={Terminal} title="Bench Controller" desc="Custom CLI built over Frappe Bench for mass-site updates and governed module injections." />
      <StackCard icon={Activity} title="Health Mesh" desc="Prometheus + Grafana sidecars on every worker node tracking per-tenant resource usage." />
    </div>
  </div>
);

const IsolationView = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Logical & Physical Isolation Boundaries</h2>
      <p className="text-slate-500 leading-relaxed text-lg">
        Sovereignty is our product. We enforce hard boundaries at three critical layers to prevent noisy-neighbor syndrome and data leakage.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <IsolationBoundary 
        title="Database Isolation" 
        icon={Database}
        details={[
          "Separate MariaDB user per site",
          "Dedicated schema per tenant",
          "Cross-schema queries prohibited",
          "Audit logs strictly partitioned"
        ]}
      />
      <IsolationBoundary 
        title="Storage & Assets" 
        icon={HardDrive}
        details={[
          "Private S3 buckets per tenant",
          "Encrypted with unique KMS keys",
          "Assets served via signed URLs",
          "Strict CORS & CSP per domain"
        ]}
      />
      <IsolationBoundary 
        title="App Context Isolation" 
        icon={Lock}
        details={[
          "Unique encryption_key per site",
          "Namespaced Redis job queues",
          "Isolated log files per subdomain",
          "Restricted python site-packages"
        ]}
      />
    </div>
  </div>
);

const FunctionalSuiteView = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Nexus Core ERP Suite</h2>
      <p className="text-slate-500 leading-relaxed text-lg">
        Nexus ensures 100% ERPNext module availability. Every tenant site is provisioned with the full standard functional suite, enhanced by our custom Nexus UI layer.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ModuleSection title="Accounting" icon={CreditCard} items={["Multi-currency Ledger", "Automated Reconciliation", "Financial Reporting", "Asset Lifecycle"]} />
      <ModuleSection title="Sales & CRM" icon={Users} items={["Lead Management", "Quotation Engine", "Sales Pipelines", "SLA Support"]} />
      <ModuleSection title="Supply Chain" icon={HardDrive} items={["Warehouse Management", "Serial/Batch Tracking", "Stock Valuation", "Quality Control"]} />
      <ModuleSection title="Manufacturing" icon={Factory} items={["Multi-level BOM", "Shop Floor Orchestration", "Capacity Planning", "Job Cards"]} />
      <ModuleSection title="HR & Payroll" icon={Briefcase} items={["Localized Payroll", "Employee Self-Service", "Attendance & Shift", "Expense Claims"]} />
      <ModuleSection title="Projects" icon={Layout} items={["Task Billing", "Milestone Tracking", "Timesheet Integration", "Profitability"]} />
    </div>
  </div>
);

const EntityApiView = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Entity Models & API Specifications</h2>
      <p className="text-slate-500 leading-relaxed">
        Nexus sits on top of the Frappe meta-data architecture. All custom capabilities are defined as standard Doctypes for zero-friction upgrades.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Core SaaS Doctypes</h3>
        <div className="space-y-3">
          <EntityItem name="TenantSite" fields={['subdomain', 'db_name', 'plan_tier', 'region_id']} />
          <EntityItem name="MarketplaceSubscription" fields={['app_id', 'site_id', 'license_key', 'is_active']} />
          <EntityItem name="SaaSConfig" fields={['cpu_quota', 'mem_limit', 'backup_frequency']} />
        </div>
      </div>
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 font-mono text-xs">
        <h3 className="text-emerald-400 font-bold mb-4 uppercase">Provisioner API (REST)</h3>
        <pre className="text-slate-300">
{`POST /api/v1/tenant/provision
{
  "name": "acme-corp",
  "plan": "growth",
  "region": "us-east-1",
  "apps": ["manufacturing", "crm"]
}

GET /api/v1/tenant/:id/health
{
  "status": "active",
  "bench_load": 0.45,
  "db_size_mb": 1284
}`}
        </pre>
      </div>
    </div>
  </div>
);

const LifecycleView = () => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Onboarding & Tenant Lifecycle</h2>
      <p className="text-slate-500 text-lg leading-relaxed">
        We've automated the entire customer journey from trial to enterprise scale. Every site goes through a rigorous automated provisioning chain.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Onboarding Workflow</h4>
        <div className="space-y-4">
          <OnboardingStep step="01" title="Self-Service Trial" desc="User selects subdomain and vertical template. Bench initializes site instantly." />
          <OnboardingStep step="02" title="Plan Selection" desc="Billing tier (Starter/Growth/Enterprise) determines node pool placement." />
          <OnboardingStep step="03" title="Vertical Injection" desc="Selected marketplace modules are hot-swapped into the site bench." />
          <OnboardingStep step="04" title="Identity Federation" desc="Tenant SSO (SAML/OIDC) is provisioned for seamless employee access." />
        </div>
      </div>
      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 h-full">
        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">Recurring Lifecycle Tasks</h4>
        <div className="space-y-6">
          <LifecycleTask icon={Repeat} title="Atomic Site Migrations" desc="Automatic schema updates during nightly maintenance windows." />
          <LifecycleTask icon={ShieldCheck} iconColor="text-emerald-500" title="Governance Audits" desc="Periodic security scan of site_config.json and field-level permissions." />
          <LifecycleTask icon={Zap} iconColor="text-amber-500" title="Resource Scaling" desc="Vertical scaling of gunicorn workers based on real-time traffic." />
        </div>
      </div>
    </div>
  </div>
);

const RolloutView = () => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Repository & DevOps Strategy</h2>
      <p className="text-slate-500">The Nexus infrastructure is managed as code. We maintain strict separation between core engine and custom vertical apps.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <RepoCard 
        name="nexus-bench-core" 
        icon={Github} 
        type="Infrastructure" 
        desc="Ansible playbooks, Terraform scripts, and K8s manifests for the node pool." 
      />
      <RepoCard 
        name="nexus-verticals-hub" 
        icon={Package} 
        type="App Suite" 
        desc="Custom Frappe apps for Manufacturing, Retail, and Logistics marketplace modules." 
      />
      <RepoCard 
        name="nexus-control-plane" 
        icon={Ship} 
        type="Management" 
        desc="This orchestrator dashboard and the global tenant registry API." 
      />
    </div>

    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h4 className="text-xl font-black mb-4">Rollout Phases</h4>
          <div className="space-y-4">
            <PhaseItem phase="01" title="Infra Core" status="Complete" />
            <PhaseItem phase="02" title="Tenant Isolation" status="Complete" />
            <PhaseItem phase="03" title="Marketplace Sync" status="In Progress" />
            <PhaseItem phase="04" title="Edge Portal V2" status="Planned" />
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-3xl p-6 border border-white/10">
          <h4 className="text-sm font-black mb-4 uppercase tracking-widest text-indigo-400">CI/CD Pipeline</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Every commit to `nexus-verticals-hub` triggers an automated test suite across a fleet of temporary sandbox sites before rolling out to customers.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> Blue-Green Deployment Enabled
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PortalsView = () => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">External Experience Architecture</h2>
      <p className="text-slate-500 text-lg leading-relaxed">
        Nexus transcends standard back-office ERP by providing white-labeled portals for vendors and customers.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl border border-slate-800 flex flex-col">
        <h3 className="text-2xl font-black mb-8 tracking-tight">Vendor Portal (ERP-Level)</h3>
        <div className="space-y-6 flex-1">
          <PortalCapability icon={Users} title="Profile & Compliance" desc="Self-service banking and tax docs." />
          <PortalCapability icon={FileText} title="Sourcing & Bidding" desc="Direct RFQ and quote management." />
          <PortalCapability icon={Truck} title="Logistics Orchestration" desc="ASN generation and schedule sync." />
        </div>
      </div>

      <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl border border-indigo-500 flex flex-col">
        <h3 className="text-2xl font-black mb-8 tracking-tight">Customer Portal (Commerce)</h3>
        <div className="space-y-6 flex-1">
          <PortalCapability icon={Boxes} title="B2B E-Commerce" desc="Contract-specific catalog pricing." />
          <PortalCapability icon={Activity} title="Order Transparency" desc="Real-time shipment tracking." />
          <PortalCapability icon={CreditCard} title="Pay & Statements" desc="Instant checkout and invoice vault." />
        </div>
      </div>
    </div>
  </div>
);

const StackCard = ({ icon: Icon, title, desc }: any) => (
  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-200 transition-all hover:shadow-lg group">
    <Icon className="w-8 h-8 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const IsolationBoundary = ({ title, icon: Icon, details }: any) => (
  <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-white hover:shadow-xl transition-all h-full flex flex-col">
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
      <Icon className="w-7 h-7" />
    </div>
    <h4 className="font-black text-slate-900 mb-4 text-lg">{title}</h4>
    <ul className="space-y-3 flex-1">
      {details.map((d: string, i: number) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          {d}
        </li>
      ))}
    </ul>
  </div>
);

const ModuleSection = ({ title, icon: Icon, items }: any) => (
  <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-indigo-200 transition-all group">
    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="font-black text-slate-800 mb-4">{title}</h4>
    <ul className="space-y-2">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EntityItem = ({ name, fields }: any) => (
  <div className="p-3 bg-white border border-slate-200 rounded-xl">
    <p className="font-black text-slate-800 text-xs mb-1">{name}</p>
    <div className="flex flex-wrap gap-1">
      {fields.map((f: string) => (
        <span key={f} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{f}</span>
      ))}
    </div>
  </div>
);

const OnboardingStep = ({ step, title, desc }: any) => (
  <div className="flex gap-6 items-start">
    <span className="text-lg font-black text-indigo-200 font-mono mt-1">{step}</span>
    <div>
      <h5 className="font-black text-slate-800 mb-1">{title}</h5>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const LifecycleTask = ({ icon: Icon, title, desc, iconColor = "text-indigo-600" }: any) => (
  <div className="flex gap-4">
    <div className={`p-3 bg-white rounded-2xl shadow-sm border border-slate-100 ${iconColor}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h5 className="text-sm font-black text-slate-800 mb-1">{title}</h5>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const RepoCard = ({ name, icon: Icon, type, desc }: any) => (
  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-xl transition-all">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{type}</p>
        <h5 className="text-sm font-black text-slate-800">{name}</h5>
      </div>
    </div>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const PhaseItem = ({ phase, title, status }: any) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-black text-indigo-400">{phase}</span>
      <span className="text-xs font-bold text-slate-300">{title}</span>
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
      status === 'Complete' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
      status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30 animate-pulse' :
      'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }`}>
      {status}
    </span>
  </div>
);

const PortalCapability = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4 group/item">
    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-white group-hover/item:text-slate-900 transition-all">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="text-sm font-black mb-1">{title}</h4>
      <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);
