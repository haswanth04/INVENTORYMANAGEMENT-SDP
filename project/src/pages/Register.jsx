import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  UserPlusIcon,
  GlobeAltIcon,
  BoltIcon,
  EnvelopeOpenIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // No default role - user must select
  });
  const [loading, setLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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
      toast.error('Username is required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.password) {
      toast.error('Password is required');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase()
      });

      if (result.success) {
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 120);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onboardingMoments = [
    { title: 'Invite your core team', description: 'Add managers, buyers, and finance reviewers.' },
    { title: 'Connect suppliers', description: 'Sync catalogs, contracts, and delivery SLAs.' },
    { title: 'Automate alerts', description: 'Configure low-stock, SLA breach, and approval nudges.' }
  ];

  return (
    <div className="auth-gradient">
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-6 sm:px-12 pt-10 flex items-center justify-between text-white/80">
          <div>
            <p className="pill-badge bg-white/15 text-white text-xs">Inventory OS</p>
            <h1 className="text-2xl font-semibold tracking-tight mt-3">Aurora Inventory Cloud</h1>
          </div>
          <Link to="/login" className="text-sm font-medium hover:text-white transition">
            Back to sign in
          </Link>
        </header>

        <main className="flex-1 w-full px-6 sm:px-12 py-10 flex flex-col lg:flex-row gap-10 items-stretch">
          <section className="flex-1 hidden lg:flex">
            <div className="auth-side-card w-full p-10 flex flex-col gap-10 text-white">
              <div>
                <p className="pill-badge bg-secondary-500/20 text-white text-xs">Launch in minutes</p>
                <h2 className="text-4xl font-semibold leading-tight mt-4">
                  Build a Zoho-grade experience for every inventory stakeholder.
                </h2>
                <p className="text-white/70 mt-3 text-base leading-relaxed">
                  Centralize procurement, automate approvals, and energize collaboration from day one.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: UserPlusIcon, label: 'Users onboarded', value: '15k+' },
                  { icon: GlobeAltIcon, label: 'Countries', value: '42' },
                  { icon: BoltIcon, label: 'Automation recipes', value: '280+' }
                ].map((item) => (
                  <div key={item.label} className="stat-card text-white">
                    <item.icon className="w-6 h-6 text-white/80" />
                    <p className="text-2xl font-semibold mt-2">{item.value}</p>
                    <span className="text-xs uppercase tracking-wide text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {onboardingMoments.map((moment) => (
                  <div key={moment.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <EnvelopeOpenIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{moment.title}</p>
                      <p className="text-sm text-white/70">{moment.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-white/60">
                <CheckBadgeIcon className="w-5 h-5" />
                SOC 2 Type II • GDPR-ready • Region-aware hosting
              </div>
            </div>
          </section>

          <section className="w-full lg:max-w-lg">
            <div className="auth-card p-10 space-y-8">
              <div className="space-y-3">
                <p className="pill-badge bg-secondary-50 text-secondary-700 text-xs w-fit">
                  Start your workspace
                </p>
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">Create an account</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Seamless provisioning, granular controls, and premium support for every tier.
                  </p>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="auth-label">
                    Full name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Avery Collins"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="auth-label">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="inventory@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="auth-label">
                    Primary role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="auth-input bg-white"
                    required
                  >
                    <option value="">Choose a role</option>
                    <option value="Staff">Staff • update stock & execute tasks</option>
                    <option value="Manager">Manager • coordinate suppliers & analytics</option>
                    <option value="Admin">Admin • configure policies & teams</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="auth-label">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="auth-input"
                      placeholder="Repeat password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex justify-center items-center py-3 text-base"
                >
                  {loading ? <LoadingSpinner size="small" text="" /> : 'Create workspace'}
                </button>
              </form>

              <div className="space-y-3 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 inline-block" />
                  30-day concierge onboarding for every plan.
                </p>
                <p>
                  Already invited?{' '}
                  <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
                    Sign in with your workspace link
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Register;