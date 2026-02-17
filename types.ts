
export enum AppView {
  DASHBOARD = 'dashboard',
  ARCHITECTURE = 'architecture',
  TENANTS = 'tenants',
  MARKETPLACE = 'marketplace',
  PORTALS = 'portals',
  INFRASTRUCTURE = 'infrastructure'
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'provisioning' | 'suspended';
  plan: 'Basic' | 'Professional' | 'Enterprise';
  region: string;
  modules: string[];
  createdAt: string;
}

export interface MarketplaceModule {
  id: string;
  name: string;
  category: 'vertical' | 'utility' | 'integration';
  description: string;
  price: number;
  rating: number;
  icon: string;
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
  activeSessions: number;
}
