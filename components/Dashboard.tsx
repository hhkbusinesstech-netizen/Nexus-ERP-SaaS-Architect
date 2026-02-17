
import React from 'react';
import { 
  Activity, 
  Users, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', active: 4000, new: 240 },
  { name: 'Tue', active: 3000, new: 139 },
  { name: 'Wed', active: 2000, new: 980 },
  { name: 'Thu', active: 2780, new: 390 },
  { name: 'Fri', active: 1890, new: 480 },
  { name: 'Sat', active: 2390, new: 380 },
  { name: 'Sun', active: 3490, new: 430 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tenants" value="1,284" icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="System Health" value="99.98%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="MRR (SaaS)" value="$42,500" icon={DollarSign} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard title="Security Alerts" value="0" icon={ShieldCheckIcon} color="text-slate-600" bg="bg-slate-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provisioning Queue */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Growth Analytics</h3>
            <select className="text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="active" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Orchestration Logs</h3>
          <div className="space-y-4">
            {[
              { time: '12:45', event: 'Tenant Site Created', site: 'acme-inc.nexus.erp', color: 'text-emerald-500' },
              { time: '12:40', event: 'Redis Cache Flushed', site: 'global-proxy', color: 'text-blue-500' },
              { time: '12:32', event: 'Custom App Install', site: 'retail-chain-v4', color: 'text-indigo-500' },
              { time: '12:15', event: 'Suspension Warning', site: 'test-user-99', color: 'text-amber-500' },
              { time: '11:58', event: 'Worker Restart', site: 'frappe-bench-01', color: 'text-slate-500' },
            ].map((log, idx) => (
              <div key={idx} className="flex gap-3 text-xs border-b border-slate-50 pb-3 last:border-0">
                <span className="text-slate-400 font-mono">{log.time}</span>
                <div>
                  <p className="font-semibold text-slate-700">{log.event}</p>
                  <p className="text-slate-400">{log.site}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-xs text-indigo-600 font-medium hover:underline flex items-center justify-center gap-1">
            View All Logs <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string; bg: string }> = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-slate-800 mt-1">{value}</h4>
      <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-medium">
        <TrendingUp className="w-3 h-3" />
        <span>+4.5% vs LW</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg ${bg}`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  </div>
);

const ShieldCheckIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
