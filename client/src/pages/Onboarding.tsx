import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowRight, ArrowLeft, CheckCircle2, Languages, Store, AlertCircle } from 'lucide-react';
import { VoiceRecorder } from '../components/VoiceRecorder';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: '',
    businessType: '',
    voiceVerified: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    localStorage.setItem('marketlink_setup', JSON.stringify({
      ...formData,
      setupDate: new Date().toISOString()
    }));
    navigate('/dashboard');
  };

  const steps = [
    { title: 'Language', icon: Languages },
    { title: 'Voice Test', icon: Mic },
    { title: 'Business', icon: Store }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      {/* Progress Header */}
      <div className="w-full max-w-md mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shadow-sm ${
                i + 1 <= step ? 'bg-primary-600 text-white shadow-primary-100 ring-4 ring-primary-50' : 'bg-slate-200 text-slate-500'
              }`}>
                {i + 1 < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                i + 1 <= step ? 'text-primary-600' : 'text-slate-400'
              }`}>{s.title}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-500" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-2 italic">Welcome to MarketLink!</h2>
              <p className="text-slate-500">First, select your preferred language for voice tracking.</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {['English', 'Twi', 'Hausa', 'Ga', 'Fante'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFormData({ ...formData, language: lang })}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${
                    formData.language === lang 
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-md translate-x-1' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  {lang}
                  {formData.language === lang && <CheckCircle2 className="w-6 h-6 text-primary-600" />}
                </button>
              ))}
            </div>

            <button
              disabled={!formData.language}
              onClick={nextStep}
              className="w-full py-5 bg-primary-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-xl shadow-primary-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <button onClick={prevStep} className="inline-flex items-center gap-1 text-slate-400 font-bold hover:text-slate-600 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h2 className="text-3xl font-display font-black text-slate-900 mb-2 italic">Test your voice</h2>
              <p className="text-slate-500">Say what you sold or bought today. We'll verify your voice signature.</p>
            </div>

            <VoiceRecorder onTranscriptComplete={() => setFormData({ ...formData, voiceVerified: true })} />
            
            <div className="mt-8 flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700 leading-normal">
                Speak clearly. Mention product names (Tomatoes, Onions) and currency amounts (cedis).
              </p>
            </div>

            <button
              disabled={!formData.voiceVerified}
              onClick={nextStep}
              className="w-full mt-8 py-5 bg-primary-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-xl shadow-primary-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Verify & Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-black text-slate-900 mb-2 italic">What do you sell?</h2>
              <p className="text-slate-500">We'll tailor your insights to your specific business type.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {['Tomatoes', 'Onions', 'Plantains', 'Cloth', 'Fish', 'Other'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, businessType: type })}
                  className={`p-6 rounded-3xl border-2 text-center font-bold transition-all ${
                    formData.businessType === type 
                    ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-lg scale-105' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${formData.businessType === type ? 'bg-primary-100' : 'bg-slate-50'}`}>
                    <Store className={`w-5 h-5 ${formData.businessType === type ? 'text-primary-600' : 'text-slate-400'}`} />
                  </div>
                  {type}
                </button>
              ))}
            </div>

            <button
              disabled={!formData.businessType}
              onClick={handleComplete}
              className="w-full py-5 bg-market-green text-white rounded-2xl font-black text-lg shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Complete Setup
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
