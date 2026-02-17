
import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  Server,
  ChevronRight
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Control Plane', icon: LayoutDashboard },
    { id: AppView.ARCHITECTURE, label: 'System Design', icon: Layers },
    { id: AppView.TENANTS, label: 'Tenants & Isolation', icon: Users },
    { id: AppView.MARKETPLACE, label: 'App Marketplace', icon: ShoppingBag },
    { id: AppView.PORTALS, label: 'Experience Portals', icon: ShieldCheck },
    { id: AppView.INFRASTRUCTURE, label: 'Infra Metrics', icon: Server },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-4 flex flex-col z-50">
      <div className="mb-8 p-4 bg-indigo-600 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Layers className="text-indigo-600 w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Nexus ERP</span>
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-widest text-indigo-200 font-semibold">
          SaaS Architect v3.1
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              currentView === item.id 
              ? 'bg-slate-800 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-indigo-400' : ''}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {currentView === item.id && <ChevronRight className="w-4 h-4 text-indigo-400" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <img 
            src="https://picsum.photos/seed/arch/100/100" 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-slate-700" 
          />
          <div>
            <p className="text-xs font-semibold">Lead Architect</p>
            <p className="text-[10px] text-slate-500">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
