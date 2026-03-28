import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Languages, Store, Mic, ArrowRight, ArrowLeft, Loader2, Volume2, Plus } from 'lucide-react';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { useSpeech } from '../hooks/useSpeech';
import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../context/AuthContext';
import { t } from '../data/translations';

// MARKET ASSETS
import tomatoesImg from '../assets/tomatoes.jpg';
import fishImg from '../assets/fish.jpg';
import nutsImg from '../assets/nuts.jpg';

const items = {
  languages: ['English', 'Twi', 'Ga', 'Hausa', 'Fante'],
  businessTypes: [
    { name: 'Tomato Retail', img: tomatoesImg },
    { name: 'Wholesale Onion', img: nutsImg },
    { name: 'Fish Monger', img: fishImg },
    { name: 'General Provisions', img: null },
    { name: 'Textiles', img: null }
  ]
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');

  .ob-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ob-root {
    font-family: 'Noto Sans', sans-serif;
    min-height: 100vh;
    background: #1A0A00;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }
  .ob-display { font-family: 'Sora', sans-serif; }

  /* BACKGROUND GLOWS */
  .ob-glow-1 {
    position: absolute; top: -10%; left: -10%;
    width: 60%; height: 60%;
    background: radial-gradient(circle, rgba(255,180,0,0.1) 0%, transparent 70%);
    filter: blur(100px); z-index: 0;
  }
  .ob-glow-2 {
    position: absolute; bottom: -10%; right: -10%;
    width: 60%; height: 60%;
    background: radial-gradient(circle, rgba(0,168,107,0.08) 0%, transparent 70%);
    filter: blur(100px); z-index: 0;
  }

  /* GLASS CARD */
  .ob-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 40px;
    width: 100%;
    max-width: 520px;
    padding: 48px;
    position: relative;
    z-index: 10;
    box-shadow: 0 40px 100px rgba(0,0,0,0.3);
    overflow: hidden;
  }

  /* PROGRESS BAR */
  .ob-progress {
    display: flex; gap: 8px; margin-bottom: 40px; justify-content: center;
    position: relative; z-index: 20;
  }
  .ob-dot {
    width: 40px; height: 6px; border-radius: 100px;
    background: rgba(255,255,255,0.1); transition: all 0.4s;
  }
  .ob-dot.active { background: #FFB400; width: 60px; box-shadow: 0 0 15px rgba(255,180,0,0.4); }

  /* STEP ANIMATIONS */
  .ob-card-in { animation: ob-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes ob-fade-up {
    from { opacity: 0; transform: translateY(30px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* SELECTIONS */
  .ob-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 32px 0; }
  .ob-item {
    padding: 18px 24px; border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; transition: all 0.2s;
    position: relative; overflow: hidden;
  }
  .ob-item-img-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .ob-item.selected .ob-item-img-bg { opacity: 0.15; filter: grayscale(1); }
  
  .ob-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); }
  .ob-item.selected { 
    background: rgba(255,180,0,0.12); 
    border-color: #FFB400;
    box-shadow: 0 0 20px rgba(255,180,0,0.1); 
  }
  .ob-item-content { position: relative; z-index: 5; display: flex; align-items: center; justify-content: space-between; width: 100%; }
  .ob-item-label { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.5); transition: color 0.2s; }
  .ob-item.selected .ob-item-label { color: #fff; }

  /* CUSTOM INPUT */
  .ob-custom-wrap { margin-top: 12px; position: relative; }
  .ob-input {
    width: 100%; padding: 18px 24px; border-radius: 20px;
    background: rgba(255,255,255,0.05); border: 2px dashed rgba(255,255,255,0.1);
    color: #fff; font-family: 'Noto Sans', sans-serif; font-size: 15px;
    outline: none; transition: all 0.2s;
  }
  .ob-input:focus { border-color: #FFB400; background: rgba(255,255,255,0.08); }

  /* BUTTONS */
  .ob-btn-primary {
    width: 100%; padding: 20px; border-radius: 20px;
    background: #FFB400; color: #1A0A00;
    border: none; font-family: 'Sora', sans-serif; font-weight: 800;
    font-size: 16px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 10px 30px rgba(255,180,0,0.2);
  }
  .ob-btn-primary:hover { background: #FFC833; transform: translateY(-2px); box-shadow: 0 15px 40px rgba(255,180,0,0.3); }
  .ob-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .ob-btn-back {
    margin-top: 24px; background: none; border: none; color: rgba(255,255,255,0.3);
    font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;
    width: 100%; justify-content: center; transition: color 0.2s;
  }
  .ob-btn-back:hover { color: #fff; }

  .voice-status {
    position: fixed; top: 100px; right: 24px; z-index: 100;
    display: flex; align-items: center; gap: 10px;
    background: rgba(255, 180, 0, 0.1); border: 1px solid rgba(255, 180, 0, 0.2);
    padding: 8px 16px; border-radius: 100px;
    font-size: 11px; font-weight: 800; color: #FFB400; text-transform: uppercase;
    animation: ob-bounce 2s infinite;
  }
  @keyframes ob-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
`;

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    languages: [] as string[],
    businessTypes: [] as string[]
  });
  const [customBusiness, setCustomBusiness] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);
  const navigate = useNavigate();
  const { speak, isSpeaking, enabled } = useSpeech();
  const { updateSettings } = useSettings();
  const { updateUser } = useAuth();

  const currentLang = selections.languages.includes('Twi') ? 'Twi' : 'English';

  useEffect(() => {
    if (step === 1) {
      const options = items.languages.join(", ");
      speak(`Welcome to MarketLink. Please choose the languages you speak. Your options are: ${options}.`);
    }
    if (step === 2) {
      const options = items.businessTypes.map(b => b.name).join(", ");
      speak(`Tell us about your business. What do you sell? Options include: ${options}. Or you can type your own if it's not in the list.`);
    }
    if (step === 3) {
      speak("Great! Now, let's test your voice. Speak a trade record into the microphone.");
    }
  }, [step, speak]);

  const toggleSelection = (type: 'languages' | 'businessTypes', item: string) => {
    setSelections(prev => {
      const current = prev[type];
      const next = current.includes(item) 
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [type]: next };
    });
  };

  const handleFinish = () => {
    setIsFinishing(true);
    updateSettings({
      languages: selections.languages.length > 0 ? selections.languages : ['English'],
      businessType: customBusiness || selections.businessTypes[0] || 'General'
    });
    updateUser({ onboarded: true });
    speak(currentLang === 'Twi' ? "Excellent! Wo nneɛma nyinaa yɛ ready. Akwaaba kɔ MarketLink." : "Excellent! Everything is set up. Welcome to MarketLink.");
    setTimeout(() => { navigate('/dashboard'); }, 2000);
  };

  const hasBusinessSelection = selections.businessTypes.length > 0 || customBusiness.trim().length > 0;

  return (
    <div className="ob-root">
      <style>{styles}</style>
      <div className="ob-glow-1" />
      <div className="ob-glow-2" />

      {enabled && isSpeaking && (
        <div className="voice-status">
          <Volume2 size={12} />
          Voice Assistant Active
        </div>
      )}

      {isFinishing && (
        <div className="ob-success" style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#1A0A00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="w-24 h-24 rounded-full bg-[#00A86B]/20 flex items-center justify-center text-[#00A86B] mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="ob-display text-3xl font-bold mb-4">{t('W\'asiesie Pefee!', currentLang)}</h2>
          <p className="text-white/50">{t('Loading your trade dashboard...', currentLang)}</p>
          <Loader2 className="mt-8 animate-spin text-[#FFB400]" size={32} />
        </div>
      )}

      <div className="ob-progress">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`ob-dot ${step === s ? 'active' : ''}`} />
        ))}
      </div>

      <div className={`ob-card ${step ? 'ob-card-in' : ''}`} key={step}>
        {step === 1 && (
          <>
            <div className="w-14 h-14 bg-[#FFB400]/20 rounded-2xl flex items-center justify-center text-[#FFB400] mb-8">
              <Languages size={28} />
            </div>
            <h1 className="ob-display text-3xl font-bold mb-4">{t('Choose your languages', currentLang)}</h1>
            <p className="text-white/40 leading-relaxed font-medium">
              We'll use these to customize your voice recording experience.
            </p>

            <div className="ob-grid">
              {items.languages.map((lang) => (
                <div 
                  key={lang} 
                  className={`ob-item ${selections.languages.includes(lang) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('languages', lang)}
                >
                  <div className="ob-item-content">
                    <span className="ob-item-label">{lang}</span>
                    {selections.languages.includes(lang) && <CheckCircle2 size={18} color="#FFB400" />}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="ob-btn-primary" 
              disabled={selections.languages.length === 0}
              onClick={() => setStep(2)}
            >
              {t('Continue', currentLang)} <ArrowRight size={20} />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-20 h-20 mx-auto bg-[#00A86B]/20 rounded-3xl flex items-center justify-center text-[#00A86B] mb-8 relative overflow-hidden">
               {selections.businessTypes.length > 0 && items.businessTypes.find(b => b.name === selections.businessTypes[0])?.img && (
                 <img src={items.businessTypes.find(b => b.name === selections.businessTypes[0])?.img || ''} className="absolute inset-0 w-100 h-100 object-cover opacity-40" alt="" />
               )}
               <Store size={32} className="relative z-10" />
            </div>
            <h1 className="ob-display text-3xl font-bold mb-4 text-center">{currentLang === 'Twi' ? 'Ebɛn adwuma?' : 'What do you sell?'}</h1>
            <p className="text-white/40 leading-relaxed font-medium text-center">
              Select your business type or enter your own below.
            </p>

            <div className="ob-grid" style={{ marginBottom: 12 }}>
              {items.businessTypes.map((biz) => (
                <div 
                  key={biz.name} 
                  className={`ob-item ${selections.businessTypes.includes(biz.name) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('businessTypes', biz.name)}
                >
                  {biz.img && <img src={biz.img} className="ob-item-img-bg" alt="" />}
                  <div className="ob-item-content">
                    <span className="ob-item-label">{biz.name}</span>
                    {selections.businessTypes.includes(biz.name) && <CheckCircle2 size={18} color="#00A86B" />}
                  </div>
                </div>
              ))}
              
              <div className="ob-custom-wrap">
                <input 
                  type="text" 
                  className="ob-input" 
                  placeholder="Other (Type here...)" 
                  value={customBusiness}
                  onChange={(e) => setCustomBusiness(e.target.value)}
                />
                <Plus size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <button 
              className="ob-btn-primary" 
              disabled={!hasBusinessSelection}
              onClick={() => setStep(3)}
            >
              {t('Next Step', currentLang)} <ArrowRight size={20} />
            </button>
            <button className="ob-btn-back" onClick={() => setStep(1)}>
              <ArrowLeft size={14} /> Go Back
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-14 h-14 bg-[#E63B1E]/20 rounded-2xl flex items-center justify-center text-[#E63B1E] mb-8 mx-auto">
              <Mic size={28} />
            </div>
            <h1 className="ob-display text-3xl font-bold mb-4">Voice Voice!</h1>
            <p className="text-white/40 leading-relaxed font-medium mb-10">
              Try recording a sample trade like:<br/>
              <span className="text-[#FFB400]">"Meton tomato crates 5 de gyee 100."</span>
            </p>

            <VoiceRecorder 
              variant="dark"
              isSimple={true}
              onTranscriptComplete={(t) => {
                console.log("Sample transcript:", t);
                handleFinish();
              }} 
            />

            <button className="ob-btn-back" onClick={() => setStep(2)}>
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}