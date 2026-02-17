
import React, { useState } from 'react';
import { ShoppingBag, Star, Download, ShieldCheck, Factory, Store, Truck, LayoutGrid, Settings, Puzzle } from 'lucide-react';
import { MarketplaceModule } from '../types';

const modules: MarketplaceModule[] = [
  { id: '1', name: 'Nexus Manufacturing Pro', category: 'vertical', description: 'Advanced OEE tracking, IoT integration, and multi-level BOM management.', price: 149, rating: 4.9, icon: 'factory' },
  { id: '2', name: 'Omni Retail Plus', category: 'vertical', description: 'Unified POS for multi-store networks with real-time inventory sync.', price: 99, rating: 4.8, icon: 'store' },
  { id: '3', name: 'Logistics Core', category: 'vertical', description: 'Fleet management, driver apps, and automated routing for ERPNext.', price: 199, rating: 4.7, icon: 'truck' },
  { id: '4', name: 'Stripe Direct Connect', category: 'utility', description: 'Native payment integration with automated ledger reconciliation.', price: 0, rating: 5.0, icon: 'shield' },
  { id: '5', name: 'HubSpot Sync', category: 'integration', description: 'Bi-directional synchronization for leads, contacts, and deals.', price: 49, rating: 4.6, icon: 'shield' },
  { id: '6', name: 'AWS S3 Storage Adapter', category: 'utility', description: 'Securely offload tenant attachments to private AWS S3 buckets.', price: 29, rating: 4.9, icon: 'shield' },
];

type FilterType = 'all' | 'vertical' | 'utility' | 'integration';

export const Marketplace: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredModules = activeFilter === 'all' 
    ? modules 
    : modules.filter(m => m.category === activeFilter);

  const filterItems: { id: FilterType; label: string; icon: any }[] = [
    { id: 'all', label: 'All Apps', icon: LayoutGrid },
    { id: 'vertical', label: 'Verticals', icon: Factory },
    { id: 'utility', label: 'Utilities', icon: Settings },
    { id: 'integration', label: 'Integrations', icon: Puzzle },
  ];

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-2">Vertical Industry Solutions</h2>
          <p className="text-indigo-100 opacity-90 mb-6">Provision specialized ERPNext modules for your tenants with one click. 100% governed, auto-updating, and isolated.</p>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-indigo-50 transition-colors">
            Learn About Governance
          </button>
        </div>
        <ShoppingBag className="absolute -right-12 -bottom-12 w-64 h-64 text-indigo-500 opacity-20 rotate-12" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
        {filterItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all relative ${
              activeFilter === item.id 
                ? 'text-indigo-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
            {activeFilter === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map((mod) => (
            <div key={mod.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-indigo-200 hover:shadow-md transition-all group">
              <div className="mb-4 flex justify-between items-start">
                <ModuleIcon type={mod.icon as any} />
                <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase rounded border border-slate-100">
                  {mod.category}
                </span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{mod.name}</h4>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">{mod.rating}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-6 flex-1">{mod.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-sm font-black text-slate-800">
                  {mod.price === 0 ? 'FREE' : `$${mod.price}/mo`}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-all text-xs font-bold">
                  <Download className="w-3.5 h-3.5" />
                  Install
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No apps found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Bottom Managed Section */}
      <div className="bg-slate-900 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Governed Custom Modules</h3>
            <p className="text-slate-400 text-sm">Need custom code? Upload your Frappe apps to our secure repository. Our orchestrator performs automated security audits and dependency checks before deploying to your tenant sites.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
              Audit Logs
            </button>
            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all whitespace-nowrap">
              Upload Custom App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleIcon: React.FC<{ type: 'factory' | 'store' | 'truck' | 'shield' }> = ({ type }) => {
  const icons = {
    factory: { i: Factory, c: 'bg-emerald-50 text-emerald-600' },
    store: { i: Store, c: 'bg-blue-50 text-blue-600' },
    truck: { i: Truck, c: 'bg-indigo-50 text-indigo-600' },
    shield: { i: ShieldCheck, c: 'bg-amber-50 text-amber-600' },
  };

  const { i: Icon, c: className } = icons[type] || icons.shield;
  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${className}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
};
