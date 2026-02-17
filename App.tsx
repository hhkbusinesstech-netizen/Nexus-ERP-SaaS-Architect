
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ArchitectureDoc } from './components/ArchitectureDoc';
import { TenantManager } from './components/TenantManager';
import { Marketplace } from './components/Marketplace';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.ARCHITECTURE:
        return <ArchitectureDoc />;
      case AppView.TENANTS:
        return <TenantManager />;
      case AppView.MARKETPLACE:
        return <Marketplace />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 transition-all duration-300 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">
              {currentView.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 text-sm">Nexus ERP SaaS Orchestration Control Plane</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Docs
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
              Deploy New Instance
            </button>
          </div>
        </header>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
