import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, TrendingUp, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Trust Score', path: '/trust', icon: ShieldCheck },
    { name: 'Insights', path: '/insights', icon: TrendingUp },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
              <span className="text-white font-display font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
              MarketLink
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-600 ${
                    isActive ? 'text-primary-600' : 'text-slate-600'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
            <div className="ml-4 flex items-center gap-3 pl-8 border-l border-slate-200">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900 leading-none">Ama Mensah</p>
                <p className="text-[10px] text-slate-500">Tomato Trader</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden ring-2 ring-primary-50">
                <span className="text-sm font-bold text-primary-600">AM</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
            <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4 px-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200">
                <span className="text-lg font-bold text-primary-700">AM</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Ama Mensah</p>
                <p className="text-xs text-slate-500">Tomato Trader</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar (as per request) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-primary-600 scale-110' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-6 h-6 ${isActive ? 'fill-primary-100' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
        <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-primary-600 scale-110' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <User className={`w-6 h-6 ${isActive ? 'fill-primary-100' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
              </>
            )}
          </NavLink>
      </div>
    </nav>
  );
};
