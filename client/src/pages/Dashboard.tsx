import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, ArrowRight, Wallet, ShieldCheck, PieChart } from 'lucide-react';
import { demoData } from '../data/demoData';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .db-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .db-root {
    font-family: 'Noto Sans', sans-serif;
    min-height: 100vh;
    background: #1A0A00;
    color: #fff;
    position: relative;
    overflow-x: hidden;
    padding-bottom: 120px; /* Padding for mobile bottom nav */
  }
  .db-display { font-family: 'Sora', sans-serif; }

  /* DYNAMIC BACKGROUND */
  .db-bg-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 0;
    animation: db-glow-move 15s infinite alternate ease-in-out;
  }
  .db-bg-glow-2 {
    position: absolute;
    bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,168,107,0.06) 0%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
    animation: db-glow-move 20s infinite alternate-reverse ease-in-out;
  }
  @keyframes db-glow-move {
    0% { transform: translate(-5%, -5%) scale(1); }
    100% { transform: translate(10%, 10%) scale(1.15); }
  }

  /* CONTAINER */
  .db-container { max-width: 1240px; margin: 0 auto; padding: 40px 24px; position: relative; z-index: 10; }

  /* HEADER */
  .db-header { margin-bottom: 56px; animation: db-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
  .db-greeting { font-family: 'Sora', sans-serif; font-size: clamp(32px, 5vw, 44px); font-weight: 800; line-height: 1.1; }
  .db-greeting span { color: #FFB400; }
  .db-sub { font-size: 16px; color: rgba(255,255,255,0.4); margin-top: 10px; font-weight: 500; }

  /* GLASS CARD GENERIC */
  .db-glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    padding: 32px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .db-glass:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.15); transform: translateY(-4px); }

  /* MAIN GRID */
  .db-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
  @media (max-width: 1024px) { .db-main-grid { grid-template-columns: 1fr; } }

  /* VOICE HUB */
  .db-voice-hub { 
    grid-column: 1 / -1; margin-bottom: 12px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
    animation: db-fade-up 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @media (max-width: 768px) { .db-voice-hub { grid-template-columns: 1fr; } }

  .db-recorder-card { 
    background: linear-gradient(135deg, rgba(255,180,0,0.1) 0%, rgba(255,180,0,0.02) 100%);
    border-color: rgba(255,180,0,0.2);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    min-height: 380px;
  }
  .db-recorder-info { text-align: center; margin-bottom: 32px; }
  .db-recorder-title { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .db-recorder-sub { color: rgba(255,255,255,0.4); font-size: 14px; }

  /* INSIGHT HERO CARD */
  .db-insight-hero {
    background: linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(66, 133, 244, 0.05) 100%);
    border-color: rgba(66, 133, 244, 0.2);
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px;
  }
  .db-insight-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(66, 133, 244, 0.2); border-radius: 100px;
    padding: 6px 14px; font-size: 11px; font-weight: 700; color: #8AB4F8;
    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 24px; width: fit-content;
  }
  .db-insight-text { font-family: 'Sora', sans-serif; font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: #fff; line-height: 1.4; font-style: italic; }
  .db-insight-text span { color: #8AB4F8; }
  .db-insight-cta { margin-top: 32px; color: #8AB4F8; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

  /* STAT CARDS */
  .db-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; animation: db-fade-up 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
  @media (max-width: 640px) { .db-stats-row { grid-template-columns: 1fr; } }

  .db-stat-box { padding: 32px; }
  .db-stat-icon-wrap { 
    width: 48px; height: 48px; border-radius: 14px; 
    display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
    background: rgba(255,255,255,0.05); color: #fff;
  }
  .db-stat-box.profit .db-stat-icon-wrap { background: rgba(0, 168, 107, 0.15); color: #00D68F; }
  .db-stat-box.waste .db-stat-icon-wrap { background: rgba(230, 59, 30, 0.15); color: #FF6B6B; }
  
  .db-stat-value { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 6px; }
  .db-stat-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px; }

  /* ACTIVITY LIST */
  .db-activity-section { animation: db-fade-up 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .db-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 0 8px; }
  .db-section-title { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; color: #fff; }
  .db-section-link { font-size: 13px; font-weight: 700; color: #FFB400; text-decoration: none; }

  .db-activity-list { display: flex; flex-direction: column; gap: 14px; }
  .db-activity-item { 
    display: flex; items-center; gap: 20px; padding: 20px; 
    border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.2s;
  }
  .db-activity-item:hover { transform: translateX(6px); background: rgba(255,255,255,0.05); border-color: rgba(255,180,0,0.2); }
  .db-activity-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); flex-shrink: 0; }
  .db-activity-text { font-size: 15px; color: rgba(255,255,255,0.7); font-weight: 500; font-style: italic; }
  .db-activity-time { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.2); text-transform: uppercase; margin-top: 6px; letter-spacing: 0.5px; }

  /* SIDEBAR WIDGETS */
  .db-sidebar { display: flex; flex-direction: column; gap: 24px; animation: db-fade-up 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
  
  .db-trust-widget { 
    background: linear-gradient(135deg, rgba(0, 168, 107, 0.15) 0%, rgba(0, 168, 107, 0.05) 100%);
    border-color: rgba(0, 168, 107, 0.2);
    text-align: center;
  }
  .db-trust-score-circle {
    width: 80px; height: 80px; border-radius: 50%; background: #00A86B; border: 4px solid rgba(0, 168, 107, 0.3);
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 24px; color: #fff;
    box-shadow: 0 0 30px rgba(0, 168, 107, 0.3);
  }
  .db-trust-status { font-size: 12px; font-weight: 700; color: #00D68F; text-transform: uppercase; letter-spacing: 1.5px; }

  .db-market-widget { background: rgba(0,0,0,0.3); }
  .db-market-tag { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; display: block; }
  .db-market-item { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; font-size: 13px; color: rgba(255,255,255,0.6); }
  .db-market-dot { width: 6px; height: 6px; border-radius: 50%; background: #FFB400; }

  @keyframes db-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState(demoData.recentTransactions || []);

  const handleNewTranscript = (text: string) => {
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
    };
    setTransactions(prev => [newEntry, ...prev.slice(0, 5)]);
  };

  return (
    <div className="db-root">
      <style>{styles}</style>
      <div className="db-bg-glow" style={{ top: '5%', left: '5%' }} />
      <div className="db-bg-glow-2" />

      <div className="db-container">
        {/* HEADER */}
        <header className="db-header">
          <h1 className="db-greeting">Mema wo akye, <span>{demoData.user.name}</span> 👋</h1>
          <p className="db-sub">Everything is looking good in the market today.</p>
        </header>

        <div className="db-main-grid">
          {/* VOICE HUB AREA */}
          <div className="db-voice-hub">
            <div className="db-glass db-recorder-card" id="voice-hub">
              <div className="db-recorder-info">
                <h3 className="db-recorder-title">AI Voice Hub</h3>
                <p className="db-recorder-sub">Record any trade or cost instantly</p>
              </div>
              <VoiceRecorder 
                variant="dark" 
                onTranscriptComplete={handleNewTranscript} 
              />
              <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,180,0,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Claude 3.5 Sonnet Active
              </div>
            </div>

            <div className="db-glass db-insight-hero">
              <div className="db-insight-tag">
                <Sparkles size={14} className="mr-2" />
                Smart Insight
              </div>
              <p className="db-insight-text">
                "Wuhwere <span>₵25</span> Yawoada biara nti tomato a ɛporɔ. Yawda biara tew tomato no so 15%."
              </p>
              <div className="db-insight-cta">
                See Full Analysis <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* LEFT SIDE: STATS & ACTIVITY */}
          <div className="space-y-8">
            <div className="db-stats-row">
              <div className="db-glass db-stat-box profit">
                <div className="db-stat-icon-wrap">
                  <TrendingUp size={20} />
                </div>
                <div className="db-stat-value">₵{demoData.stats.todayProfit}</div>
                <div className="db-stat-label">Daily Profit</div>
              </div>

              <div className="db-glass db-stat-box waste">
                <div className="db-stat-icon-wrap">
                  <TrendingDown size={20} />
                </div>
                <div className="db-stat-value">₵{demoData.stats.wasteLoss}</div>
                <div className="db-stat-label">Waste Loss</div>
              </div>

              <div className="db-glass db-stat-box">
                <div className="db-stat-icon-wrap">
                  <Wallet size={20} />
                </div>
                <div className="db-stat-value">₵18.4k</div>
                <div className="db-stat-label">Total Revenue</div>
              </div>
            </div>

            <section className="db-activity-section">
              <div className="db-section-header">
                <h3 className="db-section-title">Recent Activities</h3>
                <a href="#" className="db-section-link">View All <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} /></a>
              </div>
              <div className="db-activity-list">
                {transactions.map((t) => (
                  <div key={t.id} className="db-activity-item">
                    <div className="db-activity-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="db-activity-text">"{t.text}"</p>
                      <p className="db-activity-time">{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="db-sidebar">
            <div className="db-glass db-trust-widget">
              <div className="db-trust-score-circle">
                {demoData.user.trustScore}
              </div>
              <p className="db-trust-status">Trust Score: Verified</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                Your score rose 4 points this week!
              </p>
              <Link to="/trust" style={{ 
                display: 'block', marginTop: '20px', padding: '12px', 
                background: 'rgba(255,255,255,0.05)', borderRadius: '12px',
                color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none'
              }}>
                Open TrustHub ↗
              </Link>
            </div>

            <div className="db-glass db-market-widget">
              <span className="db-market-tag">Market Trends</span>
              <div className="space-y-4">
                {demoData.marketIntelligence.map((item, i) => (
                  <div key={i} className="db-market-item">
                    <div className="db-market-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-glass" style={{ textAlign: 'center', padding: '24px' }}>
              <PieChart size={32} className="mx-auto mb-4 text-[#FFB400] opacity-50" />
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                Inventory health is at 92%.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const Sparkles = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
