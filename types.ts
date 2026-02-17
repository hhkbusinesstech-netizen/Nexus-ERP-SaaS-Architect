
export enum AppView {
  DASHBOARD = 'dashboard',
  ARCHITECTURE = 'architecture',
  TENANTS = 'tenants',
  MARKETPLACE = 'marketplace',
  PORTALS = 'portals',
  INFRASTRUCTURE = 'infrastructure',
  PRODUCT_SPEC = 'product-spec'
}

export interface TenantLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export interface TenantRole {
  id: string;
  name: string;
  description: string;
  modules: string[]; // List of module IDs this role can access
}

export interface TenantUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
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
  provisioningProgress?: number;
  currentStep?: string;
  logs?: TenantLog[];
  roles?: TenantRole[];
  users?: TenantUser[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface MarketplaceModule {
  id: string;
  name: string;
  categories: string[];
  description: string;
  price: number;
  rating: number;
  icon: string;
  version: string;
  changelog: ChangelogEntry[];
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
  activeSessions: number;
}
