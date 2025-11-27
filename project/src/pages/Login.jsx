import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error('Username or email is required');
      return;
    }

    if (!formData.password) {
      toast.error('Password is required');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    setLoading(true);

    try {
      const loginData = {
        ...formData,
        role: formData.role.toUpperCase()
      };

      const result = await login(loginData);

      if (result.success) {
        toast.success('Login successful!');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 120);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const insightCards = [
    {
      label: 'Realtime insights',
      value: '99.9%',
      sublabel: 'system uptime'
    },
    {
      label: 'Fulfilment speed',
      value: '2.4x',
      sublabel: 'faster decisions'
    },
    {
      label: 'Teams onboarded',
      value: '120+',
      sublabel: 'enterprise rollouts'
    }
  ];

  const featureHighlights = [
    {
      icon: SparklesIcon,
      title: 'Unified Control',
      description: 'Single command center for inventory, suppliers, and people.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Role-aware access, audit-ready logs, Zoho-grade safety.'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Decision Intelligence',
      description: 'Forecasting-ready dashboards and proactive alerts.'
    }
  ];

  return (
    <div className="auth-gradient">
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-6 sm:px-12 pt-10 flex items-center justify-between text-white/80">
          <div>
            <p className="pill-badge bg-white/15 text-white text-xs">Inventory OS</p>
            <h1 className="text-2xl font-semibold tracking-tight mt-3">Aurora Inventory Cloud</h1>
          </div>
          <Link to="/register" className="text-sm font-medium hover:text-white transition">
            New to the platform?
          </Link>
        </header>

        <main className="flex-1 w-full px-6 sm:px-12 py-10 flex flex-col lg:flex-row gap-10 items-stretch">
          <section className="flex-1 hidden lg:flex">
            <div className="auth-side-card w-full p-10 flex flex-col gap-10 text-white">
              <div>
                <p className="pill-badge bg-white/10 text-white text-xs">Trusted by ops leaders</p>
                <h2 className="text-4xl font-semibold leading-tight mt-4">
                  Bring the polish of Zoho to every inventory conversation.
                </h2>
                <p className="text-white/70 mt-3 text-base leading-relaxed">
                  Secure single sign-on, humanized workflows, and contextual analytics keep every team in rhythm.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {insightCards.map((card) => (
                  <div key={card.label} className="stat-card">
                    <span className="text-xs uppercase tracking-wide text-white/70">{card.label}</span>
                    <p className="text-2xl font-semibold text-white">{card.value}</p>
                    <span className="text-xs text-white/60">{card.sublabel}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {featureHighlights.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{feature.title}</p>
                      <p className="text-sm text-white/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-white/60">
                <ArrowPathIcon className="w-5 h-5" />
                Continuous delivery. Enterprise SLA. Human support.
              </div>
            </div>
          </section>

          <section className="w-full lg:max-w-lg">
            <div className="auth-card p-10 space-y-8">
              <div className="space-y-3">
                <p className="pill-badge bg-primary-50 text-primary-700 text-xs w-fit">
                  Welcome back
                </p>
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">Sign in securely</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Manage orders, stock, and operations from an enterprise-grade control center.
                  </p>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="auth-label">
                    Work email or username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="auth-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter strong password"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="auth-label">
                    Choose workspace role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="auth-input bg-white"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="Staff">Staff • update stock & log tasks</option>
                    <option value="Manager">Manager • oversee inventory & suppliers</option>
                    <option value="Admin">Admin • full system access</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Keep me signed in
                  </label>
                  <button
                    type="button"
                    className="font-medium text-primary-600 hover:text-primary-700 transition"
                  >
                    Need help?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex justify-center items-center py-3 text-base"
                >
                  {loading ? <LoadingSpinner size="small" text="" /> : 'Access workspace'}
                </button>
              </form>

              <div className="flex items-center gap-3 text-sm">
                <CheckCircleIcon className="w-5 h-5 text-primary-500" />
                <p className="text-gray-500">
                  Protected by adaptive MFA, device trust, and activity alerts.
                </p>
              </div>

              <p className="text-center text-sm text-gray-500">
                Need a new workspace?{' '}
                <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700">
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;