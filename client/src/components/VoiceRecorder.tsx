import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, CheckCircle2 } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
  onRecordingStateChange?: (isRecording: boolean) => void;
  variant?: 'light' | 'dark';
}

export const VoiceRecorder = ({ onTranscriptComplete, onRecordingStateChange, variant = 'light' }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (onRecordingStateChange) {
      onRecordingStateChange(isRecording);
    }
  }, [isRecording, onRecordingStateChange]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    try {
      // 1. Get a "mock" raw transcript (simulating speech-to-text for now)
      // In a real app, this would come from a browser Web Speech API or similar
      const mockTranscripts = [
        "Today I sold 5 crates of tomatoes for 200 cedis to Auntie Ama.",
        "Bought 3 bags of onions for 450 cedis from the driver.",
        "Meton tomato crates 10 de gyee ₵500 wo makola nnɛ."
      ];
      const rawText = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];

      // 2. Call our real backend analysis
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: rawText,
          context: { languages: ['Twi', 'English'] } 
        })
      });

      if (!response.ok) throw new Error('AI Server error');
      
      const analysis = await response.json();
      
      // 3. Format a nice human-readable message from the JSON analysis
      const formatted = `${analysis.type === 'income' ? 'Sale' : 'Purchase'}: ₵${analysis.amount} for ${analysis.item}${analysis.counterparty ? ' (via ' + analysis.counterparty + ')' : ''}`;
      
      setTranscript(formatted);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setTranscript("Sorry, I couldn't analyze that. Please check if the AI server is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    onTranscriptComplete(transcript);
    setTranscript('');
  };

  const isDark = variant === 'dark';

  return (
    <div className={`w-full max-w-md mx-auto p-8 rounded-[32px] border ${
      isDark 
        ? 'bg-white/5 border-white/10 shadow-2xl' 
        : 'bg-white border-[#EDE5DC] shadow-xl shadow-black/5'
    }`}>
      <div className="flex flex-col items-center gap-6 text-center">
        {!transcript && !isProcessing && (
          <>
            <div className={`relative flex items-center justify-center`}>
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-[#FFB400]/20 animate-ping" />
              )}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-[#E63B1E] scale-110 shadow-lg shadow-red-900/20'
                    : 'bg-[#FFB400] hover:bg-[#FFC833] shadow-lg shadow-[#FFB400]/30'
                }`}
              >
                {isRecording ? (
                  <Square className="w-10 h-10 text-white fill-current" />
                ) : (
                  <Mic className="w-10 h-10 text-[#1A0A00]" />
                )}
              </button>
            </div>

            <div>
              <h3 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-[#1A0A00]'}`}>
                {isRecording ? 'Listening...' : 'Record Transaction'}
              </h3>
              <p className={`${isDark ? 'text-white/40' : 'text-slate-500'} mt-1 font-medium`}>
                {isRecording ? formatTime(timer) : 'Tap the mic and speak'}
              </p>
            </div>
          </>
        )}

        {isProcessing && (
          <div className="py-8 flex flex-col items-center gap-4">
            <Loader2 className={`w-12 h-12 ${isDark ? 'text-[#FFB400]' : 'text-[#FFB400]'} animate-spin`} />
            <p className={`${isDark ? 'text-white/60' : 'text-slate-600'} font-medium`}>Processing your voice...</p>
          </div>
        )}

        {transcript && !isProcessing && (
          <div className="w-full animate-in fade-in zoom-in duration-300">
            <div className={`p-5 rounded-2xl border text-left mb-6 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-[#FFFBF5] border-[#F8F0E5]'
            }`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Transcript</p>
              <p className={`leading-relaxed italic font-medium ${isDark ? 'text-white/90' : 'text-slate-800'}`}>"{transcript}"</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setTranscript('')}
                className={`flex-1 py-4 px-4 rounded-xl font-bold text-sm transition-all ${
                  isDark 
                    ? 'border border-white/10 text-white/60 hover:bg-white/5' 
                    : 'border border-[#EDE5DC] text-slate-600 hover:bg-slate-50'
                }`}
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-4 px-4 rounded-xl bg-[#00A86B] text-white font-bold text-sm hover:brightness-110 shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save Entry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
