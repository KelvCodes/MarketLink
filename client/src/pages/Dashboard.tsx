import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, ArrowRight, Wallet } from 'lucide-react';
import { demoData } from '../data/demoData';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { Link } from 'react-router-dom';
import { useSpeech } from '../hooks/useSpeech';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../context/AuthContext';
import { t } from '../data/translations';

// MARKET ASSETS
import tomatoesImg from '../assets/tomatoes.jpg';
import fishImg from '../assets/fish.jpg';
import nutsImg from '../assets/nuts.jpg';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

  .db-root * { box-sizing: border-box; }
  .db-root {
    min-height: 100vh;
    background: #1A0A00;
    color: #fff;
    position: relative;
    overflow-x: hidden;
    padding-bottom: 120px;
  }

  /* DYNAMIC BACKGROUND */
  .db-bg-glow {
    position: absolute; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%);
    filter: blur(80px); z-index: 0;
    animation: db-glow-move 15s infinite alternate ease-in-out;
  }
  .db-bg-glow-2 {
    position: absolute; bottom: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,168,107,0.06) 0%, transparent 70%);
    filter: blur(60px); z-index: 0;
    animation: db-glow-move 20s infinite alternate-reverse ease-in-out;
  }
  @keyframes db-glow-move {
    0% { transform: translate(-5%, -5%) scale(1); }
    100% { transform: translate(10%, 10%) scale(1.15); }
  }

  .db-container { max-width: 1240px; margin: 0 auto; padding: 120px 24px 40px; position: relative; z-index: 10; }

  .db-header { margin-bottom: 56px; animation: db-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1); position: relative; z-index: 20; }
  .db-greeting { font-family: 'Sora', sans-serif; font-size: clamp(36px, 6vw, 56px); font-weight: 800; line-height: 1.2; text-shadow: 0 4px 24px rgba(0,0,0,0.6); letter-spacing: -0.02em; }
  .db-greeting span { color: #FFB400; }
  .db-sub { font-size: 18px; color: rgba(255,255,255,0.6); margin-top: 16px; font-weight: 500; }

  .db-glass {
    background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px;
    padding: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .db-glass:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.15); transform: translateY(-4px); }

  .db-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
  @media (max-width: 1024px) { .db-main-grid { grid-template-columns: 1fr; } }

  .db-voice-hub { grid-column: 1 / -1; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; animation: db-fade-up 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both; }
  @media (max-width: 768px) { .db-voice-hub { grid-template-columns: 1fr; } }
  
  .db-recorder-card { background: linear-gradient(135deg, rgba(255,180,0,0.05) 0%, rgba(255,180,0,0.01) 100%); min-height: 440px; position: relative; overflow: hidden; }
  .db-recorder-card::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,180,0,0.03) 0%, transparent 60%); animation: db-slow-rotate 20s infinite linear; }
  @keyframes db-slow-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .db-recorder-info { text-align: center; margin-bottom: 40px; position: relative; z-index: 10; }
  .db-recorder-title { font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 12px; letter-spacing: -1px; }

  .db-stat-value { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 800; color: #fff; }
  .db-stat-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px; }

  .db-activity-item { display: flex; align-items: center; gap: 20px; padding: 20px; border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); transition: all 0.2s; }
  .db-activity-item:hover { transform: translateX(6px); background: rgba(255,255,255,0.05); border-color: rgba(255,180,0,0.2); }

  .db-stat-box { display: flex; flex-direction: column; gap: 8px; position: relative; overflow: hidden; }
  .db-stat-img-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.1; filter: grayscale(1) brightness(0.5); pointer-events: none; }
  .db-stat-icon-wrap { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; position: relative; z-index: 5; }
  
  .profit .db-stat-icon-wrap { color: #00A86B; background: rgba(0, 168, 107, 0.1); }
  .waste .db-stat-icon-wrap { color: #E63B1E; background: rgba(230, 59, 30, 0.1); }

  .db-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .db-section-title { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; }
  .db-section-link { color: #FFB400; text-decoration: none; font-size: 14px; font-weight: 700; }

  .db-trust-card { text-align: center; }
  .db-trust-circle { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #FFB400; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 800; color: #FFB400; }
  .db-trust-label { font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
  .db-trust-btn { display: block; width: 100%; padding: 16px; border-radius: 16px; background: #FFB400; color: #1A0A00; text-decoration: none; font-weight: 800; font-family: 'Sora', sans-serif; transition: all 0.2s; }
  .db-trust-btn:hover { background: #FFC833; transform: scale(1.02); }

  @keyframes db-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState(demoData.recentTransactions || []);
  const { speak } = useSpeech();
  const { isTwi } = useSettings();
  const { user } = useAuth();
  const lang = isTwi ? 'Twi' : 'English';

  const handleNewTranscript = (text: string) => {
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
    };
    setTransactions(prev => [newEntry, ...prev.slice(0, 5)]);

    // Voice Confirmation
    speak(isTwi ? `Yɛasive wo dwadie no yiye.` : `Transaction saved successfully.`);
  };

  return (
    <div className="db-root">
      <style>{styles}</style>
      <div className="db-bg-glow" style={{ top: '5%', left: '5%' }} />
      <div className="db-bg-glow-2" />

      <div className="db-container">
        <header className="db-header">
          <h1 className="db-greeting">
            {isTwi ? 'Mema wo akye,' : 'Good morning,'} <span>{user?.name || 'Trader'}</span> 👋
          </h1>
          <p className="db-sub">{t('Everything is looking good in the market today.', lang)}</p>
        </header>

        <div className="db-main-grid">
          <div className="db-voice-hub">
            <div className="db-glass db-recorder-card">
              <div className="db-recorder-info">
                <h3 className="db-recorder-title">{t('AI Voice Hub', lang)}</h3>
                <p className="db-recorder-sub">{t('Record any trade or cost instantly', lang)}</p>
              </div>
              <VoiceRecorder
                variant="dark"
                onTranscriptComplete={handleNewTranscript}
              />
            </div>

            <div className="db-glass" style={{ background: 'linear-gradient(135deg, rgba(0,168,107,0.1) 0%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src={tomatoesImg} className="db-stat-img-bg" style={{ opacity: 0.15, filter: 'none' }} alt="" />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ background: 'rgba(0,168,107,0.2)', color: '#00D68F', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, alignSelf: 'flex-start', marginBottom: '20px', display: 'inline-block' }}>Smart Insight</div>
                <p style={{ fontSize: '24px', fontFamily: 'Sora', fontWeight: 700, lineHeight: 1.4, color: '#fff' }}>
                  "Wuhwere <span>₵25</span> Yawoada biara nti tomato a ɛporɔ. Yawda biara tew tomato no so 15%."
                </p>
                <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: '#FFB400', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                  See Full Analysis <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="db-glass db-stat-box profit">
              <img src={fishImg} className="db-stat-img-bg" alt="" />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div className="db-stat-icon-wrap">
                  <TrendingUp size={24} />
                </div>
                <div className="db-stat-value">₵{demoData.stats.todayProfit}</div>
                <div className="db-stat-label">{t('Daily Profit', lang)}</div>
              </div>
            </div>

            <div className="db-glass db-stat-box waste">
              <img src={tomatoesImg} className="db-stat-img-bg" alt="" />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div className="db-stat-icon-wrap">
                  <TrendingDown size={24} />
                </div>
                <div className="db-stat-value">₵{demoData.stats.wasteLoss}</div>
                <div className="db-stat-label">{t('Waste Loss', lang)}</div>
              </div>
            </div>

            <div className="db-glass db-stat-box">
              <img src={nutsImg} className="db-stat-img-bg" alt="" />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div className="db-stat-icon-wrap">
                  <Wallet size={24} />
                </div>
                <div className="db-stat-value">₵18.4k</div>
                <div className="db-stat-label">{t('Total Revenue', lang)}</div>
              </div>
            </div>
          </div>

          <aside className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="db-glass db-trust-card">
              <div className="db-trust-circle">{demoData.user.trustScore}</div>
              <p className="db-trust-label">{t('Trust Score: Verified', lang)}</p>
              <Link to="/trust" className="db-trust-btn">{t('Open TrustHub ↗', lang)}</Link>
            </div>

            <div className="db-glass">
              <div className="db-section-header">
                <h3 className="db-section-title">{t('Recent Activities', lang)}</h3>
              </div>
              <div className="space-y-4">
                {transactions.map((t) => (
                  <div key={t.id} className="db-activity-item">
                    <div className="db-activity-icon">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700 }}>"{t.text}"</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}