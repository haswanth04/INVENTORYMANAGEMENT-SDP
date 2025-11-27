import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../utils/api';
import {
  UsersIcon,
  CubeIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
  SparklesIcon,
  ArrowPathIcon,
  BellAlertIcon,
  CheckBadgeIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockCount: 0,
    totalSuppliers: 0,
    totalUsers: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchLowStockProducts();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchLowStockProducts = async () => {
    try {
      const response = await apiService.getProducts();
      const lowStock = response.data.filter(product => product.stock <= product.lowStockThreshold);
      setLowStockProducts(lowStock);
    } catch (error) {
      console.error('Failed to fetch low stock products:', error);
      setLowStockProducts([]);
    }
  };

  const normalizedRole = user?.role?.toUpperCase() || 'GUEST';

  const personaCopy = {
    ADMIN: {
      headline: 'Enterprise orchestration for modern ops teams.',
      subtext: 'Control users, governance, and mission-critical signals from one place.',
      badge: 'System view'
    },
    MANAGER: {
      headline: 'Move inventory, suppliers, and teams in one motion.',
      subtext: 'Align fulfilment health, supply resilience, and execution velocity.',
      badge: 'Ops leadership'
    },
    STAFF: {
      headline: 'Update stock with precision and stay ahead of your queue.',
      subtext: 'Every task, alert, and checklist is orchestrated for your shift.',
      badge: 'Execution mode'
    },
    GUEST: {
      headline: 'Welcome to Aurora Inventory Cloud.',
      subtext: 'Unified decision intelligence for forward-looking teams.',
      badge: 'Preview'
    }
  }[normalizedRole] || personaCopy.GUEST;

  const highlightMetrics = [
    {
      label: 'Total products',
      value: stats.totalProducts,
      trend: '+12%',
      tone: 'positive',
      icon: CubeIcon,
      footnote: 'catalog breadth'
    },
    {
      label: 'Low stock alerts',
      value: stats.lowStockCount,
      trend: `${stats.lowStockCount > 5 ? '+6' : '-4'}`,
      tone: stats.lowStockCount > 0 ? 'warning' : 'positive',
      icon: ExclamationTriangleIcon,
      footnote: 'needs review'
    },
    {
      label: 'Total suppliers',
      value: stats.totalSuppliers,
      trend: '+3 onboarded',
      tone: 'neutral',
      icon: TruckIcon,
      footnote: 'active partners'
    },
    {
      label: 'Licensed users',
      value: stats.totalUsers,
      trend: '+2 invites',
      tone: 'neutral',
      icon: UsersIcon,
      footnote: 'workspace members',
      hide: normalizedRole !== 'ADMIN'
    }
  ].filter((metric) => !metric.hide);

  const workflowInsights = [
    {
      title: 'Fulfilment health',
      value: '92%',
      descriptor: 'SLA on track',
      badge: 'Live pulse'
    },
    {
      title: 'Reorder runway',
      value: '18 days',
      descriptor: 'buffered',
      badge: 'Forecast'
    },
    {
      title: 'Team velocity',
      value: '34 tasks',
      descriptor: 'closed today',
      badge: 'Ops tempo'
    }
  ];

  const quickActions = [
    {
      label: 'Raise purchase order',
      action: () => navigate('/inventory'),
      icon: ArrowTrendingUpIcon
    },
    {
      label: 'Alert supplier',
      action: () => navigate('/suppliers'),
      icon: BellAlertIcon
    },
    {
      label: 'Review tasks',
      action: () => navigate('/task-management'),
      icon: CheckBadgeIcon
    },
    {
      label: 'Sync team access',
      action: () => navigate('/users'),
      icon: UsersIcon,
      restricted: normalizedRole !== 'ADMIN'
    }
  ].filter(action => !action.restricted);

  const personaActions = {
    ADMIN: ['users', 'reports', 'settings'],
    MANAGER: ['inventory', 'suppliers', 'task-management'],
    STAFF: ['stock', 'tasks']
  }[normalizedRole] || [];

  const pillActions = personaActions.map((route) => ({
    label: route.replace('-', ' '),
    action: () => navigate(`/${route}`)
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="hero-panel">
        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <p className="badge-soft bg-white/20 text-white"> {personaCopy.badge} </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">
              hey {user?.username || 'team'} — {personaCopy.headline}
            </h2>
            <p className="text-white/70 text-base lg:text-lg max-w-2xl">
              {personaCopy.subtext}
            </p>
            <div className="flex flex-wrap gap-3">
              {pillActions.map((pill) => (
                <button
                  key={pill.label}
                  onClick={pill.action}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.4em] bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 w-full max-w-sm space-y-5">
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-primary-300" />
              <div>
                <p className="text-sm font-semibold">Realtime signals</p>
                <p className="text-xs text-white/60">Refreshed under 20 seconds</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {workflowInsights.map((insight) => (
                <div key={insight.title} className="stat-card text-white">
                  <p className="text-[11px] text-white/60 uppercase tracking-widest">{insight.badge}</p>
                  <p className="text-2xl font-semibold">{insight.value}</p>
                  <p className="text-xs text-white/60">{insight.descriptor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        {highlightMetrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <div className="flex items-center justify-between">
              <p className="metric-card__label">{metric.label}</p>
              <metric.icon className="w-5 h-5 text-white/60" />
            </div>
            <p className="metric-card__value">{metric.value}</p>
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>{metric.footnote}</span>
              <span className={`metric-card__trend ${metric.tone === 'warning' ? 'text-amber-300' : 'text-emerald-300'}`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 page-section">
          <div className="section-title">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-300" />
            Critical stock intelligence
          </div>
          <p className="text-sm text-white/60">Prioritize these SKUs before fulfilment lags ripple downstream.</p>
          <div className="space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="glass-panel p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-3">
                  <ArrowPathIcon className="w-6 h-6" />
                </div>
                <p className="text-white font-semibold">All products are comfortably stocked.</p>
                <p className="text-sm text-white/60">We will surface new alerts the moment thresholds are breached.</p>
              </div>
            ) : (
              lowStockProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="glass-panel p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-300 font-semibold">
                    {product.category?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-white/60">Only {product.stock} units • Min {product.lowStockThreshold}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-white/80">${product.price}</p>
                    <p className="text-white/50">{product.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="page-section space-y-5">
          <div className="section-title">
            <BoltIcon className="w-5 h-5 text-primary-300" />
            Quick actions
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className="w-full glass-panel p-4 flex items-center justify-between hover:bg-white/10 transition"
              >
                <div>
                  <p className="text-sm font-semibold">{action.label}</p>
                  <p className="text-xs text-white/50">One tap workflow</p>
                </div>
                <action.icon className="w-5 h-5 text-white/70" />
              </button>
            ))}
          </div>

          <div className="section-title mt-6">
            <ChartPieIcon className="w-5 h-5 text-emerald-300" />
            Operations digest
          </div>
          <div className="glass-panel p-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Inbound shipments</span>
              <span className="text-emerald-300 font-semibold">+4 scheduled</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Tasks awaiting review</span>
              <span className="text-amber-300 font-semibold">5 approvals</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Supplier escalations</span>
              <span className="text-rose-300 font-semibold">1 critical</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;