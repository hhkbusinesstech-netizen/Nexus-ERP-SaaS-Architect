
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  Activity, 
  Globe, 
  Zap, 
  ShieldCheck, 
  HardDrive, 
  RefreshCw, 
  ArrowUpRight,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { time: '00:00', load: 45, latency: 120 },
  { time: '04:00', load: 32, latency: 95 },
  { time: '08:00', load: 68, latency: 150 },
  { time: '12:00', load: 85, latency: 180 },
  { time: '16:00', load: 72, latency: 160 },
  { time: '20:00', load: 55, latency: 130 },
  { time: '23:59', load: 48, latency: 115 },
];

const regionData = [
  { name: 'US-East-1', sites: 450, health: 99.9, color: '#4f46e5' },
  { name: 'EU-West-1', sites: 320, health: 100, color: '#10b981' },
  { name: 'AP-South-1', sites: 280, health: 99.8, color: '#f59e0b' },
  { name: 'US-West-2', sites: 234, health: 100, color: '#3b82f6' },
];

export const InfrastructureMetrics: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 leading-none">Global Infrastructure Mesh</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Telemetry: Node Pool v4.1
            </p>
          </div>
        </div>
        <button 
          onClick={refreshMetrics}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Refresh Node States
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={Cpu} label="Global CPU Load" value="58.4%" trend="+2.4%" color="text-indigo-600" bg="bg-indigo-50" />
        <MetricCard icon={HardDrive} label="Storage Throughput" value="1.2 GB/s" trend="-0.5%" color="text-blue-600" bg="bg-blue-50" />
        <MetricCard icon={Globe} label="Request Latency" value="142ms" trend="-12ms" color="text-emerald-600" bg="bg-emerald-50" />
        <MetricCard icon={ShieldCheck} label="Security Blocked" value="2.4k" trend="+140" color="text-rose-600" bg="bg-rose-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 flex items-center gap-3">
              <Activity className="w-5 h-5 text-indigo-600" /> Compute Load Heatmap
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-400">Gunicorn Workers</span>
            </div>
          </div>
          <div className="p-8 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="load" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100">
            <h3 className="font-black text-slate-800 flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-600" /> Regional Site Density
            </h3>
          </div>
          <div className="p-8 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} width={80} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sites" radius={[0, 4, 4, 0]} barSize={32}>
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl overflow-hidden relative group">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-black text-lg">MariaDB Cluster Health</h4>
                <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Dedicated Multi-Tenant Persistence Layer</p>
              </div>
            </div>
            <div className="space-y-6">
              <DBNode label="Master Node 01" status="Primary" load="42%" region="us-east-1" />
              <DBNode label="Slave Node 02" status="Replica" load="28%" region="eu-west-1" />
              <DBNode label="Slave Node 03" status="Replica" load="31%" region="ap-south-1" />
            </div>
          </div>
          <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 backdrop-blur-sm">
            <h4 className="text-white font-black text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Zap className="w-4 h-4 text-amber-400" /> Edge Proxy Performance
            </h4>
            <div className="space-y-4">
              <EdgeStat label="Cache Hit Ratio" value="94.8%" color="text-emerald-400" />
              <EdgeStat label="TLS Handshake" value="22ms" color="text-indigo-400" />
              <EdgeStat label="Global WAF Mitigation" value="Active" color="text-emerald-400" />
              <div className="pt-4 border-t border-white/10 mt-4">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg hover:bg-indigo-700 transition-all">
                  Access Orchestrator Terminal <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, trend, color, bg }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
    </div>
  </div>
);

const DBNode = ({ label, status, load, region }: any) => (
  <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-800 text-indigo-400 rounded-xl flex items-center justify-center border border-slate-700">
        <Server className="w-5 h-5" />
      </div>
      <div>
        <p className="text-white font-black text-sm">{label}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{region}</p>
      </div>
    </div>
    <div className="text-right">
      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${status === 'Primary' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'}`}>
        {status}
      </span>
      <p className="text-slate-400 text-xs font-mono mt-1">Load: {load}</p>
    </div>
  </div>
);

const EdgeStat = ({ label, value, color }: any) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <span className={`text-sm font-black ${color}`}>{value}</span>
  </div>
);
