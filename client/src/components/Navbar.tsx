import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, TrendingUp, ShieldCheck, LogOut, User } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .nav-root * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .nav-desktop {
    position: sticky; top: 0; z-index: 100;
    width: 100%;
    background: #1A0A00;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex; flex-direction: column;
  }
  .nav-stripe {
    height: 4px;
    background: repeating-linear-gradient(90deg, #FFB400 0, #FFB400 40px, #E63B1E 40px, #E63B1E 80px, #00A86B 80px, #00A86B 120px, #1A0A00 120px, #1A0A00 160px);
    width: 100%;
  }
  .nav-container {
    max-width: 1240px; margin: 0 auto; width: 100%;
    padding: 18px 24px;
    display: flex; justify-content: space-between; align-items: center;
  }
  
  .nav-logo { 
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 22px; color: #fff; 
  }
  .nav-logo span { color: #FFB400; }
  .nav-logo-mark {
    width: 36px; height: 36px; border-radius: 8px; background: #FFB400;
    display: flex; align-items: center; justify-content: center; color: #1A0A00; font-size: 18px;
  }

  .nav-links { display: flex; gap: 40px; align-items: center; }
  .nav-link {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 700; color: rgba(255, 255, 255, 0.5);
    transition: all 0.2s; padding: 8px 0; border-bottom: 3px solid transparent;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active { color: #FFB400; border-bottom-color: #FFB400; }
  
  .nav-user {
    display: flex; align-items: center; gap: 12px;
    padding-left: 32px; border-left: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 12px;
  }
  .nav-avatar {
    width: 38px; height: 38px; border-radius: 12px; background: rgba(255, 255, 255, 0.05);
    display: flex; align-items: center; justify-content: center; color: #FFB400;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* MOBILE NAVIGATION */
  .nav-mobile {
    display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(26, 10, 0, 0.96); backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 14px 24px calc(14px + env(safe-area-inset-bottom));
    justify-content: space-around; align-items: center;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
  }
  
  @media (max-width: 860px) {
    .nav-desktop { display: none; }
    .nav-mobile { display: flex; }
  }

  .nav-mob-item {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    text-decoration: none; color: rgba(255, 255, 255, 0.35);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    flex: 1;
  }
  .nav-mob-item.active { color: #FFB400; transform: translateY(-4px); }
  .nav-mob-text { font-family: 'Sora', sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
  
  .nav-mob-indicator {
    position: absolute; bottom: -8px; width: 4px; height: 4px; border-radius: 50%;
    background: #FFB400; opacity: 0; transition: all 0.3s;
  }
  .nav-mob-item.active .nav-mob-indicator { opacity: 1; transform: scale(1.5); }
`;

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Insights', path: '/insights', icon: TrendingUp },
    { name: 'TrustHub', path: '/trust', icon: ShieldCheck },
    { name: 'Account', path: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="nav-root">
      <style>{styles}</style>
      
      {/* Desktop Top Nav */}
      <nav className="nav-desktop">
        <div className="nav-stripe" />
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-mark">M</div>
            Market<span>Link</span>
          </Link>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
            
            <div className="nav-user">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>Ama Mensah</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Trader</div>
              </div>
              <div className="nav-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="nav-mobile">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-mob-item ${isActive(item.path) ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <item.icon size={26} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="nav-mob-text">{item.name}</span>
            <div className="nav-mob-indicator" />
          </Link>
        ))}
      </nav>
    </div>
  );
};
