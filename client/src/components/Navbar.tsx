import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, PieChart, Volume2, VolumeX, Store, LogOut, User } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { useAuth } from '../context/AuthContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

  .nav-root { position: fixed; z-index: 50; width: 100%; transition: all 0.3s; }
  
  .nav-stripe {
    height: 6px;
    background: repeating-linear-gradient(
      90deg,
      #FFB400 0, #FFB400 60px,
      #E63B1E 60px, #E63B1E 120px,
      #00A86B 120px, #00A86B 180px,
      #1A0A00 180px, #1A0A00 240px
    );
  }

  .nav-desktop {
    background: rgba(26, 10, 0, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px 40px;
    display: flex; justify-content: space-between; align-items: center;
  }
  @media (max-width: 768px) { .nav-desktop { display: none; } }

  .nav-logo { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 20px; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; }
  .nav-logo span { color: #FFB400; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link { 
    color: rgba(255,255,255,0.4); text-decoration: none; 
    font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px; 
    text-transform: uppercase; letter-spacing: 1.5px;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .nav-link:hover, .nav-link.active { color: #FFB400; }

  .nav-mobile {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #1A0A00;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: grid; grid-template-columns: repeat(5, 1fr);
    padding: 12px 10px 30px;
    z-index: 100;
  }
  @media (min-width: 769px) { .nav-mobile { display: none; } }

  .nav-mob-item {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: rgba(255,255,255,0.3); text-decoration: none;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 10px;
    text-transform: uppercase;
  }
  .nav-mob-item.active { color: #FFB400; }

  .voice-toggle {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 18px; border-radius: 100px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer; transition: all 0.2s;
  }
  .voice-toggle:hover { background: rgba(255, 255, 255, 0.1); border-color: #FFB400; }
  .voice-toggle.active { background: rgba(255, 180, 0, 0.1); border-color: #FFB400; color: #FFB400; }
  .voice-label { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }

  .nav-user-pill {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 16px; border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    color: #fff; font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px;
  }
  .logout-btn { 
    color: rgba(255,255,255,0.3); cursor: pointer; transition: color 0.2s;
    background: none; border: none; padding: 0; display: flex; align-items: center;
  }
  .logout-btn:hover { color: #E63B1E; }
`;

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggle, enabled, isSpeaking } = useSpeech();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/insights', label: 'Insights', icon: PieChart },
    { path: '/trust', label: 'TrustHub', icon: ShieldCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{styles}</style>
      <nav className="nav-root">
        <div className="nav-stripe" />
        
        {/* DESKTOP */}
        <div className="nav-desktop">
          <Link to="/" className="nav-logo">
            <Store className="text-[#FFB400]" size={24} />
            Market<span>Link</span>
          </Link>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            <div className={`voice-toggle ${enabled ? 'active' : ''}`} onClick={toggle}>
              {enabled && isSpeaking && <div style={{width: 6, height: 6, borderRadius: '50%', background: '#FFB400', animation: 'pulse 1.5s infinite'}} />}
              {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="voice-label">{enabled ? 'Voice' : 'Quiet'}</span>
            </div>

            {user && (
              <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                <div className="nav-user-pill">
                  <User size={14} className="text-[#FFB400]" />
                  {user.name}
                </div>
                <button className="logout-btn" onClick={handleLogout} title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE */}
        <div className="nav-mobile">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-mob-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className={`nav-mob-item ${enabled ? 'active' : ''}`} onClick={toggle} style={{ cursor: 'pointer' }}>
             {enabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
             <span>{enabled ? 'Voice' : 'Quiet'}</span>
          </div>
          {user && (
            <div className="nav-mob-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <LogOut size={22} />
              <span>Exit</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
