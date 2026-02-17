
import React from 'react';
import { Search, Filter, MoreVertical, CheckCircle2, Clock, Ban } from 'lucide-react';
import { Tenant } from '../types';

const mockTenants: Tenant[] = [
  { id: '1', name: 'Acme Manufacturing', subdomain: 'acme.nexus.erp', status: 'active', plan: 'Enterprise', region: 'us-east-1', modules: ['CRM', 'Stocks', 'Manufacturing'], createdAt: '2023-10-01' },
  { id: '2', name: 'Global Retailers', subdomain: 'global.nexus.erp', status: 'provisioning', plan: 'Professional', region: 'eu-west-1', modules: ['POS', 'Retail'], createdAt: '2023-11-15' },
  { id: '3', name: 'Tech Services Inc', subdomain: 'tech.nexus.erp', status: 'active', plan: 'Basic', region: 'ap-south-1', modules: ['Support', 'Projects'], createdAt: '2023-09-20' },
  { id: '4', name: 'Old Client Corp', subdomain: 'legacy.nexus.erp', status: 'suspended', plan: 'Basic', region: 'us-west-2', modules: ['Accounting'], createdAt: '2022-05-10' },
];

export const TenantManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by tenant name, domain, or ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tenant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Isolation Details</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Plan & Region</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-800">{tenant.name}</p>
                    <p className="text-xs text-indigo-600 font-mono">{tenant.subdomain}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {tenant.modules.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-semibold text-slate-700">{tenant.plan}</p>
                    <p className="text-slate-400 text-xs">{tenant.region}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={tenant.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Tenant['status'] }> = ({ status }) => {
  const configs = {
    active: { icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    provisioning: { icon: Clock, class: 'bg-blue-50 text-blue-700 border-blue-100' },
    suspended: { icon: Ban, class: 'bg-rose-50 text-rose-700 border-rose-100' },
  };

  const { icon: Icon, class: className } = configs[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
