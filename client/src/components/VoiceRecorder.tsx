import { useState, useEffect, useRef } from 'react';
import { Mic, Square, CheckCircle2, X, Sparkles } from 'lucide-react';
import '../styles/VoiceRecorder.css';

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
  onRecordingStateChange?: (isRecording: boolean) => void;
  variant?: 'light' | 'dark';
  isSimple?: boolean;
}

export const VoiceRecorder = ({ onTranscriptComplete, onRecordingStateChange, variant = 'light', isSimple = false }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (onRecordingStateChange) onRecordingStateChange(isRecording);
  }, [isRecording, onRecordingStateChange]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setAnalysisData(null);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    try {
      // MOCK DATA GENERATION
      const mockTranscripts = [
        `Today I sold 5 crates of tomatoes for 420 cedis.`,
        `Paid for delivery 50 cedis this afternoon.`,
        `Bought wholesale stock for 1200 cedis.`
      ];
      const rawText = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];

      // SMART SIMULATION
      const amountMatch = rawText.match(/(\d+)/);
      const simulatedAmount = amountMatch ? amountMatch[1] : '420';
      
      let simulatedType = 'income';
      if (rawText.toLowerCase().includes('bought') || rawText.toLowerCase().includes('paid')) {
        simulatedType = 'expense';
      }

      let analysis = {
        amount: simulatedAmount,
        item: rawText.includes('tomatoes') ? 'Tomatoes' : (rawText.includes('stock') ? 'Wholesale Stock' : 'Market Trade'),
        type: simulatedType,
        counterparty: 'Standard Trade'
      };

      setAnalysisData(analysis);
      setTranscript(rawText);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    onTranscriptComplete(transcript);
    setTranscript('');
    setAnalysisData(null);
  };

  const isDark = variant === 'dark';

  return (
    <div className="w-full max-w-md mx-auto relative group">
      
      {!transcript && !isProcessing && (
        <div className={`p-12 rounded-[48px] border transition-all duration-700 relative overflow-hidden ${
          isDark ? 'bg-white/[0.02] border-white/10 backdrop-blur-3xl' : 'bg-white border-slate-200'
        } ${isRecording ? 'scale-[1.02] border-[#FFB400]/40' : ''}`}>
          
          <div className="flex flex-col items-center gap-10 py-4 relative z-10">
            <div className="h-16 flex items-center gap-1.5 px-8">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full bg-[#FFB400] transition-all duration-300 ${isRecording ? 'wave-bar' : 'h-2 opacity-20'}`}
                  style={{ animationDelay: `${i * 0.1}s`, height: isRecording ? `${20 + Math.random() * 40}px` : '8px' }}
                />
              ))}
            </div>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`group relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 transform active:scale-95 ${
                isRecording 
                  ? 'bg-gradient-to-br from-[#E63B1E] to-[#b32d17] shadow-[0_0_60px_rgba(230,59,30,0.5)]' 
                  : 'bg-gradient-to-br from-[#FFB400] to-[#E69B00] shadow-[0_20px_50px_rgba(255,180,0,0.3)]'
              }`}
            >
              {isRecording ? <Square fill="white" className="text-white w-10 h-10" /> : <Mic className="text-[#1A0A00] w-12 h-12" />}
            </button>

            <div className="text-center">
              <h4 className={`font-display font-900 text-2xl mb-3 transition-colors ${isRecording ? 'text-[#FFB400]' : 'text-white'}`}>
                {isRecording ? 'Listening...' : 'Tap to Record Trade'}
              </h4>
              <div className="flex items-center justify-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-900 uppercase tracking-[2px] text-[#00D68F] bg-[#00A86B]/10 px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D68F] animate-pulse" />
                  AI Active
                </span>
                <span className="text-[10px] font-800 uppercase tracking-widest opacity-30">
                  {isRecording ? formatTime(timer) : 'Twi / English'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className={`p-20 rounded-[48px] border flex flex-col items-center gap-10 relative overflow-hidden ${
          isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200'
        }`}>
           <div className="scan-overlay" />
           <div className="relative">
             <div className="absolute inset-0 bg-[#FFB400]/30 blur-3xl animate-pulse rounded-full" />
             <div className="w-24 h-24 rounded-full border-4 border-[#FFB400]/20 flex items-center justify-center relative z-10 bg-[#1A0A00]">
                <Sparkles size={40} className="text-[#FFB400] animate-pulse" />
             </div>
           </div>
           <div className="text-center relative z-10">
             <h3 className="font-display font-900 text-2xl text-white">AI Analyzing...</h3>
             <p className="text-[11px] font-900 uppercase tracking-[4px] text-[#FFB400] animate-pulse mt-3">Creating Success Slip</p>
           </div>
        </div>
      )}

      {transcript && !isProcessing && (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          {isSimple ? (
            <div className={`p-10 rounded-[40px] border flex flex-col items-center gap-6 text-center ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-20 h-20 bg-[#00A86B] rounded-full flex items-center justify-center shadow-xl shadow-green-950/40">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-900 text-2xl text-white mb-2">Voice Verified!</h3>
                <p className="text-white/40 text-sm italic">"{transcript}"</p>
              </div>
              <button
                onClick={handleSave}
                className="w-full py-5 rounded-2xl bg-[#00A86B] text-white font-900 shadow-lg shadow-green-950/30"
              >
                Let's Go!
              </button>
            </div>
          ) : (
            <div className="jagged-bottom shadow-[0_60px_150px_rgba(0,0,0,0.6)] relative overflow-visible bg-white text-[#1A0A00] rounded-[40px]">
              <div className="p-10 text-center border-b-2 border-dashed border-black/5">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#1A0A00] text-[#FFB400] px-4 py-1.5 rounded-full text-[10px] font-900 uppercase tracking-[3px] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB400] animate-pulse" />
                    Proof of Trade
                  </div>
                </div>
                <h2 className="font-display font-900 text-6xl flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl text-[#FFB400]">₵</span>
                  {analysisData?.amount}
                </h2>
                <p className="text-[14px] font-700 opacity-40 uppercase tracking-widest">Digital Official Receipt</p>
              </div>

              <div className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                   <div>
                     <p className="text-[11px] font-900 uppercase tracking-widest opacity-30 mb-1">Purchased Item</p>
                     <p className="font-display font-900 text-lg">{analysisData?.item}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[11px] font-900 uppercase tracking-widest opacity-30 mb-1">Trade Type</p>
                     <p className={`font-900 text-[13px] uppercase ${analysisData?.type === 'income' ? 'text-[#00A86B]' : 'text-[#E63B1E]'}`}>
                       {analysisData?.type === 'income' ? 'Income' : 'Expense / Spent'}
                     </p>
                   </div>
                </div>

                <div className="p-6 bg-black/[0.03] rounded-3xl border border-black/5">
                   <div className="flex justify-between items-center mb-4 border-b border-black/5 pb-4">
                      <span className="text-[11px] font-900 uppercase tracking-widest opacity-30">Status</span>
                      <span className="text-[11px] font-900 text-[#00A86B] uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={14} /> Verified by AI
                      </span>
                   </div>
                   <p className="text-[13px] font-700 opacity-60 italic leading-relaxed text-center">
                     "{transcript}"
                   </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-10 pt-0">
                  <button
                    onClick={handleSave}
                    className="py-6 rounded-3xl bg-[#00A86B] text-white font-900 text-lg hover:brightness-111 shadow-2xl shadow-green-950/60 flex items-center justify-center gap-3 transform active:scale-[0.98] transition-all"
                  >
                    <CheckCircle2 size={24} /> Confirm & Save Slip
                  </button>
                  <button
                    onClick={() => { setTranscript(''); setAnalysisData(null); }}
                    className="py-6 rounded-3xl font-900 text-sm border border-black/10 bg-black/5 hover:bg-black/10 transition-all flex items-center justify-center gap-2 opacity-50 hover:opacity-100"
                  >
                    <X size={20} /> Discard
                  </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
