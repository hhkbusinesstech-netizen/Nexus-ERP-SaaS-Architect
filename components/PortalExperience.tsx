
import React, { useState } from 'react';
import { 
  Factory, 
  ShoppingCart, 
  ChevronRight, 
  Users, 
  FileText, 
  Truck, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck, 
  Boxes, 
  Activity, 
  CheckCircle2,
  PieChart,
  Download,
  Search,
  Layout,
  UserCheck,
  Briefcase,
  Zap,
  Lock,
  Globe,
  Smartphone,
  BarChart3,
  ClipboardList,
  CalendarDays,
  Coins
} from 'lucide-react';

type PortalType = 'vendor' | 'customer' | 'employee';

export const PortalExperience: React.FC = () => {
  const [activePortal, setActivePortal] = useState<PortalType>('vendor');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Premium Tab Navigation */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-1.5 flex gap-1 max-w-3xl mx-auto">
        <PortalTab 
          active={activePortal === 'vendor'} 
          onClick={() => setActivePortal('vendor')} 
          icon={Factory} 
          label="Vendor Portal" 
        />
        <PortalTab 
          active={activePortal === 'customer'} 
          onClick={() => setActivePortal('customer')} 
          icon={ShoppingCart} 
          label="Customer Portal" 
        />
        <PortalTab 
          active={activePortal === 'employee'} 
          onClick={() => setActivePortal('employee')} 
          icon={UserCheck} 
          label="Employee Portal" 
        />
      </div>

      <div className="animate-in slide-in-from-bottom-4 duration-500">
        {activePortal === 'vendor' && <VendorPreview />}
        {activePortal === 'customer' && <CustomerPreview />}
        {activePortal === 'employee' && <EmployeePreview />}
      </div>
    </div>
  );
};

const PortalTab: React.FC<{ active: boolean; onClick: () => void; icon: any; label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-[1.5rem] font-black text-sm transition-all ${
      active 
        ? 'bg-slate-900 text-white shadow-xl' 
        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-indigo-400' : ''}`} />
    {label}
  </button>
);

const VendorPreview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Vendor Operating System</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Single-Tenant Supply Chain Interface</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-1.5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-200 uppercase tracking-widest flex items-center gap-1.5">
               <ShieldCheck className="w-4 h-4" /> Global Verified Partner
             </div>
          </div>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatSmall label="Open RFQs" value="12" color="bg-blue-50 text-blue-600" />
            <StatSmall label="Active POs" value="48" color="bg-emerald-50 text-emerald-600" />
            <StatSmall label="Avg Score" value="98.2" color="bg-indigo-50 text-indigo-600" />
          </div>

          <section>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
              <Boxes className="w-4 h-4" /> Core Functional Blueprint
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CapabilityItem 
                icon={FileText} 
                title="Sourcing & Bidding" 
                desc="Participate in RFQs, submit secure quotations, and track bid status in real-time." 
              />
              <CapabilityItem 
                icon={Truck} 
                title="Logistics Orchestration" 
                desc="Submit Advanced Shipping Notices (ASN) and sync with tenant production schedules." 
              />
              <CapabilityItem 
                icon={CreditCard} 
                title="Finance & Treasury" 
                desc="Submit purchase invoices and monitor payment remittances across all linked sites." 
              />
              <CapabilityItem 
                icon={MessageSquare} 
                title="Supplier Collaboration" 
                desc="Shared dispute threads and technical spec collaboration with tenant engineering." 
              />
            </div>
          </section>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
             <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security & Data Sovereignty</h4>
                <Lock className="w-4 h-4 text-slate-300" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SecurityFeature icon={ShieldCheck} label="Site-Isolated Authentication" />
                <SecurityFeature icon={Lock} label="End-to-End Doc Encryption" />
                <SecurityFeature icon={Globe} label="Regional Data Residency" />
                <SecurityFeature icon={Smartphone} label="MFA Enforcement" />
             </div>
          </section>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col h-full border border-slate-800">
        <h4 className="text-xl font-black mb-6 tracking-tight">Vendor Experience</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Nexus provides a world-class workspace for your suppliers to operate as a seamless extension of your own factory floor.
        </p>
        <ul className="space-y-5 flex-1">
          <FeatureCheck label="Profile & Banking Management" />
          <FeatureCheck label="Multi-Doc Compliance Center" />
          <FeatureCheck label="Direct API Integration" />
          <FeatureCheck label="Bulk Shipping Manifests" />
          <FeatureCheck label="Real-time Stock Visibility" />
          <FeatureCheck label="Consolidated Remittances" />
        </ul>
        <div className="mt-10 pt-10 border-t border-white/10">
          <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
            Preview Live Vendor UX
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  </div>
);

const CustomerPreview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-indigo-50/20">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Customer Commerce Hub</h3>
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-1">B2B Omni-Channel Interface</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full border border-indigo-700 uppercase tracking-widest shadow-lg shadow-indigo-100">
               Premium Account
             </div>
          </div>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatSmall label="Open Orders" value="06" color="bg-indigo-50 text-indigo-600" />
            <StatSmall label="Statement Bal" value="$12,450" color="bg-rose-50 text-rose-600" />
            <StatSmall label="Rewards Pts" value="4,200" color="bg-amber-50 text-amber-600" />
          </div>

          <section>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Functional Commerce Sets
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CapabilityItem 
                icon={Boxes} 
                title="B2B E-Commerce" 
                desc="Advanced catalog-driven ordering with contract-specific pricing and discount rules." 
              />
              <CapabilityItem 
                icon={Activity} 
                title="Real-time Logistics" 
                desc="Track every shipment lifecycle from production floor to last-mile delivery." 
              />
              <CapabilityItem 
                icon={PieChart} 
                title="Financial Analytics" 
                desc="Download account statements, aging reports, and tax-compliant digital invoices." 
              />
              <CapabilityItem 
                icon={Download} 
                title="Technical Vault" 
                desc="Access technical documentation, warranties, and shared asset libraries for purchased items." 
              />
            </div>
          </section>

          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10 flex items-center justify-between">
                <div className="max-w-md">
                   <h4 className="text-lg font-black mb-2">Omni-Channel Visibility</h4>
                   <p className="text-indigo-100 text-xs leading-relaxed">Customers can manage their entire relationship across mobile, web, and internal API integrations from a single control point.</p>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-md">
                  <Smartphone className="w-8 h-8" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col h-full border border-indigo-500">
        <h4 className="text-xl font-black mb-6 tracking-tight">Customer Features</h4>
        <ul className="space-y-5 flex-1">
          <FeatureCheck label="Contract Price Engine" />
          <FeatureCheck label="Project Lifecycle View" />
          <FeatureCheck label="Instant Checkout (Stripe)" />
          <FeatureCheck label="Automated Tax Recalcs" />
          <FeatureCheck label="Support Ticket Desk" />
          <FeatureCheck label="Consolidated Invoicing" />
        </ul>
        <div className="mt-10 pt-10 border-t border-white/10">
          <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-xl active:scale-95">
            Preview Live Customer UX
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  </div>
);

const EmployeePreview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-blue-50/20">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Internal Employee OS</h3>
            <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mt-1">HR & Self-Service Portal</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-1.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full border border-blue-200 uppercase tracking-widest">
               Staff Identity Verified
             </div>
          </div>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatSmall label="Payroll Status" value="Processing" color="bg-blue-50 text-blue-600" />
            <StatSmall label="Leave Bal" value="14 Days" color="bg-emerald-50 text-emerald-600" />
            <StatSmall label="Performance" value="Exceeds" color="bg-purple-50 text-purple-600" />
          </div>

          <section>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Self-Service Capabilities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CapabilityItem 
                icon={Coins} 
                title="Payroll & Benefits" 
                desc="Download tax-compliant payslips, manage bank details, and view benefits overview." 
              />
              <CapabilityItem 
                icon={CalendarDays} 
                title="Time & Attendance" 
                desc="Request leaves, log timesheets directly to projects, and view shifts." 
              />
              <CapabilityItem 
                icon={BarChart3} 
                title="OKRs & Development" 
                desc="Track career goals, review performance cycles, and access training materials." 
              />
              <CapabilityItem 
                icon={ClipboardList} 
                title="Expense Claims" 
                desc="Submit business expenses with OCR-receipt processing and automated approval routes." 
              />
            </div>
          </section>

          <div className="bg-blue-600 rounded-[2rem] p-8 text-white flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-white/20 rounded-2xl">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                   <h4 className="text-lg font-black mb-1">Company-wide Transparency</h4>
                   <p className="text-blue-100 text-xs">Access internal announcements, policies, and the corporate directory.</p>
                </div>
             </div>
             <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">
               Browse Directory
             </button>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-blue-700 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col h-full border border-blue-600">
        <h4 className="text-xl font-black mb-6 tracking-tight">Staff Experience</h4>
        <ul className="space-y-5 flex-1">
          <FeatureCheck label="HR Self-Service Center" />
          <FeatureCheck label="Project Timesheet Sync" />
          <FeatureCheck label="Automated Tax Filing" />
          <FeatureCheck label="Shift Exchange Desk" />
          <FeatureCheck label="Peer-to-Peer Kudos" />
          <FeatureCheck label="Training Academy" />
        </ul>
        <div className="mt-10 pt-10 border-t border-white/10">
          <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-xl active:scale-95">
            Preview Staff Experience
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  </div>
);

const StatSmall = ({ label, value, color }: any) => (
  <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
    <p className={`text-2xl font-black ${color.split(' ')[1]}`}>{value}</p>
  </div>
);

const CapabilityItem = ({ icon: Icon, title, desc }: any) => (
  <div className="p-7 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-indigo-200 transition-all group">
    <div className="flex gap-5">
      <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-base font-black text-slate-800 mb-1.5">{title}</h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const SecurityFeature = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
     <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
       <Icon className="w-4 h-4" />
     </div>
     <span className="text-[11px] font-bold text-slate-600">{label}</span>
  </div>
);

const FeatureCheck = ({ label }: { label: string }) => (
  <li className="flex items-center gap-3 text-xs font-bold text-white/90">
    <div className="w-6 h-6 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
      <CheckCircle2 className="w-4 h-4 text-white" />
    </div>
    {label}
  </li>
);
