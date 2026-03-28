import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { VoiceRecorder } from '../components/VoiceRecorder';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .ob-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ob-root {
    font-family: 'Noto Sans', sans-serif;
    min-height: 100vh;
    background: #1A0A00;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 24px 100px;
    position: relative;
    overflow: hidden;
  }
  .ob-display { font-family: 'Sora', sans-serif; }

  /* DYNAMIC BACKGROUND */
  .ob-bg-glow {
    position: absolute;
    width: 800px; height: 800px;
    background: radial-gradient(circle, rgba(255,180,0,0.12) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 0;
    animation: ob-glow-move 15s infinite alternate ease-in-out;
  }
  .ob-bg-glow-2 {
    position: absolute;
    bottom: -100px; right: -100px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,168,107,0.08) 0%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
    animation: ob-glow-move 20s infinite alternate-reverse ease-in-out;
  }
  @keyframes ob-glow-move {
    0% { transform: translate(-10%, -10%) scale(1); }
    100% { transform: translate(15%, 15%) scale(1.2); }
  }

  /* TOP STRIPE */
  .ob-stripe {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 6px;
    background: repeating-linear-gradient(90deg, #FFB400 0, #FFB400 40px, #E63B1E 40px, #E63B1E 80px, #00A86B 80px, #00A86B 120px, #1A0A00 120px, #1A0A00 160px);
  }

  /* NAV */
  .ob-nav {
    width: 100%; max-width: 600px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 50px; position: relative; z-index: 10;
  }
  .ob-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .ob-logo-mark {
    width: 44px; height: 44px; border-radius: 12px;
    background: #FFB400;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 20px; color: #1A0A00;
    box-shadow: 0 8px 16px rgba(255,180,0,0.25);
  }
  .ob-logo-text { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; color: #fff; }

  /* CARD - GLASS */
  .ob-card {
    width: 100%; max-width: 580px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 44px;
    padding: 56px 48px;
    position: relative; z-index: 10;
    box-shadow: 0 40px 100px rgba(0,0,0,0.4);
    animation: ob-card-in 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes ob-card-in {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @media (max-width: 480px) { .ob-card { padding: 40px 24px; border-radius: 32px; } }

  /* PROGRESS TRACK */
  .ob-progress-container { width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 100px; margin-bottom: 40px; overflow: hidden; }
  .ob-progress-bar { height: 100%; background: #FFB400; border-radius: 100px; transition: width 0.6s cubic-bezier(.4,0,.2,1); box-shadow: 0 0 15px rgba(255,180,0,0.4); }

  /* CONTENT ANIMATIONS */
  .ob-anim-fade { animation: ob-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  @keyframes ob-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ob-step-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,180,0,0.12); border: 1px solid rgba(255,180,0,0.2);
    border-radius: 100px; padding: 6px 14px;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
    color: #FFB400; margin-bottom: 24px;
  }
  .ob-title {
    font-family: 'Sora', sans-serif; font-size: clamp(28px, 6vw, 40px); font-weight: 800;
    color: #fff; line-height: 1.1; margin-bottom: 12px;
  }
  .ob-title span { color: #FFB400; }
  .ob-subtitle { font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.6; margin-bottom: 40px; }

  /* COMPONENTS */
  .ob-tile-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 40px; }
  @media (max-width: 400px) { .ob-tile-grid { grid-template-columns: 1fr; } }
  
  .ob-tile {
    background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 24px; padding: 24px 20px; text-align: center; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .ob-tile:hover { background: rgba(255,180,0,0.06); border-color: rgba(255,180,0,0.3); transform: translateY(-4px); }
  .ob-tile.selected { background: rgba(255,180,0,0.12); border-color: #FFB400; box-shadow: 0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(255,180,0,0.1); transform: translateY(-4px); }
  
  .ob-tile-icon { font-size: 32px; filter: grayscale(0); transition: filter 0.2s; }
  .ob-tile-label { font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; color: #fff; }
  .ob-tile-sub { font-size: 11px; color: rgba(255,255,255,0.3); font-weight: 600; text-transform: uppercase; }

  .ob-btn {
    width: 100%; padding: 22px; border-radius: 20px; border: none; cursor: pointer;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 18px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ob-btn-primary { 
    background: #FFB400; color: #1A0A00; 
    box-shadow: 0 12px 32px rgba(255,180,0,0.25);
  }
  .ob-btn-primary:hover:not(:disabled) { background: #FFC833; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(255,180,0,0.35); }
  .ob-btn-primary:active:not(:disabled) { transform: scale(0.98); }
  .ob-btn-primary:disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.2); cursor: not-allowed; box-shadow: none; }

  .ob-btn-back {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: none; color: rgba(255,255,255,0.3);
    font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 24px; transition: color 0.2s;
  }
  .ob-btn-back:hover { color: #fff; }

  /* VOICE WAVE ANIMATION */
  .ob-voice-wave { display: flex; items-center; gap: 4px; justify-content: center; height: 32px; margin-top: 16px; }
  .ob-wave-bar { width: 3px; height: 100%; background: #FFB400; border-radius: 20px; animation: ob-wave-anim 0.8s infinite ease-in-out; }
  @keyframes ob-wave-anim { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

  .ob-hint {
    background: rgba(255,180,0,0.06); border: 1px solid rgba(255,180,0,0.15);
    border-radius: 20px; padding: 20px; margin-bottom: 32px; display: flex; gap: 14px; align-items: flex-start;
  }
  .ob-hint-icon { color: #FFB400; margin-top: 2px; }
  .ob-hint-text { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; }
  .ob-hint-text strong { color: #fff; }
`;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    languages: [] as string[],
    businessTypes: [] as string[],
    voiceVerified: false,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleSelection = (key: 'languages' | 'businessTypes', value: string) => {
    setFormData(prev => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handleComplete = () => {
    localStorage.setItem('marketlink_setup', JSON.stringify({ ...formData, setupDate: new Date().toISOString() }));
    navigate('/dashboard');
  };

  const progress = (step / 3) * 100;

  return (
    <div className="ob-root">
      <style>{styles}</style>
      <div className="ob-stripe" />
      <div className="ob-bg-glow" style={{ top: '10%', left: '10%' }} />
      <div className="ob-bg-glow-2" />

      <nav className="ob-nav">
        <a href="/" className="ob-logo">
          <div className="ob-logo-mark">M</div>
          <span className="ob-logo-text">MarketLink</span>
        </a>
      </nav>

      <div className="ob-card">
        <div className="ob-progress-container">
          <div className="ob-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* STEP 1: LANGUAGE */}
        {step === 1 && (
          <div className="ob-anim-fade">
            <div className="ob-step-tag">Step 1 of 3 · Language Selection</div>
            <h1 className="ob-title">Kyerɛ kasa a <span>wodi mu</span></h1>
            <p className="ob-subtitle">Select one or more languages you use at the market every day.</p>
            
            <div className="ob-tile-grid">
              {[
                { name: 'Twi', sub: 'Akan / Ashanti', icon: '🇬🇭' },
                { name: 'Ga', sub: 'Accra / Osu', icon: '🇬🇭' },
                { name: 'Ewe', sub: 'Volta / Ho', icon: '🇬🇭' },
                { name: 'Dagbani', sub: 'North / Tamale', icon: '🇬🇭' },
                { name: 'Hausa', sub: 'Zongos / North', icon: '🇬🇭' },
                { name: 'English', sub: 'Standard', icon: '🌍' },
              ].map((lang) => (
                <div 
                  key={lang.name} 
                  className={`ob-tile ${formData.languages.includes(lang.name) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('languages', lang.name)}
                >
                  <span className="ob-tile-icon">{lang.icon}</span>
                  <div className="ob-tile-label">{lang.name}</div>
                  <div className="ob-tile-sub">{lang.sub}</div>
                </div>
              ))}
            </div>

            <button className="ob-btn ob-btn-primary" disabled={formData.languages.length === 0} onClick={nextStep}>
              Next Step <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 2: VOICE */}
        {step === 2 && (
          <div className="ob-anim-fade">
            <button className="ob-btn-back" onClick={prevStep}><ArrowLeft size={16} /> Back</button>
            <div className="ob-step-tag">Step 2 of 3 · Setup AI</div>
            <h1 className="ob-title">Test your <span>voice voice</span></h1>
            <p className="ob-subtitle">Speak naturally. Tell the AI about a trade you made today.</p>
            
            <div className="ob-hint">
              <AlertCircle size={20} className="ob-hint-icon" />
              <p className="ob-hint-text">
                <strong>Try saying:</strong> "I sold three crates of tomatoes for 200 cedis each to Ama."
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <VoiceRecorder 
                variant="dark"
                onRecordingStateChange={(recording) => setIsRecording(recording)}
                onTranscriptComplete={() => {
                  setFormData({ ...formData, voiceVerified: true });
                  setIsRecording(false);
                }} 
              />
              {isRecording && (
                <div className="ob-voice-wave">
                  {[1.1, 1.4, 0.8, 1.6, 1.2, 0.9, 1.3].map((_, i) => (
                    <div key={i} className="ob-wave-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
              )}
            </div>

            <button className="ob-btn ob-btn-primary" disabled={!formData.voiceVerified} onClick={nextStep}>
              Verify & Continue <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 3: BUSINESS */}
        {step === 3 && (
          <div className="ob-anim-fade">
            <button className="ob-btn-back" onClick={prevStep}><ArrowLeft size={16} /> Back</button>
            <div className="ob-step-tag">Step 3 of 3 · Finalizing</div>
            <h1 className="ob-title">What items <span>do you sell?</span></h1>
            <p className="ob-subtitle">Select all that apply. This helps tailor your records and tips.</p>
            
            <div className="ob-tile-grid">
              {[
                { name: 'Tomatoes', icon: '🍅' },
                { name: 'Fish', icon: '🐟' },
                { name: 'Nuts', icon: '🥜' },
                { name: 'Onion', icon: '🧅' },
                { name: 'Cloth', icon: '🧵' },
                { name: 'Other', icon: '🛒' },
              ].map((biz) => (
                <div 
                  key={biz.name} 
                  className={`ob-tile ${formData.businessTypes.includes(biz.name) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('businessTypes', biz.name)}
                >
                  <span className="ob-tile-icon">{biz.icon}</span>
                  <div className="ob-tile-label">{biz.name}</div>
                </div>
              ))}
            </div>

            <button 
              className="ob-btn" 
              style={{ background: '#00A86B', color: '#fff', boxShadow: '0 12px 32px rgba(0,168,107,0.3)' }}
              disabled={formData.businessTypes.length === 0} 
              onClick={handleComplete}
            >
              Complete Setup <CheckCircle2 size={20} />
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
        MarketLink · Secured with AI
      </div>
    </div>
  );
}