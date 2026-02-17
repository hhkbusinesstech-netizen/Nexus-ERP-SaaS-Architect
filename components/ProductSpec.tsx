
import React from 'react';
import { 
  Users, 
  Zap, 
  ShieldCheck, 
  Globe, 
  BarChart3, 
  CheckCircle2, 
  Smartphone, 
  Boxes,
  ArrowRight,
  Sparkles,
  Factory,
  Store,
  Briefcase,
  Layout,
  CreditCard,
  HardDrive
} from 'lucide-react';

export const ProductSpec: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Strategic Positioning */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Core Positioning
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              Nexus: The Sovereign <br /><span className="text-indigo-600">ERP Control Plane.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              We don't just host ERPNext; we orchestrate high-fidelity, single-tenant environments for mission-critical industrial operations. Nexus bridges the gap between the flexibility of open-source and the polish of Tier-1 SaaS.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100% ERPNext Compatible
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Full Data Residency
              </div>
            </div>
          </div>
          <div className="w-full md:w-96 aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
            <Boxes className="w-32 h-32 text-indigo-600 relative z-10" />
          </div>
        </div>
      </section>

      {/* Core Functional Landscape */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-black text-slate-800">Standard Functional Landscape</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full ERPNext Suite</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FunctionBox icon={CreditCard} title="Accounting" items={['GL & Cost Centers', 'AR/AP Automation', 'Bank Reconciliation', 'Asset Mgmt']} />
          <FunctionBox icon={Users} title="Sales & CRM" items={['Lead Management', 'Quotations & SO', 'Sales Commissions', 'Price Lists']} />
          <FunctionBox icon={HardDrive} title="Supply Chain" items={['Multi-warehouse', 'Serial/Batch Tracking', 'Stock Valuation', 'RFQ Workflows']} />
          <FunctionBox icon={Factory} title="Manufacturing" items={['Multi-level BOM', 'Work Orders', 'Job Cards', 'Quality Control']} />
          <FunctionBox icon={Briefcase} title="HR & Payroll" items={['Localized Payroll', 'Attendance & Leave', 'Expense Claims', 'Recruitment']} />
          <FunctionBox icon={Layout} title="Projects" items={['Task Billing', 'Milestone Mgmt', 'Timesheets', 'Profitability']} />
          <FunctionBox icon={Store} title="Retail & POS" items={['Multi-store Profiles', 'Loyalty Programs', 'Coupons & Returns', 'Shift Mgmt']} />
          <FunctionBox icon={Globe} title="Web & Portals" items={['Frappe Website', 'Customer Portal', 'Vendor Portal', 'E-commerce']} />
        </div>
      </section>

      {/* ICP Cards */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-slate-800 px-1">Ideal Customer Profiles (ICP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ICPCard 
            icon={Factory} 
            title="Industrial Manufacturing" 
            desc="Mid-market factories requiring real-time OEE, IoT shop-floor integration, and complex multi-level BOMs."
            target="Revenue: $10M - $250M"
          />
          <ICPCard 
            icon={Store} 
            title="Multi-Unit Retail" 
            desc="Global brands needing isolated POS instances with unified head-office governance and real-time inventory sync."
            target="Units: 20 - 500+ Locations"
          />
          <ICPCard 
            icon={Briefcase} 
            title="High-Compliance Services" 
            desc="Legal, Medical, or Fintech firms requiring strictly isolated databases and private storage buckets per client."
            target="Compliance: GDPR, HIPAA, SOC2"
          />
        </div>
      </section>

      {/* Plan Tiers */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-slate-800 px-1">Monetization Tiers</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TierCard 
            name="Starter" 
            price="49" 
            features={['100% Core ERPNext', 'Container-level Isolation', 'Daily Automated Backups', 'Shared Infrastructure']}
          />
          <TierCard 
            name="Growth" 
            price="199" 
            featured
            features={['Dedicated App Workers', '5 Marketplace App Licenses', 'Hourly Point-in-time Recovery', 'Priority Bench Orchestration']}
          />
          <TierCard 
            name="Enterprise" 
            price="999" 
            features={['Private MariaDB Cluster', 'Unrestricted Custom Modules', 'Dedicated Compute Nodes', '24/7 Architectural Support']}
          />
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <DiffItem icon={ShieldCheck} title="Bench Sovereignty" desc="Every tenant gets a separate site and DB, eliminating cross-tenant risk." />
          <DiffItem icon={Zap} title="Atomic Deployments" desc="Marketplace apps are provisioned via governed Git workflows." />
          <DiffItem icon={Smartphone} title="Nexus Mobile PWA" desc="White-labeled mobile apps for employees, vendors, and customers." />
          <DiffItem icon={BarChart3} title="AI Architectural Advice" desc="Real-time infrastructure tuning via Gemini-powered analytics." />
        </div>
        <Globe className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 opacity-20" />
      </section>

      {/* Guarantee Banner */}
      <section className="bg-emerald-600 rounded-3xl p-8 text-white flex items-center justify-between shadow-xl shadow-emerald-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight">The Sovereignty Guarantee</h4>
            <p className="text-emerald-100 text-sm">Nexus ensures all 1,200+ ERPNext standard features remain available and unmodified.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all">
          View Compliance Docs
        </button>
      </section>
    </div>
  );
};

const FunctionBox = ({ icon: Icon, title, items }: any) => (
  <div className="p-5 bg-white border border-slate-200 rounded-[2rem] hover:shadow-lg transition-all">
    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-5 h-5" />
    </div>
    <h4 className="font-black text-slate-800 text-sm mb-3">{title}</h4>
    <ul className="space-y-1.5">
      {items.map((it: string) => (
        <li key={it} className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tighter">
          <div className="w-1 h-1 bg-indigo-300 rounded-full" /> {it}
        </li>
      ))}
    </ul>
  </div>
);

const ICPCard = ({ icon: Icon, title, desc, target }: any) => (
  <div className="p-8 bg-white border border-slate-200 rounded-[2rem] hover:border-indigo-400 transition-all group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-lg font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
    <div className="pt-4 border-t border-slate-50 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
      {target}
    </div>
  </div>
);

const TierCard = ({ name, price, features, featured }: any) => (
  <div className={`p-10 rounded-[2.5rem] border ${featured ? 'border-indigo-600 bg-white ring-4 ring-indigo-500/10' : 'border-slate-200 bg-white'} relative overflow-hidden flex flex-col`}>
    {featured && (
      <div className="absolute top-6 right-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-full">Most Popular</div>
    )}
    <h4 className="text-xl font-black text-slate-900 mb-1">{name}</h4>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black text-slate-900">${price}</span>
      <span className="text-slate-400 font-bold text-sm">/mo</span>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${featured ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
      Choose {name} Plan
    </button>
  </div>
);

const DiffItem = ({ icon: Icon, title, desc }: any) => (
  <div className="space-y-4">
    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-indigo-400" />
    </div>
    <h5 className="font-black text-lg text-white leading-tight">{title}</h5>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);
