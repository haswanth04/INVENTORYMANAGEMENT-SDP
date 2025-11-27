import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  TruckIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ExclamationTriangleIcon,
  UserIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, hasAnyRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      roles: ['ADMIN', 'MANAGER', 'STAFF'],
      description: 'Overview and analytics'
    },
    {
      name: 'User Management',
      href: '/users',
      icon: UsersIcon,
      roles: ['ADMIN'],
      description: 'Complete user lifecycle management'
    },
    {
      name: 'System Analytics',
      href: '/reports',
      icon: DocumentChartBarIcon,
      roles: ['ADMIN'],
      description: 'Business intelligence and system analytics'
    },
    {
      name: 'System Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      roles: ['ADMIN'],
      description: 'System configuration and administration'
    },
    {
      name: 'Inventory Management',
      href: '/inventory',
      icon: CubeIcon,
      roles: ['MANAGER'],
      description: 'Product catalog and inventory operations'
    },
    {
      name: 'Supplier Management',
      href: '/suppliers',
      icon: TruckIcon,
      roles: ['MANAGER'],
      description: 'Vendor relations and supplier operations'
    },
    {
      name: 'Task Management',
      href: '/task-management',
      icon: ClipboardDocumentListIcon,
      roles: ['MANAGER'],
      description: 'Assign and manage tasks for staff'
    },
    {
      name: 'Stock Management',
      href: '/stock',
      icon: CubeIcon,
      roles: ['STAFF'],
      description: 'Daily stock operations and updates'
    },
    {
      name: 'My Tasks',
      href: '/tasks',
      icon: ClipboardDocumentListIcon,
      roles: ['STAFF'],
      description: 'Personal tasks and assignments'
    },
    {
      name: 'Profile Settings',
      href: '/profile',
      icon: UserIcon,
      roles: ['ADMIN', 'MANAGER', 'STAFF'],
      description: 'Personal settings'
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: ExclamationTriangleIcon,
      roles: ['ADMIN', 'MANAGER', 'STAFF'],
      description: 'Alerts and notifications'
    }
  ];

  const filteredMenuItems = menuItems.filter(item =>
    hasAnyRole(item.roles)
  );

  const navItemClasses = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-2 rounded-2xl text-sm font-medium transition duration-200 ${
      isActive
        ? 'bg-white/15 text-white shadow-lg shadow-primary-500/20'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950/60 border-r border-white/10 text-white">
      <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Aurora</p>
          <h2 className="text-xl font-semibold tracking-tight">Inventory Cloud</h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
        >
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mb-8 glass-panel px-4 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-1">Current session</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-lg font-semibold">
              {user?.username?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.username || 'Guest'}</p>
              <p className="text-xs text-white/60">{user?.role || 'Role pending'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-4 text-white/60 text-sm">
              <p>No menu items available for your role</p>
            </div>
          ) : (
            filteredMenuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={navItemClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-[11px] text-white/40 tracking-wide">{item.description}</span>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>

      <div className="px-5 py-5 border-t border-white/10 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 btn-secondary"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
        <p className="text-[11px] text-white/40">
          Secured session • {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur transition"
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>

      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-30">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;