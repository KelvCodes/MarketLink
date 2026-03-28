import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .auth-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .auth-root {
    font-family: 'Noto Sans', sans-serif;
    min-height: 100vh;
    background: #1A0A00;
    color: #fff;
    display: flex;
    align-items: center; justify-content: center;
    padding: 24px;
    position: relative; overflow: hidden;
  }
  .auth-display { font-family: 'Sora', sans-serif; }

  /* DYNAMIC BACKGROUND */
  .auth-glow-1 {
    position: absolute; top: -10%; right: -10%;
    width: 60%; height: 60%;
    background: radial-gradient(circle, rgba(255,180,0,0.15) 0%, transparent 70%);
    filter: blur(100px); z-index: 0;
  }
  .auth-glow-2 {
    position: absolute; bottom: -10%; left: -10%;
    width: 60%; height: 60%;
    background: radial-gradient(circle, rgba(0,168,107,0.1) 0%, transparent 70%);
    filter: blur(100px); z-index: 0;
  }

  /* PREMIUM CARD */
  .auth-card {
    width: 100%; max-width: 480px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 48px;
    padding: 56px;
    position: relative; z-index: 10;
    box-shadow: 0 40px 100px rgba(0,0,0,0.4);
    animation: auth-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes auth-fade-up {
    from { opacity: 0; transform: translateY(30px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* KENTE STRIPE HEADER */
  .auth-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 8px;
    background: repeating-linear-gradient(
      90deg,
      #FFB400 0, #FFB400 60px,
      #E63B1E 60px, #E63B1E 120px,
      #00A86B 120px, #00A86B 180px,
      #1A0A00 180px, #1A0A00 240px
    );
    border-radius: 48px 48px 0 0;
  }

  .auth-logo { margin-bottom: 40px; display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .auth-logo span { font-family: 'Sora', sans-serif; font-weight: 800; font-size: 24px; color: #fff; }
  .auth-logo b { color: #FFB400; }

  .auth-title { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 12px; }
  .auth-sub { font-size: 15px; color: rgba(255,255,255,0.4); margin-bottom: 40px; font-weight: 500; }

  /* FORM */
  .auth-form-group { margin-bottom: 24px; position: relative; }
  .auth-label { 
    display: block; font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; margin-left: 12px;
  }
  .auth-input-wrap { position: relative; }
  .auth-input-icon { position: absolute; left: 24px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.15); }
  .auth-input {
    width: 100%; padding: 20px 24px 20px 60px; border-radius: 24px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    color: #fff; font-size: 15px; font-family: 'Noto Sans', sans-serif; outline: none;
    transition: all 0.2s;
  }
  .auth-input:focus { background: rgba(255,255,255,0.08); border-color: #FFB400; box-shadow: 0 0 20px rgba(255,180,0,0.1); }

  .auth-btn {
    width: 100%; padding: 22px; border-radius: 24px;
    background: #FFB400; color: #1A0A00; border: none;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 17px;
    cursor: pointer; transition: all 0.3s;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    margin-top: 40px; box-shadow: 0 20px 40px rgba(255,180,0,0.2);
  }
  .auth-btn:hover { background: #FFC833; transform: translateY(-2px); box-shadow: 0 25px 50px rgba(255,180,0,0.3); }
  .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .auth-footer { margin-top: 32px; text-align: center; font-size: 14px; color: rgba(255,255,255,0.3); font-weight: 600; }
  .auth-link { color: #FFB400; text-decoration: none; font-weight: 800; margin-left: 6px; }
  
  .error-msg { 
    background: rgba(230, 59, 30, 0.1); border: 1px solid rgba(230, 59, 30, 0.2); 
    color: #FF6B6B; padding: 16px; border-radius: 16px; font-size: 13px; font-weight: 700;
    margin-bottom: 24px; text-align: center;
  }
`;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-root">
      <style>{styles}</style>
      <div className="auth-glow-1" />
      <div className="auth-glow-2" />

      <div className="auth-card">
        <div className="auth-stripe" />
        
        <Link to="/" className="auth-logo">
          <Store size={28} className="text-[#FFB400]" />
          <span>Market<b>Link</b></span>
        </Link>

        <h1 className="auth-title auth-display">Welcome Back</h1>
        <p className="auth-sub">Log in to manage your premium market records.</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label">Phone or Email</label>
            <div className="auth-input-wrap">
              <Mail className="auth-input-icon" size={20} />
              <input 
                type="text" 
                className="auth-input" 
                placeholder="024 XXX XXXX or email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <Lock className="auth-input-icon" size={20} />
              <input 
                type="password" 
                className="auth-input" 
                placeholder="••••••••" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button className="auth-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Log In Now <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
